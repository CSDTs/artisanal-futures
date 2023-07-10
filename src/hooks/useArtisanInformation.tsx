import AuthService from "@/services/auth.service";
import { AccountData, BusinessData } from "@/types";
import axios from "axios";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useSWR from "swr";

type AdminData = {
	slug: string;
	membership_id: number;
	first_time_setup: boolean;
};

type FormattedData = AdminData & AccountData & BusinessData;

interface ArtisanData {
	artisanInformation: FormattedData;
	isLoading: boolean;
	error: Error | null;
}

const fetchPostData = async (id: string): Promise<any> => {
	const res = await axios.get(`https://forum.artisanalfutures.org/wp-json/wp/v2/af_members/${id}`);

	return formatArtisanData(res.data);
};

const formatArtisanData = (data: any) => {
	console.log(data.acf.user);
	const formattedData: FormattedData = {
		slug: data.slug,
		membership_id: data?.acf?.membership_id,
		first_time_setup: data?.acf?.first_time_setup,
		username: data?.acf?.username,
		email: data?.acf?.email,
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
		listing_image_url: data?.acf?.listing_image_url,
		listing_image_media_id: null,
		listing_image_file: null,
	};

	return formattedData;
};

const useArtisanData = (): ArtisanData => {
	const membershipId = AuthService.getCurrentUserMembershipId() || -1;

	const { data, isLoading, error } = useQuery<any, Error>(
		["af_members", membershipId],
		() => fetchPostData(membershipId),
		{ enabled: !!membershipId }
	);

	return { artisanInformation: data, isLoading, error };
};
export default useArtisanData;
