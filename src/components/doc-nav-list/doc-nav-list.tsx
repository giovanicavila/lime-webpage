import { NavLink } from "react-router";
import { DOC_NAV } from "@/constants/nav";
import { cn } from "@/lib/utils";

export function DocNavList() {
  return (
    <nav aria-label="Documentation navigation">
      {DOC_NAV.map((section) => (
        <div className="mb-6" key={section.section}>
          <p className="mb-2 px-2 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
            {section.section}
          </p>
          <ul>
            {section.items.map((item) => (
              <li key={item.href}>
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "block rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-primary/10 font-medium text-primary"
                        : "text-foreground/70 hover:bg-accent hover:text-foreground"
                    )
                  }
                  to={item.href}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
