import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App({ children }) {
	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
