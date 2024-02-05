import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import toast from "react-hot-toast";
import { USER_ROLE } from "../../constant/user.roles";
import { logOut } from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { defaultPaths } from "../../routes/default.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { TSidebarItem } from "../../types";
import { TUserRole } from "../../types/userRole.types";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";

const Sidebar = () => {
  const sidebarItems: TSidebarItem[] = [...sidebarItemsGenerator(defaultPaths)];
  const role: TUserRole | undefined = useAppSelector((state) => state.auth)
    ?.user?.role;
  const userRole = useAppSelector((state) => state.auth);
  const isLoggedIn: boolean = !!userRole.token;

  switch (role) {
    case USER_ROLE.ADMIN:
      sidebarItems.push(...sidebarItemsGenerator(adminPaths, USER_ROLE.ADMIN));
      break;
    case USER_ROLE.FACULTY:
      sidebarItems.push(
        ...sidebarItemsGenerator(facultyPaths, USER_ROLE.FACULTY)
      );
      break;
    case USER_ROLE.STUDENT:
      sidebarItems.push(
        ...sidebarItemsGenerator(studentPaths, USER_ROLE.STUDENT)
      );
      break;
  }

  const dispatch = useAppDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
    toast.success("Logged out successfully");
  };

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="sidebar-bg"
      width={220}
    >
      <div
        className="demo-logo-vertical"
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>

      <Menu
        style={{ backgroundColor: "transparent", color: "white" }}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
      {isLoggedIn && (
        <button
          onClick={handleLogOut}
          className="gradient-button"
          style={{ marginLeft: "25px", marginTop: "10px" }}
        >
          Log Out
        </button>
      )}
    </Sider>
  );
};

export default Sidebar;
