import Alert from "@/components/Alert";
import PageContainer from "@/components/PageContainer";

import emailjs from "emailjs-com";
import { FormEventHandler, SyntheticEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
	const [status, setStatus] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const form = useRef<HTMLFormElement>(null);

	const handleOnSubmit = (e: SyntheticEvent) => {
		e.preventDefault();

		emailjs
			.sendForm(
				import.meta.env.VITE_SERVICE_ID,
				import.meta.env.VITE_TEMPLATE_ID,
				form.current as HTMLFormElement,
				import.meta.env.VITE_USER_ID
			)
			.then(
				(result) => {
					console.log(result.text);
					setStatus(true);
				},
				(error) => {
					console.error(error.text);
					setStatus(false);
				}
			)
			.finally(() => {
				setIsVisible(true);
			}),
			form?.current?.reset();
	};

	const navigate = useNavigate();
	return (
		<PageContainer>
			<section className="flex gap-4 md:gap-8 lg:gap-20 flex-col mx-auto h-full">
				{isVisible && (
					<Alert type={status ? "success" : "error"} callback={() => setIsVisible(false)}>
						<p>
							{status
								? " Your message has been received. We will get back to you as soon as we can."
								: "There was an error processing your request. Please try again later. "}
						</p>
					</Alert>
				)}

				<section className="max-w-3xl mx-auto ">
					<img src="/img/logo.png" alt="Artisanal Futures Logo" className="w-1/2 mx-auto" />
					<p className="text-xl font-normal text-center">Interested in joining us? Let us know about you!</p>
					<form
						className="flex flex-col gap-5 w-full"
						onSubmit={handleOnSubmit as FormEventHandler<HTMLFormElement>}
						ref={form}>
						<div className="my-10 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-8">
							<div className="sm:col-span-4">
								<label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
									Name
								</label>
								<div className="mt-2">
									<input
										id="name"
										name="name"
										type="text"
										placeholder="eg. jsmith"
										required
										className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
							<div className="sm:col-span-4">
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
								<label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
									Message
								</label>
								<div className="mt-2">
									<textarea
										id="message"
										name="message"
										placeholder="eg. I am super interested in joining Artisanal Futures..."
										required
										rows={8}
										className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</div>

						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
							Send Message
						</button>
					</form>
					<p className="text-center mt-4 text-lg">
						Have an authorization code?{" "}
						<button
							className="text-blue-500 font-semibold hover:text-blue-700"
							onClick={() => navigate("/registration")}>
							Click here
						</button>
					</p>
				</section>
			</section>
		</PageContainer>
	);
};

export default ContactPage;
