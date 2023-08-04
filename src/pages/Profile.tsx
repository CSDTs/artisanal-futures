import { Container } from "@chakra-ui/react";
import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingIndicator from "@/components/UI/LoadingIndicator";
import PageContainer from "@/components/UI/PageContainer";
import { ProfileHeader, UpdateProfileCard } from "@/features/accounts/Profile";
import useArtisanData from "@/hooks/useArtisanData";

import UndergoingMaintenance from "@/features/accounts/Profile/components/UndergoingMaintenance";
import useAuth from "@/hooks/useAuth";
import combineTailwindClasses from "@/utils/combineTailwindClasses";

import EditAccountInfo from "@/features/accounts/AccountInformation/EditAccountInfo";
import EditBusinessInfo from "@/features/accounts/AccountInformation/EditBusinessInfo";
import { FaExclamationCircle, FaStoreAlt, FaUserAlt } from "react-icons/fa";

const Profile = () => {
	const { artisanData, isLoading, error } = useArtisanData();
	const { authenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (error && !authenticated) navigate("/login");
		if (error && authenticated) navigate("/welcome");
	}, [error]);

	return (
		<PageContainer>
			{!isLoading && !error && !artisanData?.first_time_setup && <UpdateProfileCard />}

			{/* Error fetching membership id, but user is logged in. Means first time setup */}
			{!isLoading && error && authenticated && <UpdateProfileCard />}

			<LoadingIndicator isLoading={isLoading} />

			{!artisanData?.membership_id && artisanData?.slug == "" && <UndergoingMaintenance user={artisanData} />}

			{!error && artisanData?.first_time_setup && (
				<div className="w-full px-2 pb-16 sm:px-0 flex ">
					<Tab.Group>
						<Tab.List className="flex flex-col w-1/5 space-x-1 rounded-xl bg-blue-900/20 p-3 h-fit mt-3">
							<Tab
								className={({ selected }) =>
									combineTailwindClasses(
										"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
										"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
										selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
									)
								}>
								Account
							</Tab>

							<Tab
								className={({ selected }) =>
									combineTailwindClasses(
										"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
										"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
										selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
									)
								}>
								Business
							</Tab>
						</Tab.List>
						<Tab.Panels className="w-4/5">
							<Tab.Panel
								className={combineTailwindClasses(
									"rounded-xl bg-white p-3",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}>
								<ProfileHeader user={artisanData} />
								<EditAccountInfo artisanData={artisanData} />
							</Tab.Panel>{" "}
							<Tab.Panel
								className={combineTailwindClasses(
									"rounded-xl bg-white p-3",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}>
								<EditBusinessInfo artisanData={artisanData} />
							</Tab.Panel>{" "}
						</Tab.Panels>
					</Tab.Group>
				</div>
			)}
		</PageContainer>
	);
};

export default Profile;
