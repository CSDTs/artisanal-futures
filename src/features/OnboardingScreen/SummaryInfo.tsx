import { AccountData, BusinessData } from "@/types";
import { FC } from "react";
import { FaArrowRight, FaExclamationCircle, FaStoreAlt, FaUser, FaUserAlt } from "react-icons/fa";

interface IProps {
	account: AccountData;
	business: BusinessData;
}

const SummaryInfo: FC<IProps> = ({ account, business }) => {
	return (
		<section className="h-full overflow-scroll bg-white shadow rounded-md p-4">
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12 pt-6">
					<div className=" flex flex-col md:flex-row  items-center border border-slate-200 rounded-lg p-4 gap-4 w-full">
						<div className="md:w-1/6 w-full">
							{account.profile_image_url && (
								<img
									src={account.profile_image_url}
									alt=""
									className="rounded-full w-92 h-92 object-cover aspect-square shadow-md"
								/>
							)}

							{!account.profile_image_url && (
								<div className="rounded-full bg-slate-400 h-92 w-92 aspect-square shadow-md flex items-center justify-center text-5xl text-slate-200">
									<FaUser />
								</div>
							)}
						</div>{" "}
						<div className="md:w-5/6 w-full flex justify-between">
							<div>
								<p className="block text-lg font-bold text-slate-700">
									{account.first_name || null} {account.last_name || null}
									{!account.first_name && !account.last_name && (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" /> Add your name
										</span>
									)}
								</p>
								{business.biz_name && (
									<p className="block text-base font-medium text-slate-500">Owner of {business.biz_name}</p>
								)}

								<p className="block text-base font-medium">@ {account.username}</p>
							</div>

							<button className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow  h-10">
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
						</div>{" "}
					</div>

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
									{account.first_name || (
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
									{account.last_name || (
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
								<p className="block text-lg font-semibold text-slate-700">{account.username}</p>
							</div>

							<div className="w-full md:w-1/2">
								<p className="text-slate-400 text-base font-semibold">Email</p>
								<p className="block text-lg font-semibold text-slate-700">{account.email}</p>
							</div>
						</section>
						<section className="w-full flex flex-col md:flex-row  gap-y-5 md:gap-y-0 ">
							<div className="w-full md:w-1/2">
								<p className="text-slate-400 text-base font-semibold">Forum's interested in</p>
								<p className="block text-lg font-semibold  text-slate-700 ">
									[
									{account.moderated_forum && (
										<span>
											Moderated
											{[account.unmoderated_forum, account.private_forum, account.hidden_forum].some(
												(forum) => forum
											) && ", "}
										</span>
									)}
									{account.unmoderated_forum && (
										<span>
											Unmoderated{[account.private_forum, account.hidden_forum].some((forum) => forum) && ", "}
										</span>
									)}
									{account.private_forum && <span>Private{account.hidden_forum && ", "}</span>}
									{account.hidden_forum && <span>Hidden</span>}
									{!account.moderated_forum &&
										!account.unmoderated_forum &&
										!account.private_forum &&
										!account.hidden_forum &&
										"None selected"}
									]
								</p>
							</div>

							<div className="w-full md:w-1/2">
								<p className="text-slate-400 text-base font-semibold">Supply Chain</p>
								<p className="block text-lg font-semibold  text-slate-700">
									{account.supply_chain
										? "Yes, I am interested in the supply chain"
										: "No, I am not interested in the supply chain"}
								</p>
							</div>
						</section>
					</div>

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
										{business.biz_name || (
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
										{business.website || (
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
										{business.location || (
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
										{business.biz_email || (
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
										{business.phone || (
											<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
												<FaExclamationCircle className="lg:text-xl text-6xl" />
												Add your business phone number
											</span>
										)}
									</p>
								</div>
							</div>
							<div className="w-full md:w-1/2">
								{business.biz_name && (
									<div className="cursor-pointer ">
										<div className="flex flex-col items-center w-10/12  my-3 overflow-hidden transition-all duration-200 rounded-lg shadow-lg md:max-w-s lg:max-w-xs group-hover:bg-slate-500 group-active:shadow-lg group-active:shadow-blue-200">
											<img
												className="object-cover w-full h-64 transition-all duration-200 group-hover:contrast-75"
												src={business.listing_image_url}
												alt={`Cover`}
												onError={({ currentTarget }) => {
													currentTarget.src = "https://via.placeholder.com/300x200.png?text=No+Image+Found";
												}}
											/>
											<div className="w-full px-4 py-2 ">
												<h1 className="text-xl font-semibold text-gray-700 transition-all duration-200 group-hover:text-white">
													{business.biz_name}
												</h1>
												<div className="flex w-full gap-5 py-2">
													<button className="bg-[#004d50] text-white p-2 rounded" aria-label="Artisan profile page">
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
								{!business.biz_name && (
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
								<p className="text-slate-400 text-base font-semibold">Briefly describe your business and customers</p>
								<p className="block text-lg font-semibold text-slate-700">
									{business.biz_description || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											You have not filled out a business description yet
										</span>
									)}
								</p>
							</div>

							<div className="mb-3">
								<p className="text-slate-400 text-base font-semibold">What principles do you adhere to in your work?</p>
								<p className="block text-lg font-semibold text-slate-700">
									{business.biz_principles || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
											principles yet
										</span>
									)}
								</p>
							</div>

							<div className="mb-3">
								<p className="text-slate-400 text-base font-semibold">What materials are common in your work?</p>
								<p className="block text-lg font-semibold text-slate-700">
									{business.biz_materials || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
											materials yet
										</span>
									)}
								</p>
							</div>

							<div className="mb-3">
								<p className="text-slate-400 text-base font-semibold">What processes are common in your work?</p>
								<p className="block text-lg font-semibold text-slate-700">
									{business.biz_processes || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
											processes yet
										</span>
									)}
								</p>
							</div>
						</section>
					</div>

					<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
						<div className="flex justify-between w-full items-center ">
							<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Public Profile Details</h2>
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
						<section className="w-full flex flex-col gap-y-5 md:gap-y-0 ">
							<div className="w-full ">
								<p className="text-slate-400 text-base font-semibold">About Me</p>
								<p className="block text-lg font-semibold text-slate-700">
									{account.about_me || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" /> No about me added yet. You can write a few
											sentences to describe yourself and your business
										</span>
									)}
								</p>
							</div>
						</section>
						{!account.about_me && (
							<p className="w-full flex text-lg font-semibold">
								Fill out your about section to see a preview of your public profile {`:D`}
							</p>
						)}
						{account.about_me && (
							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-full">
									<div className="flex w-full items-center justify-center ">
										<div className="w-10/12 flex items-center">
											<div className="w-8/12 h-full  flex flex-col bg-slate-200 p-4 ">
												<h1 className="font-semibold text-2xl">
													{account.first_name || "New"} {account.last_name || "User"}
												</h1>
												<h2 className="text-xl">{business.biz_name}</h2>

												<p className="text-base mt-2">{account.about_me}</p>
											</div>

											<img
												src={account.profile_image_url}
												alt=""
												className="aspect-[3/4] object-cover w-4/12 "
												onError={({ currentTarget }) => {
													currentTarget.src = "https://via.placeholder.com/300x200.png?text=No+Image+Found";
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default SummaryInfo;
