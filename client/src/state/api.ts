import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}

export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  googleId?: string;
  teamId?: number;
  termsAccepted?: boolean;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedById: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}

export interface SearchResults {
  tasks?: Task[];
  projects?: Project[];
  users?: User[];
}

export interface Team {
  teamId: number;
  teamName: string;
  productOwnerUserId?: number;
  projectManagerUserId?: number;
}

// Adjusted response types to match what the backend actually returns
interface AuthResponse {
  message: string;
  user: User;
}

interface RegisterResponse {
  message: string;
  user: User;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include', // ensure cookies are included
  }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks", "Users"],

  endpoints: (build) => ({
    // Fetch Projects
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    // Create a New Project
    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "projects",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["Projects"],
    }),

    // Fetch Tasks by Project ID
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : ["Tasks" as const],
    }),

    // Create a New Task
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),

    // Update Task Status
    updateTaskStatus: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: "Tasks", id: taskId }],
    }),

    // User Registration
    registerUser: build.mutation<RegisterResponse, Partial<User>>({
      query: (user) => ({
        url: "auth/register",
        method: "POST",
        body: user,
      }),
    }),

    // Google Sign-In
    googleSignIn: build.mutation<AuthResponse, { idToken: string }>({
      query: (payload) => ({
        url: "auth/google-signin",
        method: "POST",
        body: payload,
      }),
    }),

    // Regular Sign-In
    signIn: build.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: "auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),

    // Search for Projects, Tasks, or Users
    search: build.query<SearchResults, string>({
      query: (query) => `search?query=${query}`,
    }),
    signOut: build.mutation<{ message: string }, void>({
  query: () => ({
    url: "auth/signout",
    method: "POST",
  }),
}),

getUserDetails: build.query<User, void>({
  query: () => "auth/user",
}),


  }),
  
});

// Export Hooks for Components
export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useRegisterUserMutation,
  useGoogleSignInMutation,
  useSignInMutation,
  useSignOutMutation, 
    useGetUserDetailsQuery, 

} = api;