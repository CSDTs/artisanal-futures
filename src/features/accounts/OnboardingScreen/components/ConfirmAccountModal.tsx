import useAuth from "@/hooks/useAuth";
import { AccountData, BusinessData } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { FC, Fragment, useState } from "react";
import createArtisan from "../account.middleware";

interface IProps {
	account: AccountData;
	business: BusinessData;
}
const ConfirmAccountModal: FC<IProps> = ({ account, business }) => {
	const { token, membershipID, userID } = useAuth();

	let [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	const handleSubmit = async () => {
		console.log(account, business);
		await createArtisan(account, business, token as string, membershipID as string, userID as string)
			.then((res) => {
				console.log(res);
				closeModal();
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<>
			<button
				className="px-4 py-2 font-semibold text-sm bg-emerald-500 text-white border border-slate-200 rounded-md  shadow-sm"
				onClick={openModal}>
				Submit
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
										Create your account
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500 ">
											By creating your account, you agree to our{" "}
											<a href="/policies/terms-of-service" target="_blank" className="text-indigo-500 font-medium">
												Terms of Service
											</a>
											,{" "}
											<a href="/policies/terms-of-service" target="_blank" className="text-indigo-500 font-medium">
												Privacy Policy
											</a>
											, and our{" "}
											<a href="/agreement" target="_blank" className="text-indigo-500 font-medium">
												Collective Agreement
											</a>
											. You can always change your account and business settings later in your settings.
										</p>
									</div>

									<div className="mt-4 flex gap-4 justify-end">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
											onClick={closeModal}>
											Cancel
										</button>

										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
											onClick={handleSubmit}>
											I agree, create my account
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
export default ConfirmAccountModal;
