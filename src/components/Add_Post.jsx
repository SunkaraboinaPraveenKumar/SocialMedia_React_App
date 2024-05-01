import React, { useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, storage } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Add_Post = () => {
  const auth = getAuth();
  const navigate=useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (auth.currentUser) {
      try {
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        const data = {
          author: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL,
          userId: auth.currentUser.uid,
          imageUrl: downloadURL,
          title,
          description,
          time: serverTimestamp(),
        };
        
        await addDoc(collection(db, "post"), data);
  
        setDescription("");
        setTitle("");
        setImage(null);
  
        toast.success('Post Added Successfully', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
          transition: Bounce,
        });
        navigate('/');
      } catch (error) {
        console.error("Error uploading file or saving data:", error);
        toast.error('Error adding post', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick,
          pauseOnHover,
          draggable,
          theme: 'dark',
          transition: Bounce,
        });
      }
    } else {
      toast.warn("Please log in first");
      navigate('/login');
    }
  };  
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
      <div className="container add_post my-3">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Img</label>
            <input
              // value={image}
              accept='image/*'
              type="file"
              onChange={handleChange}
              className="form-control"
              id="exampleInputPassword1"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
      </div>
    </>
  )
}

export default Add_Post