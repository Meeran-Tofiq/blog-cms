import { DateTime } from "luxon";
import ContentDisplay from "./ContentDisplay";

export default function BlogComment({ comment }) {
	const { user: commentUser, content, date: dateString } = comment;
	const author = commentUser.username;
	const date = new Date(dateString);
	const dateFormatted = DateTime.fromJSDate(date).toLocaleString(
		DateTime.DATETIME_MED
	);

	return (
		<article className="blog-comment">
			<header className="comment-header">
				<h4>{author}</h4>
				<h4>{dateFormatted}</h4>
			</header>
			<main className="comment-content">
				<ContentDisplay htmlContent={content} />
			</main>
		</article>
	);
}
