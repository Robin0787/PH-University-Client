import { adminPaths2 } from "./src/routes/admin.routes.tsx";


const reducer = (acc, item) => {
    if(item.path && item.element) {
        acc.push({
            path: item.path,
            element: item.element
        })
    }
    return acc
};


const result = adminPaths2.reduce(reducer, []);



console.log(result);
