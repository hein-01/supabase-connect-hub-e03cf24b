import { useState, useRef } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, Search, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Tool } from '@/data/types';

const emptyTool: Partial<Tool> = {
  id: '', slug: '', name: '', description: '', logo: '', domain: '', externalUrl: '',
  icon: '', iconBg: '', isPaid: false, isHotDeal: false, isFeatured: false, categoryIds: [],
  hasRecurringFreeCredits: false, hasStudentBenefit: false,
  hasWelcomeCredits: false, hasProTrialNoCard: false, hasProTrialWithCard: false
};

export function AdminTools() {
  const { tools, addTool, updateTool, deleteTool, categories } = useAdminData();
  const [search, setSearch] = useState('');
  const [editingTool, setEditingTool] = useState<Partial<Tool> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingTool) return;

    if (!file.type.startsWith('image/')) {
      toast({ title: 'Please select an image file', variant: 'destructive' });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('tool-icons')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('tool-icons')
        .getPublicUrl(fileName);

      setEditingTool({ ...editingTool, icon: urlData.publicUrl });
      toast({ title: 'Icon uploaded successfully' });
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({ title: 'Failed to upload icon', description: error.message, variant: 'destructive' });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const clearIcon = () => {
    if (editingTool) {
      setEditingTool({ ...editingTool, icon: '' });
    }
  };

  const filteredTools = tools.filter(t => 
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = async () => {
    if (!editingTool?.name || !editingTool?.slug) {
      toast({ title: 'Name and slug are required', variant: 'destructive' });
      return;
    }
    
    try {
      if (editingTool.id && tools.some(t => t.id === editingTool.id)) {
        await updateTool(editingTool.id, editingTool);
        toast({ title: 'Tool updated successfully' });
      } else {
        const newTool: Tool = {
          ...emptyTool,
          ...editingTool,
          id: editingTool.id || `tool-${Date.now()}`,
          categoryIds: editingTool.categoryIds || [],
        } as Tool;
        await addTool(newTool);
        toast({ title: 'Tool added successfully' });
      }
      setIsDialogOpen(false);
      setEditingTool(null);
    } catch (error: any) {
      console.error('Error saving tool:', error);
      toast({ title: 'Failed to save tool', description: error.message, variant: 'destructive' });
    }
  };

  const handleDelete = (id: string) => {
    deleteTool(id);
    toast({ title: 'Tool deleted' });
  };

  const openNew = () => {
    setEditingTool({ ...emptyTool });
    setIsDialogOpen(true);
  };

  const openEdit = (tool: Tool) => {
    setEditingTool({ ...tool });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tools</h1>
          <p className="text-muted-foreground">Manage AI tools ({tools.length} total)</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Tool
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filteredTools.map((tool) => (
          <Card key={tool.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                {tool.logo ? (
                  <img src={tool.logo} alt={tool.name} className="w-10 h-10 rounded-lg object-cover" />
                ) : (
                  <div className={`w-10 h-10 rounded-lg ${tool.iconBg || 'bg-muted'} flex items-center justify-center`}>
                    {tool.icon || '🔧'}
                  </div>
                )}
                <div>
                  <p className="font-medium">{tool.name}</p>
                  <p className="text-sm text-muted-foreground truncate max-w-md">{tool.description}</p>
                  <div className="flex gap-2 mt-1">
                    {tool.isPaid && <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800">Paid</span>}
                    {tool.isFeatured && <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800">Featured</span>}
                    {tool.isHotDeal && <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">Hot Deal</span>}
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(tool)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(tool.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTool?.id ? 'Edit Tool' : 'Add Tool'}</DialogTitle>
          </DialogHeader>
          {editingTool && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input value={editingTool.name || ''} onChange={(e) => setEditingTool({ ...editingTool, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input value={editingTool.slug || ''} onChange={(e) => setEditingTool({ ...editingTool, slug: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={editingTool.description || ''} onChange={(e) => setEditingTool({ ...editingTool, description: e.target.value })} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Logo URL</Label>
                  <Input value={editingTool.logo || ''} onChange={(e) => setEditingTool({ ...editingTool, logo: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Domain</Label>
                  <Input value={editingTool.domain || ''} onChange={(e) => setEditingTool({ ...editingTool, domain: e.target.value })} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>External URL</Label>
                <Input value={editingTool.externalUrl || ''} onChange={(e) => setEditingTool({ ...editingTool, externalUrl: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <div className="flex items-center gap-3">
                  {editingTool.icon && (
                    <div className="relative">
                      {editingTool.icon.startsWith('http') ? (
                        <img src={editingTool.icon} alt="Icon" className="w-12 h-12 rounded-lg object-cover border" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-2xl border">
                          {editingTool.icon}
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={clearIcon}
                        className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter emoji or upload image"
                      value={editingTool.icon?.startsWith('http') ? '' : editingTool.icon || ''}
                      onChange={(e) => setEditingTool({ ...editingTool, icon: e.target.value })}
                      className="w-48"
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {isUploading ? 'Uploading...' : 'Upload'}
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Icon Background (Tailwind class)</Label>
                <Input value={editingTool.iconBg || ''} onChange={(e) => setEditingTool({ ...editingTool, iconBg: e.target.value })} placeholder="e.g. bg-blue-100" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.isPaid || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, isPaid: c })} />
                  <Label>Paid</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.isHotDeal || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, isHotDeal: c })} />
                  <Label>Hot Deal</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.isFeatured || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, isFeatured: c })} />
                  <Label>Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.hasRecurringFreeCredits || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, hasRecurringFreeCredits: c })} />
                  <Label>Recurring Free Credits</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.hasStudentBenefit || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, hasStudentBenefit: c })} />
                  <Label>Student Benefit</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.hasWelcomeCredits || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, hasWelcomeCredits: c })} />
                  <Label>Welcome Credits</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.hasProTrialNoCard || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, hasProTrialNoCard: c })} />
                  <Label>Pro Trial (No Card)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editingTool.hasProTrialWithCard || false} onCheckedChange={(c) => setEditingTool({ ...editingTool, hasProTrialWithCard: c })} />
                  <Label>Pro Trial (With Card)</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
