export type Priority = "low" | "medium" | "high"
export type Status = "todo" | "in-progress" | "completed"

export interface Task {
  id: string
  title: string
  description: string
  deadline: string
  priority: Priority
  status: Status
  projectId: string
  assignee?: string
  createdAt: string
}

export interface Project {
  id: string
  name: string
  description: string
  color: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  avatar: string
  email: string
}
