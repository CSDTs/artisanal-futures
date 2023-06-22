import { Box, Button, chakra, Container, Flex, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const UpdateProfileCard = () => {
	const navigate = useNavigate();
	return (
		<section className="flex px-4 py-32 mx-auto max-w-6xl flex-col w-full">
			<h1 className="mb-3 text-3xl font-bold leading-3 text-slate-900 ">Welcome to Artisanal Futures!</h1>
			<p className="mb-5 text-slate-500 text-lg">
				Your next step is to update your profile, and establish your store on the site.
			</p>
			<div className="flex flex-row gap-10">
				<button className="aspect-square bg-green-400 p-4 rounded-md">Set up your store</button>
				<button className="bg-blue-400 " onClick={() => navigate("/update-profile")}>
					Update profile
				</button>
				<button onClick={() => navigate("/")}>Nah, I'll do this later</button>
			</div>
		</section>
	);
};

export default UpdateProfileCard;
