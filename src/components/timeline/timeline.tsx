'use client';

import { compareAsc, format, parseISO } from 'date-fns';
import { CalendarClock, CheckCircle2, Circle, Clock } from 'lucide-react';

import { useApp } from '@/providers/AppProvider';
import { Card, CardContent, CardHeader, CardTitle } from '../ui';

export default function Timeline() {
  const { filteredTasks } = useApp();

  // Sort tasks by deadline
  const sortedTasks = [...filteredTasks].sort((a, b) =>
    compareAsc(parseISO(a.deadline), parseISO(b.deadline))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <Circle className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Timeline</h1>

      <Card>
        <CardHeader>
          <CardTitle>Project Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Centered vertical line behind icons */}
            <div className="absolute bottom-0 left-5 top-0 w-px bg-border"></div>

            <div className="space-y-8">
              {sortedTasks.map((task) => (
                <div key={task.id} className="flex gap-4">
                  <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    {/* Icon container with absolute positioning for centering on the line */}
                    <div className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <CalendarClock className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="text-sm text-muted-foreground">
                        {format(parseISO(task.deadline), 'MMMM d, yyyy')}
                      </span>
                    </div>

                    <div className="rounded-lg border bg-card p-4 shadow-sm">
                      <h3 className="font-medium">{task.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}