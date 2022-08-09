import { Route, Routes, useNavigate } from "react-router-dom";
import { Container, Heading, Text, Stack, Spacer, Box } from "@chakra-ui/react";

export default function Tools() {
	const navigate = useNavigate();
	return (
		<>
			<Container>
				<Heading>Utilize Our Tools</Heading>
				<Text>Browse our current selection of free and open source tools to power up your business workflow!</Text>
				<Stack>
					<Box onClick={() => navigate(`/tools/shop-rate-calculator`)}>
						<Text>Shop Rate Calculator</Text>
					</Box>
				</Stack>
			</Container>

			<Routes></Routes>
		</>
	);
}
