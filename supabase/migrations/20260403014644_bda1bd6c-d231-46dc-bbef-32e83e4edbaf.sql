
-- Add industry column to profiles
ALTER TABLE public.profiles ADD COLUMN industry text;

-- Create analyses table for storing business analysis history
CREATE TABLE public.analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL DEFAULT 'Business Analysis',
  industry text,
  market_size numeric,
  customer_base numeric,
  revenue numeric,
  cash_on_hand numeric,
  accounts_receivable numeric,
  current_liabilities numeric,
  inventory_units numeric,
  unit_cost numeric,
  sales_velocity numeric,
  growth_target numeric,
  risk_tolerance text,
  opportunity_score numeric,
  financial_score numeric,
  sweet_spot_score numeric,
  business_play text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analyses ENABLE ROW LEVEL SECURITY;

-- Users can only see their own analyses
CREATE POLICY "Users can view own analyses" ON public.analyses
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analyses" ON public.analyses
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own analyses" ON public.analyses
  FOR DELETE TO authenticated USING (auth.uid() = user_id);
