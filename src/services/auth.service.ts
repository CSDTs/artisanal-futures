import axios from "axios";

const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
const WP_USER_URL = import.meta.env.VITE_API_URL + "wp/v2/users/";

const getUser = (id) => {
	return axios.get(WP_USER_URL + id, {
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer  " + JSON.parse(localStorage.getItem("user")).token,
		},
	});
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};
const setCurrentUser = (data) => {
	localStorage.setItem("user", JSON.stringify(data));
};

const getCurrentUserMembershipId = () => {
	return JSON.parse(localStorage.getItem("user") as string).membership_id;
};

const updateCurrentUser = (data) => {
	let user = getCurrentUser();
	user = { ...user, ...data };
	setCurrentUser(user);
};

const getCurrentUserToken = () => {
	return JSON.parse(localStorage.getItem("user"))?.token;
};

const login = (payload) => {
	return axios
		.post(TOKEN_URL, payload, {
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => {
			if (response.data.token) {
				setCurrentUser(response.data);
				return getUser(response.data.user_id).then((res) => {
					updateCurrentUser({ membership_id: res.data.acf.membership });

					return response.data;
				});
			}

			return response.data;
		});
};
const verifyToken = () => {
	return axios
		.post(
			import.meta.env.VITE_API_URL + "jwt-auth/v1/token/validate",
			{},

			{
				headers: {
					Authorization: "Bearer " + getCurrentUserToken(),
				},
			}
		)
		.then((response) => {
			if (response.status == 200) {
				return getUserInformation();
			}
			return response.data;
		});
};

const logout = () => {
	localStorage.removeItem("user");
	window.location.href = "/";
};

const AuthService = {
	login,
	logout,
	getCurrentUser,

	getCurrentUserToken,
	// updateArtisanInformation,
	verifyToken,
	updateCurrentUser,
	setCurrentUser,

	getCurrentUserMembershipId,
};

export default AuthService;
