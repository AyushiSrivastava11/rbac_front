import { Box, Home, Users } from "lucide-react";

export const NAV_LINKS = [
  {
    title: "Dashboard",
    icon: () => <Home className="h-4 w-4" />,
    path: "/",
    roles: ["admin","cook","waiter","accounts"]
  },



  {
    title: "Members",
    icon: () => <Users className="h-4 w-4" />,
    path: "/members",
    roles: ["admin"]
  },
  {
    title: "Categories",
    icon: () => <Box className="h-4 w-4" />,
    path: "/categories",
    roles: ["admin", "cook"]
  },
];

