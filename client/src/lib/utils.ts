export const dataGridClassNames =
  "border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200";

export const dataGridSxStyles = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-root": {
            color: isDarkMode ? "#FFFFFF" : "#000000", // Text color based on mode
    },
    "& .MuiDataGrid-columnHeaders": {
      color: isDarkMode ? "#e5e7eb" : "#000000", // Header text color
      
      '& [role="row"] > *': {
        backgroundColor: isDarkMode ? "#1d1f21" : "#FFFFFF", // Header background color
        borderColor: isDarkMode ? "#2d3135" : "#e5e7eb", // Header border color
      },
    },
    "& .MuiDataGrid-sortIcon": {
      color: isDarkMode ? "#FFFFFF" : "#000000", // Sort icon color
    },
    "& .MuiIconButton-root": {
            color: isDarkMode ? "#FFFFFF" : "#000000", // Text color based on mode
    },
    "& .MuiTablePagination-root": {
      color: isDarkMode ? "#a3a3a3" : "#000000", // Pagination text color
    },
    "& .MuiTablePagination-selectIcon": {
      color: isDarkMode ? "#a3a3a3" : "#000000", // Pagination dropdown arrow color
    },
    "& .MuiDataGrid-cell": {
      color: isDarkMode ? "#FFFFFF" : "#000000", // Cell text color
      border: "none", // Remove cell borders
    },
    "& .MuiDataGrid-row": {
      borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`, // Row border color
    },
    "& .MuiDataGrid-withBorderColor": {
      borderColor: isDarkMode ? "#2d3135" : "#e5e7eb", // General border color
    },
  };
};
