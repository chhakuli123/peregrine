'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useApp } from '@/providers/AppProvider';
import {
  BarChart,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  FolderKanban,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button, Separator } from '@/components/ui';

import { SidebarItem } from './sidebar-item';

export const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);
  const { projects, currentProject, filteredTasks } = useApp();

  // Count tasks by status
  const todoCount = filteredTasks.filter(
    (task) => task.status === 'todo'
  ).length;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card/50 backdrop-blur-sm">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
            P
          </div>
          <h2 className="font-semibold">Peregrine</h2>
        </div>
      </div>

      <div className="px-3 py-2">
        <Button className="w-full gap-2">
          <Plus className="h-4 w-4" />
          New Project
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
          />
          <SidebarItem
            icon={CheckSquare}
            label="My Tasks"
            href="/board"
            active={pathname === '/board'}
            badge={todoCount}
          />
          <SidebarItem
            icon={Calendar}
            label="Calendar"
            href="/calendar"
            active={pathname === '/calendar'}
          />
          <SidebarItem
            icon={Clock}
            label="Timeline"
            href="/timeline"
            active={pathname === '/timeline'}
          />
          <SidebarItem
            icon={BarChart}
            label="Reports"
            href="/reports"
            active={pathname === '/reports'}
          />
        </div>

        <Separator className="my-4" />

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

        {expanded && (
          <div className="ml-2 space-y-1 border-l pl-2">
            {projects.map((project) => (
              <SidebarItem
                key={project.id}
                icon={FolderKanban}
                label={project.name}
                href={`/board?project=${project.id}`}
                active={currentProject.id === project.id}
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
        />
        <SidebarItem
          icon={Users}
          label="Team"
          href="/team"
          active={pathname === '/team'}
        />
      </div>
    </div>
  );
};
