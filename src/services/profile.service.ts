import axios from "axios";
import AuthService from "./auth.service";

const WP_API_URL = "https://forum.artisanalfutures.org/wp-json/wp/v2";

const getProfile = (id: number) => {
	const endpoint = `${WP_API_URL}/artisans/${id}`;
	return postToWordPressAPI(endpoint, {}, "GET");
};

const updateProfile = (payload: Object, id: number) => {
	const endpoint = `${WP_API_URL}/artisans/${id}`;
	const filteredFields = Object.entries(payload).reduce((a: any, [k, v]: [any, any]) => (v ? ((a[k] = v), a) : a), {});

	return postToWordPressAPI(endpoint, filteredFields);
};

const publishProfile = (id: number) => {
	const endpoint = `${WP_API_URL}/artisans/${id}`;
	const payload = { status: "publish" };

	return postToWordPressAPI(endpoint, payload);
};

const postToWordPressAPI = async (endpoint: string, payload: Object, method: string = "POST") => {
	const token = await AuthService.getCurrentUserToken();
	const authorization = token ? `Bearer ${token}` : "";

	const returnData = (response: any) => {
		return response?.data;
	};

	const returnError = (error: any) => {
		console.error(`${method}: `, error);
	};

	if (method === "POST") {
		return axios
			.post(endpoint, payload, {
				headers: {
					"Content-Type": "application/json",
					Authorization: authorization,
				},
			})
			.then(returnData)
			.catch(returnError);
	}
	return axios
		.get(endpoint, {
			headers: {
				"Content-Type": "application/json",
				Authorization: authorization,
			},
		})
		.then(returnData)
		.catch(returnError);
};

const ProfileService = {
	getProfile,
	updateProfile,
	publishProfile,
};

export default ProfileService;
