import useImageUpload from "@/hooks/useImageUpload";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";

import { AccountData } from "@/types";
import { useTimeout } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

type Ref = HTMLFormElement;

interface IProps extends AccountData {
	handleOnChange: React.FormEventHandler;
	accountData: AccountData;
	setAccountData: React.Dispatch<React.SetStateAction<AccountData>>;
}

const AccountInfo = forwardRef<HTMLFormElement, IProps>(function AccountInfo(props, ref) {
	const logoInputRef = useRef<HTMLInputElement>(null);
	const {
		first_name,
		last_name,
		email,
		username,
		forums,
		about,
		profile_image_url,
		supply_chain,
		handleOnChange,
		setAccountData,
	} = props;
	const [logo, setLogo] = useState<string | null>(null);
	const testUpload = (data: any) => {
		setAccountData({
			...props.accountData,
			profile_image_file: logoInputRef?.current?.value,
			profile_image_url: data,
		});
	};
	const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log("yet");
		if (e.target.files) {
			setLogo(null);
			setAccountData({
				...props.accountData,
				profile_image_file: "",
				profile_image_url: "",
			});

			setLogo(URL.createObjectURL(e.target.files[0]));
			uploadImageToMedia(e.target.files[0], testUpload);
		}
	};

	const { uploadImageToMedia } = useImageUpload();

	const handleClick = () => {
		if (logoInputRef.current) {
			logoInputRef.current.click();
		}
	};

	return (
		<form className="h-full overflow-scroll bg-white shadow rounded-md p-4" ref={ref} onChange={handleOnChange}>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This information will be displayed publicly so be careful what you share.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="first_name" className="block text-sm font-medium leading-6 text-gray-900">
								First name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="first_name"
									id="first_name"
									required
									autoComplete="given-name"
									defaultValue={first_name}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="last_name" className="block text-sm font-medium leading-6 text-gray-900">
								Last name
							</label>
							<div className="mt-2">
								<input
									type="text"
									name="last_name"
									required
									id="last_name"
									autoComplete="family-name"
									defaultValue={last_name}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
								Username
							</label>
							<div className="mt-2">
								<div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ">
									<span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
										artisanalfutures.org/artisans/
									</span>
									<input
										type="text"
										name="username"
										id="username"
										required
										autoComplete="username"
										className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
										placeholder="janesmith"
										defaultValue={username}
									/>
								</div>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
								Email address
							</label>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									required
									type="email"
									autoComplete="email"
									defaultValue={email}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Public Profile</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						This info allows others to see you on the platform. You can change this later.
					</p>
					<div className="col-span-full mt-10">
						<label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
							About
						</label>
						<div className="mt-2">
							<textarea
								id="about"
								name="about"
								rows={3}
								className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								defaultValue={about}
							/>
						</div>
						<p className="mt-3 text-sm leading-6 text-gray-600">Write a few sentences about yourself.</p>
					</div>

					<div className="col-span-full mt-5">
						<label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
							Photo
						</label>
						<div className="mt-2 flex items-center gap-x-3">
							{logo ? (
								<img src={logo} alt="Business Logo" className="h-32 w-32 object-cover rounded-full shadow" />
							) : profile_image_url ? (
								<img
									src={profile_image_url}
									alt="Business Logo"
									className="h-32 w-32 object-cover rounded-full shadow"
								/>
							) : (
								<UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
							)}

							<input
								type="file"
								name="profile_image_file"
								id="profile_image_file"
								ref={logoInputRef}
								className="hidden"
								accept="image/*"
								onChange={handleLogoChange}
								aria-label="Account Image"
							/>
							{logo && !profile_image_url ? (
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
							) : (
								<button
									type="button"
									className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
									onClick={handleClick}>
									Change
								</button>
							)}
						</div>

						<label htmlFor="profile_image_url" className="block text-sm font-medium leading-6 text-gray-900 sr-only">
							Profile Image URL
						</label>
						<input
							type="text"
							name="phone"
							id="profile_image_url"
							value={profile_image_url}
							className="mt-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"
						/>
						{profile_image_url && (
							<p className="text-green-500 font-semibold text-lg bg-green-500 bg-opacity-20 inline-flex px-5 items-center rounded">
								<FaCheck className="mr-2" />
								Photo processed!
							</p>
						)}
					</div>
				</div>
				<div className="pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Opt Ins</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						These are completely optional, but they would be helpful in improving other tech for the site.
					</p>

					<div className="mt-10 space-y-10">
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900">Forums</legend>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								ArtisanalFutures includes a forum for discussion with other businesses and customers like you. Please
								indicate the kinds of forums you are interested in joining:
							</p>
							<div className="mt-6 space-y-6">
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="moderated_forum"
											name="moderated_forum"
											type="checkbox"
											defaultChecked={forums?.moderated_forum}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="moderated_forum" className="font-medium text-gray-900">
											Moderated
										</label>
										<p className="text-gray-500">Monitored, publicly visible, and open to the public</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="unmoderated_forum"
											name="unmoderated_forum"
											type="checkbox"
											defaultChecked={forums?.unmoderated_forum}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="unmoderated_forum" className="font-medium text-gray-900">
											Unmoderated
										</label>
										<p className="text-gray-500">Unmonitored, publicly visible, and open to the public</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="private_forum"
											name="private_forum"
											type="checkbox"
											defaultChecked={forums?.private_forum}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="private_forum" className="font-medium text-gray-900">
											Private
										</label>
										<p className="text-gray-500">Privately visible and open to approved members only</p>
									</div>
								</div>
								<div className="relative flex gap-x-3">
									<div className="flex h-6 items-center">
										<input
											id="hidden_forum"
											name="hidden_forum"
											type="checkbox"
											defaultChecked={forums?.hidden_forum}
											className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
										/>
									</div>
									<div className="text-sm leading-6">
										<label htmlFor="hidden_forum" className="font-medium text-gray-900">
											Hidden
										</label>
										<p className="text-gray-500">Invisible and open to invited members only</p>
									</div>
								</div>
							</div>
						</fieldset>
						<fieldset>
							<legend className="text-sm font-semibold leading-6 text-gray-900">Supply Chain Opt In</legend>
							<p className="mt-1 text-sm leading-6 text-gray-600">
								Supply chains provide materials and resources critical for your work. We want to use collective
								bargaining by identifying alternative and multiple sources and help network you and other businesses. To
								do this we need more supply chain conversations. To help do this we need periodic input from you. If you
								agree, then from time to time we will ask you to mention what supplies and materials you are currently
								using. Our AI technology will help suggest materials and processes upfront to save you time and effort.
								What the AI technology learns helps us identify outside price dips for groups of materials useful to
								groups of ArtisanalFutures businesses. It also helps us identify alternative and new sources.
							</p>
							<div className="mt-6 space-y-6">
								<div className="flex items-center gap-x-3">
									<input
										id="supply_chain"
										name="supply_chain"
										type="radio"
										defaultChecked={supply_chain}
										className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
									/>
									<label htmlFor="supply_chain" className="block text-sm font-medium leading-6 text-gray-900">
										I agree to be a part of our supply chain conversations service
									</label>
								</div>
							</div>
						</fieldset>
					</div>
				</div>
			</div>
		</form>
	);
});

export default AccountInfo;
