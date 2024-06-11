import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Homepage from "./components/Homepage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignUpForm from "./components/SignUpForm.jsx";
import BlogPage from "./components/BlogPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BlogPostBox from "./components/BlogPostBox.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Homepage />,
	},
	{
		path: "/login",
		element: (
			<ProtectedRoute>
				<LoginForm />
			</ProtectedRoute>
		),
	},
	{
		path: "/sign-up",
		element: (
			<ProtectedRoute>
				<SignUpForm />
			</ProtectedRoute>
		),
	},
	{
		path: "/blog-post/:blogPostId",
		element: <BlogPage />,
	},
	{
		path: "/blog-post/create",
		element: <BlogPostBox />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<App>
				<RouterProvider router={router}></RouterProvider>
			</App>
		</AuthProvider>
	</React.StrictMode>
);
