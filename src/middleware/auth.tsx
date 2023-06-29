// import ProfileService from "@/features/Profile/services/profile.service";
// import AuthService from "@/services/auth.service";
// import axios from "axios";

// const WP_API_USERS = "https://forum.artisanalfutures.org/wp-json/acf/v3/users/";
// const TOKEN_URL = import.meta.env.VITE_API_URL + "jwt-auth/v1/token";
// const SIMP_JWT_REGISTER_URL = "https://forum.artisanalfutures.org/wp-json/simple-jwt-login/v1/users";

// import { NewUser, ReturningUser } from "@/types";

// const login = (payload: ReturningUser) => {
// 	return postToWordPressAPI(TOKEN_URL, payload)
// 		.then((data) => {
// 			console.log(data);
// 			if (!data.token) return data;
// 			AuthService.setCurrentUser(data);
// 		})
// 		.catch((error) => {
// 			console.error("Login: ", error);
// 		});
// };

// const createNewUser = async (payload: NewUser) => {
// 	const formattedPayload = {
// 		user_login: payload.username,
// 		user_nicename: payload.username,
// 		email: payload.email,
// 		password: payload.password,
// 		ArtisanAccessCode: payload.access_code,
// 	};
// 	return postToWordPressAPI(SIMP_JWT_REGISTER_URL, formattedPayload)
// 		.then((data) => {
// 			if (!data.jwt) throw new Error("Error creating new user. JWT not found.");
// 			login(payload).then(() => {
// 				ProfileService.createMembershipId().then((data: any) => {
// 					const membershipData = { fields: { membership: data.id } };
// 					updateUserACFInformation(membershipData).then(() => {
// 						window.location.href = "/profile";
// 					});
// 				});
// 			});
// 		})
// 		.catch((error) => {
// 			console.error("Create new: ", error);
// 		});
// };

// const updateUserACFInformation = (payload: Object) => {
// 	if (!AuthService.getCurrentUser()) throw new Error("User not logged in");

// 	let filteredMemberData = Object.entries(payload).reduce(
// 		(a: any, [key, value]: [any, any]) => (value ? ((a[key] = value), a) : a),
// 		{}
// 	);

// 	const endpoint = `${WP_API_USERS}${AuthService.getCurrentUser().user_id}`;

// 	return postToWordPressAPI(endpoint, filteredMemberData);
// };

// const postToWordPressAPI = async (endpoint: string, payload: Object) => {
// 	const token = await AuthService.getCurrentUserToken();
// 	const authorization = token ? `Bearer ${token}` : "";

// 	return axios
// 		.post(endpoint, payload, {
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: authorization,
// 			},
// 		})
// 		.then((response) => {
// 			return response.data;
// 		})
// 		.catch((error) => {
// 			console.error("Post error: ", error);
// 		});
// };

// const RegistrationService = {
// 	createNewUser,

// 	login,
// 	updateUserACFInformation,
// };

// export default RegistrationService;
