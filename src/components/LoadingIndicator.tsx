import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { PuffLoader } from "react-spinners";

const override = {
	display: "block",
	margin: "0 auto",
};

interface IProps {
	isLoading: boolean;
}
const LoadingIndicator: FC<IProps> = ({ isLoading }) => {
	return (
		<>
			{isLoading && (
				<Flex minH={"100vh"} align={"center"} justify={"center"}>
					<PuffLoader color={"#000000"} loading={isLoading} cssOverride={override} size={150} />
				</Flex>
			)}
		</>
	);
};
export default LoadingIndicator;
