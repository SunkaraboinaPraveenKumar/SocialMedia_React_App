import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';
import Post from './Post';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));

    const unsubscribe = onSnapshot(postQuery, (snapshot) => {
      const postData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPosts(postData);
    });

    // Clean up to avoid memory leaks or duplicate subscriptions
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div className="container text-center my-5">
        {user ? (
          <div className="profile_user">
            <img src={user.photoURL || 'default-image-url.jpg'} alt="User Profile" />
            <h2>{user.displayName || 'Unknown User'}</h2>
            <h3>Email: {user.email || 'No email provided'}</h3>
            <h3>Last Login: {user.metadata.creationTime || 'Unknown'}</h3>
          </div>
        ) : (
          <div>
            <h2>No user logged in</h2>
          </div>
        )}
      </div>

      {user ? (
        posts
          .filter((post) => post.userId === user.uid)
          .map((data) => <Post key={data.id} data={data} />)
      ) : (
        <p>Please log in to view your posts.</p>
      )}
    </>
  );
};

export default Profile;
