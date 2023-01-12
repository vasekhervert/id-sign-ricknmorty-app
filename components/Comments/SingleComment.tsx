interface CommentProps {
  author?: string;
  email: string;
  message: string;
  date: string;
}

const SingleComment = (props: CommentProps) => {
  const { author, email, message, date } = props;
  return (
    <div className="border rounded">
      <p className="p-2 border-bottom">
        <span className="fw-bold">{author ? author : email}</span> on {date}:{" "}
      </p>
      <p className="p-2">Im Mr. Meeseeks, look at me!</p>
    </div>
  );
};

export default SingleComment;
