import { DateTime } from "luxon";
import { useContext, useState } from "react";
import useFetchWithAuth from "../api/fetch";
import AuthContext from "../context/AuthContext";
import CommentControls from "./CommentControls";
import ContentDisplay from "./ContentDisplay";

export default function BlogComment({ comment, onCommentUpdated }) {
	const { user } = useContext(AuthContext);
	const [newContent, setNewContent] = useState();
	const fetch = useFetchWithAuth();

	const { user: commentUser, content, date: dateString } = comment;
	const author = commentUser.username;
	const date = new Date(dateString);
	const dateFormatted = DateTime.fromJSDate(date).toLocaleString(
		DateTime.DATETIME_MED
	);

	const onContentChanged = (content) => {
		setNewContent(content);
	};

	const handleCommentUpdate = async () => {
		const res = await fetch(
			`/blog-posts/${comment.blogPost}/comments/${comment._id}`,
			{
				method: "PUT",
				body: JSON.stringify({ content: newContent }),
			},
			true
		);
		onCommentUpdated();
	};

	const handleCommentDelete = async () => {
		const res = await fetch(
			`/blog-posts/${comment.blogPost}/comments/${comment._id}`,
			{
				method: "DELETE",
			},
			true
		);
		onCommentUpdated();
	};

	return (
		<article className="blog-comment">
			<header className="comment-header">
				<h4>{author}</h4>
				<h4>{dateFormatted}</h4>
			</header>
			<main className="comment-content">
				<ContentDisplay htmlContent={content} />
			</main>
			{commentUser.username === user?.username ? (
				<CommentControls
					content={content}
					onContentChanged={onContentChanged}
					handleUpdate={handleCommentUpdate}
					handleDelete={handleCommentDelete}
				/>
			) : null}
		</article>
	);
}
