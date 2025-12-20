-- Add new boolean columns to tools table for benefit flags
ALTER TABLE public.tools
ADD COLUMN has_recurring_free_credits boolean DEFAULT false,
ADD COLUMN has_student_benefit boolean DEFAULT false,
ADD COLUMN has_new_account_credits boolean DEFAULT false,
ADD COLUMN has_instant_welcome_credits boolean DEFAULT false,
ADD COLUMN has_pro_trial_no_card boolean DEFAULT false,
ADD COLUMN has_pro_trial_with_card boolean DEFAULT false;