import axios from "axios";
import useSWR from "swr";

/**
 * General use fetches for any type of user
 */

const BASE_URL = "https://forum.artisanalfutures.org/wp-json/";
const WP_ENDPOINT = `${import.meta.env.VITE_API_URL}wp/v2`;
const ACF_ENDPOINT = `${import.meta.env.VITE_API_URL}acf/v3`;

const WP_API_MEMBERSHIP = "https://forum.artisanalfutures.org/wp-json/acf/v3/af_members/";

const fetchData = (url) => {
	const fetcher = async (url) => await axios.get(url).then((res) => res.data);

	const { data, error } = useSWR(url, fetcher, {
		revalidateOnFocus: true,
	});

	return {
		data: data,
		isLoading: !error && !data,
		isError: error,
	};
};

const FetchService = {
	fetchData,
};

export default FetchService;
