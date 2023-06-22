import AuthService from "@/services/auth.service";
import axios from "axios";

const ACF_MEMBERS_URL = import.meta.env.VITE_API_URL + "acf/v3/people/";

// const postArtisanData = (payload) => {
// 	const userID = AuthService.getCurrentUser().membership_id;
// 	const address = `${ACF_MEMBERS_URL}${userID}`;
// 	let headers = {};
// 	headers["Content-Disposition"] = "application/json";
// 	headers["Authorization"] = `Bearer ${AuthService.getCurrentUser().token}`;

// 	return axios.post(address, { fields: payload }, { headers: headers }).then((response) => {
// 		return response.data;
// 	});
// };

const createArtisan = async (account, business) => {
	await postArtisanData({ account })
		.then((res) => {
			return res;
		})
		.catch((err) => console.log(err));
};

export default createArtisan;
