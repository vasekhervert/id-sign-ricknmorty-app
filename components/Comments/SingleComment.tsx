import { FormattedMessage, FormattedDate } from "react-intl";

interface SingleCommentProps {
  author: string;
  message: string;
  timestamp: number;
}

export const SingleComment = ({
  author,
  message,
  timestamp,
}: SingleCommentProps) => {
  return (
    <div className="border rounded">
      <p className="p-2 border-bottom">
        <span className="fw-bold">{author}</span>{" "}
        <FormattedMessage id="comments_on_date" defaultMessage="on" />{" "}
        <FormattedDate
          value={new Date(timestamp)}
          day="numeric"
          month="long"
          year="numeric"
        />
      </p>
      <p className="p-2">{message}</p>
    </div>
  );
};
