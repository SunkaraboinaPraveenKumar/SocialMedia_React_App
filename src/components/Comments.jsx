import React from 'react'
import { useState,useEffect } from 'react';
import {collection,addDoc,query,onSnapshot,orderBy} from 'firebase/firestore';
import {db} from '../firebase.config'
import { getAuth } from 'firebase/auth';
import ShowComment from './ShowComment';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './Loader';
const Comments = ({ postId }) => {
    const auth=getAuth();
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState("");
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        const commentQuery = query(collection(db, "comments"), orderBy("time", "desc"));
        const fetchData = async () => {
          await onSnapshot(commentQuery, (snapshot) => { 
            console.log("Fetched Data:", snapshot.docs.map((doc) => doc.data()));
            setComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setLoading(false);
          });
        };
        fetchData();
      }, []);

    const handleAddComment=async (e)=>{
        e.preventDefault();
        if(auth.currentUser&&newComments!=" "){
            await addDoc(collection(db,"comments"),{
                postId,
                message:newComments,
                author:auth.currentUser.displayName,
                photoUrl:auth.currentUser.photoURL,
                userid:auth.currentUser.uid,
                time:new Date()
            })
            toast.success('Comment Added Successfully', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: 'dark',
                transition: Bounce,
              });
            setNewComments("");
        }
        else{
            alert("Login First");
        }
    }
    const filteredComment=comments.filter((comment)=>comment.postId==postId);
    return (
        <>
        <ToastContainer
        position='top-right'
        autoClose={1500}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
        transition={Bounce}
      />
            <div className="container text-center my-5">
                <form onSubmit={handleAddComment}>
                    <div className="mb-3 comments">
                        <input 
                        value={newComments}
                        onChange={(e)=>setNewComments(e.target.value)}
                        type="text" className="form-control mx-3" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Add a Comment...' required/>
                        <button type="submit" className="btn btn-primary">Add Comment</button>
                    </div>
                </form>
                <h1>Total Comments:- {filteredComment.length}</h1>
                {loading?<Loader />:(
                    <>
                    {
                    filteredComment.map((comment)=><ShowComment key={comment.id} comment={comment} />)
                    }
                    </>
                )}
            </div>
        </>
    )
}

export default Comments