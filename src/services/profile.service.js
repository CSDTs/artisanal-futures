import axios from "axios";

const WP_API_URL = "https://fourm.artisanalfutures.org/wp-json/wp/v2";

const getProfile = (id) => {
	return axios
		.get(WP_API_URL + "/artisans/" + id, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		})
		.then((response) => {
			return response.data;
		});
};
const updateProfile = (payload, id) => {
	console.log(payload);
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(
			WP_API_URL + "/artisans/" + id,
			{ fields: temp },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
				},
			}
		)
		.then((response) => {
			console.log(response);
			return response.data;
		});
};
const publishProfile = (id) => {
	return axios
		.post(
			WP_API_URL + "/artisans/" + id,
			{ status: "publish" },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
				},
			}
		)
		.then((response) => {
			return response.data;
		});
};

const ProfileService = {
	getProfile,
	updateProfile,
	publishProfile,
};

export default ProfileService;
