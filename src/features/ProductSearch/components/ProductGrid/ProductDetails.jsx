import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Container,
	Flex,
	Heading,
	Image,
	ListItem,
	SimpleGrid,
	Stack,
	StackDivider,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	UnorderedList,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProductDetails(props) {
	const [assessmentReference, setAssessmentReference] = useState(
		JSON.parse(props.assessment[0].data_reference).calculation
	);

	const [assessmentData, setAssessmentData] = useState(JSON.parse(props.assessment[0].data).calculation);

	return (
		<>
			<Container maxW={"4xl"}>
				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 16, md: 20 }}>
					<Flex>
						<Image
							rounded={"md"}
							alt={"product image"}
							src={props.image}
							align={"center"}
							w={{ base: "100%", md: "75%", lg: "100%" }}
							h={"max-content"}
							mx={{ md: "auto" }}
						/>
					</Flex>
					<Stack spacing={{ base: 4, md: 8 }}>
						<Box as={"header"}>
							<Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
								{props.name}
							</Heading>

							<Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"xl"}>
								{props.the_artisan}
							</Text>
						</Box>

						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={"column"}
							// divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}
						>
							<VStack spacing={{ base: 4, sm: 6 }}>
								{/* <Text color={useColorModeValue("gray.500", "gray.400")} fontSize={"2xl"} fontWeight={"300"}>
									{props.description ||
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
								</Text> */}
								<Text fontSize={"lg"}>
									{" "}
									{props.description ||
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
								</Text>
							</VStack>

							<Accordion allowMultiple py={4}>
								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												<Text
													fontSize={{ base: "16px", lg: "18px" }}
													color={"#319795"}
													fontWeight={"500"}
													textTransform={"uppercase"}>
													Store Attributes
												</Text>
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
											<UnorderedList spacing={2}>
												{props.principles &&
													props.principles
														.split(",")

														.map((attribute) => <ListItem key={attribute}>{attribute}</ListItem>)}
											</UnorderedList>
										</SimpleGrid>
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												<Text
													fontSize={{ base: "16px", lg: "18px" }}
													color={"#319795"}
													fontWeight={"500"}
													textTransform={"uppercase"}>
													Product Details
												</Text>
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										{/* <List spacing={2}>
											<ListItem>
												<Text as={"span"} fontWeight={"bold"}>
													Materials used:
												</Text>{" "}
												{props.materials}
											</ListItem>
											<ListItem>
												<Text as={"span"} fontWeight={"bold"}>
													Processes used:
												</Text>{" "}
												{props.processes}
											</ListItem>
											<ListItem>
												<Text as={"span"} fontWeight={"bold"}>
													Industrial Scale items:
												</Text>{" "}
												{props.industrial_scale_items || "N/A"}
											</ListItem>
										</List> */}
										<Text fontWeight={500}>Coming Soon</Text>
									</AccordionPanel>
								</AccordionItem>

								<AccordionItem>
									<h2>
										<AccordionButton>
											<Box flex="1" textAlign="left">
												<Text
													fontSize={{ base: "16px", lg: "18px" }}
													color={"#319795"}
													fontWeight={"500"}
													textTransform={"uppercase"}>
													Environmental Impact
												</Text>
											</Box>
											<AccordionIcon />
										</AccordionButton>
									</h2>
									<AccordionPanel pb={4}>
										<Text>{props.assessment[0].description}</Text>

										<TableContainer>
											<Table variant="simple">
												<TableCaption>{props.assessment[0].type}</TableCaption>
												<Thead>
													<Tr>
														<Th>Name</Th>

														<Th isNumeric>Value</Th>
													</Tr>
												</Thead>
												<Tbody>
													{assessmentReference &&
														Object.keys(assessmentReference).map((entry) => (
															<Tr key={entry}>
																<Td>{assessmentReference[entry].name}</Td>

																<Td isNumeric>
																	{assessmentData[assessmentReference[entry].index]}
																	{assessmentReference[entry].unit}
																</Td>
															</Tr>
														))}
												</Tbody>
												<Tfoot>
													<Tr>
														<Th>Name</Th>

														<Th isNumeric>Unit</Th>
													</Tr>
												</Tfoot>
											</Table>
										</TableContainer>
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						</Stack>

						<Button
							rounded={"none"}
							w={"full"}
							mt={8}
							size={"lg"}
							link={"google.com"}
							py={"7"}
							bg={useColorModeValue("gray.900", "gray.50")}
							color={useColorModeValue("white", "gray.900")}
							textTransform={"uppercase"}
							_hover={{
								transform: "translateY(2px)",
								boxShadow: "lg",
							}}
							onClick={() => window.open(props.url, "_blank")}>
							Head to Store
						</Button>
					</Stack>
				</SimpleGrid>
			</Container>
		</>
	);
}
