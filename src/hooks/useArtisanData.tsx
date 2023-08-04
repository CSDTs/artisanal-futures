import { AccountData, BusinessData, FormattedData } from "@/types";
import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "react-query";
import useAuth from "./useAuth";

interface ArtisanData {
	artisanData: FormattedData;
	isLoading: boolean;
	error: Error | null;
}

const fetchPostData = async (id: string): Promise<any> => {
	const res = await axios.get(`https://forum.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`);

	return formatArtisanData(res.data);
};

const formatArtisanData = (data: any) => {
	const formattedData: FormattedData = {
		slug: data.slug,
		membership_id: data?.id,
		user_id: data?.acf?.user?.ID,
		first_time_setup: data?.acf?.first_time_setup,
		username: data?.acf?.user?.user_nicename,
		email: data?.acf?.email,
		full_name: data?.acf?.user?.display_name,
		first_name: data?.acf?.user?.user_firstname,
		last_name: data?.acf?.user?.user_lastname,
		moderated_forum: data?.acf?.opt_ins?.forums?.moderated,
		unmoderated_forum: data?.acf?.opt_ins?.forums?.unmoderated,
		hidden_forum: data?.acf?.opt_ins?.forums?.hidden,
		private_forum: data?.acf?.opt_ins?.forums?.private,
		about_me: data?.acf?.profile?.about_me,
		profile_image_url: data?.acf?.profile_image_url,
		profile_image_media_id: null,
		profile_image_file: null,
		supply_chain: data?.acf?.opt_ins?.supply_chain,
		biz_name: data?.acf?.business?.biz_name,
		biz_description: data?.acf?.business?.biz_description,
		website: data?.acf?.business?.website,
		location: data?.acf?.business?.location,
		biz_email: data?.acf?.business?.biz_email,
		phone: data?.acf?.business?.phone,
		biz_processes: data?.acf?.business?.biz_processes,
		biz_materials: data?.acf?.business?.biz_materials,
		biz_principles: data?.acf?.business?.biz_principles,
		listing_image_url: data?.acf?.business?.listing_image_url,
		listing_image_media_id: null,
		listing_image_file: null,
	};

	return formattedData;
};

const useArtisanData = (): ArtisanData => {
	const { authenticated, membershipID } = useAuth();

	const { data, isLoading, error } = useQuery<any, Error>(
		["af_members", membershipID],
		() => fetchPostData(membershipID as string),
		{ enabled: !!membershipID }
	);

	return { artisanData: data, isLoading, error };
};

export default useArtisanData;
