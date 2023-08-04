import { AccountData, BusinessData } from "@/types";
import axios, { AxiosInstance } from "axios";
import { useMemo } from "react";

const ACF_MEMBERS_URL = import.meta.env.VITE_API_URL + "acf/v3/people/";
const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
const WP_USER_URL = import.meta.env.VITE_API_URL + "wp/v2/users/";
const MEMBER_UPDATE_URL = import.meta.env.VITE_API_URL + "wp/v2/af_members/";

const createWPSafeData = (account: AccountData) => {
	return {
		name: `${account.first_name} ${account.last_name}`,
		nickname: `${account.first_name} ${account.last_name}`,
		user_firstname: account.first_name,
		user_lastname: account.last_name,
		meta: {
			profile_image: account.profile_image_url,
		},
	};
};

const createACFSafeData = (account: AccountData, business: BusinessData) => {
	return {
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
};

const createArtisan = async (
	account: AccountData,
	business: BusinessData,
	token: string,
	membershipID: string,
	userID: string
) => {
	const wpSafeData = createWPSafeData(account);
	const acfSafeData = createACFSafeData(account, business);

	const api: AxiosInstance = axios.create({
		baseURL: import.meta.env.VITE_API_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});

	api.interceptors.request.use((config) => {
		config.headers = config.headers || {};
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	// Checks for first time setup. Other defaults to account edit
	await api.post(`acf/v3/people/${membershipID}`, { fields: { first_time_setup: true } }).then((response) => {
		console.info("First time setup complete");
		return response.data;
	});

	// Update account information
	await api.post(`wp/v2/users/${userID}`, wpSafeData).then((response) => {
		console.info("WordPress data complete");
		return response.data;
	});

	// Update ACF information (Members)
	await api.post(`acf/v3/people/${membershipID}`, { fields: acfSafeData }).then((response) => {
		console.info("ACF data complete");
		return response.data;
	});

	// Publish membership for public view
	await api
		.post(`wp/v2/af_members/${membershipID}`, { status: "publish" })
		.then((response) => {
			if (response.status === 200) {
				// navigate("/profile");
				// window.location.reload();
				console.log("Successful publish");
			} else {
				// TODO: Add error alert to notify user to try again later
				throw new Error("User was unsuccessful with updating information.");
			}
		})
		.catch((err) => {
			console.error(err);
		});
};

export default createArtisan;
