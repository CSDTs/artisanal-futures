import useImageUpload from "@/hooks/useImageUpload";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { forwardRef, useState } from "react";

import { BusinessData } from "@/types";

type Ref = HTMLFormElement;

interface IProps extends BusinessData {
	handleOnChange: React.FormEventHandler;
	setBusinessData: React.Dispatch<React.SetStateAction<BusinessData>>;
}

const BusinessInfo = forwardRef<Ref, IProps>((props, ref) => {
	const {
		biz_name,
		biz_description,
		biz_principles,
		biz_materials,
		biz_processes,
		biz_email,
		phone,
		address,
		website,
		listing_file_url,
	} = props;

	const { handleOnChange, setBusinessData } = props;

	const [image, setImage] = useState<string | null>(null);

	const { uploadImageToMedia } = useImageUpload();

	const updateListingFileURL = (data: any) => setBusinessData({ ...data, listing_file_url: data });

	const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(URL.createObjectURL(e.target.files[0]));
			uploadImageToMedia(e.target.files[0], updateListingFileURL);
		}
	};
	return (
		<form className="h-full overflow-scroll bg-white shadow rounded-md p-4" ref={ref} onChange={handleOnChange}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Business Profile</h2>
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
							<label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
								Address
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="address"
									id="address"
									autoComplete="street-address"
									defaultValue={address}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="biz_email" className="block text-sm font-medium leading-6 text-gray-900">
								Email Address
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
									{image ? (
										<img src={image} className="mx-auto h-96 w-96 object-cover" alt="Uploaded preview" />
									) : listing_file_url ? (
										<img src={listing_file_url} className="mx-auto h-96 w-96 object-cover" alt="Uploaded preview" />
									) : (
										<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
									)}
									<div className="mt-4 flex text-sm leading-6 text-gray-600 w-full justify-center ">
										<label
											htmlFor="listing_file_upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
											<span>Upload a file</span>
											<input
												id="listing_file_upload"
												name="listing_file_upload"
												type="file"
												className="sr-only"
												accept="image/png, image/jpeg"
												onChange={handleCoverChange}
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>

									<label
										htmlFor="listing_file_url"
										className="block text-sm font-medium leading-6 text-gray-900 sr-only">
										Listing File URL
									</label>
									<input
										type="text"
										name="phone"
										id="listing_file_url"
										disabled
										defaultValue={listing_file_url}
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
									/>

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
