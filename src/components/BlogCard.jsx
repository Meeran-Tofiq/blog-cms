import { useNavigate } from "react-router-dom";
import BlogPost from "./BlogPost";

export default function BlogCard({ blogPost }) {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/blog-post/${blogPost._id}`, { state: { blogPost } });
	};

	return (
		<div
			role="button"
			onClick={handleClick}
			onKeyDown={(e) => {
				if (e.key === "Enter") handleClick();
			}}
			tabIndex={0}
			aria-label={`Read more about ${blogPost.title}`}
			style={{ cursor: "pointer" }}
		>
			<BlogPost blogPost={blogPost} isBlogCard={true} />
		</div>
	);
}
