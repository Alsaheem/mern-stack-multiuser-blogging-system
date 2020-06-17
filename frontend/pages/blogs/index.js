import Layout from "../../components/layout";
import Link from "next/link";
import Head from "next/head";
import Admin from "../../components/auth/Admin";
import Card from "../../components/Card";
import React, { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import { withRouter } from "next/router";

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsSkip,
  blogsLimit,
  router,
}) => {
  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(blogsSkip);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const head = () => {
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta name="description" content="my blogs on coding and all" />
      <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
      <meta property="og:title" content={`Latest blogs  | ${APP_NAME}`} />
      <meta property="og:description" content={`Latest blogs  | ${APP_NAME}`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${APP_NAME}`} />
      <meta property="og:image:secure_url" content={`${APP_NAME}`} />
      <meta property="og:image:type" content={`${APP_NAME}`} />
      <meta property="fb:app_id" content={`${APP_NAME}`} />
    </Head>;
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={() => loadMore()}
          className="btn btn-outline-primary btn-lg"
        >
          Load More
        </button>
      )
    );
  };
  const showcaseAllBlogs = () => {
    console.log(blogs);
    return blogs.map((blog, index) => {
      return <Card blog={blog} key={index} />;
    });
  };

  const showAllCategories = () => {
    return categories.map((category, index) => {
      return (
        <Link key={index} href={`/categories/${category.slug}`}>
          <a className="btn btn-outline-success ml-1 btn-sm">{category.name}</a>
        </Link>
      );
    });
  };

  const showAllTags = () => {
    return tags.map((tag, index) => {
      return (
        <Link key={index} href={`/tags/${tag.slug}`}>
          <a className="btn btn-outline-primary ml-1 btn-sm">{tag.name}</a>
        </Link>
      );
    });
  };

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, index) => {
      return <Card blog={blog} key={index} />;
    });
  };

  return (
    <Layout>
      {head()}
      <main className="container-fluid">
        <div className="container-fluid">
          <h1 className=" font-weight-bold text-center">Blogs...</h1>
          <section></section>
        </div>
        <div className="content text-center">
          <div className="pb-5 mt-4">
            {showAllCategories()}
            <br />
            <br />
            {showAllTags()}
          </div>
          <div className="row">
            <div className="col-md-10">
              <div className="card-columns">
                {showcaseAllBlogs()}
                {showLoadedBlogs()}
              </div>
              <br />
              <br />
              <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
            </div>
            <div className="col-md-2 bg-info">
              <p>jists</p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0;
  let limit = 2;
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        blogsLimit: limit,
        blogsSkip: skip,
        totalBlogs: data.size,
      };
    }
  });
};

export default withRouter(Blogs);
