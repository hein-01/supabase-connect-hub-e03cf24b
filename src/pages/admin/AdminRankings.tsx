import { useState } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GripVertical, X, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function AdminRankings() {
  const { rankings, updateRanking, tools } = useAdminData();
  const [selectedRanking, setSelectedRanking] = useState(rankings[0]?.id || '');

  const currentRanking = rankings.find(r => r.id === selectedRanking);

  const handleAddTool = (toolId: string) => {
    if (!currentRanking) return;
    if (currentRanking.toolIds.includes(toolId)) {
      toast({ title: 'Tool already in ranking', variant: 'destructive' });
      return;
    }
    updateRanking(currentRanking.id, {
      toolIds: [...currentRanking.toolIds, toolId]
    });
    toast({ title: 'Tool added to ranking' });
  };

  const handleRemoveTool = (toolId: string) => {
    if (!currentRanking) return;
    updateRanking(currentRanking.id, {
      toolIds: currentRanking.toolIds.filter(id => id !== toolId)
    });
    toast({ title: 'Tool removed from ranking' });
  };

  const handleMoveUp = (index: number) => {
    if (!currentRanking || index === 0) return;
    const newIds = [...currentRanking.toolIds];
    [newIds[index - 1], newIds[index]] = [newIds[index], newIds[index - 1]];
    updateRanking(currentRanking.id, { toolIds: newIds });
  };

  const handleMoveDown = (index: number) => {
    if (!currentRanking || index === currentRanking.toolIds.length - 1) return;
    const newIds = [...currentRanking.toolIds];
    [newIds[index], newIds[index + 1]] = [newIds[index + 1], newIds[index]];
    updateRanking(currentRanking.id, { toolIds: newIds });
  };

  const availableTools = tools.filter(t => 
    !currentRanking?.toolIds.includes(t.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Rankings</h1>
        <p className="text-muted-foreground">Manage tool rankings</p>
      </div>

      <div className="flex gap-4">
        <Select value={selectedRanking} onValueChange={setSelectedRanking}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select ranking" />
          </SelectTrigger>
          <SelectContent>
            {rankings.map((r) => (
              <SelectItem key={r.id} value={r.id}>{r.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentRanking && (
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentRanking.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentRanking.toolIds.map((toolId, index) => {
                const tool = tools.find(t => t.id === toolId);
                if (!tool) return null;
                return (
                  <div key={toolId} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 group">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    {tool.logo ? (
                      <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded object-cover" />
                    ) : (
                      <div className={`w-8 h-8 rounded ${tool.iconBg || 'bg-muted'} flex items-center justify-center text-sm`}>
                        {tool.icon || '🔧'}
                      </div>
                    )}
                    <span className="flex-1 font-medium text-sm">{tool.name}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMoveUp(index)} disabled={index === 0}>
                        ↑
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleMoveDown(index)} disabled={index === currentRanking.toolIds.length - 1}>
                        ↓
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRemoveTool(toolId)}>
                        <X className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                );
              })}
              {currentRanking.toolIds.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No tools in this ranking</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {availableTools.map((tool) => (
                <div key={tool.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer" onClick={() => handleAddTool(tool.id)}>
                  {tool.logo ? (
                    <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded object-cover" />
                  ) : (
                    <div className={`w-8 h-8 rounded ${tool.iconBg || 'bg-muted'} flex items-center justify-center text-sm`}>
                      {tool.icon || '🔧'}
                    </div>
                  )}
                  <span className="flex-1 font-medium text-sm">{tool.name}</span>
                  <Plus className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
              {availableTools.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">All tools added</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
