import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import Comments from './Comments';
const Post_Detail = () => {
  // console.log(useParams());
  const { id } = useParams();
  const [data, setData] = useState("");
  useEffect(() => {
    const getSingleDoc = async (id) => {
      const ref = doc(db, "post", id);
      getDoc(ref).then((doc) => setData(doc.data()));
    };
    getSingleDoc(id);
  }, [id]);
  return (
    <>
      <div className="container text-center my-5">
        <div className="post_detail">
          <div className="post_detail_img">
            <img src={data.imageUrl} alt="" />
          </div>
          <div>
        
            <div className="post_detail_user">
              <img src={data.photoUrl} alt="" />
              <h3>{data.author}</h3>
            </div>
            <h3>{data.title}</h3>
            <p>{data.description}</p>
          </div>
        </div>
        <Comments postId={id} />
      </div>
    </>
  )
}

export default Post_Detail