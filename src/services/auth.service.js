import axios from "axios";

const WP_API_URL = "https://fourm.artisanalfutures.org/wp-json/";
const loginHeaders = {
	"Content-Type": "application/json",
};

// const authHeaders = {
// 	"Content-Type": "application/json",

// 	Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
// };

// const validateHeaders = {
// 	Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
// };

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

const isApproved = () => {
	if (!JSON.parse(localStorage.getItem("user"))) return;
	let payload = {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
		},
	};

	return axios.get(WP_API_URL + "wp/v2/users/me", payload).then((response) => {
		console.log(response.data?.afc?.is_approved || false);
		// let user = JSON.parse(localStorage.getItem("user"));
		// user = { ...user, ...{ membership_id: response.data[0].acf.membership } };
		// localStorage.setItem("user_id", response.data[0].id);
		// localStorage.setItem("user", JSON.stringify(user));

		// console.log(response.data[0].acf.membership);
		// return response.data;
	});
};

const setProfileImage = () => {
	let payload = {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
		},
	};

	return axios
		.get(WP_API_URL + "wp/v2/af_members/" + JSON.parse(localStorage.getItem("user")).membership_id, payload)
		.then((response) => {
			let user = JSON.parse(localStorage.getItem("user"));
			user = { ...user, ...{ profile_image: response.data.acf.profile_image } };
			localStorage.setItem("user", JSON.stringify(user));
			return true;
		});
};
const loginAlt = (payload) => {
	return axios
		.post(WP_API_URL + "jwt-auth/v1/token", payload, {
			loginHeaders,
		})
		.then((response) => {
			if (response.data.token) {
				localStorage.setItem("user", JSON.stringify(response.data));
				return axios
					.get(WP_API_URL + "wp/v2/users/" + response.data.user_id, {
						headers: {
							"Content-Type": "application/json",
							Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
						},
					})
					.then((res) => {
						let user = JSON.parse(localStorage.getItem("user"));
						user = { ...user, ...{ membership_id: res.data.acf.membership } };
						// user = { ...user, ...{ avatar: res.data.acf.profile_image } };
						localStorage.setItem("user", JSON.stringify(user));

						return response.data;
					});
			}

			return response.data;
		});
};
const verifyToken = () => {
	return axios
		.post(
			WP_API_URL + "jwt-auth/v1/token/validate",
			{},

			{
				headers: {
					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
				},
			}
		)
		.then((response) => {
			console.log(response);
			if (response.status == 200) {
				return getUserInformation();
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
	if (!JSON.parse(localStorage.getItem("user"))) throw new Error("User not logged in");
	let payload = {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
		},
		params: { search: JSON.parse(localStorage.getItem("user")).user_email },
	};

	return axios.get(WP_API_URL + "wp/v2/users", payload).then((response) => {
		console.log(response);
		let user = JSON.parse(localStorage.getItem("user"));
		user = { ...user, ...{ membership_id: response.data[0].acf.membership } };
		localStorage.setItem("user_id", response.data[0].id);
		localStorage.setItem("user", JSON.stringify(user));

		console.log(response.data[0].acf.membership);
		return response.data;
	});
};

const updateUserInformation = (payload) => {
	if (!JSON.parse(localStorage.getItem("user"))) throw new Error("User not logged in");
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(WP_API_URL + "wp/v2/users/" + JSON.parse(localStorage.getItem("user")).user_id, temp, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		})
		.then((response) => {
			console.log(response);

			return response.data;
		});
};

const updateArtisanInformation = (id, payload) => {
	if (!JSON.parse(localStorage.getItem("user"))) throw new Error("User not logged in");
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(WP_API_URL + "wp/v2/artisans/" + id, temp, {
			headers: {
				"Content-Type": "application/json",

				Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
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
	verifyToken,
	loginAlt,
	isApproved,
	setProfileImage,
};

export default AuthService;
