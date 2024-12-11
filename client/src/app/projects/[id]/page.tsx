"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProjectHeader from "../ProjectHeader";
import Board from "@/app/projects/BoardView";

const Project = () => {
  // Fetch the route parameters using useParams
  const params = useParams<{ id: string }>();

  if (!params || !params.id) {
    return <div>Error: Project ID is missing</div>; // Handle missing ID
  }

  const projectId = params.id; // Get the project ID

  const [activeTab, setActiveTab] = React.useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = React.useState(false);

  return (
    <div className="px-4 xl:px-6">
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "Board" && (
          <Board id={projectId} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
        )}
        {/* Add more tab-based conditional rendering as needed */}
      </div>
    </div>
  );
};

export default Project;
