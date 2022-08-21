import { Heading, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import ProfileService from "../../services/profile.service";
import ShopService from "../../services/shop.service";
// import SignUpForm from "../SignUpForm";
import Login from ".";
import CreateNew from "./CreateNew";

const whitelist = ["ahunn@umich.edu"];

export default function SignIn() {
	const [artisanStore, setArtisanStore] = useState();
	const [artisanProfile, setArtisanProfile] = useState();

	const navigate = useNavigate();

	const [member, setMember] = useState(AuthService.getCurrentUser());
	const [isMember, setIsMember] = useState(MemberService.checkMembershipStatus());
	// useEffect(() => {

	// 	setIsApproved(whitelist.includes(artisan.user_email));
	// 	setIsMember(MemberService.checkMembershipStatus());
	// 	if (isApproved && isMember) navigate("/profile");
	// }, [artisan]);

	useEffect(() => {
		if (member && isMember) navigate("/profile");
	}, []);
	return <Login setApproval={setIsApproved} setArtisan={setArtisan} />;
}
