import React from 'react'
import Post from './Post'

export default function TabResult(props) {
  const{allPosts,deletePost,editPost}=props
  return (
    <div>
        {!allPosts.length >   1 ? (
        <div>
          <li>There are no posts yet.</li>
        </div>
      ) : (
        allPosts.map((eachPost) => (
          <Post
            id={eachPost.id}
            key={eachPost.id}
            title={eachPost.title}
            type={eachPost.type}
            content={eachPost.content}
            editPost={editPost}
            deletePost={deletePost}
          />
        ))
      )}
       
    </div>
  )
}
