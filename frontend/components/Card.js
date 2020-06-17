import React from "react";
import renderHTML from "react-render-html";
import moment from "moment";
import { API } from "../config";
import Link from "next/link";



const Card = ({ blog }) => {

  const blogCategories = (blog) => {
    return blog.categories.map((category, index) => {
      return (
        <Link key={index} href={`/categories/${category.slug}`}>
          <a className="btn btn-outline-success ml-1 btn-sm">{category.name}</a>
        </Link>
      );
    });
  };

  const blogTags = (blog) => {
    return blog.tags.map((tag, index) => {
      return (
        <Link key={index} href={`/tags/${tag.slug}`}><a className="btn btn-outline-primary ml-1 btn-sm">{tag.name}</a></Link>
      );
    });
  };

  return (
    <div className="">
      <article>
        <div className="card">
          <div className="card-header">
         {blogCategories(blog)}
           {blogTags(blog)}
          </div>
          <img className="card-img-top" alt={blog.title}  src={`${API}/blog/photo/${blog.slug}`}  height="250px"  width="100%"/>
          <div className="card-body">
            <h5 className="card-title">
              <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
            </h5>
            <p className="card-text">
              {renderHTML(blog.excerpt)}
              <Link href={`/blog/${blog.slug}`}>
                <a>Read more...</a>
              </Link>
            </p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Written by {blog.postedBy.name} | published{" "}
              {moment(blog.updatedAt).fromNow()}
            </small>
          </div>
        </div>
      </article>
    </div>
  );
};


export default Card;
