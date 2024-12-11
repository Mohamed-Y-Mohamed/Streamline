import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
  showProjects: boolean;
  showPriority: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
  isDarkMode: false,
  showProjects: true,
  showPriority: true,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
      setShowProjects: (state, action: PayloadAction<boolean>) => {
      state.showProjects = action.payload;
    },
    setShowPriority: (state, action: PayloadAction<boolean>) => {
      state.showPriority = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkMode, setShowProjects, setShowPriority } =  globalSlice.actions;
export default globalSlice.reducer;