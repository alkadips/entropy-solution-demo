import React from "react";

const CreateNewPost = (props) => {
  return (
    <>
      <form onSubmit={props.savePost}>
        <h2>Create New Post</h2>
        <label className="col-sm-12 col-form-label">
          <b>Title</b>
          <input
            className="form-control form-control-sm"
            autoFocus={true}
            type="text"
            placeholder="post title"
            onChange={props.savePostTitleToState}
            required
            ref={props.getTitle}
          />
        </label>
        <label className="col-sm-12 col-form-label">
          <b>Type</b>
          <select style={{padding:"5px",width:"100%"}} defaultValue={props.type}  onChange={props.savePostType}>
            <option value=""></option>
            <option value="Tech">Tech</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Community">Community</option>
          </select>
        </label>
        <br />
        <label className="col-sm-12 col-form-label">
          <b>Content</b>
          <textarea
            className="form-control form-control-sm"
            placeholder="description"
            onChange={props.savePostContentToState}
            rows="18"
            cols="41"
            required
            ref={props.getContent}
          />
        </label>
        <br />
        <button title="save post" className="btn btn-success ml-3">
          save
        </button>
      </form>
    </>
  );
};

export default CreateNewPost;
