import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-lg dark:bg-dark-secondary dark:text-gray-100">
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-4">
          <strong className="block text-lg font-semibold mb-2">
            Attachments:
          </strong>
          <div className="flex flex-wrap gap-3">
            {task.attachments && task.attachments.length > 0 && (
              <Image
                src={`/${task.attachments[0].fileURL}`}
                alt={task.attachments[0].fileName}
                width={400}
                height={200}
                className="rounded-md border border-gray-200 dark:border-gray-700"
              />
            )}
          </div>
        </div>
      )}
      <div className="space-y-2">
        <p>
          <strong className="text-gray-600 dark:text-gray-400">ID:</strong>{" "}
          <span className="font-medium">{task.id}</span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">Title:</strong>{" "}
          <span className="font-medium">{task.title}</span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">
            Description:
          </strong>{" "}
          <span>{task.description || "No description provided"}</span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">Status:</strong>{" "}
          <span className="px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
            {task.status}
          </span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">
            Priority:
          </strong>{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              task.priority === "High"
                ? "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                  : "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
            }`}
          >
            {task.priority}
          </span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">Tags:</strong>{" "}
          <span className="italic">{task.tags || "No tags"}</span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">
            Start Date:
          </strong>{" "}
          <span className="font-medium">
            {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
          </span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">
            Due Date:
          </strong>{" "}
          <span className="font-medium">
            {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
          </span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">Author:</strong>{" "}
          <span className="font-medium">
            {task.author ? task.author.username : "Unknown"}
          </span>
        </p>
        <p>
          <strong className="text-gray-600 dark:text-gray-400">
            Assignee:
          </strong>{" "}
          <span className="font-medium">
            {task.assignee ? task.assignee.username : "Unassigned"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
