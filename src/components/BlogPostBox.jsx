import { useState } from "react";
import useFetchWithAuth from "../api/fetch";
import TinyMCEEditor from "./TinyMCEEditor";
import { useNavigate } from "react-router-dom";

export default function BlogPostBox({}) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isPublished, setIsPublished] = useState(false);
	const fetch = useFetchWithAuth();
	const navigate = useNavigate();

	const onTitleChanged = (t) => {
		setTitle(t);
	};

	const onContentChanged = (c) => {
		setContent(c);
	};

	const handlePublishedChanged = (event) => {
		setIsPublished(event.target.checked);
	};

	const handleSubmit = async () => {
		const res = await fetch(
			`/blog-posts`,
			{
				method: "post",
				body: JSON.stringify({
					title,
					content,
					isPublished,
				}),
			},
			true
		);

		navigate("/");
	};

	return (
		<article className="blog-post">
			<h2>Title</h2>
			<TinyMCEEditor onContentChanged={onTitleChanged} height={200} />
			<h2>Content</h2>
			<TinyMCEEditor onContentChanged={onContentChanged} />
			<label>
				<h3>Do you want this content to be public?</h3>
				<input
					type="checkbox"
					checked={isPublished}
					onChange={handlePublishedChanged}
				/>
			</label>
			<button
				type="submit"
				onClick={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
			>
				Submit
			</button>
		</article>
	);
}
