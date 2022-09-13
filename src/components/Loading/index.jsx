import { Flex } from "@chakra-ui/react";
import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

export default function Loading({ isLoading }) {
	// return <PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />;

	return (
		<>
			{isLoading && (
				<Flex minH={"100vh"} align={"center"} justify={"center"}>
					<PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />
				</Flex>
			)}
		</>
	);
}
