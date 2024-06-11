import { useContext, useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import useFetchWithAuth from "../api/fetch";
import AuthContext from "../context/AuthContext";

export default function UserBlogPosts({}) {
	const [blogPosts, setBlogPosts] = useState([]);
	const { user } = useContext(AuthContext);
	const fetch = useFetchWithAuth();

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

	return user ? (
		<ol className="blog-post-list">
			{blogPosts.map((blogPost) => (
				<li key={blogPost._id}>
					<BlogCard blogPost={blogPost}></BlogCard>
				</li>
			))}
		</ol>
	) : (
		<p className="homepage-text">
			Log in to access your blog posts, and make new ones
		</p>
	);
}
