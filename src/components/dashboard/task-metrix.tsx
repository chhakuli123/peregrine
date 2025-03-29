'use client';

import { ResponsiveLine } from '@nivo/line';
import { format, subDays } from 'date-fns';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui';

export default function TaskMetrics() {
  // Generate data for task completion over time
  const today = new Date();
  const taskCompletionData = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const formattedDate = format(date, 'MMM dd');
    return {
      x: formattedDate,
      y: Math.floor(Math.sin(i * 0.5) * 3 + 5), // Random data for demo
    };
  });

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Task Completion Trend</CardTitle>
          <CardDescription>Number of tasks completed over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveLine
              data={[
                {
                  id: 'Task Completion',
                  color: '#3b82f6',
                  data: taskCompletionData,
                },
              ]}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: 'point' }}
              yScale={{
                type: 'linear',
                min: 0,
                max: 'auto',
                stacked: false,
                reverse: false,
              }}
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Date',
                legendOffset: 36,
                legendPosition: 'middle',
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Tasks Completed',
                legendOffset: -40,
                legendPosition: 'middle',
              }}
              enableGridX={false}
              colors={['#3b82f6']}
              lineWidth={3}
              pointSize={10}
              pointColor="#ffffff"
              pointBorderWidth={2}
              pointBorderColor="#3b82f6"
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.15}
              useMesh={true}
              enableSlices="x"
              crosshairType="cross"
              motionConfig="gentle"
              legends={[
                {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemBackground: 'rgba(0, 0, 0, .03)',
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
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
                crosshair: {
                  line: {
                    stroke: '#f8fafc',
                    strokeWidth: 1,
                    strokeOpacity: 0.35,
                  },
                },
                legends: {
                  text: {
                    fill: '#f8fafc',
                  },
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
