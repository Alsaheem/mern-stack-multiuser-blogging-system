import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { withRouter } from "next/router";
import dynamic from "next/dynamic";
import { isAuthenticated } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
//const ReactQuill = dynamic(() => import("react-quill"));
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import "../../node_modules/react-quill/dist/quill.snow.css";

const BlogCreate = ({ router }) => {
  const BlogFromLocalStorage = () => {
    if (typeof window === "undefined") {
      return false;
    }

    if (localStorage.getItem("blog")) {
      return JSON.parse(localStorage.getItem("blog"));
    } else {
      return false;
    }
  };

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedTags, setCheckedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [formData, setFormData] = useState("");
  const [body, setBody] = useState(BlogFromLocalStorage());
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showLoading = () =>
    loading ? (
      <div className="text-capitalize alert alert-info">Loading...</div>
    ) : (
      ""
      );

  const showError = () =>
    error ? (
      <div className="text-capitalize alert alert-danger">{errorMessage}</div>
    ) : (
      ""
      );

  const showMessage = () =>
    success ? (
      <div className="text-capitalize alert alert-success">{message}</div>
    ) : (
      ""
    );

  useEffect(() => {
    setFormData(new FormData() );
    loadCategories();
    loadTags();
  }, [router]);

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(true);
      } else {
        setCategories(data);
      }
    });
  };

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
        setError(true);
      } else {
        setTags(data);
      }
    });
  };

  const publishBlog = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    createBlog(formData).then((data) => {
      console.log("object", data);
      if (data.error) {
        console.log("error", data.error);
        setError(true);
        setErrorMessage(data.error.error);
        setLoading(false);
      } else {
        setSuccess(true);
        setMessage(`A new blog named ${title} has been created`);
        setTitle("");
        setBody("");
        setCheckedCategories([]);
        setCheckedTags([]);
        setLoading(false);
      }
    });
  };

  const handleChange = (name) => (e) => {
    console.log(e.target.value);
    const value = name === "photo" ? e.target.files[0] : e.target.value;
    if (name === "title") {
      setTitle(value);
    }
    formData.set(name, value);
    setFormData(formData);
  };

  const handleCheckedCategory = (id) => {
    setErrorMessage("");
    //return the first index or -1-- check if it exists
    const clickedCategory = checkedCategories.indexOf(id);
    const allCategories = [...checkedCategories];
    if (clickedCategory === -1) {
      allCategories.push(id);
    } else {
      allCategories.splice(clickedCategory, 1);
    }
    console.log(allCategories);
    setCheckedCategories(allCategories);
    formData.set("categories", allCategories);
  };

  const handleCheckedTag = (id) => {
    setErrorMessage("");
    //return the first index or -1-- check if it exists
    const clickedTag = checkedTags.indexOf(id);
    const allTags = [...checkedTags];
    if (clickedTag === -1) {
      allTags.push(id);
    } else {
      allTags.splice(clickedTag, 1);
    }
    console.log(allTags);
    setCheckedTags(allTags);
    formData.set("tags", allTags);
  };

  const handleBody = (e) => {
    console.log(e);
    setBody(e);
    formData.set("body", e);
    if (typeof window !== "undefined") {
      localStorage.setItem("blog", JSON.stringify(e));
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((category, index) => {
        return (
          <li className="list-unstyled" key={index}>
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheckedCategory(category._id)}
            />
            <label htmlFor="" className="form-check-label">
              {category.name}
            </label>
          </li>
        );
      })
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((tag, index) => {
        return (
          <li className="list-unstyled" key={index}>
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleCheckedTag(tag._id)}
            />
            <label htmlFor="" className="form-check-label">
              {tag.name}
            </label>
          </li>
        );
      })
    );
  };

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label htmlFor="" className="text-muted">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleChange("title")}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            theme="snow"
            modules={BlogCreate.modules}
            formats={BlogCreate.formats}
            value={body}
            placeholder="Write something amazing"
            onChange={handleBody}
          />
        </div>
        <div className="">
        {error && showError()} {showLoading()} {showMessage()}
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return (
    <div>

      <div className="row">
        <div className="col-md-8">{createBlogForm()}</div>
        <div className="col-md-4">
          <div className="">
            <div className="form-group pb-2">
              <h5>Featured Image</h5>
              <hr />
              <small className="text-muted">max size 1mb</small>
              <br />
              <label className="btn btn-info">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange("photo")}
                  hidden
                />
              </label>
            </div>
          </div>
          <h5>Categories</h5>
          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showCategories()}
          </ul>

          <hr />
          <h4>Tags</h4>
          <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
            {showTags()}
          </ul>
        </div>
      </div>
    </div>
  );
};

BlogCreate.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

BlogCreate.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(BlogCreate);
