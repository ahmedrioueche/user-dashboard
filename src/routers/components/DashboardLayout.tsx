"use client";

import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-light-background dark:bg-dark-background">
        {/* Navbar */}
        <Navbar />
        
        <div className="flex">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <MainContent />
        </div>
      </div>
    </SidebarProvider>
  );
}

function MainContent() {
  const { isOpen } = useSidebar();

  return (
    <main className={`
      flex-1 transition-all duration-300 
      ${isOpen ? 'ml-0 lg:ml-64' : 'ml-0'}
      pt-16
    `}>
      <div className="p-4 md:p-6">
        <Outlet />
      </div>
    </main>
  );
}