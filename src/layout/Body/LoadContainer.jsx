import { Container, Text } from "@chakra-ui/react";
import Loading from "../../components/Loading";

export default function LoadContainer({
	isLoading,
	children,
	isError,
	errorMsg = "There seems to be an issue connecting to the server. Please try again later.",
}) {
	return (
		<Container maxW={"6xl"} mt={6}>
			<Loading isLoading={isLoading} />
			{!isLoading && <>{children}</>}
			{isError && <Text>{errorMsg}</Text>}
		</Container>
	);
}
