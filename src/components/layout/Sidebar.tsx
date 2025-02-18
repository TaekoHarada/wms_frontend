import NavItem from "./NavItem";
import { Home, Package, Archive, FileText } from "lucide-react";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
  { name: "Products", href: "/products", icon: <Package size={20} /> },
  {
    name: "Stock Management",
    href: "/stock/update",
    icon: <Archive size={20} />,
  },
  { name: "Logs", href: "/logs", icon: <FileText size={20} /> },
];

export default function Sidebar() {
  return (
    <nav className="fixed top-16 left-0 h-full w-64 bg-gray-700 shadow-md pt-5">
      <ul>
        {menuItems.map((item) => (
          <NavItem
            key={item.href}
            name={item.name}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </ul>
    </nav>
  );
}
