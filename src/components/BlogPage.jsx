import { useEffect, useState } from "react";
import BlogComment from "./BlogComment";
import BlogPost from "./BlogPost";
import { useLocation } from "react-router-dom";
import useFetchWithAuth from "../api/fetch";

export default function BlogPage() {
	const location = useLocation();
	const { blogPost: currentBlogPost } = location.state;
	const [comments, setComments] = useState([]);
	const [blogPost, setBlogPost] = useState(currentBlogPost);
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

	const fetchBlogPost = async () => {
		try {
			const res = await fetch(`/blog-posts/${blogPost._id}`);
			if (!res.ok) throw new Error("Failed to fetch blog post");

			const json = await res.json();
			setBlogPost(json.data);
		} catch (error) {
			console.error("Error fetching blog post: ", error);
		}
	};

	const onBlogPostUpdated = () => {
		fetchBlogPost();
	};

	useEffect(() => {
		fetchBlogComments();
	}, []);

	return (
		<>
			<BlogPost
				blogPost={blogPost}
				onBlogPostUpdated={onBlogPostUpdated}
			/>

			<div className="blog-comments-container">
				<h2>Comments</h2>
				<ol className="blog-comments">
					{comments.map((comment) => (
						<li key={comment._id}>
							<BlogComment comment={comment} />
						</li>
					))}
				</ol>
			</div>
		</>
	);
}
