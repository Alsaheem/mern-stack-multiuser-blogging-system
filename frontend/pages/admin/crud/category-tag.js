import Layout from "../../../components/layout";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";

const CategoryTag = () => {
  return (
    <Layout>
      <Admin>
        <div className="container">
          <h1 className="">
            Manage Categories and Tags
          </h1>
          <div className="row pt-5 pb-5 ">
            <div className="col-md-6">
              <p>Categories</p>
              <Category />
            </div>
            <div className="col-md-6">
              <p>Tags</p>
              <Tag />
            </div>
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default CategoryTag;
