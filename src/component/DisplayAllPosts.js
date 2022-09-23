import React, { useState, useRef } from "react";
import CreateNewPost from "./CreateNewPost";
import ModifyPost from "./ModifyPost";
import "bootstrap/dist/css/bootstrap.min.css";
import Tabs from "./Tabs.tsx";
import TabResult from "./TabResult";
const DisplayAllPosts = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("");
  const [selectedTab1, setSelectedTab1] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [allPosts, setAllPosts] = useState([
    {
      id: 1,
      title: "Technology Related post",
      type: "Tech",
      content:
        "Technology is the one of the biggest challenge in world",
    },
    {
      id: 2,
      title: "Movie",
      type: "Entertainment",
      content:
        "Watching movie"
},
{
    id: 3,
    title: "facebook",
    type: "Community",
    content:
      "Upload post"
}
]);

  const [allPostCopy, setAllPostCopy] = useState([...allPosts]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const getTitle = useRef();
  const getContent = useRef();
  const getType = useRef();
  const savePostTitleToState = (event) => {
    setTitle(event.target.value);
  };
  const savePostContentToState = (event) => {
    setContent(event.target.value);
  };
  const savePostType = (event) => {
    setType(event.target.value);
  };

  const savePost = (event) => {
    event.preventDefault();
    const id = Date.now();
    setAllPostCopy([...allPosts, { title, type, content, id }]);
    setAllPosts([...allPosts, { title, type, content, id }]);
    getTitle.current.value = "";
    getType.current.value = "";
    getContent.current.value = "";
    toggleCreateNewPost();
  };
  const toggleCreateNewPost = () => {
    setIsCreateNewPost(!isCreateNewPost);
  };

  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost);

  };

  const editPost = (id) => {
    setEditPostId(id);
    toggleModifyPostComponent();
  };

  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map((eachPost) => {
      if (eachPost.id === editPostId) {
        return {
          ...eachPost,
          title: title || eachPost.title,
          type: type || eachPost.type,
          content: content || eachPost.content,
        };
      }

      return eachPost;
    });
    setAllPosts(updatedPost);
    setAllPostCopy(updatedPost);
    alert("Post upadted successfully");
    toggleModifyPostComponent();
  };
  const searchPost = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const localPostData = [...allPosts];
      const filteredData = localPostData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setAllPosts(filteredData);
    } else {
      setAllPosts(allPostCopy);
    }
  };
  const deletePost = (id) => {
    const modifiedPosts = allPosts.filter((eachPost) => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPosts);
    setAllPostCopy(modifiedPosts);
    alert(`Post deleted succesfully ${id}`);
  };

  if (isCreateNewPost) {
    return (
      <>
        <CreateNewPost
          savePostTitleToState={savePostTitleToState}
          savePostType={savePostType}
          savePostContentToState={savePostContentToState}
          getTitle={getTitle}
          getType={getType}
          getContent={getContent}
          savePost={savePost}
        />
        <button
          className="btn btn-danger cancel-button"
          onClick={toggleCreateNewPost}
        >
          Cancel
        </button>
      </>
    );
  } else if (isModifyPost) {
    const post = allPosts.find((post) => {
      return post.id === editPostId;
    });

    return (
      <>
        <ModifyPost
          title={post.title}
          content={post.content}
          type={post.type}
          updatePost={updatePost}
          savePostTitleToState={savePostTitleToState}
          savePostType={savePostType}
          savePost={savePost}
          savePostContentToState={savePostContentToState}
          toggleCreateNewPost={toggleCreateNewPost}
        />
        <button
          className="btn btn-danger cancel-update-button"
          onClick={toggleModifyPostComponent}
        >
          Cancel
        </button>
      </>
    );
  }
  const tabs = [
    {
      label: "Tech",
      Component: () => (
        <TabResult
          allPosts={allPosts.filter((item) => item.type === "Tech")}
          editPost={editPost}
          deletePost={deletePost}
        />
      ),
    },
    {
      label: "Entertainment",
      Component: () => (
        <TabResult
          allPosts={allPosts.filter((item) => item.type === "Entertainment")}
          editPost={editPost}
          deletePost={deletePost}
        />
      ),
    },
    {
      label: "Community",
      Component: () => (
        <TabResult
          allPosts={allPosts.filter((item) => item.type === "Community")}
          editPost={editPost}
          deletePost={deletePost}
        />
      ),
    },
  ];
  return (
    <>
      <h2>All Posts</h2>
      <input
        icon="search"
        placeholder="Search..."
        onChange={(e) => searchPost(e.target.value)}
      />

      <Tabs
        className="mt-4"
        selectedTab={selectedTab1}
        onClick={setSelectedTab1}
        tabs={tabs}
      />

      <button
        className="btn button-edits btn-success create-post"
        onClick={toggleCreateNewPost}
      >
        Create New Post
      </button>
    </>
  );
};

export default DisplayAllPosts;
