import React from 'react';

const ConvertDateTime = ({ seconds, nanoseconds }) => {
  const time = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(time);

  // Convert to IST
  date.setUTCHours(date.getUTCHours());
  date.setUTCMinutes(date.getUTCMinutes());

  const formattedDate = date.toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  });

  return <span>{formattedDate}</span>;
};

export default ConvertDateTime;
