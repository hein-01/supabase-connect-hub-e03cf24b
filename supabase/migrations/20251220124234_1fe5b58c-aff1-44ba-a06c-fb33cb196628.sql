-- Rename is_active to is_hot_deal
ALTER TABLE public.tools RENAME COLUMN is_active TO is_hot_deal;

-- Rename has_instant_welcome_credits to has_welcome_credits
ALTER TABLE public.tools RENAME COLUMN has_instant_welcome_credits TO has_welcome_credits;

-- Drop has_new_account_credits column
ALTER TABLE public.tools DROP COLUMN has_new_account_credits;