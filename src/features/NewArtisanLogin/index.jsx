import { Heading, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";
import MemberService from "../../services/member.service";
import ProfileService from "../../services/profile.service";
import ShopService from "../../services/shop.service";
import SignUpForm from "../SignUpForm";
import CreateNew from "./CreateNew";
import Login from "./Login";

const whitelist = ["ahunn@umich.edu"];

export default function NewArtisanLogin() {
	const [isApproved, setIsApproved] = useState(false);

	const [artisanStore, setArtisanStore] = useState();
	const [artisanProfile, setArtisanProfile] = useState();
	const [artisan, setArtisan] = useState(false);

	useEffect(() => {
		setIsApproved(whitelist.includes(artisan.user_email));

		if (artisan?.store) {
			ShopService.getShop(artisan.store.ID).then((data) => setArtisanStore(data.acf));
		} else {
			console.log("Setup a new shop?");
		}
		if (artisan?.profile) {
			console.log("Profile found");
			ProfileService.getProfile(artisan.profile.ID).then((data) => setArtisanProfile(data.acf));
		} else {
			console.log("Setup a new profile?");
		}
	}, [artisan]);
	return (
		<>
			{/* {isApproved && artisan && <Heading>Welcome back, {artisan.user_display_name.split(" ")[0]}</Heading>}

			{artisanStore && <Text>Looks like you have a store setup already</Text>}
			{isApproved && artisan && !artisanStore && <Text>Would you like to setup your shop?</Text>}

			{artisanProfile && <Text>Looks like you have a profile setup</Text>}
			{isApproved && artisan && !artisanProfile && <Text>Would you like to setup your profile?</Text>} */}

			{!isApproved && !artisan && <Login setApproval={setIsApproved} setArtisan={setArtisan} />}
			{/* <CreateNew /> */}
			{isApproved && artisan && <SignUpForm artisan={artisan} isUpdate={artisan?.store || artisan?.profile} />}
		</>
	);
}
