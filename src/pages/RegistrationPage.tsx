import Alert from "@/components/UI/Alert";

import { FormEvent, useRef, useState } from "react";

import PageContainer from "@/components/UI/PageContainer";
import useCreateUser from "@/hooks/useCreateUser";
import RegistrationService from "@/middleware/registration";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
	const [isProcessing, setIsProcessing] = useState(false);
	// const [error, setError] = useState(false);

	const { createUser, isLoading, error } = useCreateUser();

	const handleOnSubmit = (e: FormEvent) => {
		e.preventDefault();

		const payload = {
			username: dataForm?.current?.username?.value,
			password: dataForm?.current?.password?.value,
			email: dataForm?.current?.email?.value,
			access_code: dataForm?.current?.access_code?.value,
		};

		setIsProcessing(true);

		createUser(payload).catch((err) => {
			console.error(
				err?.response?.data?.data?.message || "There was an error processing your request. Please try again later."
			);
			// setError(true);
			setIsProcessing(false);
		});
	};

	const dataForm = useRef<HTMLFormElement>(null);

	const navigate = useNavigate();

	return (
		<PageContainer>
			<section className="flex gap-4 md:gap-8 lg:gap-20 flex-col mx-auto h-full">
				<section className="max-w-3xl mx-auto ">
					<img src="/img/logo.png" alt="Artisanal Futures Logo" className="w-1/2 mx-auto" />
					<p className="text-lg font-normal text-center">
						Create your account. Already a member?{" "}
						<button className="text-blue-500 cursor-pointer hover:text-blue-700" onClick={() => navigate("/login")}>
							Log In
						</button>
					</p>

					<form ref={dataForm} className="h-full rounded-md p-4 w-full mx-auto" onSubmit={handleOnSubmit}>
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
										className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50"
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
										className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50"
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
										className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50"
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
										className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-slate-50"
									/>
								</div>
								<p className="mt-3 text-base leading-6 text-gray-600">
									Don't have an access code?{" "}
									<button
										className="text-blue-500 cursor-pointer hover:text-blue-700 font-semibold"
										onClick={() => navigate("/contact")}>
										Contact us for one!
									</button>
								</p>
							</div>
						</div>
						<p>By creating an account, you agree to our terms and conditions and privacy policy.</p>

						<div className="flex gap-4">
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
								)}
								Create account
							</button>

							<p>
								Already have an account? <a href="/login">Log in.</a>
							</p>
						</div>
					</form>
				</section>
			</section>
		</PageContainer>
	);
};
export default RegistrationPage;
