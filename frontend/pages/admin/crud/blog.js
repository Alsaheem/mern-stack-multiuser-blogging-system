import Layout from "../../../components/layout";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <h1 className="text-left">Blogs</h1>
          <div className="row pt-5 pb-5 ">
            <div className="col-12">
              <p>Create a new blog</p>
              <BlogCreate />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
