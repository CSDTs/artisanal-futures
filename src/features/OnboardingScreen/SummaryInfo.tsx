import { AccountData, BusinessData } from "@/types";
import { FC } from "react";
import { FaStoreAlt, FaUserAlt } from "react-icons/fa";

interface IProps {
	account: AccountData;
	business: BusinessData;
}

const SummaryInfo: FC<IProps> = ({ account, business }) => {
	return (
		<section className="h-full overflow-scroll bg-white shadow rounded-md p-4">
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12 pt-6">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Account Info</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-4">
							<p className="block text-sm font-medium leading-6 text-gray-900">
								{account.first_name || null} {account.last_name || null}
							</p>
							<p className="block text-sm font-medium leading-6 text-gray-900">@{account.username || null}</p>
							<p className="block text-sm font-medium leading-6 text-gray-900">{account.email || null}</p>

							<p className="block text-sm font-medium leading-6 text-gray-900 my-3">
								Forum's interested in: [{account.forums.moderated_forum && "Moderated"}
								{account.forums.unmoderated_forum && ", Unmoderated"}
								{account.forums.private_forum && ", Private"}
								{account.forums.hidden_forum && ", Hidden"}]
							</p>
							<p className="block text-sm font-medium leading-6 text-gray-900 my-3">
								Supply Chain opt in: {account.supply_chain.toString().toUpperCase()}
							</p>
						</div>

						<div className="sm:col-span-1">
							<img
								src="./img/hero.jpg"
								alt=""
								className="rounded-full w-92 h-92 object-cover aspect-square shadow-md"
							/>
						</div>
					</div>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Business Info</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<p className="block text-sm font-medium leading-6 text-gray-900">
								{business.biz_name || "* N/A"} {}
								{business.website && <span>{business.website}</span>}
							</p>
							{!business.biz_name && (
								<p className="block text-xs font-medium leading-6 text-red-900">
									* Note: If you don't add your business's name, we won't be able to add your business alongside the
									other artisans.
								</p>
							)}
							<p className="block text-base font-medium leading-6 text-gray-900">
								DreamWalker Studios (dreamwalkerstudios.co)
							</p>
							<p className="block text-xs font-medium leading-6 text-gray-900">
								11638 Marshall Road, Birch Run, MI 48415 &bull; dreamwalkerstudiosofficial@gmail.com &bull; 998-999-9999
							</p>
							<p className="block text-sm font-medium leading-6 text-gray-900">{business.address}</p>
							<p className="block text-sm font-medium leading-6 text-gray-900">{business.biz_email}</p>
							<p className="block text-sm font-medium leading-6 text-gray-900">{business.phone}</p>

							<p className="block text-sm font-medium leading-6 text-gray-900 mt-4">Briefly describe your business: </p>
							<span className="text-xs  text-gray-700">{business.biz_description || "N/A"}</span>

							<p className="block text-sm font-medium leading-6 text-gray-900 mt-2">
								What principles do you adhere to in your work?
							</p>
							<span className="text-xs  text-gray-700 ">{business.biz_principles || "N/A"}</span>

							<p className="block text-sm font-medium leading-6 text-gray-900 mt-2">
								What materials are common in your work?
							</p>
							<span className="text-xs  text-gray-700 ">{business.biz_materials || "N/A"}</span>

							<p className="block text-sm font-medium leading-6 text-gray-900mt-2">
								What processes are common in your work?
							</p>
							<span className="text-xs  text-gray-700 ">{business.biz_processes || "N/A"}</span>
						</div>

						<div className="sm:col-span-3">
							<div className="cursor-pointer ">
								<div className="flex flex-col items-center w-10/12 mx-auto my-3 overflow-hidden transition-all duration-200 rounded-lg shadow-lg md:max-w-s lg:max-w-xs group-hover:bg-slate-500 group-active:shadow-lg group-active:shadow-blue-200">
									<img
										className="object-cover w-full h-64 transition-all duration-200 group-hover:contrast-75"
										src={business.listing_file_url || "https://via.placeholder.com/300x200.png?text=No+Image+Found"}
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
											<button className="bg-[#004d50] text-white p-2 rounded">
												<FaUserAlt />
											</button>

											<button className="bg-[#DAA520] text-white p-2 rounded">
												<FaStoreAlt />
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>{" "}
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Public Profile Info</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-full">
							<div className="flex w-full items-center justify-center ">
								<div className="w-10/12 flex items-center">
									<div className="w-8/12 h-full  flex flex-col bg-slate-200 p-4 ">
										<h1 className="font-semibold text-2xl">
											{account.first_name} {account.last_name}
										</h1>
										<h2 className="text-xl">{business.biz_name}</h2>

										<p className="text-base mt-2">{account.about}</p>
									</div>

									<img src={account.profile_image_url} alt="" className="aspect-[3/4] object-cover w-4/12 " />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SummaryInfo;
