import { AccountData } from "@/types";
import { FC } from "react";

interface IProps {
	user: AccountData;
}

const UndergoingMaintenance: FC<IProps> = ({ user }) => {
	return (
		<section className="text-center py-10 px-6">
			<div className="inline-block">
				<div className="flex flex-col justify-center items-center bg-red-500  rounded-lg  aspect-square w-14  text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6">
						<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</div>
			</div>
			<h2 className="text-xl mt-6 mb-2">Account Setup Undergoing Maintenance</h2>
			<p className="text-slate-500 py-5">
				Hey, <span className="text-blue-500 font-medium">{user.first_name}</span>! It seems like you were granted access
				to Artisanal Futures, with the next step being setting up your profile and store on the site. However, that
				service is temporarily down for maintenance. Check back later to finish setting up your account. If you have any
				questions, please let us know at{" "}
				<a href={`email:${import.meta.env.VITE_SITE_EMAIL}`} className="text-blue-500 font-medium">
					{import.meta.env.VITE_SITE_EMAIL}
				</a>
			</p>
			<a href="/" className="mt-8 px-4 py-2 bg-indigo-500 text-white hover:bg-opacity-75 rounded shadow ">
				Back to Homepage
			</a>
		</section>
	);
};

export default UndergoingMaintenance;
