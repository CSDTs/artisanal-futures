import axios from "axios";
import useSWR from "swr";

const WP_HOST = import.meta.env.VITE_API_URL;

const getMemberInformationBySlug = (slug) => {
	const address = `${WP_HOST}${import.meta.env.VITE_ARTISAN_ENDPOINT}`;
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
