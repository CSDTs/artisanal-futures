type BusinessData = {
	biz_name: string;
	biz_description: string;
	website: string;
	address: string;
	biz_email: string;
	phone: string;
	listing_file_upload: string;
	biz_processes: string;
	biz_materials: string;
	biz_principles: string;
	listing_file_url: string;
};

type AccountData = {
	username: string;
	email: string;
	first_name: string;
	last_name: string;
	forums: {
		moderated_forum: boolean;
		unmoderated_forum: boolean;
		hidden_forum: boolean;
		private_forum: boolean;
	};
	about: string;
	profile_image_url: string;
	supply_chain: boolean;
};

type NewUser = {
	username: string;
	password: string;
	email: string;
	access_code: string;
};

type ReturningUser = {
	username: string;
	password: string;
};

type ArtisanACF = {
	acf: any;
	slug: string;
};

export type { AccountData, ArtisanACF, BusinessData, NewUser, ReturningUser };
