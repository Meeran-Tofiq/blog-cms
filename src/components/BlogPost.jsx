import { DateTime } from "luxon";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import BlogPostControlls from "./BlogPostControlls";
import useFetchWithAuth from "../api/fetch";
import ContentDisplay from "./ContentDisplay";

export default function BlogPost({ blogPost, isBlogCard, onBlogPostUpdated }) {
	const { user } = useContext(AuthContext);
	const [newTitle, setNewTitle] = useState();
	const [newContent, setNewContent] = useState();
	const fetch = useFetchWithAuth();

	const { title, user: blogPostUser, content, date: dateString } = blogPost;
	const author = blogPostUser.username;
	const date = new Date(dateString);
	const dateFormatted = DateTime.fromJSDate(date).toLocaleString(
		DateTime.DATETIME_MED
	);

	const onTitleChanged = (t) => {
		setNewTitle(t);
	};

	const onContentChanged = (c) => {
		setNewContent(c);
	};

	const handleUpdate = async () => {
		const res = await fetch(
			`/blog-posts/${blogPost._id}`,
			{
				method: "PUT",
				body: JSON.stringify({
					title: newTitle ? newTitle : title,
					content: newContent ? newContent : content,
				}),
			},
			true
		);
		onBlogPostUpdated();
	};

	const handleDelete = async () => {
		const res = await fetch(
			`/blog-posts/${blogPost._id}`,
			{
				method: "DELETE",
			},
			true
		);
		onBlogPostUpdated();
	};

	return (
		<article className={isBlogCard ? "blog-card" : "blog-post"}>
			<header className="blog-header">
				<h2>
					<ContentDisplay htmlContent={title} />
				</h2>
				<aside>
					<h4>{author}</h4>
					<h4>{dateFormatted}</h4>
				</aside>
			</header>
			<main className="blog-content">
				<p className={isBlogCard ? "truncate" : ""}>
					<ContentDisplay htmlContent={content} />
				</p>
			</main>
			{user._id === blogPostUser._id && !isBlogCard ? (
				<BlogPostControlls
					title={title}
					onTitleChanged={onTitleChanged}
					content={content}
					onContentChanged={onContentChanged}
					handleUpdate={handleUpdate}
					handleDelete={handleDelete}
				/>
			) : null}
		</article>
	);
}
