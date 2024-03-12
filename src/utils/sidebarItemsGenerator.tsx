import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types";
import { TUserRole } from "../types/userRole.types";

const sidebarItemsGenerator = (items: TUserPath[], role?: TUserRole) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.index && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/`}>{item.name}</NavLink>,
      });
    } else if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`${role || ""}/${item.path}`}>{item.name}</NavLink>,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name && child.path) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role || ""}/${child.path}`}>
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};

export default sidebarItemsGenerator;
