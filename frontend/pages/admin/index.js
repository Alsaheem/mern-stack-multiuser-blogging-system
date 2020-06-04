import Layout from "../../components/layout";
import Link from "next/link";
import Admin from "../../components/auth/Admin";

const AdminIndex = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <h2>Admin Dashboard</h2>
          <div className="row pt-5 pb-5 ">
            <div className="col-md-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link href="/admin/crud/category-tag">
                    <a>Create Category</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-8">rignt</div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default AdminIndex;
