import { Container } from "@chakra-ui/react";
import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LoadingIndicator from "@/components/UI/LoadingIndicator";
import PageContainer from "@/components/UI/PageContainer";
import { ProfileCard, UpdateProfileCard } from "@/features/accounts/Profile";
import useArtisanData from "@/hooks/useArtisanData";

import UndergoingMaintenance from "@/features/accounts/Profile/components/UndergoingMaintenance";
import useAuth from "@/hooks/useAuth";
import combineTailwindClasses from "@/utils/combineTailwindClasses";

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
			{!isLoading && !error && !artisanData?.first_time_setup && <UpdateProfileCard user={artisanData} />}

			{/* Error fetching membership id, but user is logged in. Means first time setup */}
			{!isLoading && error && authenticated && <UpdateProfileCard user={artisanData} />}

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
							<Tab
								className={({ selected }) =>
									combineTailwindClasses(
										"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 text-left px-4",
										"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
										selected ? "bg-white shadow" : "text-blue-100 hover:bg-white/[0.12] hover:text-white px-4"
									)
								}>
								Settings
							</Tab>
						</Tab.List>
						<Tab.Panels className="w-4/5">
							<Tab.Panel
								className={combineTailwindClasses(
									"rounded-xl bg-white p-3",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}>
								<ProfileCard slug={artisanData?.slug} user={artisanData} isLoading={isLoading} />

								<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
									<div className="flex justify-between w-full items-center ">
										<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Account Information</h2>
										<button className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
											Edit{" "}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
												/>
											</svg>
										</button>
									</div>
									<section className="w-full flex flex-col md:flex-row gap-y-5 md:gap-y-0 ">
										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">First Name</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.first_name || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" />
														Add your first name
													</span>
												)}
											</p>
										</div>

										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">Last Name</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.last_name || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" />
														Add your last name
													</span>
												)}
											</p>
										</div>
									</section>
									<section className="w-full flex flex-col md:flex-row  gap-y-5 md:gap-y-0 ">
										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">Username</p>
											<p className="block text-lg font-semibold text-slate-700">{artisanData.username}</p>
										</div>

										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">Email</p>
											<p className="block text-lg font-semibold text-slate-700">{artisanData.email}</p>
										</div>
									</section>
									<section className="w-full flex flex-col md:flex-row  gap-y-5 md:gap-y-0 ">
										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">Forum's interested in</p>
											<p className="block text-lg font-semibold  text-slate-700 ">
												[
												{artisanData.moderated_forum && (
													<span>
														Moderated
														{[artisanData.unmoderated_forum, artisanData.private_forum, artisanData.hidden_forum].some(
															(forum) => forum
														) && ", "}
													</span>
												)}
												{artisanData.unmoderated_forum && (
													<span>
														Unmoderated
														{[artisanData.private_forum, artisanData.hidden_forum].some((forum) => forum) && ", "}
													</span>
												)}
												{artisanData.private_forum && <span>Private{artisanData.hidden_forum && ", "}</span>}
												{artisanData.hidden_forum && <span>Hidden</span>}
												{!artisanData.moderated_forum &&
													!artisanData.unmoderated_forum &&
													!artisanData.private_forum &&
													!artisanData.hidden_forum &&
													"None selected"}
												]
											</p>
										</div>

										<div className="w-full md:w-1/2">
											<p className="text-slate-400 text-base font-semibold">Supply Chain</p>
											<p className="block text-lg font-semibold  text-slate-700">
												{artisanData.supply_chain
													? "Yes, I am interested in the supply chain"
													: "No, I am not interested in the supply chain"}
											</p>
										</div>
									</section>
								</div>
							</Tab.Panel>{" "}
							<Tab.Panel
								className={combineTailwindClasses(
									"rounded-xl bg-white p-3",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}>
								<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
									<div className="flex justify-between w-full items-center ">
										<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Business Information</h2>
										<button className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
											Edit{" "}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
												/>
											</svg>
										</button>
									</div>
									<section className="w-full flex flex-col md:flex-row gap-y-5 md:gap-y-0 ">
										<div className="w-full md:w-1/2 flex flex-col gap-y-5 md:gap-y-0 ">
											<div className="flex  flex-col">
												<p className="text-slate-400 text-base font-semibold">Name</p>
												<p className="block text-lg font-semibold text-slate-700">
													{artisanData.biz_name || (
														<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
															<FaExclamationCircle className="lg:text-xl text-6xl" />
															Add your business's name to join the community
														</span>
													)}
												</p>
											</div>
											<div className="flex  flex-col">
												<p className="text-slate-400 text-base font-semibold">Website</p>
												<p className="block text-lg font-semibold text-slate-700">
													{artisanData.website || (
														<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
															<FaExclamationCircle className="lg:text-xl text-6xl" />
															Add a website to direct traffic to it
														</span>
													)}
												</p>
											</div>
											<div className="flex  flex-col">
												<p className="text-slate-400 text-base font-semibold">Location</p>
												<p className="block text-lg font-semibold text-slate-700">
													{artisanData.location || (
														<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
															<FaExclamationCircle className="lg:text-xl text-6xl" />
															Add a location to help people find you
														</span>
													)}
												</p>
											</div>
											<div className="flex  flex-col">
												<p className="text-slate-400 text-base font-semibold">Email</p>
												<p className="block text-lg font-semibold text-slate-700">
													{artisanData.biz_email || (
														<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
															<FaExclamationCircle className="lg:text-xl text-6xl" />
															Add your business email for inquiries
														</span>
													)}
												</p>
											</div>
											<div className="flex  flex-col">
												<p className="text-slate-400 text-base font-semibold">Phone</p>
												<p className="block text-lg font-semibold text-slate-700">
													{artisanData.phone || (
														<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
															<FaExclamationCircle className="lg:text-xl text-6xl" />
															Add your business phone number
														</span>
													)}
												</p>
											</div>
										</div>
										<div className="w-full md:w-1/2">
											{artisanData.biz_name && (
												<div className="cursor-pointer ">
													<div className="flex flex-col items-center w-10/12  my-3 overflow-hidden transition-all duration-200 rounded-lg shadow-lg md:max-w-s lg:max-w-xs group-hover:bg-slate-500 group-active:shadow-lg group-active:shadow-blue-200">
														<img
															className="object-cover w-full h-64 transition-all duration-200 group-hover:contrast-75"
															src={artisanData.listing_image_url}
															alt={`Cover`}
															onError={({ currentTarget }) => {
																currentTarget.src = "https://via.placeholder.com/300x200.png?text=No+Image+Found";
															}}
														/>
														<div className="w-full px-4 py-2 ">
															<h1 className="text-xl font-semibold text-gray-700 transition-all duration-200 group-hover:text-white">
																{artisanData.biz_name}
															</h1>
															<div className="flex w-full gap-5 py-2">
																<button
																	className="bg-[#004d50] text-white p-2 rounded"
																	aria-label="Artisan profile page">
																	<FaUserAlt />
																</button>

																<button
																	className="bg-[#DAA520] text-white p-2 rounded"
																	aria-label="Website to the artisan's store">
																	<FaStoreAlt />
																</button>
															</div>
														</div>
													</div>
												</div>
											)}
											{!artisanData.biz_name && (
												<p className="w-full flex text-lg font-semibold">
													Fill out your business information to preview your store listing {`:D`}
												</p>
											)}
										</div>
									</section>
								</div>
								<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
									<div className="flex justify-between w-full items-center ">
										<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Business Details</h2>
										<button className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
											Edit{" "}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												strokeWidth={1.5}
												stroke="currentColor"
												className="w-5 h-5">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
												/>
											</svg>
										</button>
									</div>
									<section className="w-full flex flex-col  ">
										<div className="mb-3">
											<p className="text-slate-400 text-base font-semibold">
												Briefly describe your business and customers
											</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.biz_description || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" />
														You have not filled out a business description yet
													</span>
												)}
											</p>
										</div>

										<div className="mb-3">
											<p className="text-slate-400 text-base font-semibold">
												What principles do you adhere to in your work?
											</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.biz_principles || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your
														business principles yet
													</span>
												)}
											</p>
										</div>

										<div className="mb-3">
											<p className="text-slate-400 text-base font-semibold">What materials are common in your work?</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.biz_materials || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your
														business materials yet
													</span>
												)}
											</p>
										</div>

										<div className="mb-3">
											<p className="text-slate-400 text-base font-semibold">What processes are common in your work?</p>
											<p className="block text-lg font-semibold text-slate-700">
												{artisanData.biz_processes || (
													<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
														<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your
														business processes yet
													</span>
												)}
											</p>
										</div>
									</section>
								</div>
							</Tab.Panel>{" "}
							<Tab.Panel
								className={combineTailwindClasses(
									"rounded-xl bg-white p-3",
									"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
								)}>
								Three
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			)}
		</PageContainer>
	);
};

export default Profile;
