"use client";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import {
  setIsSidebarCollapsed,
  setShowProjects,
  setShowPriority,
} from "@/state";
import {
  X,
  LucideIcon,
  Home,
  Briefcase,
  Search,
  Settings,
  User,
  Users,
  ChevronUp,
  ChevronDown,
  AlertCircle,
  ShieldAlert,
  AlertTriangle,
  AlertOctagon,
  Layers3,
  CircleGauge,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { useGetProjectsQuery } from "@/state/api";
import Dashboard from "@/app/root/Dashboard/page";
const Sidebar = () => {
  // Redux selectors and dispatch
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );
  const showProjects = useAppSelector((state) => state.global.showProjects);
  const showPriority = useAppSelector((state) => state.global.showPriority);

  // Fetch projects data
  const { data: projects, error, isLoading } = useGetProjectsQuery();
  console.log("Projects:", projects);
  console.log("Error:", error);
  console.log("Loading:", isLoading);

  // Sidebar class names
  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO AND NAME */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="flex items-center">
            <Image
              src="/assets/file.png"
              alt="Logo"
              width={40}
              height={40}
              className="transition-all duration-300"
            />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-xl font-bold text-gray-800 dark:text-white">
                Streamline
              </span>
            )}
          </div>
          {!isSidebarCollapsed && (
            <button
              className="py-3"
              onClick={() => {
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
              }}
            >
              <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>

        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink icon={Home} label="Home" href="/" />
          <SidebarLink
            icon={CircleGauge}
            label="Dashboard"
            href="/root/Dashboard"
          />

          <SidebarLink
            icon={Briefcase}
            label="Timeline"
            href="/root/timeline"
          />
          <SidebarLink icon={Search} label="Search" href="/root/search" />
          <SidebarLink icon={Settings} label="Settings" href="/root/settings" />
          <SidebarLink icon={User} label="Users" href="/root/users" />
          <SidebarLink icon={Users} label="Teams" href="/root/teams" />
        </nav>

        {/* PROJECTS LINKS */}
        <button
          onClick={() => dispatch(setShowProjects(!showProjects))}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/root/projects/${project.id}`}
            />
          ))}

        {/* PRIORITIES LINKS */}
        <button
          onClick={() => dispatch(setShowPriority(!showPriority))}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span>Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
            />
            <SidebarLink icon={AlertOctagon} label="Low" href="/priority/low" />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
            />
          </>
        )}
      </div>
    </div>
  );
};

// Sidebar Link Component
interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors
           hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
             isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
           } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className={`font-medium text-gray-800 dark:text-gray-100`}>
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Sidebar;
