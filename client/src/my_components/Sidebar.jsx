// hah om sai ram om bhaskaraaya namaha om namaha sivayaa

import {
    LayoutDashboard,
    AlertCircle,
    Wrench,
    Server,
    Users,
    ShieldCheck
  } from "lucide-react"
  import { NavLink } from "react-router-dom"
  
  const links = [
    { name: "Overview", icon: LayoutDashboard, to: "/dashboard/overview" },
    { name: "Incidents", icon: AlertCircle, to: "/dashboard/incidents" },
    { name: "Maintenance", icon: Wrench, to: "/dashboard/maintenance" },
    { name: "Components", icon: Server, to: "/dashboard/components" },
    { name: "Subscribers", icon: ShieldCheck, to: "/dashboard/subscribers" },
    { name: "Team", icon: Users, to: "/dashboard/team" },
  ]
  
  export default function Sidebar() {
    return (
      <aside className="w-64 h-screen bg-white border-r hidden md:flex flex-col justify-between">
        <div>
          <div className="px-6 py-4 border-b">
            <h1 className="text-xl font-bold text-primary">Plivo</h1>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md font-medium transition-colors ${
                    isActive
                      ? "bg-muted text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-primary"
                  }`
                }
              >
                <link.icon className="w-5 h-5 mr-3" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="px-6 py-4 border-t text-sm text-gray-500">
          © 2025 Plivo Pulse
        </div>
      </aside>
    )
  }
  