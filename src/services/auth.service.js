import axios from "axios";

const WP_API_URL = "https://fourm.artisanalfutures.org/wp-json/";
const loginHeaders = {
	"Content-Type": "application/json",
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
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
	login,
	logout,
	getCurrentUser,
};

export default AuthService;
