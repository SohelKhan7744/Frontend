import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="wrapper">
      {/* AdminLTE sidebar + navbar already exist */}

      <div className="content-wrapper bg-gray-900 text-white">
        <section className="content">
          <div className="container-fluid p-4 md:p-6">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  );
}


export default AdminLayout;
