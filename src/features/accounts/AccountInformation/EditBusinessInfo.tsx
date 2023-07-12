import ArtisanCard from "@/components/Cards/ArtisanCard";
import BusinessCard from "@/components/Cards/BusinessCard";
import TextInput from "@/components/Form/TextInput";
import { FormattedData } from "@/types";
import getFormValues from "@/utils/getFormValues";
import { FC, createRef, useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface IProps {
	artisanData: FormattedData;
}
const EditBusinessInfo: FC<IProps> = ({ artisanData }) => {
	const businessInfoForm = createRef<HTMLFormElement>();
	const businessDetailForm = createRef<HTMLFormElement>();

	const [editInfo, setEditInfo] = useState(false);
	const [editDetail, setEditDetail] = useState(false);

	const handleOnInfoChange = () => {
		const businessInfoFormData = getFormValues(businessInfoForm);
		console.log(businessInfoFormData);
	};

	const handleOnDetailChange = () => {
		const businessDetailFormData = getFormValues(businessDetailForm);
		console.log(businessDetailFormData);
	};

	const toggleEditInfo = () => {
		setEditInfo(!editInfo);
	};

	const toggleEditDetail = () => {
		setEditDetail(!editDetail);
	};
	return (
		<>
			<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 ">
				<div className="flex justify-between w-full items-center px-2">
					<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Business Information</h2>

					<button
						onClick={toggleEditInfo}
						className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
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
				<form className="w-full flex flex-col md:flex-row   " onChange={handleOnInfoChange} ref={businessInfoForm}>
					<div className="basis-3/5 px-2 gap-y-5 flex flex-col">
						<div className="block">
							<p className="text-slate-400 text-base font-semibold">Business Name</p>
							{!editInfo && (
								<p className="block text-lg font-semibold text-slate-700">
									{artisanData.biz_name || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											Add your business name to show up with the others
										</span>
									)}
								</p>
							)}

							{editInfo && (
								<TextInput
									hasLabel={false}
									name="biz_name"
									title="Business Name"
									value={artisanData.biz_name}
									ref={businessInfoForm?.current?.biz_name}
								/>
							)}
						</div>
						<div className="block">
							<p className="text-slate-400 text-base font-semibold">Website</p>
							{!editInfo && (
								<p className="block text-lg font-semibold text-slate-700">
									{artisanData.website || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											Add your website to direct traffic to it
										</span>
									)}
								</p>
							)}
							{editInfo && (
								<TextInput
									hasLabel={false}
									name="website"
									title="Website"
									value={artisanData.website}
									ref={businessInfoForm?.current?.website}
								/>
							)}
						</div>
						<div>
							<p className="text-slate-400 text-base font-semibold">Location</p>
							{!editInfo && (
								<p className="block text-lg font-semibold text-slate-700">
									{artisanData.location || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											Add your location to help users find you
										</span>
									)}
								</p>
							)}

							{editInfo && (
								<TextInput
									hasLabel={false}
									name="username"
									title="Username"
									value={artisanData.location}
									ref={businessInfoForm?.current?.location}
								/>
							)}
						</div>
						<div>
							<p className="text-slate-400 text-base font-semibold">Email</p>
							{!editInfo && (
								<p className="block text-lg font-semibold text-slate-700">
									{artisanData.biz_email || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											Add your business email to allow users to contact you
										</span>
									)}
								</p>
							)}

							{editInfo && (
								<TextInput
									hasLabel={false}
									name="biz_email"
									title="Business Email"
									value={artisanData.biz_email}
									ref={businessInfoForm?.current?.biz_email}
								/>
							)}
						</div>{" "}
						<div>
							<p className="text-slate-400 text-base font-semibold">Phone</p>
							{!editInfo && (
								<p className="block text-lg font-semibold text-slate-700">
									{artisanData.phone || (
										<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
											<FaExclamationCircle className="lg:text-xl text-6xl" />
											Add your business phone to allow users to contact you
										</span>
									)}
								</p>
							)}

							{editInfo && (
								<TextInput
									hasLabel={false}
									name="phone"
									title="Business phone"
									value={artisanData.phone}
									ref={businessInfoForm?.current?.phone}
								/>
							)}
						</div>
					</div>

					<div className="basis-2/5 px-2 flex">
						<ArtisanCard data={artisanData} slug={artisanData.slug} />
					</div>
				</form>
			</div>

			<div className="flex flex-col items-center border border-slate-200 rounded-lg p-4 gap-y-5 my-5">
				<div className="flex justify-between w-full items-center ">
					<h2 className="text-lg font-bold leading-7 text-gray-900 my-5 w-full">Business Details</h2>
					<button
						onClick={toggleEditDetail}
						className="flex text-base items-center gap-3 rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-500 hover:bg-slate-200 hover:shadow h-10">
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

						{!editDetail && (
							<p className="block text-lg font-semibold text-slate-700">
								{artisanData.biz_description || (
									<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
										<FaExclamationCircle className="lg:text-xl text-6xl" />
										You have not filled out a business description yet
									</span>
								)}
							</p>
						)}

						{editDetail && (
							<TextInput
								hasLabel={false}
								name="biz_description"
								title="Briefly describe your business and customers"
								value={artisanData.biz_description}
								ref={businessInfoForm?.current?.biz_description}
							/>
						)}
					</div>

					<div className="mb-3">
						<p className="text-slate-400 text-base font-semibold">What principles do you adhere to in your work?</p>
						{!editDetail && (
							<p className="block text-lg font-semibold text-slate-700">
								{artisanData.biz_principles || (
									<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
										<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
										principles yet
									</span>
								)}
							</p>
						)}
						{editDetail && (
							<TextInput
								hasLabel={false}
								name="biz_principles"
								title="What principles do you adhere to in your work?"
								value={artisanData.biz_principles}
								ref={businessInfoForm?.current?.biz_principles}
							/>
						)}
					</div>

					<div className="mb-3">
						<p className="text-slate-400 text-base font-semibold">What materials are common in your work?</p>
						{!editDetail && (
							<p className="block text-lg font-semibold text-slate-700">
								{artisanData.biz_materials || (
									<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
										<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
										materials yet
									</span>
								)}
							</p>
						)}
						{editDetail && (
							<TextInput
								hasLabel={false}
								name="biz_materials"
								title="What materials are common in your work?"
								value={artisanData.biz_materials}
								ref={businessInfoForm?.current?.biz_materials}
							/>
						)}
					</div>

					<div className="mb-3">
						<p className="text-slate-400 text-base font-semibold">What processes are common in your work?</p>
						{!editDetail && (
							<p className="block text-lg font-semibold text-slate-700">
								{artisanData.biz_processes || (
									<span className="text-base text-cyan-500  flex gap-2 items-center w-full font-semibold">
										<FaExclamationCircle className="lg:text-xl text-6xl" /> You have not filled out your business
										processes yet
									</span>
								)}
							</p>
						)}
						{editDetail && (
							<TextInput
								hasLabel={false}
								name="biz_processes"
								title="What processes are common in your work?"
								value={artisanData.biz_processes}
								ref={businessInfoForm?.current?.biz_processes}
							/>
						)}
					</div>
				</section>
			</div>
		</>
	);
};
export default EditBusinessInfo;
