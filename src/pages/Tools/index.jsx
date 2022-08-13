import { Route, Routes, useNavigate } from "react-router-dom";
import { Container, Heading, Text, Stack, Spacer, Box, Flex } from "@chakra-ui/react";
import ToolCard from "../../components/ui/Card/ToolCard";
export default function Tools() {
	const navigate = useNavigate();
	return (
		<>
			<Container maxW={"6xl"} mt={6}>
				<Heading mb={6}>Utilize Our Tools</Heading>
				<Text mt={1} display="block" fontSize="lg" lineHeight="normal" fontWeight="semibold" marginBottom={"2rem"}>
					Browse our current selection of free and open source tools to power up your business workflow
				</Text>
				<Flex
					bg="#edf3f8"
					_dark={{
						bg: "#3e3e3e",
					}}
					p={50}
					w="full"
					alignItems="center"
					justifyContent="left"
				>
					<Stack direction={"row"} spacing={6}>
						<ToolCard
							title={"Shop Rate Calculator"}
							brief={"Calculates per hour cost of shop"}
							url={`/tools/shop-rate-calculator`}
						/>
					</Stack>
				</Flex>
			</Container>

			<Routes></Routes>
		</>
	);
}
