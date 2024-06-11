import HeroImage from "./HeroImage";
import BlogCard from "./BlogCard";
import UserBlogPosts from "./UserBlogPosts";

export default function Homepage({}) {
	return (
		<>
			<HeroImage imageUrl={"/images/heroImage.jpg"}>
				<h1>HEAR THE VOICE OF THE WORLD</h1>
			</HeroImage>

			<UserBlogPosts />
		</>
	);
}
