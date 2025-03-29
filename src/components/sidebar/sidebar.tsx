'use client';

import type React from 'react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  BarChart,
  Calendar,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from 'lucide-react';

import type { Project } from 'types/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useApp } from '@/providers/AppProvider';
import { SidebarItem } from './sidebar-item';
import { AddProjectDialog } from './add-project-dialog';


export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(true);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { projects, currentProject, setCurrentProject, tasks } = useApp();

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-collapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  // Save sidebar state to localStorage
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebar-collapsed', String(newState));
  };

  // Count tasks by status for the current project
  const todoCount = tasks.filter(
    (task) => task.projectId === currentProject.id && task.status === 'todo'
  ).length;

  // Handle project click - properly update the current project
  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    // Navigate to board page to show the project tasks
    router.push('/dashboard');
  };

  return (
    <div
      className={cn(
        'relative flex h-full flex-col border-r bg-card/50 backdrop-blur-sm transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div
        className={cn(
          'flex items-center p-4',
          collapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
              P
            </div>
            <h2 className="font-semibold">ProjectMaster</h2>
          </div>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
            P
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-2 top-6 h-6 w-6 rounded-full border bg-background shadow-md"
          onClick={toggleSidebar}
        >
          {collapsed ? (
            <ChevronRight className="h-3 w-3" />
          ) : (
            <ChevronLeft className="h-3 w-3" />
          )}
        </Button>
      </div>

      <div className={cn('px-3 py-2', collapsed && 'px-2')}>
        <Button
          className={cn(
            'w-full gap-2',
            collapsed ? 'justify-center px-2' : 'justify-start'
          )}
          onClick={() => setIsAddProjectOpen(true)}
        >
          <Plus className="h-4 w-4" />
          {!collapsed && 'New Project'}
        </Button>
      </div>

      <Separator className="my-2" />

      <div className="flex-1 overflow-auto px-3 py-2">
        <div className="space-y-1">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            href="/dashboard"
            active={pathname === '/dashboard'}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={CheckSquare}
            label="My Tasks"
            href="/board"
            active={pathname === '/board'}
            badge={todoCount}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            href="/calendar"
            active={pathname === '/calendar'}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={Clock}
            label="Timeline"
            href="/timeline"
            active={pathname === '/timeline'}
            collapsed={collapsed}
          />
          <SidebarItem
            icon={BarChart}
            label="Reports"
            href="/reports"
            active={pathname === '/reports'}
            collapsed={collapsed}
          />
        </div>

        <Separator className="my-4" />

        {!collapsed && (
          <div className="mb-2">
            <Button
              variant="ghost"
              className="w-full justify-between px-3 py-2 text-muted-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              <span>Projects</span>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  expanded && 'rotate-180'
                )}
              />
            </Button>
          </div>
        )}

        {collapsed && (
          <div className="mb-2 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
              onClick={() => setExpanded(!expanded)}
            >
              <FolderKanban className="h-5 w-5" />
            </Button>
          </div>
        )}

        {expanded && (
          <div
            className={cn(
              'space-y-1',
              !collapsed ? 'ml-2 border-l pl-2' : 'flex flex-col items-center'
            )}
          >
            {projects.map((project) => (
              <SidebarItem
                key={project.id}
                icon={FolderKanban}
                label={project.name}
                href="#"
                active={currentProject.id === project.id}
                onClick={() => handleProjectClick(project)}
                collapsed={collapsed}
              />
            ))}
          </div>
        )}
      </div>

      <div className="border-t p-3">
        <SidebarItem
          icon={Settings}
          label="Settings"
          href="/settings"
          active={pathname === '/settings'}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={Users}
          label="Team"
          href="/team"
          active={pathname === '/team'}
          collapsed={collapsed}
        />
      </div>

      <AddProjectDialog
        open={isAddProjectOpen}
        onOpenChange={setIsAddProjectOpen}
      />
    </div>
  );
}
