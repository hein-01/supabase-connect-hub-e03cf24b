-- Create enum for app roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check user role (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create categories table
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    icon TEXT NOT NULL,
    tool_count INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
ON public.categories FOR SELECT USING (true);

CREATE POLICY "Admins can manage categories"
ON public.categories FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create tools table
CREATE TABLE public.tools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    logo TEXT,
    domain TEXT,
    external_url TEXT,
    icon TEXT,
    icon_bg TEXT,
    video_url TEXT,
    is_paid BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    category_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tools"
ON public.tools FOR SELECT USING (true);

CREATE POLICY "Admins can manage tools"
ON public.tools FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create rankings table
CREATE TABLE public.rankings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type TEXT NOT NULL UNIQUE CHECK (type IN ('overall', 'image', 'video', 'coding', 'writing', 'productivity')),
    title TEXT NOT NULL,
    tool_ids UUID[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view rankings"
ON public.rankings FOR SELECT USING (true);

CREATE POLICY "Admins can manage rankings"
ON public.rankings FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create content_items table
CREATE TABLE public.content_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    image TEXT NOT NULL,
    video_url TEXT NOT NULL,
    category_tags TEXT[] DEFAULT '{}',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view content items"
ON public.content_items FOR SELECT USING (true);

CREATE POLICY "Admins can manage content items"
ON public.content_items FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create filter_tabs table
CREATE TABLE public.filter_tabs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.filter_tabs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view filter tabs"
ON public.filter_tabs FOR SELECT USING (true);

CREATE POLICY "Admins can manage filter tabs"
ON public.filter_tabs FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create issue_options table
CREATE TABLE public.issue_options (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.issue_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view issue options"
ON public.issue_options FOR SELECT USING (true);

CREATE POLICY "Admins can manage issue options"
ON public.issue_options FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create site_config table (singleton)
CREATE TABLE public.site_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL,
    site_tagline TEXT NOT NULL,
    logo_text_primary TEXT NOT NULL,
    logo_text_secondary TEXT NOT NULL,
    description TEXT NOT NULL,
    copyright_year TEXT NOT NULL,
    languages JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site config"
ON public.site_config FOR SELECT USING (true);

CREATE POLICY "Admins can manage site config"
ON public.site_config FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create section_configs table
CREATE TABLE public.section_configs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    view_all_link TEXT,
    view_all_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.section_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view section configs"
ON public.section_configs FOR SELECT USING (true);

CREATE POLICY "Admins can manage section configs"
ON public.section_configs FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON public.tools
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_rankings_updated_at BEFORE UPDATE ON public.rankings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_content_items_updated_at BEFORE UPDATE ON public.content_items
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_config_updated_at BEFORE UPDATE ON public.site_config
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_section_configs_updated_at BEFORE UPDATE ON public.section_configs
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();