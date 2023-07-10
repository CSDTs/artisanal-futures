import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { forwardRef, useRef, useState } from "react";

import AuthService from "@/services/auth.service";
import { BusinessData } from "@/types";

import { FaCheck, FaTrash } from "react-icons/fa";

type Ref = HTMLFormElement;

interface IProps {
	businessData: BusinessData;
	handleOnChange: React.FormEventHandler;
	setBusinessData: React.Dispatch<React.SetStateAction<BusinessData>>;
}

const BusinessInfo = forwardRef<Ref, IProps>(function BusinessInfo(
	{ businessData, handleOnChange, setBusinessData },
	ref
) {
	const listingInputRef = useRef<HTMLInputElement>(null);
	const { uploadImageToMedia, deleteMediaLink } = useImageUpload();

	const {
		biz_name,
		biz_description,
		biz_principles,
		biz_materials,
		biz_processes,
		biz_email,
		phone,
		location,
		website,
		listing_image_url,
		listing_image_media_id,
	} = businessData;

	const [listingImage, setListingImage] = useState<string | null>(null);

	const clearListingImage = () => {
		setListingImage(null);
		setBusinessData({
			...businessData,
			listing_image_file: "",
			listing_image_url: "",
			listing_image_media_id: -1,
		});
	};

	const listingImageUploadCallback = (data: any) =>
		setBusinessData({
			...businessData,
			listing_image_file: listingInputRef?.current?.value,
			listing_image_url: data?.source_url,
			listing_image_media_id: data?.id,
		});

	const handleListingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			clearListingImage();

			setListingImage(URL.createObjectURL(e.target.files[0]));
			uploadImageToMedia(e.target.files[0], listingImageUploadCallback);
		}
	};

	const handleListingImageRemoval = async () => {
		const token = await AuthService.getCurrentUser().token;
		deleteMediaLink(listing_image_media_id, token).then(() => {
			clearListingImage();
		});
	};
	return (
		<form className="h-full overflow-scroll bg-white shadow rounded-md p-4" ref={ref} onChange={handleOnChange}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Business listing</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="biz_name" className="block text-sm font-medium leading-6 text-gray-900">
								Business Name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="biz_name"
									id="biz_name"
									autoComplete="organization"
									defaultValue={biz_name}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
								Website
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="website"
									id="website"
									autoComplete="url"
									defaultValue={website}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-6">
							<label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
								location
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="location"
									id="location"
									autoComplete="street-location"
									defaultValue={location}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="biz_email" className="block text-sm font-medium leading-6 text-gray-900">
								Email location
							</label>
							<div className="mt-2">
								<input
									id="biz_email"
									name="biz_email"
									type="email"
									autoComplete="email"
									defaultValue={biz_email}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
								Phone Number
							</label>
							<div className="mt-2">
								<input
									type="tel"
									name="phone"
									id="phone"
									autoComplete="tel"
									defaultValue={phone}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="listing_photo" className="block text-sm font-medium leading-6 text-gray-900">
								Listing photo
							</label>
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
								<div className="text-center">
									<div>
										{" "}
										<aside className="w-full flex justify-end">
											{listing_image_url && (
												<button
													aria-label="Remove image"
													type="button"
													className="rounded-md bg-red-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-600"
													onClick={handleListingImageRemoval}>
													<FaTrash />
												</button>
											)}
										</aside>
										{listingImage ? (
											<img src={listingImage} className="mx-auto h-96 w-96 object-cover" alt="Uploaded preview" />
										) : listing_image_url ? (
											<img src={listing_image_url} className="mx-auto h-96 w-96 object-cover" alt="Uploaded preview" />
										) : (
											<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
										)}
									</div>

									<div className="mt-4 flex text-sm leading-6 text-gray-600 w-full justify-center ">
										<label
											htmlFor="listing_image_file"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
											<span>Upload a file</span>
											<input
												id="listing_image_file"
												name="listing_image_file"
												type="file"
												ref={listingInputRef}
												className="sr-only"
												accept="image/png, image/jpeg"
												onChange={handleListingImageChange}
												aria-label="Business listing image"
											/>
										</label>
										<p className="pl-1 mb-auto">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>

									<label
										htmlFor="listing_image_url"
										className="block text-sm font-medium leading-6 text-gray-900 sr-only">
										Profile Image URL
									</label>
									<input
										type="text"
										readOnly
										hidden
										name="listing_image_url"
										id="listing_image_url"
										value={listing_image_url}
										className="mt-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
									/>
									<label
										htmlFor="listing_image_media_id"
										className="block text-sm font-medium leading-6 text-gray-900 sr-only">
										Profile Image Media ID
									</label>
									<input
										type="number"
										readOnly
										hidden
										name="listing_image_media_id"
										id="listing_image_media_id"
										value={listing_image_media_id ?? 0}
										className="mt-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
									/>
									{listing_image_url && (
										<p className="text-green-500 font-semibold text-lg bg-green-500 bg-opacity-20 inline-flex px-5 items-center rounded">
											<FaCheck className="mr-2" />
											Photo processed!
										</p>
									)}
									{listingImage && !listing_image_url && (
										<button
											type="button"
											className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
											disabled>
											<svg
												className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24">
												<circle
													className="opacity-25"
													cx="12"
													cy="12"
													r="10"
													stroke="currentColor"
													stroke-width="4"></circle>
												<path
													className="opacity-75"
													fill="currentColor"
													d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
											</svg>
											Processing...
										</button>
									)}

									{/* <button onClick={handleSubmit}>Submit</button> */}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className=" pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Details</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This helps us better recommend your business to visitors, as well as map out production.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="biz_description" className="block text-sm font-medium leading-6 text-gray-900">
								Briefly describe your business and customers
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="biz_description"
									id="biz_description"
									defaultValue={biz_description}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="biz_principles" className="block text-sm font-medium leading-6 text-gray-900">
								What principles do you adhere to in your work?
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="biz_principles"
									id="biz_principles"
									defaultValue={biz_principles}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-full">
							<label htmlFor="biz_materials" className="block text-sm font-medium leading-6 text-gray-900">
								What materials are common in your work?
							</label>
							<div className="mt-2">
								<input
									id="biz_materials"
									name="biz_materials"
									type="text"
									defaultValue={biz_materials}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>{" "}
						<div className="sm:col-span-full">
							<label htmlFor="biz_processes" className="block text-sm font-medium leading-6 text-gray-900">
								What processes are common in your work?
							</label>
							<div className="mt-2">
								<input
									id="biz_processes"
									name="biz_processes"
									type="text"
									defaultValue={biz_processes}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
});

export default BusinessInfo;
