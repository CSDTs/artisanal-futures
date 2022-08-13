import React, { useState, useEffect } from "react";
import {
	Box,
	chakra,
	Container,
	Stack,
	Text,
	Image,
	Flex,
	VStack,
	Button,
	Heading,
	SimpleGrid,
	StackDivider,
	useColorModeValue,
	VisuallyHidden,
	List,
	ListItem,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube, FaStore } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

export default function ProductDetails(props) {
	return (
		<>
			<Container maxW={"7xl"}>
				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 16, md: 20 }}>
					<Flex>
						<Image
							rounded={"md"}
							alt={"product image"}
							src={props.image}
							// fit={"cover"}
							align={"center"}
							// background={props.image}
							w={"100%"}
							h={"max-content"}
						/>
					</Flex>
					<Stack spacing={{ base: 4, md: 8 }}>
						<Box as={"header"}>
							<Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}>
								{props.name}
							</Heading>
							{/* <Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"2xl"}>
								$350.00 USD
							</Text> */}
							<Text color={useColorModeValue("gray.900", "gray.400")} fontWeight={300} fontSize={"2xl"}>
								{props.the_artisan}
							</Text>
							{/* <Text color={"gray.400"} fontWeight={300} fontSize={"xl"}>
								{props.the_artisan}
							</Text> */}
						</Box>

						<Stack
							spacing={{ base: 4, sm: 6 }}
							direction={"column"}
							divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.600")} />}>
							<VStack spacing={{ base: 4, sm: 6 }}>
								<Text color={useColorModeValue("gray.500", "gray.400")} fontSize={"2xl"} fontWeight={"300"}>
									{props.description ||
										"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. "}
								</Text>
								<Text fontSize={"lg"}>{props.description}</Text>
							</VStack>
							<Box>
								<Text
									fontSize={{ base: "16px", lg: "18px" }}
									color={"#319795"}
									fontWeight={"500"}
									textTransform={"uppercase"}
									mb={"4"}>
									Store Attributes
								</Text>

								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
									<List spacing={2}>
										{props.principles &&
											props.principles
												.split(",")

												.map((attribute) => <ListItem key={attribute}>{attribute}</ListItem>)}
									</List>
									{/* <List spacing={2}>
										<ListItem></ListItem>
									</List> */}
								</SimpleGrid>
							</Box>
							<Box>
								<Text
									fontSize={{ base: "16px", lg: "18px" }}
									color={"#319795"}
									fontWeight={"500"}
									textTransform={"uppercase"}
									mb={"4"}>
									Product Details
								</Text>

								<List spacing={2}>
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
								</List>
							</Box>
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
