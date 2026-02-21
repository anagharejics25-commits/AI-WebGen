import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Home',
    path: '/',
    element: <Home />
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    element: (
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    )
  },
  {
    name: 'Projects',
    path: '/projects',
    element: (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center gap-6 glass p-16 rounded-[3rem] border-primary/20">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary text-4xl">🗂️</div>
          <h2 className="text-4xl font-bold tracking-tight">Project History</h2>
          <p className="text-xl text-muted-foreground max-w-md">Your previously generated websites will appear here once saved. Start building today!</p>
        </div>
      </DashboardLayout>
    )
  },
  {
    name: 'Settings',
    path: '/settings',
    element: (
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    )
  },
  {
    name: 'Not Found',
    path: '*',
    element: <Navigate to="/" replace />
  }
];

export default routes;


