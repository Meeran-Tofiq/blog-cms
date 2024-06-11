import { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import useFetchWithAuth from "../api/fetch";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserBlogPosts({}) {
	const [blogPosts, setBlogPosts] = useState([]);
	const { user } = useContext(AuthContext);
	const fetch = useFetchWithAuth();
	const navigate = useNavigate();

	const fetchBlogs = async () => {
		try {
			const res = await fetch(`/users/${user._id}/blog-posts`, {}, true);
			if (!res.ok) {
				throw new Error("Failed to fetch blog posts");
			}
			const json = await res.json();
			setBlogPosts(json.data);
		} catch (error) {
			console.error("Error fetching blog posts: ", error);
		}
	};

	useEffect(() => {
		if (user) fetchBlogs();
	}, [user]);

	const handleNewPostClick = () => {
		navigate("/blog-post/create");
	};

	return user ? (
		<ol className="blog-post-list">
			{blogPosts.map((blogPost) => (
				<li key={blogPost._id}>
					<BlogCard blogPost={blogPost}></BlogCard>
				</li>
			))}
			<li
				key={"new-post"}
				role="button"
				onClick={handleNewPostClick}
				onKeyDown={(e) => {
					if (e.key === "Enter") handleNewPostClick();
				}}
				tabIndex={0}
				aria-label={`Create a new post.`}
				style={{ cursor: "pointer" }}
			>
				+
			</li>
		</ol>
	) : (
		<p className="homepage-text">
			Log in to access your blog posts, and make new ones
		</p>
	);
}
