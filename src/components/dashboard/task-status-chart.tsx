'use client';

import { ResponsivePie } from '@nivo/pie';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';

interface TaskStatusChartProps {
  todoCount: number;
  inProgressCount: number;
  completedCount: number;
  totalTasks: number;
}

export default function TaskStatusChart({
  todoCount,
  inProgressCount,
  completedCount,
  totalTasks,
}: TaskStatusChartProps) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Tasks by Status</CardTitle>
        <CardDescription>
          Distribution of tasks by their current status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsivePie
            data={[
              {
                id: 'To Do',
                label: 'To Do',
                value: todoCount,
                color: '#3b82f6',
              },
              {
                id: 'In Progress',
                label: 'In Progress',
                value: inProgressCount,
                color: '#f59e0b',
              },
              {
                id: 'Completed',
                label: 'Completed',
                value: completedCount,
                color: '#10b981',
              },
            ]}
            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
            innerRadius={0.6}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            colors={({ data }) => data.color}
            borderWidth={1}
            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsTextColor="#f8fafc"
            arcLinkLabelsThickness={2}
            arcLinkLabelsColor={{ from: 'color' }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#ffffff"
            arcLabelsRadiusOffset={0.6}
            motionConfig="gentle"
            transitionMode="startAngle"
            arcLinkLabel={(d) =>
              `${d.id}: ${d.value} (${Math.round((d.value / totalTasks) * 100)}%)`
            }
            theme={{
              text: {
                fill: '#f8fafc',
                fontSize: 12,
                fontWeight: 500,
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
            defs={[
              {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              { match: { id: 'To Do' }, id: 'dots' },
              { match: { id: 'In Progress' }, id: 'lines' },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  );
}