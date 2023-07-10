import { Container } from "@chakra-ui/react";
import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import MemberService from "../services/member.service";

import PageContainer from "@/components/PageContainer";
import useArtisanData from "@/hooks/useArtisanInformation";
import LoadingIndicator from "../components/LoadingIndicator";
import { ProfileCard, UpdateProfileCard } from "../features/Profile";

import { useState } from "react";
function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const Profile = () => {
	const { artisanInformation, isLoading, error } = useArtisanData();
	const user = AuthService.getCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (error && !AuthService.getCurrentUser()) navigate("/login");
	}, [error]);

	useEffect(() => {
		if (error && AuthService.getCurrentUser()) navigate("/welcome");
	}, [error]);

	let [categories] = useState({
		Recent: [
			{
				id: 1,
				title: "Does drinking coffee make you smarter?",
				date: "5h ago",
				commentCount: 5,
				shareCount: 2,
			},
			{
				id: 2,
				title: "So you've bought coffee... now what?",
				date: "2h ago",
				commentCount: 3,
				shareCount: 2,
			},
		],
		Popular: [
			{
				id: 1,
				title: "Is tech making coffee better or worse?",
				date: "Jan 7",
				commentCount: 29,
				shareCount: 16,
			},
			{
				id: 2,
				title: "The most innovative things happening in coffee",
				date: "Mar 19",
				commentCount: 24,
				shareCount: 12,
			},
		],
		Trending: [
			{
				id: 1,
				title: "Ask Me Anything: 10 answers to your questions about coffee",
				date: "2d ago",
				commentCount: 9,
				shareCount: 5,
			},
			{
				id: 2,
				title: "The worst advice we've ever heard about coffee",
				date: "4d ago",
				commentCount: 1,
				shareCount: 2,
			},
		],
	});

	return (
		<PageContainer>
			{!error && artisanInformation?.first_time_setup && (
				<ProfileCard slug={artisanInformation?.slug} user={artisanInformation} isLoading={isLoading} />
			)}
			{!isLoading && !error && !artisanInformation.first_time_setup && <UpdateProfileCard user={user} />}

			{/* Error fetching membership id, but user is logged in. Means first time setup */}
			{!isLoading && error && AuthService.getCurrentUser() && <UpdateProfileCard user={user} />}

			<LoadingIndicator isLoading={isLoading} />

			<div className="w-full px-2 py-16 sm:px-0 flex items-center">
				<Tab.Group>
					<Tab.List className="flex flex-col w-2/6 space-x-1 rounded-xl bg-blue-900/20 p-1 h-fit ">
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
								)
							}>
							Account
						</Tab>

						<Tab
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
								)
							}>
							Business
						</Tab>
						<Tab
							className={({ selected }) =>
								classNames(
									"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
									selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
								)
							}>
							Settings
						</Tab>
					</Tab.List>
					<Tab.Panels className="w-4/6">
						<Tab.Panel
							className={classNames(
								"rounded-xl bg-white p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}>
							One
						</Tab.Panel>{" "}
						<Tab.Panel
							className={classNames(
								"rounded-xl bg-white p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}>
							Two
						</Tab.Panel>{" "}
						<Tab.Panel
							className={classNames(
								"rounded-xl bg-white p-3",
								"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
							)}>
							Three
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</PageContainer>
	);
};

export default Profile;
