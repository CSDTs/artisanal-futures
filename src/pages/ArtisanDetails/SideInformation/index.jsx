import styles from "./SideInformation.module.scss";

import {
	Image,
	Box,
	Container,
	Flex,
	Stack,
	Text,
	Heading,
	Button,
	useColorModeValue,
	Center,
	Link,
	Spacer,
} from "@chakra-ui/react";

import { LoremIpsum } from "react-lorem-ipsum";

import { FaFacebook, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export default function SideInformation({ profile, business, profile_image, full_name }) {
	// const { artisan, gen_location, avatar, brief, address, phone, email, description } = props.profile;
	const { name, profile_information, artisan_image, misc_information } = profile;
	const { name: business_name, business_brief_description, website, address } = business;
	// const {
	// 	business_name,
	// 	website,
	// 	general_location,
	// 	thumbnail_image,
	// 	cover_image,
	// 	// miscellaneous_information,
	// 	business_email,
	// 	business_phone_number,
	// 	business_address,
	// 	business_brief_description,
	// } = store;

	return (
		<Box py={12} pl={4}>
			<Box
				role={"group"}
				p={6}
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}
			>
				<Box
					rounded={"lg"}
					mt={-12}
					pos={"relative"}
					_after={{
						transition: "all .3s ease",
						content: '""',
						w: "full",
						h: "full",
						pos: "absolute",
						top: 5,
						left: 0,
						backgroundImage: `(${artisan_image})`,
						filter: "blur(15px)",
						zIndex: -1,
					}}
					_groupHover={{
						_after: {
							filter: "blur(20px)",
						},
					}}
				>
					<Image src={profile_image} borderRadius="full" boxSize="150px" mx={"auto"} boxShadow="dark-lg" />
				</Box>

				<Stack direction={"column"} spacing={1} textAlign="center" mt={6}>
					<Text color={"gray.600"}>{full_name}</Text>
					<Text color={"gray.500"} fontSize={"sm"}>
						{address}
					</Text>
				</Stack>
				<Stack direction={"column"} spacing={1.5} textAlign="center">
					<Text color={"gray.700"} fontWeight={500} fontSize={"sm"} as="i" mt={5}>
						Owner of {business_name}
					</Text>
					<Link href={website} color="teal.500">
						{website}
					</Link>
				</Stack>

				<Stack direction={"column"} pt={"3rem"}>
					<Heading fontSize={"md"}>Store Details</Heading>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{business_name}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{/* {business_address} */}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{/* {business_phone_number} */}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{/* {business_email} */}
					</Text>
				</Stack>
				<Stack direction={"column"} pt={"3rem"}>
					<Heading fontSize={"md"}>Store Highlights</Heading>
					<Text>{misc_information}</Text>
				</Stack>

				<Stack direction={"column"} pt={"3rem"}>
					<Heading fontSize={"md"}>Connect & Follow</Heading>
					<Flex>
						<Button>
							<FaFacebook />
						</Button>
						<Spacer />
						<Button>
							<FaTwitter />
						</Button>
						<Spacer />
						<Button>
							<FaInstagram />
						</Button>
						<Spacer />
						<Button>
							<FaLinkedin />
						</Button>
					</Flex>
				</Stack>
			</Box>
		</Box>
	);
}
