import axios from "axios";
import useSWR from "swr";

/**
 * General use fetches for any type of user
 */

const BASE_URL = "https://fourm.artisanalfutures.org/wp-json/";
const WP_ENDPOINT = `${import.meta.env.VITE_API_URL}wp/v2`;
const ACF_ENDPOINT = `${import.meta.env.VITE_API_URL}acf/v3`;

const WP_API_MEMBERSHIP = "https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/";

const fetchArtisans = (id = "") => {
	const address = `${WP_ENDPOINT}/af_members/${id}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const createCardIcons = (profile, business) => {};

// const getWPData = (url) => {
// 	return axios
// 		.get(WP_API_URL + url, {
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		})
// 		.then((response) => {
// 			return response.data;
// 		});
// };

// const postMembershipData = (id, payload) => {
// 	const address = `https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/${id}`;
// 	return axios
// 		.post(
// 			address,
// 			{
// 				fields: payload,
// 			},
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
// 				},
// 			}
// 		)
// 		.then((response) => {
// 			return response.data;
// 		});
// };

// const publishMembershipData = (id) => {
// 	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
// 	return axios
// 		.post(
// 			address,
// 			{ status: "publish" },
// 			{
// 				headers: {
// 					"Content-Type": "application/json",
// 					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
// 				},
// 			}
// 		)
// 		.then((response) => {
// 			return response.data;
// 		});
// };

// const getMemberInformationACF = (id) => {
// 	const address = `https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/${id}`;
// 	const fetcher = async (url) => await axios.get(url).then((res) => res.data.acf);

// 	const { data, error } = useSWR(address, fetcher, {
// 		revalidateOnFocus: true, // auto revalidate when the window is focused
// 	});

// 	return {
// 		user: data,
// 		isLoading: !error && !data,
// 		isError: error,
// 	};
// };

// const getMemberInformation = (id) => {
// 	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
// 	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

// 	const { data, error } = useSWR(address, fetcher, {
// 		revalidateOnFocus: true, // auto revalidate when the window is focused
// 	});

// 	return {
// 		user: data,
// 		isLoading: !error && !data,
// 		isError: error,
// 	};
// };

// const getMemberInformationBySlug = (slug) => {
// 	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members`;
// 	const fetcher = async (url) => await axios.get(url, { params: { slug: slug } }).then((res) => res.data[0].acf);

// 	const { data, error } = useSWR(address, fetcher, {
// 		revalidateOnFocus: true, // auto revalidate when the window is focused
// 	});

// 	return {
// 		artisan: data,
// 		isLoading: !error && !data,
// 		isError: error,
// 	};
// };

const ArtisanService = {
	fetchArtisans,
};

export default ArtisanService;
