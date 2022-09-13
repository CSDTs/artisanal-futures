import axios from "axios";
import useSWR from "swr";

const BASE_URL = "https://fourm.artisanalfutures.org/wp-json/";
const WP_API_URL = `${BASE_URL}wp/v2`;
const WP_ACF_URL = `${BASE_URL}acf/v3`;

const WP_API_MEMBERSHIP = "https://fourm.artisanalfutures.org/wp-json/acf/v3/af_members/";

const getMemberInformationBySlug = (slug) => {
	const address = `https://fourm.artisanalfutures.org/wp-json/wp/v2/af_members`;
	const fetcher = async (url) => await axios.get(url, { params: { slug: slug } }).then((res) => res.data[0].acf);

	const { data, error } = useSWR(address, fetcher, {
		revalidateOnFocus: true, // auto revalidate when the window is focused
	});

	return {
		artisan: data,
		business: data?.business,
		profile: data?.profile,
		profile_image: data?.profile_image,
		isLoading: !error && !data,
		isError: error,
	};
};

const DetailsService = {
	getMemberInformationBySlug,
};

export default DetailsService;
