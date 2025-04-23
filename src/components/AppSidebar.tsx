
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter
} from '@/components/ui/sidebar';
import { User, BarChart2, Users, Menu as MenuIcon, ShoppingCart, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const AppSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { 
      title: 'Dashboard', 
      path: '/', 
      icon: BarChart2 
    },
    { 
      title: 'Staff', 
      path: '/staff', 
      icon: Users 
    },
    { 
      title: 'Menu', 
      path: '/menu', 
      icon: MenuIcon 
    },
    { 
      title: 'Orders', 
      path: '/orders', 
      icon: ShoppingCart 
    },
    { 
      title: 'Customers', 
      path: '/customers', 
      icon: BookOpen 
    }
  ];
  
  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center p-4 border-b">
        <h2 className="text-xl font-bold text-white">Restaurant MS</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    className={cn(
                      location.pathname === item.path && "bg-sidebar-accent text-white"
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3 text-sm text-gray-300">
          <User className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="font-medium">Manager</span>
            <span className="text-xs opacity-70">Demo Account</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
