import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are a helpful customer assistant for MI Enterprises, a manufacturer of premium iron doors, window frames, and custom fabrication work based in Ludhiana, Punjab, India.

Key facts about MI Enterprises:
- Products: Custom iron doors, window frames, gates, grills, railings, and fabrication work
- Materials: High-quality iron and steel with powder coating, CNC cutting, and custom finishes
- Location: Near Nankana Sahib Public School, Opp. Jasdev Nagar, Gill Road, Ludhiana, Punjab
- Contact: Manpreet Singh Ubhi, Phone: +91 86999-60356, Email: mienterprises1984@gmail.com
- Working Hours: Mon-Sat 9:00 AM - 7:00 PM
- All products are made to order with custom sizes and designs available
- They offer site visits for measurement and installation services

Guidelines:
- Be friendly, concise, and helpful
- Answer questions about products, pricing (give general ranges, suggest contacting for exact quotes), processes, and timelines
- For specific quotes, encourage customers to call or use the contact form
- If asked about something unrelated to iron/steel fabrication, politely redirect to MI Enterprises services
- Respond in the same language the customer uses (Hindi, Punjabi, or English)
- Keep responses short (2-4 sentences) unless detailed info is requested`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
