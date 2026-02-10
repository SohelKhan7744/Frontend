import { Outlet } from "react-router-dom";
import Menu from "./Menu";

function AdminLayout() {
  return (
    <div className="wrapper">
      {/* AdminLTE Navbar */}
      <nav className="main-header navbar navbar-expand navbar-dark">
        {/* you already have this in AdminLTE */}
      </nav>

      {/* AdminLTE Sidebar */}
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Menu/>
      </aside>

      {/* REQUIRED */}
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid px-4 py-4">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
