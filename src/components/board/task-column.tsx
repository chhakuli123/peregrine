'use client';

import { useDroppable } from '@dnd-kit/core';

import type { Task } from 'types/types';
import { TaskCard } from './task-card';

interface TaskColumnProps {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  activeId: string | null;
}

export function TaskColumn({
  id,
  title,
  count,
  tasks,
  onEditTask,
  onDeleteTask,
  activeId,
}: TaskColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full flex-col rounded-xl border bg-muted/30 backdrop-blur-sm ${
        isOver ? 'border-2 border-primary' : 'border-border/50'
      } shadow-sm transition-all duration-200`}
    >
      <div className="border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">{title}</h3>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
            {count}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
              onDelete={() => onDeleteTask(task.id)}
              isActive={activeId === task.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
