import { FormattedData } from "@/types";

const formatWordPressData = (data: any): FormattedData => {
	return {
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
};

export default formatWordPressData;
