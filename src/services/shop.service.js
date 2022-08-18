import axios from "axios";

const WP_API_URL = "https://fourm.artisanalfutures.org/wp-json/wp/v2";
const loginHeaders = {
	"Content-Type": "application/json",
};

const fetchHeaders = {
	"Content-Type": "application/json",
	Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
};

const getShop = (id) => {
	return axios
		.get(WP_API_URL + "/stores/" + id, {
			headers: fetchHeaders,
		})
		.then((response) => {
			return response.data;
		});
};

const getProfile = (id) => {
	return axios
		.get(WP_API_URL + "/artisans/" + id, {
			headers: fetchHeaders,
		})
		.then((response) => {
			return response.data.acf;
		});
};
const updateShop = (id, payload) => {
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});
	return axios
		.post(WP_API_URL + "/stores/" + id, temp, {
			headers: fetchHeaders,
		})
		.then((response) => {
			return response.data;
		});
};

const ShopService = {
	getShop,
	getProfile,
	updateShop,
	// getPropFromProfile,
};

export default ShopService;
