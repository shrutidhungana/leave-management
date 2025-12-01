
import React from "react";
import { NavItem as NavItemType } from "../../types/nav";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";
import { useLogout } from "@/hooks/useAuth";

type NavbarProps = {
  logoSrc?: string;
  navItems?: NavItemType[];
};

const Navbar: React.FC<NavbarProps> = ({ logoSrc = "/logo.png", navItems = [] }) => {
  const logoutMutation = useLogout();

  return (
    <TooltipProvider>
      <nav className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 backdrop-blur-md shadow-lg px-6 py-4 flex items-center justify-between rounded-b-2xl">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img
            src={logoSrc}
            alt="Logo"
            className="h-12 w-12 object-contain rounded-full border-2 border-white shadow-md"
          />
          <span className="text-3xl font-extrabold text-white tracking-wider">Leave System</span>
        </div>

     
        <div className="flex items-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isLogout = item.title.toLowerCase() === "logout";

            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  {item.href && !isLogout ? (
                    <Link to={item.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 text-white text-lg font-medium hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-all duration-300"
                      >
                        <Icon className="w-6 h-6" />
                        <span>{item.title}</span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-2 text-white text-lg font-medium hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-all duration-300"
                      onClick={() => {
                        if (isLogout) logoutMutation.mutate();
                      }}
                    >
                      <Icon className="w-6 h-6" />
                      <span>{item.title}</span>
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-white bg-blue-700 border-none rounded-md shadow-lg">
                  {item.title}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;
