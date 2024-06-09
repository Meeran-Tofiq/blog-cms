export default function HeroImage({ imageUrl, children }) {
	return (
		<div
			className="hero-image-container"
			style={{ backgroundImage: `url(${imageUrl})` }}
		>
			<div className="overlay">{children}</div>
		</div>
	);
}
