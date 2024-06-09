import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

/**
 * A wrapper component that redirects authenticated users to the homepage.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The component to render if the user is not authenticated.
 * @returns {JSX.Element} The rendered component or a redirect.
 */
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useContext(AuthContext);

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return children;
};

export default ProtectedRoute;
