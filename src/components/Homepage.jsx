import { useEffect, useState } from "react";
import HeroImage from "./HeroImage";
import BlogCard from "./BlogCard";
import useFetchWithAuth from "../api/fetch";

export default function Homepage({}) {
	const [blogPosts, setBlogPosts] = useState([]);
	const fetch = useFetchWithAuth();

	const fetchBlogs = async () => {
		try {
			const res = await fetch("/blog-posts");
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
		fetchBlogs();
	}, []);

	return (
		<>
			<HeroImage imageUrl={"/images/heroImage.jpg"}>
				<h1>HEAR THE VOICE OF THE WORLD</h1>
			</HeroImage>

			<ol className="blog-post-list">
				{blogPosts.map((blogPost) => (
					<li key={blogPost._id}>
						<BlogCard blogPost={blogPost}></BlogCard>
					</li>
				))}
			</ol>
		</>
	);
}
