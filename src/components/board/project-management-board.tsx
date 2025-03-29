'use client';

import { useEffect, useState } from 'react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import type { Status, Task } from 'types/types';
import { Button } from '../ui';
import { useApp } from '@/providers/AppProvider';
import { TaskColumn } from './task-column';
import { EditTaskDialog } from './edit-task-dialog';
import { AddTaskDialog } from './add-task-dialog';


export default function ProjectManagementBoard() {
  const {
    filteredTasks,
    setTasks,
    addTask,
    updateTask,
    deleteTask,
    currentProject,
  } = useApp();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const todoTasks = filteredTasks.filter((task) => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === 'in-progress'
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === 'completed'
  );

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    const activeTask = filteredTasks.find((task) => task.id === activeId);

    if (!activeTask) return;

    // Check if we're dragging over a column
    if (overId.startsWith('column-')) {
      const newStatus = overId.replace('column-', '') as Status;

      // Only update if the status is different
      if (activeTask.status !== newStatus) {
        updateTask(activeId, { status: newStatus });
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    const activeTask = filteredTasks.find((task) => task.id === activeId);

    if (!activeTask) return;

    // Check if we're dragging over a column
    if (overId.startsWith('column-')) {
      const newStatus = overId.replace('column-', '') as Status;

      // Only update if the status is different
      if (activeTask.status !== newStatus) {
        updateTask(activeId, { status: newStatus });
      }
      return;
    }

    // Handle reordering within the same column
    if (activeId !== overId) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === activeId);
        const newIndex = tasks.findIndex((task) => task.id === overId);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  useEffect(() => {
    // This will update the filtered tasks when the current project changes
    console.log('Current project changed:', currentProject.name);
  }, [currentProject]);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <Button
          onClick={() => setIsAddTaskOpen(true)}
          className="rounded-full shadow-lg transition-all hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          Add Task
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid h-full grid-cols-1 gap-6 md:grid-cols-3">
          <TaskColumn
            id="column-todo"
            title="To Do"
            count={todoTasks.length}
            tasks={todoTasks}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            activeId={activeId}
          />

          <TaskColumn
            id="column-in-progress"
            title="In Progress"
            count={inProgressTasks.length}
            tasks={inProgressTasks}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            activeId={activeId}
          />

          <TaskColumn
            id="column-completed"
            title="Completed"
            count={completedTasks.length}
            tasks={completedTasks}
            onEditTask={handleEditTask}
            onDeleteTask={deleteTask}
            activeId={activeId}
          />
        </div>
      </DndContext>

      <AddTaskDialog
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
        onAddTask={addTask}
      />

      {editingTask && (
        <EditTaskDialog
          open={!!editingTask}
          onOpenChange={(open) => !open && setEditingTask(null)}
          task={editingTask}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
        />
      )}
    </div>
  );
}
