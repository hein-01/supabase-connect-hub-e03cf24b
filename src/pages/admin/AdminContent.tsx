import { useState } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import type { ContentItem } from '@/data/types';

const emptyContent: Partial<ContentItem> = {
  id: '', title: '', image: '', videoUrl: '', categoryTags: [], sortOrder: 0
};

export function AdminContent() {
  const { contentItems, addContentItem, updateContentItem, deleteContentItem } = useAdminData();
  const [editingItem, setEditingItem] = useState<Partial<ContentItem> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  const handleSave = () => {
    if (!editingItem?.title) {
      toast({ title: 'Title is required', variant: 'destructive' });
      return;
    }
    
    const itemToSave = {
      ...editingItem,
      categoryTags: tagsInput.split(',').map(t => t.trim()).filter(Boolean)
    };
    
    if (editingItem.id && contentItems.some(c => c.id === editingItem.id)) {
      updateContentItem(editingItem.id, itemToSave);
      toast({ title: 'Content updated' });
    } else {
      const newItem: ContentItem = {
        ...emptyContent,
        ...itemToSave,
        id: itemToSave.id || `content-${Date.now()}`,
        sortOrder: contentItems.length + 1,
      } as ContentItem;
      addContentItem(newItem);
      toast({ title: 'Content added' });
    }
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    deleteContentItem(id);
    toast({ title: 'Content deleted' });
  };

  const openNew = () => {
    setEditingItem({ ...emptyContent });
    setTagsInput('');
    setIsDialogOpen(true);
  };

  const openEdit = (item: ContentItem) => {
    setEditingItem({ ...item });
    setTagsInput(item.categoryTags.join(', '));
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Content Items</h1>
          <p className="text-muted-foreground">Manage video content ({contentItems.length} total)</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Content
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentItems.sort((a, b) => a.sortOrder - b.sortOrder).map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-[9/16] relative">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {item.categoryTags.map((tag, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-white/20 text-white">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <CardContent className="p-3 flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem?.id ? 'Edit Content' : 'Add Content'}</DialogTitle>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input value={editingItem.title || ''} onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })} />
              </div>
              
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input value={editingItem.image || ''} onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })} />
              </div>
              
              <div className="space-y-2">
                <Label>Video URL</Label>
                <Input value={editingItem.videoUrl || ''} onChange={(e) => setEditingItem({ ...editingItem, videoUrl: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Category Tags (comma separated)</Label>
                <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="Content Creation, Professional" />
              </div>

              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input type="number" value={editingItem.sortOrder || 0} onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) })} />
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
