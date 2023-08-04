import PageContainer from "@/components/UI/PageContainer";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<PageContainer>
			<div className="w-full h-full flex flex-col justify-center max-w-xl mx-auto my-auto">
				<h1 className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent">
					{" "}
					404
				</h1>

				<p className="text-lg mt-3 mb-2">Page Not Found</p>
				<p className="text-slate-500 mb-6">The page you are looking for does not seem to exist</p>

				<button
					className="text-white bg-gradient-to-r from-indigo-400 to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 px-4 py-2 rounded-md"
					onClick={() => {
						navigate("/");
					}}>
					Go to Home
				</button>
			</div>
		</PageContainer>
	);
};

export default PageNotFound;
