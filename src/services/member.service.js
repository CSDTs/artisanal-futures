import axios from "axios";
import useSWR from "swr";

const BASE_URL = "https://fourm.artisanalfutures.org/wp-json/";
const WP_API_URL = `${BASE_URL}wp/v2`;
const WP_ACF_URL = `${BASE_URL}acf/v3`;

const WP_API_MEMBERSHIP = "https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/";

const checkMembershipStatus = () => {
	return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).membership_id : null;
};

const getWPData = (url) => {
	return axios
		.get(WP_API_URL + url, {
			headers: {
				"Content-Type": "application/json",
				// Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
			},
		})
		.then((response) => {
			return response.data;
		});
};

const postMembershipData = (id, payload) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/${id}`;
	return axios
		.post(
			address,
			{
				fields: payload,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")).token,
				},
			}
		)
		.then((response) => {
			console.log(response.data);
			return response.data;
		});
};

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

const getMemberInformationACF = (id) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/${id}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data.acf);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		user: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const getMemberInformation = (id) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		user: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const getCurrentMemberInformation = () => {
	const id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).membership_id : -1;

	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`;
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		user: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const getMemberInformationBySlug = (slug) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members`;
	const fetcher = async (url) => await axios.get(url, { params: { slug: slug } }).then((res) => res.data[0].acf);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		artisan: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const MemberService = {
	getWPData,
	getCurrentMemberInformation,
	checkMembershipStatus,
	getMemberInformation,
	publishMembershipData,
	postMembershipData,
	getMemberInformationBySlug,
	getMemberInformationACF,
};

export default MemberService;
