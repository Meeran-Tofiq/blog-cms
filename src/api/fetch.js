import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useFetchWithAuth = () => {
	const { token } = useContext(AuthContext);

	/**
	 * Fetches a resource with an optional Authorization header if a token is available.
	 *
	 * @param {string} url - The URL of the resource.
	 * @param {Object} [options={}] - Additional fetch options.
	 * @param {boolean} [requireAuth=false] - Whether the token is required.
	 * @returns {Promise<Object>} The response data as a JSON object.
	 * @throws Will throw an error if the request fails or if no token is available when required.
	 */
	const fetchWithAuth = async (url, options = {}, requireAuth = false) => {
		const headers = options.headers || {};

		// Check if token is required but not available
		if (requireAuth && !token) {
			return Promise.reject(new Error("no auth token was available"));
		}

		if (token) {
			headers["Authorization"] = `Bearer ${token}`;
		}

		const response = await fetch(import.meta.env.VITE_API_URL + url, {
			...options,
			headers: {
				...headers,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		return response;
	};

	return fetchWithAuth;
};

export default useFetchWithAuth;
