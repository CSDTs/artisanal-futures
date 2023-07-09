import { Container } from "@chakra-ui/react";
import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import MemberService from "../services/member.service";

import PageContainer from "@/components/PageContainer";
import LoadingIndicator from "../components/LoadingIndicator";
import { ProfileCard, UpdateProfileCard } from "../features/Profile";

const Profile = () => {
	const { user: member, isLoading, isError } = MemberService.getCurrentMemberInformation();
	const user = AuthService.getCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError && !AuthService.getCurrentUser()) navigate("/login");
	}, [isError]);

	useEffect(() => {
		if (isError && AuthService.getCurrentUser()) navigate("/welcome");
	}, [isError]);
	return (
		<PageContainer>
			{!isError && member?.acf?.first_time_setup && (
				<ProfileCard slug={member?.slug} user={member?.acf} isLoading={isLoading} />
			)}
			{!isLoading && !isError && !member?.acf?.first_time_setup && <UpdateProfileCard user={user} />}

			{/* Error fetching membership id, but user is logged in. Means first time setup */}
			{!isLoading && isError && AuthService.getCurrentUser() && <UpdateProfileCard user={user} />}

			<LoadingIndicator isLoading={isLoading} />

			<Tab.Group>
				<Tab.List>
					<Tab>Profile</Tab>
					<Tab>Business</Tab>
					<Tab>Settings</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>Content 1</Tab.Panel>
					<Tab.Panel>Content 2</Tab.Panel>
					<Tab.Panel>Content 3</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</PageContainer>
	);
};

export default Profile;
