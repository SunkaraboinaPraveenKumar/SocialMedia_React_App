const ConvertDateTime = ({ seconds, nanoseconds }) => {
  if (seconds == null || nanoseconds == null) {
    return <span>Time not available</span>; // Handle undefined time
  }

  const time = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(time);

  const formattedDate = date.toLocaleDateString("en-IN", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    seconds: 'numeric',
    timeZoneName: 'short',
  });

  return <span>{formattedDate}</span>;
};

export default ConvertDateTime;