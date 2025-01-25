"use client";

import React, { useState } from "react";
import {
  Priority,
  Project,
  Task,
  useGetProjectsQuery,
  useGetTasksQuery,
} from "@/state/api";
import { useAppSelector } from "../redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/components/Header";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Status } from "@/state/api";

import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import ModalNewProject from "../projects/ModalNewProject";
const allStatuses = [
  Status.ToDo,
  Status.WorkInProgress,
  Status.UnderReview,
  Status.Completed,
];
const taskColumns: GridColDef[] = [
  { field: "title", headerName: "Title", width: 200 },
  { field: "status", headerName: "Status", width: 150 },
  { field: "priority", headerName: "Priority", width: 150 },
  { field: "dueDate", headerName: "Due Date", width: 150 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const HomePage = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery();
  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useGetTasksQuery(
    selectedProjectId !== null
      ? { projectId: selectedProjectId }
      : { projectId: 0 } // Default to 0 if no project selected
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isProjectsLoading || tasksLoading) return <div>Loading...</div>;
  if (isProjectsError || !projects) return <div>Error fetching projects</div>;
  if (tasksError || !tasks) return <div>Error fetching tasks</div>;

  // Handle Task Priority Distribution
  const priorityCount = tasks.reduce(
    (acc: Record<string, number>, task: Task) => {
      const { priority } = task;
      acc[priority as Priority] = (acc[priority as Priority] || 0) + 1;
      return acc;
    },
    {}
  );

  const taskDistribution = Object.keys(priorityCount).map((key) => ({
    name: key,
    count: priorityCount[key],
  }));

  const projectStatus = allStatuses.map((status) => ({
    name: status, // Use the status name from the enum
    count: tasks.filter((task) => task.status === status).length,
  }));

  // Convert the status object to an array and sort it alphabetically by name
  const sortedProjectStatus = Object.keys(projectStatus)
    .map((status) => ({
      name: status,
      count: projectStatus[status],
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const chartColors = isDarkMode
    ? {
        bar: "#8884d8",
        barGrid: "#303030",
        pieFill: "#4A90E2",
        text: "#FFFFFF",
      }
    : {
        bar: "#8884d8",
        barGrid: "#E0E0E0",
        pieFill: "#82ca9d",
        text: "#000000",
      };

  return (
    <div className="container h-full w-[100%] bg-gray-100 bg-transparent p-8">
      {/* Create Project Modal */}
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <Header name="Project Management Dashboard" />
        <button
          className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
          onClick={() => setIsModalNewProjectOpen(true)}
        >
          Create Project
        </button>
      </div>

      {/* Project Selector */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2 dark:text-white">
          Select a Project:
        </label>
        <select
          value={selectedProjectId || ""}
          onChange={(e) =>
            setSelectedProjectId(
              e.target.value ? parseInt(e.target.value) : null
            )
          }
          className="w-full p-2 border rounded dark:bg-dark-secondary dark:border-dark-tertiary dark:text-white"
        >
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Charts and Data */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Task Priority Distribution */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Task Priority Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={taskDistribution}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="name" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Project Status
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="count"
                data={projectStatus}
                fill="#82ca9d"
                label={(entry) => `${entry.name}: ${entry.count}`}
              >
                {projectStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Task Data Grid */}
        <div className="rounded-lg bg-white p-4 shadow dark:bg-dark-secondary md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold dark:text-white">
            Your Tasks
          </h3>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={tasks}
              columns={taskColumns}
              checkboxSelection
              loading={tasksLoading}
              getRowClassName={() => "data-grid-row"}
              getCellClassName={() => "data-grid-cell"}
              className={dataGridClassNames}
              sx={dataGridSxStyles(isDarkMode)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
