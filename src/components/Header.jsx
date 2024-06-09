import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function Header({}) {
	const { isAuthenticated, logout } = useContext(AuthContext);

	return (
		<header className="page-header">
			<a href="/">
				<h1>BLOG</h1>
			</a>
			<nav>
				<ul>
					{isAuthenticated ? (
						<li>
							<button className="link-button" onClick={logout}>
								Log out
							</button>
						</li>
					) : (
						<>
							<li>
								<a href="/sign-up">Sign up</a>
							</li>
							<li>
								<a href="/login">Log in</a>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
}
