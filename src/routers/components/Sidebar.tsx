import { useEffect } from "react";
import { Button } from "../../components/ui/Button";
import { Link, useRouterState } from "@tanstack/react-router";
import { 
  Users, 
  Settings, 
  LogOut, 
  BarChart3,
  X,
  User
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";

export function Sidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { isOpen, toggle } = useSidebar();

  const navItems = [
    {
      name: "Users",
      icon: Users,
      path: "/",
      badge: "12",
    },
    {
      name: "Analytics",
      icon: BarChart3,
      path: "/analytics",
      badge: null,
    },
    {
      name: "Settings",
      icon: Settings,
      path: "/settings",
      badge: null,
    },
  ];

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (toggle && window.innerWidth < 1024) {
      toggle();
    }
  }, [currentPath]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-screen w-64
        ${isOpen ? 'transform translate-x-0' : 'transform -translate-x-full'}
        lg:translate-x-0 lg:top-16 lg:h-[calc(100vh-4rem)]
        transition-transform duration-300 ease-in-out
        bg-light-card dark:bg-dark-card 
        border-r border-light-border dark:border-dark-border
        shadow-lg lg:shadow-none
      `}>
        <div className="flex h-full flex-col">
          {/* Mobile Header with Logo and Close Button */}
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-primary dark:to-dark-secondary flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-light-text-primary dark:text-dark-text-primary">
                Dashboard
              </h1>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggle}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              
              return (
                <Link to={item.path} key={item.path}>
                  <Button
                    variant="ghost"
                    className={`
                      w-full justify-start h-11 px-4
                      ${isActive 
                        ? 'bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary' 
                        : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-background dark:hover:bg-dark-background hover:text-light-text-primary dark:hover:text-dark-text-primary'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-light-background dark:bg-dark-background text-light-text-secondary dark:text-dark-text-secondary">
                        {item.badge}
                      </span>
                    )}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-light-border dark:border-dark-border">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-11 px-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}