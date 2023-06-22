import Alert from "@/components/Alert";

import { FormEvent, useRef, useState } from "react";

import RegistrationService from "@/features/Registration/services/registration.service";

const Gateway = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	const [error, setError] = useState(false);

	const handleOnSubmit = (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			username: dataForm?.current?.username?.value,
			password: dataForm?.current?.password?.value,
			email: dataForm?.current?.email?.value,
			access_code: dataForm?.current?.access_code?.value,
		};

		setIsProcessing(true);

		RegistrationService.createNewUser(payload).catch((err) => {
			console.error(
				err?.response?.data?.data?.message || "There was an error processing your request. Please try again later."
			);
			setError(true);
			setIsProcessing(false);
		});
	};

	const dataForm = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={dataForm}
			className="h-full overflow-scroll bg-white shadow rounded-md p-4 md:w-2/6 w-full"
			onSubmit={handleOnSubmit}>
			{error && (
				<Alert type="error" callback={() => setError(false)}>
					<p>There was an error processing your request. Please try again later.</p>
				</Alert>
			)}

			<div className="my-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
				<div className="sm:col-span-full">
					<label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
						Username
					</label>
					<div className="mt-2">
						<input
							id="username"
							name="username"
							type="text"
							placeholder="eg. jsmith"
							required
							className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div className="sm:col-span-full">
					<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
						Email
					</label>
					<div className="mt-2">
						<input
							id="email"
							name="email"
							placeholder="eg. jsmith@example.com"
							type="email"
							required
							className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>

				<div className="sm:col-span-full">
					<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
						Password
					</label>
					<div className="mt-2">
						<input
							id="password"
							name="password"
							placeholder="eg. SupEr$ecretP@ssw0rd"
							type="password"
							required
							className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
				</div>
				<div className="sm:col-span-full">
					<label htmlFor="access_code" className="block text-sm font-medium leading-6 text-gray-900">
						Access Code
					</label>
					<div className="mt-2">
						<input
							id="access_code"
							name="access_code"
							type="text"
							required
							className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						/>
					</div>
					<p className="mt-3 text-sm leading-6 text-gray-600">Don't have an access code? </p>
				</div>
			</div>

			<button
				className="w-full text-white bg-blue-500 hover:bg-blue-600 items-center flex justify-center py-2 rounded-lg font-semibold"
				type="submit">
				{" "}
				{isProcessing && (
					<svg
						className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
					</svg>
				)}
				Create account
			</button>
		</form>
	);
};
export default Gateway;
