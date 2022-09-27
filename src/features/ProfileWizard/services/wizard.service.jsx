import axios from "axios";
import useSWR from "swr";
import AuthService from "../../../services/auth.service";

const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
const WP_MEDIA_URL = import.meta.env.VITE_API_URL + "wp/v2/media";
const ACF_MEMBERS_URL = import.meta.env.VITE_API_URL + "acf/v3/af_members/";
const MEMBER_UPDATE_URL = import.meta.env.VITE_API_URL + "wp/v2/af_members/";

const getToken = (payload) => {
	return axios
		.post(TOKEN_URL, payload, {
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => {
			return response.data;
		});
};

const uploadMedia = (payload) => {
	if (!payload.selectedFile) return;

	let formData = new FormData();
	let file = payload.selectedFile;
	formData.append("file", file);
	formData.append("title", file.name);

	let headers = {};
	headers["Content-Disposition"] = "form-data; filename='" + file.name + "'";
	headers["Authorization"] = `Bearer ${AuthService.getCurrentUser().token}`;
	return axios
		.post(WP_MEDIA_URL, formData, { headers: headers })
		.then((res) => {
			return res;
		})
		.catch((err) => console.log(err));
};
const uploadAvatar = (payload, source_url) => {
	if (source_url) updateProfileImage(source_url);
	updateProfileData({ profile_image: source_url });

	return AuthService.updateUserInformation({
		...payload,
		name: payload.first_name + " " + payload.last_name,
		nickname: payload.first_name + " " + payload.last_name,
	})
		.then(() =>
			updateProfileData({
				full_name: payload.first_name + " " + payload.last_name,
			})
		)
		.catch((err) => console.log(err));
};
const updateProfileData = (payload) => {
	const userID = AuthService.getCurrentUser().membership_id;
	const address = `${ACF_MEMBERS_URL}${userID}`;
	let headers = {};
	headers["Content-Disposition"] = "application/json";
	headers["Authorization"] = `Bearer ${AuthService.getCurrentUser().token}`;

	return axios.post(address, { fields: payload }, { headers: headers }).then((response) => {
		return response.data;
	});
};

const getProfileData = () => {
	const userID = AuthService.getCurrentUser()?.membership_id;

	const address = `${ACF_MEMBERS_URL}${userID}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data.acf);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		user: data?.user,
		business: data?.business,
		profile: data?.profile,
		modifiers: data?.modifiers,
		profile_image: data?.profile_image,
		isLoading: !error && !data,
		isError: error,
	};
};
const updateProfileImage = (url) => {
	AuthService.updateCurrentUser({ profile_image: url });
};
const updateAccountData = (payload) => {
	return AuthService.updateUserInformation({
		...payload,
		name: payload.first_name + " " + payload.last_name,
		nickname: payload.first_name + " " + payload.last_name,
	})
		.then(() =>
			updateProfileData({
				full_name: payload.first_name + " " + payload.last_name,
			})
		)
		.catch((err) => console.log(err));
};

const publishMembershipData = (id) => {
	const address = `${MEMBER_UPDATE_URL}${id}`;
	return axios
		.post(
			address,
			{ status: "publish" },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + AuthService.getCurrentUserToken(),
				},
			}
		)
		.then((response) => {
			return response;
		});
};

const WizardService = {
	getToken,
	uploadMedia,
	uploadAvatar,
	getProfileData,
	updateProfileData,
	updateAccountData,
	publishMembershipData,
};

export default WizardService;
