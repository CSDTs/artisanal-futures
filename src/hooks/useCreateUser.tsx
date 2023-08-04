import axios, { AxiosInstance } from "axios";
import { useMemo, useState } from "react";
import useAuth from "./useAuth";

interface CreateUserProps {
	username: string;
	email: string;
	password: string;
	access_code: string;
}

const useCreateUser = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { token, login, userID } = useAuth();

	const api: AxiosInstance = useMemo(
		() =>
			axios.create({
				baseURL: import.meta.env.VITE_API_URL,
				headers: {
					"Content-Type": "application/json",
				},
			}),
		[]
	);

	api.interceptors.request.use((config) => {
		config.headers = config.headers || {};
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	const createUser = async (payload: CreateUserProps) => {
		setIsLoading(true);
		setError(null);

		const formattedPayload = {
			user_login: payload.username,
			user_nicename: payload.username,
			email: payload.email,
			password: payload.password,
			ArtisanAccessCode: payload.access_code,
		};

		const membershipPayload = {
			title: payload.username,
			fields: { user: userID },
		};

		await api
			.post("simple-jwt-login/v1/users", formattedPayload)
			.then((request: any) => {
				console.log(request.data);
				if (!request.data.jwt) throw new Error("Error creating new user. JWT not found.");
			})
			.catch((error) => {
				console.error("Create new: ", error);
			});

		await login({ username: payload.username, password: payload.password }).catch((error) => {
			console.error("Login: ", error);
		});

		const id = await api
			.post("wp/v2/af_members", membershipPayload)
			.then((response: any) => {
				localStorage.setItem("membershipID", response.data.id);
				return response.data.id;
			})
			.catch((error) => {
				console.error("Id: ", error);
			});

		await api
			.post(`acf/v3/users/${userID}`, { fields: { membership: id } })
			.then((data: any) => {
				window.location.href = "/profile";
			})
			.catch((error) => {
				console.error("Finalize: ", error);
			});
	};

	return { createUser, isLoading, error };
};

export default useCreateUser;
