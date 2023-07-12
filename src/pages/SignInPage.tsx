import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Alert from "@/components/UI/Alert";
import Loading from "@/components/UI/LoadingIndicator";
import useAuth from "@/hooks/useAuth";

const SignInPage = () => {
	const [isLoading, setIsLoading] = useState(false);

	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const navigate = useNavigate();

	const [error, setError] = useState(false);

	const { login, authenticated } = useAuth();

	const loginInfo = {
		username: usernameRef.current?.value,
		password: passwordRef.current?.value,
	};

	const debugLoginInfo = {
		username: import.meta.env.VITE_TEST_USERNAME,
		password: import.meta.env.VITE_TEST_PASS,
	};

	const logInUser = (debug = false) => {
		setIsLoading(true);

		login(debug ? debugLoginInfo : loginInfo)
			.then(() => {
				navigate("/profile");
				window.location.reload();
			})
			.catch(() => {
				console.error("Error logging in");
				setIsLoading(false);
				setError(true);
			});
	};

	const testLogInUser = () => logInUser(true);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (usernameRef.current?.value !== "" && passwordRef.current?.value !== "") {
			logInUser();
		}
	};

	useEffect(() => {
		if (authenticated) navigate("/profile");
	}, []);

	return (
		<section className="flex items-center content-center justify-center min-h-screen bg-slate-50 flex-col ">
			<div className="mb-auto p-4 text-left w-full">
				<a href="/" className="text-blue-400 text-lg font-medium ">
					<span className="text-3xl ">←</span> Back to homepage
				</a>
			</div>
			{!isLoading && (
				<div className="my-auto flex flex-col w-[32rem] gap-8 px-6 py-12 mx-auto">
					<div className="flex flex-col gap-4 text-center">
						<img src="/img/logo.png" alt="Artisanal Futures Logo" className="w-1/2 mx-auto mb-2" />
						<h1 className="text-4xl font-semibold">Sign in to your account</h1>
						<p className="text-lg text-slate-600">
							to customize your profile and store <span onClick={testLogInUser}>✌️</span>
						</p>
					</div>

					<div className="p-8 bg-white rounded-lg shadow-lg">
						<form onSubmit={handleSubmit} className="flex flex-col gap-4" onChange={() => setError(false)}>
							{error && (
								<Alert type="error" callback={() => setError(false)}>
									<p>
										Your login information was either incorrect, or you were not added as one of our artisans. Please
										try again.
									</p>
								</Alert>
							)}

							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Email address
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="email"
										name="email"
										id="email"
										className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="e.g. coolName@artisanalfutures.org"
										ref={usernameRef}
									/>
								</div>
							</div>
							<div>
								<label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								<div className="relative mt-2 rounded-md shadow-sm">
									<input
										type="password"
										name="password"
										id="password"
										className="block w-full rounded-md border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="e.g. suPERsecreT!Pa$$W0rd"
										ref={passwordRef}
									/>
								</div>
							</div>

							<div className="flex flex-col w-full gap-10">
								<div className="flex flex-col items-start justify-between sm:flex-row">
									<label>
										<input type="checkbox" className="accent-blue-500" /> Remember me
									</label>

									<a href="#!" className="text-blue-400">
										Forgot password?
									</a>
								</div>

								<button
									className="w-full py-2 font-semibold text-white bg-blue-400 rounded-md hover:bg-blue-500"
									type="submit">
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			<Loading isLoading={isLoading} />
			<div className="mt-auto p-4">
				<p className="font-normal text-slate-400">&copy; 2023 Artisanal Futures. All rights reserved.</p>
			</div>
		</section>
	);
};

export default SignInPage;
