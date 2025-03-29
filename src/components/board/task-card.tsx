'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';
import { format } from 'date-fns';
import { Calendar, Edit, MoreVertical, Trash2 } from 'lucide-react';

import type { Task } from 'types/types';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui';

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  isActive: boolean;
}

const priorityVariants = cva(
  'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
  {
    variants: {
      priority: {
        low: 'bg-green-500/10 text-green-500 border border-green-500/20',
        medium: 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20',
        high: 'bg-red-500/10 text-red-500 border border-red-500/20',
      },
    },
    defaultVariants: {
      priority: 'medium',
    },
  }
);

export function TaskCard({ task, onEdit, onDelete, isActive }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityLabel = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  // Format the deadline date
  const formattedDate = format(new Date(task.deadline), 'MMM d, yyyy');

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'task-card cursor-grab rounded-lg border border-border/50 bg-card p-4 shadow-sm transition-all duration-200',
        'hover:border-border hover:shadow-md',
        'active:cursor-grabbing',
        'backdrop-blur-sm',
        isDragging && 'rotate-2 opacity-50 shadow-md',
        isActive && 'ring-2 ring-primary'
      )}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h4 className="text-sm font-medium">{task.title}</h4>
          <div className="flex items-center gap-2">
            <span className={priorityVariants({ priority: task.priority })}>
              {priorityLabel[task.priority]}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="line-clamp-2 text-xs text-muted-foreground">
          {task.description}
        </p>

        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
