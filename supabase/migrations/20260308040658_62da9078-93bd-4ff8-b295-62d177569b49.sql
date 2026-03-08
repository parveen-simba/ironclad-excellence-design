ALTER TABLE public.enquiries ADD COLUMN status text NOT NULL DEFAULT 'new';

-- Allow admin edge function (service role) to read and update
-- The existing RLS denies public SELECT, which is correct.
-- Edge functions using service role key bypass RLS automatically.