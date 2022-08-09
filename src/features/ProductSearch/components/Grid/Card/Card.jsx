import React from "react";

import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
	SimpleGrid,
	Badge,
	HStack,
	Tag,
	TagLabel,
	TagRightIcon,
} from "@chakra-ui/react";

import ProductDetails from "../ProductDetails/ProductDetails";

const IMAGE =
	"https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";
function capitalize(input) {
	return input
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");
}
export default function Card(props) {
	let attributes = props.principles.replace(",", "|");
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
				<ModalOverlay />
				<ModalContent maxW="70rem">
					<ModalCloseButton />
					{/* <ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>Test</ModalBody> */}
					<ProductDetails {...props} />
					{/* <ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant="ghost">Secondary Action</Button>
					</ModalFooter> */}
				</ModalContent>
			</Modal>
			<Center py={12}>
				<Box
					role={"group"}
					p={6}
					maxW={"330px"}
					w={"full"}
					bg={useColorModeValue("white", "gray.800")}
					boxShadow={"2xl"}
					rounded={"lg"}
					pos={"relative"}
					zIndex={1}>
					<Box
						rounded={"lg"}
						mt={-12}
						pos={"relative"}
						height={"230px"}
						_after={{
							transition: "all .3s ease",
							content: '""',
							w: "full",
							h: "full",
							pos: "absolute",
							top: 5,
							left: 0,
							backgroundImage: `url(${props.image})`,
							filter: "blur(15px)",
							zIndex: -1,
						}}
						_groupHover={{
							_after: {
								filter: "blur(20px)",
							},
						}}>
						<Image rounded={"lg"} height={230} width={282} objectFit={"cover"} src={props.image} onClick={onOpen} />
					</Box>
					<Stack pt={10} align={"center"}>
						<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
							{props.the_artisan}
						</Text>

						<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500} color={"black"}>
							{props.name}
						</Heading>

						<Stack align={"center"} justify={"center"} direction={"row"} mt={6} maxWidth={"100%"} display={"flow-root"}>
							{props.principles.split(",").map((principle) => (
								<>
									{principle != "" && principle.length > 1 && (
										<Badge
											px={2}
											py={1}
											bg={useColorModeValue("gray.50", "gray.800")}
											fontWeight={"400"}
											fontSize={"0.65rem"}>
											{principle}
										</Badge>
									)}
								</>
							))}
						</Stack>

						<Heading fontSize={"xl"} fontFamily={"body"} fontWeight={300} color={"black"}></Heading>
					</Stack>
				</Box>
			</Center>
		</>
	);
}
