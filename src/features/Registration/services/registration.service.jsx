import axios from "axios";
import useSWR from "swr";
import AuthService from "../../../services/auth.service";

/**
 * General use fetches for any type of user
 */

const BASE_URL = "https://fourm.artisanalfutures.org/wp-json/";
const WP_ENDPOINT = `${import.meta.env.VITE_API_URL}wp/v2`;
const ACF_ENDPOINT = `${import.meta.env.VITE_API_URL}acf/v3`;

const WP_API_MEMBERSHIP = "https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/";
const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
const SIMP_JWT_REGISTER_URL = "https://fourm.artisanalfutures.org/wp-json/simple-jwt-login/v1/users";

// const SIMP_JWT_REGISTER_URL =
// 	"https://fourm.artisanalfutures.org/?rest_route=/simple-jwt-login/v1/users";

const fetchArtisans = (id = "") => {
	const address = `${WP_ENDPOINT}/af_members/${id}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};
const login = (payload) => {
	console.log(payload);
	return axios
		.post(TOKEN_URL, payload, {
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => {
			if (response.data.token) {
				AuthService.setCurrentUser(response.data);
			}

			return response.data;
		});
};
const createNewUser = (data) => {
	const payload = {
		user_login: data.username.value,
		user_nicename: data.username.value,
		email: data.email.value,
		password: data.password.value,
		ArtisanAccessCode: data.code.value,
	};

	return axios
		.post(SIMP_JWT_REGISTER_URL, payload, {
			headers: { "Content-Type": "application/json" },
		})
		.then((res) => {
			return res.data;
		});
};

const debugCreateNewUser = (data) => {};

const updateCurrentUser = (payload) => {
	if (!payload.jwt) throw new Error("Error creating new user");

	let user = {
		token: payload.jwt,
		user_display_name: payload.user.display_name,
		user_email: payload.user.user_email,
		user_id: parseInt(payload.user.ID),
		user_nicename: payload.user.user_nicename,
	};

	localStorage.setItem("user", JSON.stringify(user));
	return true;
	// return axios
	// 	.post(TOKEN_URL, payload, {
	// 		headers: { "Content-Type": "application/json" },
	// 	})
	// 	.then((response) => {
	// 		if (response.data.token) {
	// 			AuthSer(response.data);
	// 			return getUser(response.data.user_id).then((res) => {
	// 				updateCurrentUser({ membership_id: res.data.acf.membership });
	// 				return response.data;
	// 			});
	// 		}

	// 		return response.data;
	// 	});
};
const RegistrationService = {
	fetchArtisans,
	createNewUser,
	updateCurrentUser,
	login,
};

export default RegistrationService;
