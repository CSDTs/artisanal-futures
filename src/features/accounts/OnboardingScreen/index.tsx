import ArtisanCard from "@/components/Cards/ArtisanCard";
import useImageUpload from "@/hooks/useImageUpload";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Tab, Transition } from "@headlessui/react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { createRef, useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaStoreAlt, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AccountInfo from "./components/AccountInfo";
import BusinessInfo from "./components/BusinessInfo";

import AuthService from "@/services/auth.service";
import { AccountData, BusinessData } from "@/types";
import axios from "axios";
import ConfirmAccountModal from "./components/ConfirmAccountModal";
import SummaryInfo from "./components/SummaryInfo";

import OnboardingNameplate from "./components/OnboardingNameplate";
import OnboardingNavigation from "./components/OnboardingNavigation";
import testData from "./data.json";

const steps = ["Welcome", "Complete Account", "Setup Business", "Finalize"];

import getFormValues from "@/utils/getFormValues";
import { MutableRefObject } from "react";

const OnboardingScreen = () => {
	const [selectedIndex, setSelectedIndex] = useState(0);

	const { getCurrentUser } = AuthService;

	const [accountData, setAccountData] = useState<AccountData>({
		username: "",
		email: "",
		first_name: "",
		last_name: "",
		moderated_forum: false,
		unmoderated_forum: false,
		hidden_forum: false,
		private_forum: false,
		about_me: "",
		profile_image_file: "",
		profile_image_url: "",
		profile_image_media_id: -1,
		supply_chain: false,
	});

	const [businessData, setBusinessData] = useState<BusinessData>({
		biz_name: "",
		biz_description: "",
		website: "",
		location: "",
		biz_email: "",
		phone: "",
		biz_processes: "",
		biz_materials: "",
		biz_principles: "",
		listing_image_file: "",
		listing_image_url: "",
		listing_image_media_id: -1,
	});

	const accountInfo = useRef<HTMLFormElement>(null);
	const businessInfo = useRef<HTMLFormElement>(null);

	const handleOnAccountChange = () => {
		const accountFormData = getFormValues(accountInfo);
		console.log(accountFormData);
		if (accountInfo.current) setAccountData(accountFormData);
	};

	const handleOnBusinessChange = () => {
		const businessFormData = getFormValues(businessInfo);
		if (businessInfo.current) setBusinessData(businessFormData);
	};

	const nextStep = () => {
		if (selectedIndex === steps.length) {
			return;
		}
		setSelectedIndex(selectedIndex + 1);
	};

	const prevStep = () => {
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

	useEffect(() => {
		const currentUser = getCurrentUser();

		setAccountData({
			...accountData,
			username: currentUser?.user_nicename,
			email: currentUser?.user_email,
		});
	}, []);

	return (
		<section className="flex h-screen w-full">
			<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
				<div className="bg-white w-1/4  flex flex-col justify-between items-center pt-1  border-t-[6px] border-indigo-500">
					<p className="p-4 text-slate-600 w-full text-left px-6">
						<img className=" h-7 w-auto" src="/img/logo.png" alt="Transistor" width={150} height={48} />
						<span className="text-base font-normal mt-2 flex">Transition to a Decolonized Circular Economy</span>
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

				<Tab.Panels className="w-3/4 bg-slate-100 flex  h-screen">
					<Tab.Panel className="h-full w-full flex flex-col justify-between border-l-2">
						<nav className="w-full max-h-32 bg-white px-4 border-b-2 border-b-slate-200">
							<a href="/" className="flex gap-4 w-full my-4 items-center group">
								<FaArrowLeft className="text-slate-500 text-xl group-hover:text-blue-500 transition-all" />
								<p className="text-lg font-semibold group-hover:text-blue-500 transition-all">Back to Homepage</p>
							</a>
						</nav>
						<div className="px-4 ">
							<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">Welcome to Artisanal Futures!</h1>

							<p className="mb-5 text-slate-500 text-lg">
								Your next step is to update your profile, and establish your store on the site.
							</p>
						</div>
						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4 border-l-2">
						<OnboardingNameplate
							title="Setting up your account"
							description="This information allows us to create your account, as well as customize your experience. "
						/>
						<AccountInfo
							handleOnChange={handleOnAccountChange}
							setAccountData={setAccountData}
							accountData={accountData}
							ref={accountInfo}
						/>

						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4 border-l-2">
						<OnboardingNameplate
							title="Setting up your business"
							description="This information allows us to better understand your business and adds it to our growing artisan list."
						/>

						<BusinessInfo
							businessData={businessData}
							handleOnChange={handleOnBusinessChange}
							ref={businessInfo}
							setBusinessData={setBusinessData}
						/>

						<OnboardingNavigation {...onboardingProps} />
					</Tab.Panel>{" "}
					<Tab.Panel className="h-full w-full flex flex-col justify-between px-4 border-l-2">
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

export default OnboardingScreen;
