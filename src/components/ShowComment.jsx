import React from 'react';
import ConvertDateTime from './ConvertDateTime';

const ShowComment = ({ comment }) => {
  return (
    <div className="container my-5 comment_con">
      <div className="comment_user">
        {comment.photoUrl ? (
          <img src={comment.photoUrl} alt={`${comment.author}'s profile`} />
        ) : (
          <img src="default-photo.png" alt="Default profile" />
        )}
        <h3>{comment.author || 'Anonymous'}</h3>
      </div>
      {comment.time && comment.time.seconds !== undefined && comment.time.nanoseconds !== undefined ? (
        <div className="comment_time">
          <ConvertDateTime
            seconds={comment.time.seconds}
            nanoseconds={comment.time.nanoseconds}
          />
        </div>
      ) : (
        <div className="comment_time">Time not available</div> // If `comment.time` is not valid
      )}
      <p>{comment.message || 'No comment provided'}</p>
    </div>
  );
};


export default ShowComment;
