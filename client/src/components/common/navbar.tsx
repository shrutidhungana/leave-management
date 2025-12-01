import React from "react";
import { NavItem as NavItemType } from "../../types/nav";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

type NavbarProps = {
  logoSrc?: string;
  navItems?: NavItemType[];
};

const Navbar: React.FC<NavbarProps> = ({ logoSrc = "/logo.png", navItems = [] }) => {
  return (
    <TooltipProvider>
      <nav className="w-full bg-navbar-gradient backdrop-blur-md shadow-xl px-6 py-3 flex items-center justify-between rounded-b-xl">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logoSrc} alt="Logo" className="h-10 w-10 object-contain rounded-full border-2 border-primary" />
          <span className="text-2xl font-extrabold text-primary tracking-wide">Leave System</span>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.title}>
                <TooltipTrigger asChild>
                  {item.href ? (
                    <Link to={item.href}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-navbar-text hover:text-primary hover:bg-navbar-hover transition-all duration-200"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1 text-navbar-text hover:text-primary hover:bg-navbar-hover transition-all duration-200"
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Button>
                  )}
                </TooltipTrigger>
                <TooltipContent side="bottom">{item.title}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </nav>
    </TooltipProvider>
  );
};

export default Navbar;


