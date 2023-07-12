import AuthService from "@/services/auth.service";
import { AccountData, BusinessData } from "@/types";
import axios from "axios";

const ACF_MEMBERS_URL = import.meta.env.VITE_API_URL + "acf/v3/people/";
const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
const WP_USER_URL = import.meta.env.VITE_API_URL + "wp/v2/users/";
const MEMBER_UPDATE_URL = import.meta.env.VITE_API_URL + "wp/v2/af_members/";

const { getCurrentUser, getCurrentUserToken, setCurrentUser } = AuthService;

const updateWordPressUserInformation = (payload: any) => {
	if (!getCurrentUser()) throw new Error("User not logged in");
	let temp = Object.entries(payload).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});

	return axios
		.post(WP_USER_URL + getCurrentUser().user_id, temp, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + getCurrentUserToken(),
			},
		})
		.then((response) => {
			console.log(response);

			return response.data;
		});
};

const updateMembershipInformation = (payload: any) => {
	const userID = AuthService.getCurrentUser().membership_id;
	const address = `${ACF_MEMBERS_URL}${userID}`;

	let headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${AuthService.getCurrentUser().token}`,
	};

	return axios.post(address, { fields: payload }, { headers: headers }).then((response) => {
		console.log(response);
		return response.data;
	});
};

const createArtisan = async (account: AccountData, business: BusinessData) => {
	// FirstTimeSetup
	await updateMembershipInformation({ first_time_setup: true });
	// Update account information
	const wpSafeData = {
		name: `${account.first_name} ${account.last_name}`,
		nickname: `${account.first_name} ${account.last_name}`,
		user_firstname: account.first_name,
		user_lastname: account.last_name,
		meta: {
			profile_image: account.profile_image_url,
		},
	};

	const wpSafeAccountData = {
		...account,
		full_name: `${account.first_name} ${account.last_name}`,
		profile: {
			about_me: account.about_me,
		},
		business: {
			...business,
		},
		opt_ins: {
			forums: {
				moderated: account.moderated_forum,
				unmoderated: account.unmoderated_forum,
				hidden: account.hidden_forum,
				private: account.private_forum,
			},
			supply_chain: account.supply_chain,
		},
	};
	await updateWordPressUserInformation(wpSafeData);
	await updateMembershipInformation(wpSafeAccountData);
};

export default createArtisan;
