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
	axios.post(WP_MEDIA_URL, formData, { headers: headers }).then((res) => {
		callback(res);
	});
};

const uploadMediaAlt = (payload) => {
	console.log(payload);
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

const updateProfileImage = (url) => {
	AuthService.updateCurrentUser({ profile_image: url });
};

const updateProfileDataWithMedia = (payload, mediaPayload) => {
	let media = Object.values(payload)[0];
	let callback = (res) => updateProfileData(mediaPayload(res.data));
	uploadMedia(media, callback);
	return updateProfileData(payload);
};

const updateProfileDataWithMediaAlt = (payload) => {
	let media = Object.values(payload)[0];
	let callback = (res) => updateProfileData(mediaPayload(res.data));
	uploadMedia(media, callback);
	return updateProfileData(payload);
};
const updateUserDataWithMedia = (payload, mediaPayload) => {
	let callback = (res) => {
		if (res.data?.source_url) updateProfileImage(res.data.source_url);
		updateProfileData(mediaPayload(res.data));
	};
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

const updateUserDataWithMediaAlt = (payload, source_url) => {
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

const createMembershipId = () => {
	const address = "https://forum.artisanalfutures.org/wp-json/wp/v2/af_members";

	return axios
		.post(
			address,
			{ title: AuthService.getCurrentUser().user_display_name, fields: { user: AuthService.getCurrentUser().user_id } },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + AuthService.getCurrentUserToken(),
				},
			}
		)
		.then((response) => {
			if (response.data.id) AuthService.updateCurrentUser({ membership_id: response.data.id });
			return response.data;
		});
};

const publishMembershipData = (id) => {
	const address = `https://forum.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
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
	createMembershipId,
	uploadMediaAlt,
	updateProfileImage,
	updateUserDataWithMediaAlt,
	updateAccountData,
	updateProfileDataWithMediaAlt,
};

export default ProfileService;
