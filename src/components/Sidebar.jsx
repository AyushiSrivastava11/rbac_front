import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import {React,useContext} from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { NAV_LINKS } from "../constant/path";
import { cn } from "@/lib/utils";

import { AuthContext } from "../context/AuthContext";
const Sidebar = () => {
  const { pathname } = useLocation();
  const { user,handleLogout } = useContext(AuthContext);
  const isActive = (path) => {
    return path === pathname;
  };
  function handlelogout(){
    handleLogout();
  }
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span>RBAC</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {NAV_LINKS.filter(link => link.roles.includes(user?.role)).map((link, i) => (
              <Link
                key={i}
                to={link.path}
                className={cn(
                  isActive(link.path)
                    ? "bg-muted text-primary"
                    : "text-muted-foreground",
                  "flex items-center gap-3 rounded-lg  px-3 py-2 transition-all hover:text-primary"
                )}
              >
                {link.icon()}
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button size="sm" className="w-full" onClick={handlelogout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
