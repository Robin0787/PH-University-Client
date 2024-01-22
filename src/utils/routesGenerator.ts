import { TRoute, TUserPath } from "../types";

export const routesGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.index && item.element) {
      acc.push({
        index: true,
        element: item.element,
      });
    } else if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }
    if (item.children) {
      item.children.map((child) => {
        if (child.path && child.element) {
          acc.push({
            path: child.path,
            element: child.element,
          });
        }
      });
    }
    return acc;
  }, []);
  return routes;
};
