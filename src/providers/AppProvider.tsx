'use client';

import type React from 'react';
import { createContext, useContext, useState } from 'react';
import type { Project, Task } from 'types/types';

import { initialProjects, initialTasks } from '../services/mockData';

type AppContextType = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  currentProject: Project;
  setCurrentProject: (project: Project) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredTasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [currentProject, setCurrentProject] = useState<Project>(
    initialProjects[0]
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Filter tasks based on search query and current project
  const filteredTasks = tasks.filter(
    (task) =>
      task.projectId === currentProject.id &&
      (searchQuery === '' ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Add a new task
  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      projectId: currentProject.id,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Update a task
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Add a new project
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: `project-${Date.now()}`,
    };
    setProjects((prev) => [...prev, newProject]);
    setCurrentProject(newProject);
  };

  return (
    <AppContext.Provider
      value={{
        tasks,
        setTasks,
        projects,
        setProjects,
        currentProject,
        setCurrentProject,
        searchQuery,
        setSearchQuery,
        filteredTasks,
        addTask,
        updateTask,
        deleteTask,
        addProject,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
