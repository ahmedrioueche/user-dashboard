import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Search, Bell, UserCircle, Menu, User } from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";


export function Navbar() {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { toggle } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-light-card dark:bg-dark-card border-b border-light-border dark:border-dark-border shadow-sm">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggle}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
              Dashboard
            </h1>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full bg-light-background dark:bg-dark-background"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchExpanded(!isSearchExpanded)}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Profile */}
          <Button variant="ghost" size="icon">
            <UserCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchExpanded && (
        <div className="md:hidden border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
            <Input
              placeholder="Search..."
              className="pl-10 w-full bg-light-background dark:bg-dark-background"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}