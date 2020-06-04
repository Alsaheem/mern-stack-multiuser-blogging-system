import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { isAuthenticated } from "../../actions/auth";
import { createTag, getTags, getTag, removeTag } from "../../actions/tag";

const Tag = (props) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [reload, setReload] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, [reload]);

  const loadTags = () => {
    getTags().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setTags(data);
      }
    });
  };

  const deleteTag = (slug) => {
    console.log(`delete -> ${slug}`);
    removeTag(slug).then((response) => {
      setLoading(true);
      if (response.error) {
        console.log(error);
        setErrorMessage(response.error.error);
        setLoading(false);
        setError(true);
      } else {
        console.log("done");
        setLoading(false);
        setError(false);
        setSuccess(true);
        setReload(!reload);
        setMessage(`tag ${slug} removed suceessfully`);
      }
    });
  };

  const deleteConfirm = (slug) => {
    let answer = window.confirm(
      `are you sure you want to delete "${slug}" tag`
    );
    if (answer) {
      deleteTag(slug);
    }
  };

  const showTags = () => {
    return tags.map((tag, index) => {
      return (
        <button
          onDoubleClick={() => deleteConfirm(tag.slug)}
          title="Double click to delete tag"
          key={index}
          className="btn btn-outline-primary mr-1 mt-3 "
        >
          {tag.name}
        </button>
      );
    });
  };

  const mouseMoveHandler = (e) => {
    console.log(`clearing alerts......`);
    setError(false);
    setSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`create tag ${name}`);
    setLoading(true);
    createTag({ name }).then((response) => {
      console.log(`response`, response);
      if (response.error) {
        setErrorMessage(response.error.error);
        setLoading(false);
        setError(true);
      } else {
        console.log("done");
        setLoading(false);
        setError(false);
        setSuccess(true);
        setName("");
        setReload(!reload);
        setMessage("success");
      }
    });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{errorMessage}</div> : "";
  const showMessage = () =>
    success ? <div className="alert alert-success">{message}</div> : "";

  return (
    <div>
      {error && showError()} {showLoading()} {showMessage()}
      <div onMouseMove={mouseMoveHandler}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              required
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <button className="btn btn-success" type="submit">
              Create
            </button>
          </div>
        </form>
        <div>{showTags()}</div>
      </div>
    </div>
  );
};

export default Tag;
