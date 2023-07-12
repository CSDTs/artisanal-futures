import axios, { AxiosInstance } from "axios";
import { useEffect, useMemo, useState } from "react";
import { set } from "react-hook-form";

type LoginPayload = {
	username: string;
	password: string;
};

const TOKEN_URL = `${import.meta.env.VITE_API_URL}jwt-auth/v1/token`;
const WP_USER_URL = `${import.meta.env.VITE_API_URL}wp/v2/users/`;

const useAuth = () => {
	const [authenticated, setAuthenticated] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [token, setToken] = useState<string | null>(null);
	const [userID, setUserID] = useState<string | null>(null);
	const [membershipID, setMembershipID] = useState<string | null>(null);

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

	useEffect(() => {
		const storedToken = localStorage.getItem("token") as string;
		const storedUserID = localStorage.getItem("userID") as string;
		const storedMembershipID = localStorage.getItem("membershipID") as string;

		if (storedToken) {
			setToken(storedToken);
			setAuthenticated(true);
		}
		if (storedUserID) setUserID(storedUserID);

		if (storedMembershipID) setMembershipID(localStorage.getItem("membershipID") as string);

		setLoading(false);
	}, []);

	useEffect(() => {
		const storedToken = localStorage.getItem("token") as string;
		if (token) localStorage.setItem("token", token);
		else if (storedToken) localStorage.setItem("token", storedToken);
		else localStorage.removeItem("token");
	}, [token]);

	useEffect(() => {
		const storedUserID = localStorage.getItem("userID") as string;
		if (userID) localStorage.setItem("userID", userID);
		else if (storedUserID) localStorage.setItem("userID", storedUserID);
		else localStorage.removeItem("userID");
	}, [userID]);

	useEffect(() => {
		const storedMembershipID = localStorage.getItem("membershipID") as string;
		if (membershipID) localStorage.setItem("membershipID", membershipID);
		else if (storedMembershipID) localStorage.setItem("membershipID", storedMembershipID);
		else localStorage.removeItem("membershipID");
	}, [membershipID]);

	const login = async (payload: LoginPayload) => {
		setLoading(true);
		return api
			.post(TOKEN_URL, payload)
			.then((response) => {
				if (!response.data.token) throw new Error("Login failed");
				setToken(response.data.token);
				setUserID(response.data.user_id);
				setMembershipID(response.data.acf.membership);
				setAuthenticated(true);
			})
			.catch((error) => {
				console.error(error);
				setAuthenticated(false);
				setToken(null);
				setUserID(null);
				setMembershipID(null);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const logout = async () => {
		localStorage.removeItem("token");
		localStorage.removeItem("userID");
		localStorage.removeItem("membershipID");

		window.location.href = "/";
	};

	return { authenticated, loading, login, logout, membershipID, userID, token };
};
export default useAuth;
