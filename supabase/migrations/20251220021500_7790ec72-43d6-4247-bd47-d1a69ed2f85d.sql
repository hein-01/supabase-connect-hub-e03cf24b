-- Create storage bucket for tool icons
INSERT INTO storage.buckets (id, name, public)
VALUES ('tool-icons', 'tool-icons', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view tool icons (public bucket)
CREATE POLICY "Anyone can view tool icons"
ON storage.objects FOR SELECT
USING (bucket_id = 'tool-icons');

-- Allow authenticated admins to upload tool icons
CREATE POLICY "Admins can upload tool icons"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'tool-icons' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to update tool icons
CREATE POLICY "Admins can update tool icons"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'tool-icons' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admins to delete tool icons
CREATE POLICY "Admins can delete tool icons"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'tool-icons' 
  AND public.has_role(auth.uid(), 'admin')
);