import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookmarkManagement() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/bookmarks/'); // Update the URL if needed
      setBookmarks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(bookmarks);

  return (
    <div>
      <h1>Bookmark Management</h1>

      {bookmarks.length > 0 ? (
        <ul className="bookmark-list">
          {bookmarks.map((bookmark) => (
            <li key={bookmark.id} className="bookmark-item">
              <h3 className="bookmark-title">{bookmark.title}</h3>
              <p className="bookmark-description">{bookmark.description}</p>
              <p className="bookmark-link">
                <a href={bookmark.link} target="_blank" rel="noopener noreferrer">
                  {bookmark.link}
                </a>
              </p>
              <p className="bookmark-category">Category: {bookmark.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookmarks found.</p>
      )}
    </div>
  );
}
