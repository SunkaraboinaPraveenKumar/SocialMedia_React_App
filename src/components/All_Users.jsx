import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.config';
import ConvertDateTime from './ConvertDateTime';
import Loader from './Loader';

const All_Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userQuery = query(collection(db, "users"), orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(userQuery, (snapshot) => {
          const userList = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setUsers(userList);
          setLoading(false);
        });

        // Clean up the snapshot listener to avoid memory leaks
        return () => unsubscribe();
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users.");
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure this runs only once on component mount

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="container"><p>{error}</p></div>;
  }

  return (
    <div className="container">
      {users.map((user) => (
        <div key={user.id} className="text-center my-3 all_users_con">
          <div className="container all_users">
            <img src={user.photoUrl} alt={`${user.name}'s profile`} />
            <h3>{user.name}</h3>
            <h6>{user.email}</h6>
          </div>
          <div className="register">
            <h6>Register Time:</h6>
            <h6>
              <ConvertDateTime seconds={user.timestamp.seconds} nanoseconds={user.timestamp.nanoseconds} />
            </h6>
          </div>
        </div>
      ))}
    </div>
  );
};

export default All_Users;
