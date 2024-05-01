import React from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import ConvertDateTime from './ConvertDateTime';
import { Link, useLocation } from 'react-router-dom';
import { FaCommentDots } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Post = ({ data, onPostDeleted }) => {
  const location = useLocation();

  const deletePost = async (id) => {
    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this post?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            try {
              const deleteData = doc(db, 'post', id);
              await deleteDoc(deleteData);

              // If provided, call a callback function after successful deletion
              if (onPostDeleted) {
                onPostDeleted(id);
              }
            } catch (error) {
              console.error('Error deleting post:', error);
              alert('Failed to delete the post. Please try again.');
            }
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  return (
    <div className="container post_con my-5">
      <div className="post_user">
        <img src={data.photoUrl} alt="User" />
        <h3>{data.author}</h3>
      </div>
      <div className="card mb-3 post_card bg-secondary">
        <div className="row g-0">
          <div className="col-md-4 d-flex justify-content-center align-items-center">
            <img src={data.imageUrl} className="img-fluid rounded-start" alt="Post" />
          </div>
          <div className="col-md-8">
            <div className="card-body text-center text-light">
              <h3 className="card-title">{data.title}</h3>
              <h6 className="card-text">{data.description}</h6>
              <p className="card-text">
                <small className="text-body-secondary">
                  <ConvertDateTime seconds={data.time.seconds} nanoseconds={data.time.nanoseconds} />
                </small>
              </p>
              <Link to={`/post/${data.id}`} className="btn btn-info mx-3">
                <h6>
                  <FaCommentDots style={{ color: 'white' }} /> Comments
                </h6>
              </Link>
              <Link to={`/post/${data.id}`} className="btn btn-warning mx-3">
                <h6>View More</h6>
              </Link>
              {location.pathname === '/profile' && (
                <button className="btn btn-danger" onClick={() => deletePost(data.id)}>
                  <h6>Delete</h6>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
