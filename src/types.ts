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
	profile_image_file: any;
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
type Product = {
	name: string;
	description: string;
	principles: string;
	the_artisan: string;
	url: string;
	image: string;
	craftID: string;
	assessment: any;
	id: number;
};

type Attribute = string;

type Artisan = string;

type FilterData = {
	searchTerm: string;
	tags: string[] | FormDataEntryValue[];
};

type CurrentUser = {
	token: string;
	user_nicename: string;
};

export type {
	AccountData,
	Artisan,
	ArtisanACF,
	Attribute,
	BusinessData,
	CurrentUser,
	FilterData,
	NewUser,
	Product,
	ReturningUser,
};
