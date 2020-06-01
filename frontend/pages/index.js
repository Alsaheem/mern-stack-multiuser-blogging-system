import Layout from "../components/layout";
import Link from "next/link";

const Index = () => {
  return (
    <Layout>
      <h2>Index Page</h2>
      <Link href="/signup">Signup</Link>
    </Layout>
  );
};

export default Index;
