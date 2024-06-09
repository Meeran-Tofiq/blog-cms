import { useForm } from "react-hook-form";
import useFetchWithAuth from "../api/fetch";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm({}) {
	const { register, handleSubmit } = useForm();
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();
	const fetch = useFetchWithAuth();

	async function onSubmit(formData, event) {
		event.preventDefault();

		const res = await fetch("/users/login", {
			method: "POST",
			body: JSON.stringify(formData),
		});
		const json = await res.json();
		const { token, user } = json.data;

		login(token, user);
		navigate(-1);
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<fieldset>
				<legend>Login Info</legend>

				<label htmlFor="username">Username: </label>
				<input
					type="text"
					id="username"
					{...register("username", { required: true })}
				/>

				<label htmlFor="password">Password: </label>
				<input
					type="password"
					id="password"
					{...register("password", { required: true })}
				/>
			</fieldset>

			<button type="submit">Log In</button>
		</form>
	);
}
