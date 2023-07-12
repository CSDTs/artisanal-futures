import { useNavigate } from "react-router-dom";

const UpdateProfileCard = () => {
	return (
		<section className="flex px-4 py-32 mx-auto max-w-6xl flex-col w-full">
			<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">Welcome to Artisanal Futures!</h1>
			<p className="mb-5 text-slate-500 text-lg">
				Your next step is to update your profile, and establish your store on the site.
			</p>
			<div className="flex flex-row gap-10">
				<a href="/welcome" className="px-4 py-2 bg-blue-400 rounded-md font-semibold text-white">
					Setup profile
				</a>
				<a href="" className="px-4 py-2 bg-slate-200 rounded-md font-semibold text-slate-800">
					Nah, I'll do this later
				</a>
			</div>
		</section>
	);
};

export default UpdateProfileCard;
