import axios from "axios";

const WP_API_URL = "https://fourm.artisanalfutures.org/wp-json/";
const loginHeaders = {
	"Content-Type": "application/json",
};

const authHeaders = {
	"Content-Type": "application/json",

	Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
};

const login = (payload) => {
	return axios
		.post(WP_API_URL + "jwt-auth/v1/token", payload, {
			loginHeaders,
		})
		.then((response) => {
			console.log(response);
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data));
			}
			return response.data;
		});
};
const logout = () => {
	localStorage.removeItem("user");
	localStorage.removeItem("user_id");
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const getUserInformation = () => {
	let payload = {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
		},
		params: { search: JSON.parse(localStorage.getItem("user")).user_email },
	};

	return axios.get(WP_API_URL + "wp/v2/users", payload).then((response) => {
		localStorage.setItem("user_id", response.data[0].id);
		return response.data;
	});
};

const updateUserInformation = (payload) => {
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(WP_API_URL + "wp/v2/users/" + JSON.parse(localStorage.getItem("user_id")), temp, {
			headers: authHeaders,
		})
		.then((response) => {
			console.log(response);

			return response.data;
		});
};

const updateArtisanInformation = (id, payload) => {
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(WP_API_URL + "wp/v2/artisans/" + id, temp, {
			headers: authHeaders,
		})
		.then((response) => {
			console.log(response);

			return response.data;
		});
};

const AuthService = {
	login,
	logout,
	getCurrentUser,
	updateUserInformation,
	getUserInformation,
	updateArtisanInformation,
};

export default AuthService;
