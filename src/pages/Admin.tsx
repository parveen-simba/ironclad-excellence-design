import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Lock, LogOut, RefreshCw, Trash2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const FUNCTION_URL = `https://${import.meta.env.VITE_SUPABASE_PROJECT_ID}.supabase.co/functions/v1/admin-enquiries`;

interface Enquiry {
  id: string;
  name: string;
  phone: string;
  requirement: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-primary/20 text-primary border-primary/30",
  contacted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  resolved: "bg-green-500/20 text-green-400 border-green-500/30",
};

const Admin = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState("");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEnquiries = useCallback(async (pw: string) => {
    setLoading(true);
    try {
      const res = await fetch(FUNCTION_URL, {
        headers: { "x-admin-password": pw },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setEnquiries(data);
    } catch {
      toast({ title: "Failed to load enquiries", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pw");
    if (saved) {
      setStoredPassword(saved);
      setAuthenticated(true);
      fetchEnquiries(saved);
    }
  }, [fetchEnquiries]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(FUNCTION_URL, {
        headers: { "x-admin-password": password },
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      sessionStorage.setItem("admin_pw", password);
      setStoredPassword(password);
      setAuthenticated(true);
      setEnquiries(data);
    } catch {
      toast({ title: "Incorrect password", variant: "destructive" });
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPassword,
        },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status } : e))
      );
      toast({ title: `Status updated to ${status}` });
    } catch {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Delete this enquiry permanently?")) return;
    try {
      const res = await fetch(FUNCTION_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": storedPassword,
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error();
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      toast({ title: "Enquiry deleted" });
    } catch {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const logout = () => {
    sessionStorage.removeItem("admin_pw");
    setAuthenticated(false);
    setStoredPassword("");
    setPassword("");
    setEnquiries([]);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-card border border-border rounded-lg p-8 w-full max-w-sm space-y-4"
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground">
              Enter password to view enquiries
            </p>
          </div>
          <Input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-11"
          />
          <Button type="submit" className="w-full font-heading tracking-wide">
            Unlock
          </Button>
          <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to website
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="font-heading text-xl sm:text-2xl font-bold">
            Customer Enquiries
          </h1>
          <Badge variant="secondary" className="text-xs">
            {enquiries.length}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchEnquiries(storedPassword)}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button variant="ghost" size="sm" onClick={logout}>
            <LogOut className="w-4 h-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {enquiries.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No enquiries yet</p>
          </div>
        ) : (
          <div className="border border-border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="hidden md:table-cell">Requirement</TableHead>
                  <TableHead className="hidden lg:table-cell">Message</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {enquiries.map((enq) => (
                  <TableRow key={enq.id}>
                    <TableCell className="font-medium">{enq.name}</TableCell>
                    <TableCell>
                      <a
                        href={`tel:${enq.phone}`}
                        className="text-primary hover:underline"
                      >
                        {enq.phone}
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground max-w-[200px] truncate">
                      {enq.requirement || "—"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-muted-foreground max-w-[250px] truncate">
                      {enq.message || "—"}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={enq.status}
                        onValueChange={(val) => updateStatus(enq.id, val)}
                      >
                        <SelectTrigger className="w-[120px] h-8 text-xs border-0 p-0">
                          <Badge
                            variant="outline"
                            className={`${statusColors[enq.status] || ""} text-xs capitalize`}
                          >
                            {enq.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-xs">
                      {new Date(enq.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteEnquiry(enq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
