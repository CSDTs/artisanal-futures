import ArtisanCard from "@/components/ArtisanCard";
import { Tab } from "@headlessui/react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import useImageUpload from "@/hooks/useImageUpload";
import { gql, useMutation, useQuery } from "@apollo/client";
import AccountInfo from "./AccountInfo";
import BusinessInfo from "./BusinessInfo";

import AuthService from "@/services/auth.service";
import { AccountData } from "@/types";
import axios from "axios";
import ConfirmAccountModal from "./ConfirmAccountModal";
import SummaryInfo from "./SummaryInfo";
// import createArtisan from "./account.middleware";

import { set } from "react-hook-form";
import testData from "./data.json";

const FILMS_QUERY = gql`
	{
		person(id: "ahunn", idType: SLUG) {
			personId
			id
			slug
			modified
			modifiedGmt
			profile {
				about
				email
				fieldGroupName
				firstName
				forums
				lastName
				supplyChain
				username
				profileImageFile {
					mediaItemUrl
				}
			}
		}
	}
`;

const steps = ["Welcome", "Complete Account", "Setup Business", "Finalize"];

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
const { uploadImageToMedia } = useImageUpload();
const OnboardingScreen = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [accountData, setAccountData] = useState<AccountData>({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		forums: {
			moderated_forum: false,
			unmoderated_forum: false,
			hidden_forum: false,
			private_forum: false,
		},
		about: "",
		profile_image_file: "",
		profile_image_url: "",
		supply_chain: false,
	});

	const [businessData, setBusinessData] = useState<BusinessData>({
		biz_name: "",
		biz_description: "",
		website: "",
		address: "",
		biz_email: "",
		phone: "",
		listing_file_upload: "",
		biz_processes: "",
		biz_materials: "",
		biz_principles: "",
		listing_file_url: "",
	});

	const validateData = () => {
		//Check if username, email, is filled out
		if (accountData.username === "" || accountData.email === "") {
			return false;
		}

		return true;
	};

	const accountInfo = useRef<any>(null);
	const businessInfo = createRef<HTMLFormElement>();

	const CREATE_POST_MUTATION = gql`
		mutation CreatePerson($input: CreatePersonInput!) {
			createPerson(input: $input) {
				clientMutationId
				person {
					title
					slug
					profile {
						about
						email
						fieldGroupName
						firstName
						forums
						lastName
						supplyChain
						username
						profileImageFile {
							mediaItemUrl
						}
					}
				}
			}
		}
	`;

	const [createPerson, { data: mutateData, loading: mutateLoading, error: mutateError, called, reset }] = useMutation(
		CREATE_POST_MUTATION,
		{
			variables: {
				input: {
					person: {
						clientMutationId: "createPerson",
						title: "Your title here",
						status: "PUBLISH",
						slug: "your-slug-here",
						profile: {
							firstName: "Your first name here",
							lastName: "Your last name here",
							username: "Your username here",
							email: "Your email here",
							about: "Your about info here",
						},
					},
				},
			},
		}
	);
	const [isConsenting, setIsConsenting] = useState(false);

	useEffect(() => {
		if (accountInfo.current) {
			if (accountInfo?.current["profile_image_file"]?.value && accountData.profile_image_url) {
				console.log("Finished");
			}
		}
	}, [accountData.profile_image_file]);

	const handleOnAccountChange = () => {
		if (accountInfo.current) {
			if (accountInfo?.current["profile_image_file"]?.value && !accountInfo?.current?.profile_image_url?.value) {
				console.log("Uploading now");
			}
			setAccountData({
				username: accountInfo?.current?.username.value,
				email: accountInfo?.current?.email.value,
				first_name: accountInfo?.current?.first_name.value,
				last_name: accountInfo?.current?.last_name.value,
				forums: {
					moderated_forum: accountInfo?.current?.moderated_forum.checked,
					unmoderated_forum: accountInfo?.current?.unmoderated_forum.checked,
					hidden_forum: accountInfo?.current?.hidden_forum.checked,
					private_forum: accountInfo?.current?.private_forum.checked,
				},
				about: accountInfo?.current?.about.value,
				profile_image_file: accountInfo?.current?.profile_image_file.value,
				profile_image_url: accountInfo?.current?.profile_image_url.value,
				supply_chain: accountInfo?.current?.supply_chain.checked,
			});
			console.log(accountData);
		}
	};

	const handleOnBusinessChange = () => {
		if (businessInfo.current) {
			setBusinessData({
				biz_name: businessInfo?.current?.biz_name.value,
				biz_description: businessInfo?.current?.biz_description.value,
				website: businessInfo?.current?.website.value,
				address: businessInfo?.current?.address.value,
				biz_email: businessInfo?.current?.biz_email.value,
				phone: businessInfo?.current?.phone.value,
				listing_file_upload: businessInfo?.current?.listing_file_upload.value,
				biz_processes: businessInfo?.current?.biz_processes.value,
				biz_materials: businessInfo?.current?.biz_materials.value,
				biz_principles: businessInfo?.current?.biz_principles.value,
				listing_file_url: businessInfo?.current?.listing_file_url.value,
			});
		}

		console.table(businessData);
	};

	const { data, loading, error } = useQuery(FILMS_QUERY);

	const nextStep = () => {
		if (selectedIndex === steps.length) {
			setIsConsenting(true);
			return;
		}
		setSelectedIndex(selectedIndex + 1);
	};

	const prevStep = () => {
		setIsConsenting(false);

		if (selectedIndex === 0) return;
		setSelectedIndex(selectedIndex - 1);
	};

	const onboardingProps = {
		prevAction: prevStep,
		nextAction: nextStep,
		current: selectedIndex,
		accountData,
		businessData,
	};

	const handleDevPrePopulation = () => {
		setAccountData(testData.account);
		setBusinessData(testData.business);
	};

	return (
		<section className="flex h-screen w-full">
			<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<div className="bg-slate-100 w-1/4  flex flex-col justify-between items-center pt-1">
					<p className="p-4 text-slate-600 w-full border-t-4 border-indigo-500 ">
						<span className="">Welcome</span>
					</p>

					<Tab.List className="space-y-4">
						{steps.map((step, index) => (
							<Tab key={index} className="flex items-center">
								<div
									className={`w-4 h-4 rounded-full flex items-center justify-center  ${
										index < selectedIndex ? "bg-indigo-500" : index === selectedIndex ? "bg-indigo-300 " : "bg-gray-200"
									}`}>
									<div
										className={`w-2 h-2 rounded-full flex items-center justify-center ${
											index < selectedIndex
												? "bg-indigo-500"
												: index === selectedIndex
												? "bg-indigo-500 text-white "
												: "bg-gray-200"
										}`}></div>
								</div>
								<div
									className={`font-semibold ml-4  ${index === selectedIndex ? "text-indigo-700 " : "text-slate-500"} `}>
									{step}
								</div>
							</Tab>
						))}
					</Tab.List>
					<div className="p-4">
						{import.meta.env.DEV && (
							<button
								onClick={handleDevPrePopulation}
								className="bg-orange-500 rounded text-white font-semibold px-3 py-2 hover:bg-orange-400">
								Prepopulate fields (Dev)
							</button>
						)}
					</div>
				</div>

				<Tab.Panels className="w-3/4 bg-slate-50 flex  h-screen">
					<Tab.Panel className="h-full w-full flex flex-col justify-between ">
						<nav className="w-full max-h-32 bg-slate-100 px-4">
							<div className="mx-auto my-4 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
								<div>
									<p>Back to </p>
									<img
										className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
										src="/img/logo.png"
										alt="Transistor"
										width={150}
										height={48}
									/>
								</div>
							</div>
						</nav>
						<div className="px-4">
							<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">Welcome to Artisanal Futures!</h1>

							<p className="mb-5 text-slate-500 text-lg">
								Your next step is to update your profile, and establish your store on the site.
							</p>

							<ul>
								{data &&
									Object.keys(data.person.profile).map((launch, idx) => (
										<li key={idx}>{JSON.stringify(data.person.profile[launch])}</li>
									))}
							</ul>
						</div>
						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4">
						<OnboardingNameplate
							title="Setting up your account"
							description="This information allows us to create your account, as well as customize your experience. "
						/>
						<AccountInfo
							{...accountData}
							handleOnChange={handleOnAccountChange}
							setAccountData={setAccountData}
							accountData={accountData}
							ref={accountInfo}
						/>
						<button onClick={() => createPerson()}>Test</button>
						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4">
						<OnboardingNameplate
							title="Setting up your business"
							description="This information allows us to better understand your business and adds it to our growing artisan list."
						/>
						<BusinessInfo
							{...businessData}
							handleOnChange={handleOnBusinessChange}
							ref={businessInfo}
							setBusinessData={setBusinessData}
						/>

						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>{" "}
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4">
						<OnboardingNameplate
							title="Finalize your info"
							description="Double check before you submit. You can always edit this information later."
						/>
						<SummaryInfo account={accountData} business={businessData} />

						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</section>
	);
};

const OnboardingNameplate = ({ title, description }) => {
	return (
		<div className="pt-10 ">
			<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">{title}</h1>

			<p className="mb-5 text-slate-500 text-lg">{description}</p>
		</div>
	);
};

const OnboardingNavigation = ({ prevAction, nextAction, current, accountData, businessData }) => {
	const navigate = useNavigate();

	const backToHomepage = () => navigate("/");
	return (
		<div className="flex flex-row justify-between p-4">
			<button
				className="px-4 py-2 font-semibold text-sm bg-white text-slate-800 border border-slate-200 rounded-md  shadow-sm"
				onClick={backToHomepage}>
				Skip, I'll do this later
			</button>
			<div className="flex gap-10">
				<button
					className="px-4 py-2 font-semibold text-sm  text-indigo-600  rounded-md  shadow-sm"
					onClick={prevAction}>
					Previous
				</button>
				{current < 3 && (
					<button
						className="disabled:bg-indigo-300 disabled:cursor-not-allowed px-4 py-2 font-semibold text-sm bg-indigo-600 text-white border border-slate-200 rounded-md  shadow-sm"
						onClick={nextAction}
						disabled={accountData.profile_image_file && !accountData.profile_image_url}>
						Next
					</button>
				)}

				{current === 3 && <ConfirmAccountModal account={accountData} business={businessData} />}
			</div>
		</div>
	);
};

export default OnboardingScreen;
