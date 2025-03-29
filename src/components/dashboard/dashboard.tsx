'use client';

import Link from 'next/link';
import { useApp } from '@/providers/AppProvider';
import { ResponsiveBar } from '@nivo/bar';
import { CalendarClock } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';
import TaskMetrics from './task-metrix';
import TaskStatusChart from './task-status-chart';

export default function Dashboard() {
  const { filteredTasks, upcomingDeadlines } = useApp();

  // Count tasks by status
  const todoCount = filteredTasks.filter(
    (task) => task.status === 'todo'
  ).length;
  const inProgressCount = filteredTasks.filter(
    (task) => task.status === 'in-progress'
  ).length;
  const completedCount = filteredTasks.filter(
    (task) => task.status === 'completed'
  ).length;

  // Count tasks by priority
  const lowPriorityCount = filteredTasks.filter(
    (task) => task.priority === 'low'
  ).length;
  const mediumPriorityCount = filteredTasks.filter(
    (task) => task.priority === 'medium'
  ).length;
  const highPriorityCount = filteredTasks.filter(
    (task) => task.priority === 'high'
  ).length;

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Tasks</CardTitle>
            <CardDescription>All tasks in current project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{filteredTasks.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Completion Rate</CardTitle>
            <CardDescription>Tasks completed vs total</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {filteredTasks.length > 0
                ? `${Math.round((completedCount / filteredTasks.length) * 100)}%`
                : '0%'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>High Priority</CardTitle>
            <CardDescription>Tasks with high priority</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{highPriorityCount}</div>
          </CardContent>
        </Card>
      </div>
      {upcomingDeadlines.length > 0 && (
        <Alert className="border-amber-500/50 bg-amber-500/10 text-amber-500">
          <CalendarClock className="h-5 w-5" />
          <AlertTitle>Upcoming Deadlines</AlertTitle>
          <AlertDescription>
            You have {upcomingDeadlines.length} task
            {upcomingDeadlines.length > 1 ? 's' : ''} due in the next 7 days.
            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                className="border-amber-500/50 text-amber-500"
                asChild
              >
                <Link href="/calendar">View Calendar</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TaskStatusChart
          todoCount={todoCount}
          inProgressCount={inProgressCount}
          completedCount={completedCount}
          totalTasks={filteredTasks.length}
        />

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
            <CardDescription>
              Distribution of tasks by priority level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveBar
                data={[
                  {
                    priority: 'Low',
                    value: lowPriorityCount,
                    color: '#10b981',
                  },
                  {
                    priority: 'Medium',
                    value: mediumPriorityCount,
                    color: '#f59e0b',
                  },
                  {
                    priority: 'High',
                    value: highPriorityCount,
                    color: '#ef4444',
                  },
                ]}
                keys={['value']}
                indexBy="priority"
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ data }) => data.color}
                borderRadius={4}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Priority',
                  legendPosition: 'middle',
                  legendOffset: 32,
                }}
                axisLeft={{
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: 'Count',
                  legendPosition: 'middle',
                  legendOffset: -40,
                }}
                enableLabel={true}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#ffffff"
                labelFormat={(value) => `${value} tasks`}
                motionConfig="gentle"
                animate={true}
                theme={{
                  axis: {
                    ticks: {
                      text: {
                        fill: '#f8fafc',
                      },
                    },
                    legend: {
                      text: {
                        fill: '#f8fafc',
                        fontSize: 12,
                        fontWeight: 500,
                      },
                    },
                  },
                  grid: {
                    line: {
                      stroke: '#334155',
                      strokeWidth: 1,
                      strokeDasharray: '4 4',
                    },
                  },
                  tooltip: {
                    container: {
                      background: '#1e293b',
                      color: '#f8fafc',
                      fontSize: '14px',
                      borderRadius: '4px',
                      boxShadow:
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      padding: '12px 16px',
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <TaskMetrics />
    </div>
  );
}
