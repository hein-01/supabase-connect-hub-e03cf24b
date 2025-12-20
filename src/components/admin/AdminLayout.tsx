import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminDataProvider } from '@/contexts/AdminDataContext';

export function AdminLayout() {
  return (
    <AdminDataProvider>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </AdminDataProvider>
  );
}
