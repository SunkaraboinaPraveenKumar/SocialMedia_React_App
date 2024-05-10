import React from 'react';
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const docRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoURL,
        timestamp: serverTimestamp(),
      });
    }

    toast.success(`Welcome ${auth.currentUser.displayName}`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });

    navigate('/profile');
  };

  const logOut = async () => {
    await auth.signOut();
    toast.success('LoggedOut Successfully..', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
        transition: Bounce,
      });
    navigate('/');
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

      <div className='nav_bar sticky-top fixed-top'>
        <Link to='/' className='left'>
          {auth.currentUser ? (
            <>
              <img src={auth.currentUser.photoURL} alt='User' />
              <h3>{auth.currentUser.displayName}</h3>
            </>
          ) : (
            <h2>Social Media App</h2>
          )}
        </Link>

        <div className='right'>
          {!auth.currentUser && (
            <button onClick={googleClick} className='btn btn-light text-success mx-3'>
              <h5>
                <FcGoogle /> Login With Google
              </h5>
            </button>
          )}

          {auth.currentUser && (
            <>
              <Link to='/post' className='btn btn-warning mx-3'>
                Post
              </Link>
              <Link to='/profile' className='btn btn-warning mx-3'>
                Profile
              </Link>
              <button className='btn btn-warning mx-3' onClick={logOut}>
                Log Out
              </button>
            </>
          )}
          <div className='all-users'>
          <Link to='/users' className='btn btn-warning mx-3'>
            All Users
          </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
