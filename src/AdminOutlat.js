import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="content-wrapper">
  <section className="content">
    <div className="px-4 md:px-6 py-4">
      <Outlet />
    </div>
  </section>
</div>

  );
}


export default AdminLayout;
