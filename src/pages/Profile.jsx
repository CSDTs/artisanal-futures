import { Container } from "@chakra-ui/react";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import MemberService from "../services/member.service";

import Loading from "../components/Loading";
import { ProfileCard, UpdateProfileCard } from "../features/Profile";

export default function Profile() {
	const { user: member, isLoading, isError } = MemberService.getCurrentMemberInformation();
	const user = AuthService.getCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError && !AuthService.getCurrentUser()) navigate("/login");
	}, [isError]);

	useEffect(() => {
		console.log(member);
	}, [member]);

	return (
		<Container maxW={"6xl"} mt={6}>
			{!isError && member?.acf?.first_time_setup && (
				<ProfileCard slug={member?.slug} user={member?.acf} isLoading={isLoading} />
			)}
			{!isLoading && !isError && !member?.acf?.first_time_setup && <UpdateProfileCard user={user} />}

			<Loading isLoading={isLoading} />
		</Container>
	);
}
