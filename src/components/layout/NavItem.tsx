import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavItem({
  name,
  href,
  icon,
}: {
  name: string;
  href: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + "/");

  return (
    <li className="mb-2 w-full">
      <Link
        href={href}
        className={`flex items-center gap-3 w-full px-4 py-2 transition-all text-white ${
          isActive ? "bg-blue-500" : " hover:text-gray-300"
        }`}
      >
        <span>{icon}</span>
        <span className="font-medium">{name}</span>
      </Link>
    </li>
  );
}
