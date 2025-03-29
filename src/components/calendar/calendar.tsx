'use client';

import { useState } from 'react';
import { useApp } from '@/providers/AppProvider';
import { cva } from 'class-variance-authority';
import { format } from 'date-fns';
import type { Task } from 'types/types';

import { cn } from '@/lib/utils';
import {
  Calendar as CalendarComponent,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../ui';

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

export default function Calendar() {
  const { filteredTasks } = useApp();
  const [date, setDate] = useState<Date | undefined>(new Date());

  // Group tasks by date
  const tasksByDate: Record<string, Task[]> = {};

  filteredTasks.forEach((task) => {
    const dateKey = task.deadline;
    if (!tasksByDate[dateKey]) {
      tasksByDate[dateKey] = [];
    }
    tasksByDate[dateKey].push(task);
  });

  // Get tasks for selected date
  const selectedDateKey = date ? format(date, 'yyyy-MM-dd') : '';
  const tasksForSelectedDate = tasksByDate[selectedDateKey] || [];

  const priorityLabel = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Calendar</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                booked: Object.keys(tasksByDate).map((date) => new Date(date)),
              }}
              modifiersStyles={{
                booked: {
                  fontWeight: 'bold',
                  backgroundColor: 'hsl(var(--primary) / 0.1)',
                  color: 'hsl(var(--primary))',
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>
              {date ? format(date, 'MMMM d, yyyy') : 'No Date Selected'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tasksForSelectedDate.length > 0 ? (
              <div className="space-y-4">
                {tasksForSelectedDate.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col rounded-lg border bg-card/50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium">{task.title}</h3>
                      <span
                        className={priorityVariants({
                          priority: task.priority,
                        })}
                      >
                        {priorityLabel[task.priority]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Status:{' '}
                        <span
                          className={cn(
                            'capitalize',
                            task.status === 'completed' && 'text-green-500',
                            task.status === 'in-progress' && 'text-yellow-500',
                            task.status === 'todo' && 'text-blue-500'
                          )}
                        >
                          {task.status.replace('-', ' ')}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground">
                  No tasks scheduled for this date.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
