import CreateStudent from "../pages/admin/CreateStudent";

export const studentPaths = [
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];
