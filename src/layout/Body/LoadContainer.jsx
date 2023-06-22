import { Container, Text } from "@chakra-ui/react";
import LoadingIndicator from "../../components/LoadingIndicator";

export default function LoadContainer({
	isLoading,
	children,
	isError,
	errorMsg = "There seems to be an issue connecting to the server. Please try again later.",
}) {
	return (
		<Container maxW={"6xl"} mt={6}>
			<LoadingIndicator isLoading={isLoading} />
			{!isLoading && <>{children}</>}
			{isError && <Text>{errorMsg}</Text>}
		</Container>
	);
}
