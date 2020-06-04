import Layout from "../../components/layout";
import Link from "next/link";
import Private from "../../components/auth/Private";

const UserIndex = () => {
  return (
    <Layout>
      <Private>
      <div className="container">
        <h2>User Dashboard</h2>
      </div>
      </Private>
    </Layout>
  );
};

export default UserIndex;
