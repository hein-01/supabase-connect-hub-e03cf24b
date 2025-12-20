import { useState, lazy, Suspense } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Plus, Pencil, Trash2, LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { toast } from '@/hooks/use-toast';
import type { Category } from '@/data/types';

interface DynamicIconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  const kebabName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const iconKey = kebabName as keyof typeof dynamicIconImports;
  
  if (!dynamicIconImports[iconKey]) {
    return <span className="text-xs text-muted-foreground">{name}</span>;
  }
  
  const LucideIcon = lazy(dynamicIconImports[iconKey]);
  
  return (
    <Suspense fallback={<div className="w-5 h-5 bg-muted rounded animate-pulse" />}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

const emptyCategory: Partial<Category> = {
  id: '', slug: '', label: '', icon: 'Folder', toolCount: 0, isActive: true, sortOrder: 0
};

export function AdminCategories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useAdminData();
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    if (!editingCategory?.label || !editingCategory?.slug) {
      toast({ title: 'Label and slug are required', variant: 'destructive' });
      return;
    }
    
    if (editingCategory.id && categories.some(c => c.id === editingCategory.id)) {
      updateCategory(editingCategory.id, editingCategory);
      toast({ title: 'Category updated' });
    } else {
      const newCategory: Category = {
        ...emptyCategory,
        ...editingCategory,
        id: editingCategory.id || `cat-${Date.now()}`,
        sortOrder: categories.length + 1,
      } as Category;
      addCategory(newCategory);
      toast({ title: 'Category added' });
    }
    setIsDialogOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    deleteCategory(id);
    toast({ title: 'Category deleted' });
  };

  const openNew = () => {
    setEditingCategory({ ...emptyCategory });
    setIsDialogOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditingCategory({ ...category });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground">Manage tool categories ({categories.length} total)</p>
        </div>
        <Button onClick={openNew} className="gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid gap-4">
        {categories.sort((a, b) => a.sortOrder - b.sortOrder).map((category) => (
          <Card key={category.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                  <DynamicIcon name={category.icon} className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">{category.label}</p>
                  <p className="text-sm text-muted-foreground">{category.toolCount} tools • {category.slug}</p>
                </div>
                {category.isActive && (
                  <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-800">Active</span>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEdit(category)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(category.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCategory?.id ? 'Edit Category' : 'Add Category'}</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Label *</Label>
                  <Input value={editingCategory.label || ''} onChange={(e) => setEditingCategory({ ...editingCategory, label: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input value={editingCategory.slug || ''} onChange={(e) => setEditingCategory({ ...editingCategory, slug: e.target.value })} />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Icon (Lucide name)</Label>
                  <Input value={editingCategory.icon || ''} onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })} placeholder="e.g. Image, Video, Code" />
                </div>
                <div className="space-y-2">
                  <Label>Tool Count</Label>
                  <Input type="number" value={editingCategory.toolCount || 0} onChange={(e) => setEditingCategory({ ...editingCategory, toolCount: parseInt(e.target.value) })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Sort Order</Label>
                  <Input type="number" value={editingCategory.sortOrder || 0} onChange={(e) => setEditingCategory({ ...editingCategory, sortOrder: parseInt(e.target.value) })} />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <Switch checked={editingCategory.isActive || false} onCheckedChange={(c) => setEditingCategory({ ...editingCategory, isActive: c })} />
                  <Label>Active</Label>
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
