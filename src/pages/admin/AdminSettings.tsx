import { useState } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

export function AdminSettings() {
  const { siteConfig, setSiteConfig, sectionConfigs, setSectionConfigs } = useAdminData();
  const [config, setConfig] = useState(siteConfig);
  const [sections, setSections] = useState(sectionConfigs);

  const handleSaveSiteConfig = () => {
    setSiteConfig(config);
    toast({ title: 'Site configuration saved' });
  };

  const handleSaveSectionConfigs = () => {
    setSectionConfigs(sections);
    toast({ title: 'Section configurations saved' });
  };

  const updateSection = (key: string, field: string, value: string) => {
    setSections({
      ...sections,
      [key]: { ...sections[key], [field]: value }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Site Settings</h1>
        <p className="text-muted-foreground">Configure site-wide settings</p>
      </div>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="sections">Section Titles</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Site Name</Label>
                  <Input value={config.siteName} onChange={(e) => setConfig({ ...config, siteName: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Tagline</Label>
                  <Input value={config.siteTagline} onChange={(e) => setConfig({ ...config, siteTagline: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo Text (Primary)</Label>
                  <Input value={config.logoText.primary} onChange={(e) => setConfig({ ...config, logoText: { ...config.logoText, primary: e.target.value } })} />
                </div>
                <div className="space-y-2">
                  <Label>Logo Text (Secondary)</Label>
                  <Input value={config.logoText.secondary} onChange={(e) => setConfig({ ...config, logoText: { ...config.logoText, secondary: e.target.value } })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Site Description</Label>
                <Textarea value={config.description} onChange={(e) => setConfig({ ...config, description: e.target.value })} rows={3} />
              </div>

              <div className="space-y-2">
                <Label>Copyright Year</Label>
                <Input value={config.copyrightYear} onChange={(e) => setConfig({ ...config, copyrightYear: e.target.value })} className="w-32" />
              </div>

              <Button onClick={handleSaveSiteConfig}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Section Configurations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(sections).map(([key, section]) => (
                <div key={key} className="space-y-3 pb-4 border-b last:border-0">
                  <p className="text-sm font-medium text-muted-foreground uppercase">{key}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input value={section.title} onChange={(e) => updateSection(key, 'title', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>View All Text</Label>
                      <Input value={section.viewAllText || ''} onChange={(e) => updateSection(key, 'viewAllText', e.target.value)} />
                    </div>
                  </div>
                  {section.subtitle !== undefined && (
                    <div className="space-y-2">
                      <Label>Subtitle</Label>
                      <Input value={section.subtitle || ''} onChange={(e) => updateSection(key, 'subtitle', e.target.value)} />
                    </div>
                  )}
                </div>
              ))}
              <Button onClick={handleSaveSectionConfigs}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {config.socialLinks.map((link, index) => (
                <div key={link.id} className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Platform</Label>
                    <Input value={link.platform} onChange={(e) => {
                      const updated = [...config.socialLinks];
                      updated[index] = { ...link, platform: e.target.value };
                      setConfig({ ...config, socialLinks: updated });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>Label</Label>
                    <Input value={link.label} onChange={(e) => {
                      const updated = [...config.socialLinks];
                      updated[index] = { ...link, label: e.target.value };
                      setConfig({ ...config, socialLinks: updated });
                    }} />
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input value={link.url} onChange={(e) => {
                      const updated = [...config.socialLinks];
                      updated[index] = { ...link, url: e.target.value };
                      setConfig({ ...config, socialLinks: updated });
                    }} />
                  </div>
                </div>
              ))}
              <Button onClick={handleSaveSiteConfig}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
