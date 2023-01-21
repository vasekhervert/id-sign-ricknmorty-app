import { makeDate } from "../../helpers";
import { FormattedMessage } from "react-intl";

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
        <span className="fw-bold">{author}</span>{" "}
        <FormattedMessage id="comments_on_date" defaultMessage="on" />{" "}
        {makeDate(timestamp, "cs-CZ")}:{" "}
      </p>
      <p className="p-2">{message}</p>
    </div>
  );
};

export default SingleComment;
