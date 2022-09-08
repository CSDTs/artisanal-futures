import axios from "axios";
import useSWR from "swr";
import AuthService from "../../../services/auth.service";

const ACF_MEMBERS_URL = import.meta.env.VITE_API_URL + "acf/v3/af_members/";
const WP_MEDIA_URL = import.meta.env.VITE_API_URL + "wp/v2/media";

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

const uploadMedia = (payload, callback) => {
	if (!payload.selectedFile) return;

	let formData = new FormData();
	let file = payload.selectedFile;
	formData.append("file", file);
	formData.append("title", file.name);

	let headers = {};
	headers["Content-Disposition"] = "form-data; filename='" + file.name + "'";
	headers["Authorization"] = `Bearer ${AuthService.getCurrentUser().token}`;
	axios.post(WP_MEDIA_URL, formData, { headers: headers }).then((res) => callback(res));
};

const updateProfileDataWithMedia = (payload, mediaPayload) => {
	let media = Object.values(payload)[0];
	let callback = (res) => updateProfileData(mediaPayload(res.data));
	uploadMedia(media, callback);
	return updateProfileData(payload);
};

const updateUserDataWithMedia = (payload, mediaPayload) => {
	let callback = (res) => updateProfileData(mediaPayload(res.data));
	uploadMedia(payload, callback);

	return AuthService.updateUserInformation({
		...payload,
		name: payload.first_name + " " + payload.last_name,
		nickname: payload.first_name + " " + payload.last_name,
	}).then(() =>
		updateProfileData({
			full_name: payload.first_name + " " + payload.last_name,
		})
	);
};

const getProfileData = () => {
	const userID = AuthService.getCurrentUser().membership_id;
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

// Sinc
const publishMembershipData = (id) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
	return axios
		.post(
			address,
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
	updateProfileData,
	uploadMedia,
	updateProfileDataWithMedia,
	updateUserDataWithMedia,
	getProfileData,
};

export default ProfileService;
