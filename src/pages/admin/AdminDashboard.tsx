import { useState } from 'react';
import { useAdminData } from '@/contexts/AdminDataContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, FolderOpen, Trophy, Video, RotateCcw, Database, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function AdminDashboard() {
  const { tools, categories, rankings, contentItems, isLoading, seedDatabase, resetToDefaults, isDatabaseSeeded } = useAdminData();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleReset = () => {
    resetToDefaults();
    toast({ title: 'Local data reset to defaults' });
  };

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    try {
      await seedDatabase();
      toast({ title: 'Database seeded successfully', description: 'Default data has been added to the database.' });
    } catch (error) {
      toast({ title: 'Error seeding database', description: 'Failed to seed the database. Please try again.', variant: 'destructive' });
    } finally {
      setIsSeeding(false);
    }
  };

  const stats = [
    { label: 'Tools', value: tools.length, icon: Wrench, color: 'text-blue-500' },
    { label: 'Categories', value: categories.length, icon: FolderOpen, color: 'text-green-500' },
    { label: 'Rankings', value: rankings.length, icon: Trophy, color: 'text-amber-500' },
    { label: 'Content Items', value: contentItems.length, icon: Video, color: 'text-purple-500' },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your site data</p>
        </div>
        <Button variant="outline" onClick={handleReset} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset to Defaults
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Always show seed database card */}
      <Card className={isDatabaseSeeded ? "border-border" : "border-dashed border-2 border-primary/50"}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {isDatabaseSeeded ? 'Reseed Database' : 'Seed Database'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {isDatabaseSeeded 
              ? 'Your database has data. Click below to reseed with fresh sample data (this will add more data, not replace existing).'
              : 'Your database appears to be empty. Click the button below to populate it with default sample data.'}
          </p>
          <Button onClick={handleSeedDatabase} disabled={isSeeding} className="gap-2">
            {isSeeding ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Seeding...
              </>
            ) : (
              <>
                <Database className="h-4 w-4" />
                {isDatabaseSeeded ? 'Reseed Database' : 'Seed Database with Sample Data'}
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Data is stored in Supabase. Changes will persist across sessions and devices.
          </p>
          <p className="text-sm text-muted-foreground">
            Only users with admin role can modify data.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
