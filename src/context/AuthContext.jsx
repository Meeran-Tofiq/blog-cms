// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create a context with default values
const AuthContext = createContext({
	token: null,
	user: null,
	login: () => {},
	logout: () => {},
	isAuthenticated: false,
});

// Create a provider component
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
	const [isAuthenticated, setIsAuthenticated] = useState(!!token);

	useEffect(() => {
		if (token) {
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	}, [token, user]);

	const login = (newToken, userData) => {
		setToken(newToken);
		setUser(userData);
		setIsAuthenticated(true);
	};

	const logout = () => {
		setToken(null);
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider
			value={{ token, user, login, logout, isAuthenticated }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
