interface CommentProps {
  author: string;
  message: string;
  timestamp: number;
}

const SingleComment = (props: CommentProps) => {
  const { author, message, timestamp } = props;
  return (
    <div className="border rounded">
      <p className="p-2 border-bottom">
        <span className="fw-bold">{author}</span> on {timestamp}:{" "}
      </p>
      <p className="p-2">{message}</p>
    </div>
  );
};

export default SingleComment;
