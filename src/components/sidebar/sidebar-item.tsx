import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from '../ui';


interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  collapsed?: boolean;
}

export function SidebarItem({
  icon: Icon,
  label,
  href,
  active,
  badge,
  onClick,
  collapsed,
}: SidebarItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start gap-3 px-3',
        active && 'bg-primary/10 text-primary',
        collapsed && 'justify-center px-2'
      )}
      onClick={onClick}
      asChild={!onClick}
    >
      {onClick ? (
        <div className="flex cursor-pointer items-center">
          <Icon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">{label}</span>}
          {!collapsed && badge !== undefined && (
            <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </div>
      ) : (
        <Link href={href} className="flex items-center">
          <Icon className="h-5 w-5" />
          {!collapsed && <span className="ml-3">{label}</span>}
          {!collapsed && badge !== undefined && (
            <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
              {badge}
            </span>
          )}
        </Link>
      )}
    </Button>
  );
}