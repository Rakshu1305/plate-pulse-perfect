
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import AppSidebar from './AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserMenu } from './UserMenu';

const Layout = () => {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold text-gray-800">Restaurant Manager</h1>
          </div>
          <UserMenu />
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
