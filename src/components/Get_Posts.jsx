import React, { useEffect, useState } from 'react'
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase.config'
import Post from './Post'
import Loader from './Loader'
const Get_Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));
    const fetchData = async () => {
      await onSnapshot(postQuery, (snapshot) => { 
        console.log("Fetched Data:", snapshot.docs.map((doc) => doc.data()));
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  return (
    <>
    {loading?<Loader />:
    (
      <>
      {posts.map((data)=><Post key={data.id} data={data} />)}
      </>
    )}
    </>
  )
}

export default Get_Posts