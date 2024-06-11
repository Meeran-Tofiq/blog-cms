import { useEffect, useState } from "react";
import BlogComment from "./BlogComment";
import BlogPost from "./BlogPost";
import { useLocation } from "react-router-dom";
import useFetchWithAuth from "../api/fetch";

export default function BlogPage() {
	const location = useLocation();
	const { blogPost } = location.state;
	const [comments, setComments] = useState([]);
	const fetch = useFetchWithAuth();

	const fetchBlogComments = async () => {
		try {
			const res = await fetch(`/blog-posts/${blogPost._id}/comments`);
			if (!res.ok)
				throw new Error("Failed to fetch comments for this post");

			const json = await res.json();
			setComments(json.data);
		} catch (error) {
			console.error("Error fetching blog post comments: ", error);
		}
	};

	useEffect(() => {
		fetchBlogComments();
	}, []);

	const handleCommentUpdated = () => {
		fetchBlogComments();
	};

	return (
		<>
			<BlogPost blogPost={blogPost} />

			<div className="blog-comments-container">
				<h2>Comments</h2>
				<ol className="blog-comments">
					{comments.map((comment) => (
						<li key={comment._id}>
							<BlogComment
								comment={comment}
								onCommentUpdated={handleCommentUpdated}
							/>
						</li>
					))}
				</ol>
			</div>
		</>
	);
}
