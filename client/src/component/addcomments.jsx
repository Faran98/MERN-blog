import React, { useState } from "react";

const Addcomments = ({ articleName, setArticleInfo }) => {
  const [username, setUsername] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComments = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      const result = await fetch(`https://mern-blog-opal-two.vercel.app/api/articles/${articleName}/add-comment`, {
        method: "POST",
        body: JSON.stringify({ username, text: commentText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!result.ok) {
        throw new Error('Network response was not ok');
      }

      const body = await result.json();
      setArticleInfo(body);
      setUsername("");
      setCommentText("");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="shadow rounded px-8 pt-6 pb-8 mb-4" onSubmit={addComments}>
      <h3 className="text-xl font-bold mb-4">Add a Comment</h3>

      <label className="block text-sm font-bold mb-2">Name:</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <label className="block text-sm font-bold mb-2">Comment:</label>
      <textarea
        rows="4"
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Add Comment
      </button>
    </form>
  );
};

export default Addcomments;
