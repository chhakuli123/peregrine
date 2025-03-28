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
}

export const SidebarItem = ({
  icon: Icon,
  label,
  href,
  active,
  badge,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'w-full justify-start gap-3 px-3',
        active && 'bg-primary/10 text-primary'
      )}
      asChild
    >
      <Link href={href}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
        {badge !== undefined && (
          <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary/10 px-1.5 text-xs font-medium text-primary">
            {badge}
          </span>
        )}
      </Link>
    </Button>
  );
};
