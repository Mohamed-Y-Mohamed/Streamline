import Modal from "@/components/Modal";
import { useCreateProjectMutation } from "@/state/api";
import React, { useState } from "react";
import { formatISO } from "date-fns";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    try {
      const formattedStartDate = formatISO(new Date(startDate), {
        representation: "complete",
      });
      const formattedEndDate = formatISO(new Date(endDate), {
        representation: "complete",
      });

      await createProject({
        name: projectName,
        description,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
      });

      // Clear fields and close modal on success
      setProjectName("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      setErrorMessage("");
      onClose();
    } catch (error) {
      setErrorMessage("Failed to create project. Please try again.");
      console.error(error);
    }
  };

  const isFormValid = () => {
    if (!projectName || !description || !startDate || !endDate) {
      return false;
    }
    // Ensure startDate is before endDate
    if (new Date(startDate) > new Date(endDate)) {
      setErrorMessage("Start date cannot be after the end date.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const inputStyles =
    "w-full rounded border border-gray-300 p-2 shadow-sm bg-[#ffffff] text-black dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          aria-label="Project Name"
          aria-required="true"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          aria-label="Description"
          aria-required="true"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            aria-label="Start Date"
            aria-required="true"
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            aria-label="End Date"
            aria-required="true"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}
        <button
          type="submit"
          className={`focus-offset-2 mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
