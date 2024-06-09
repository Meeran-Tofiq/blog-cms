import { useState } from "react";
import TinyMCEEditor from "./TinyMCEEditor";
import useFetchWithAuth from "../api/fetch";

export default function CommentBox({ blogPostId, handleCommentUpdated }) {
	const [content, setContent] = useState("");
	const fetch = useFetchWithAuth();

	const handleCommentPost = async () => {
		const res = await fetch(
			`/blog-posts/${blogPostId}/comments`,
			{
				method: "POST",
				body: JSON.stringify({ content }),
			},
			true
		);
		if (res.ok) handleCommentUpdated();
	};

	return (
		<div className="comment-create-container">
			<TinyMCEEditor
				initialContent={content}
				onContentChanged={setContent}
				height={200}
			/>
			<button type="submit" onClick={handleCommentPost}>
				Add comment
			</button>
		</div>
	);
}
