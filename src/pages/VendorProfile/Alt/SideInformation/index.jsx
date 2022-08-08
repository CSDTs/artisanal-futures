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

export default function SideInformation(props) {
	const { artisan, gen_location, avatar, brief, address, phone, email, description } = props.profile;
	const { name, store_url } = props;
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
					height={"230px"}
					_after={{
						transition: "all .3s ease",
						content: '""',
						w: "full",
						h: "full",
						pos: "absolute",
						top: 5,
						left: 0,
						backgroundImage: `(${avatar})`,
						filter: "blur(15px)",
						zIndex: -1,
					}}
					_groupHover={{
						_after: {
							filter: "blur(20px)",
						},
					}}
				>
					<Image src={avatar} borderRadius="full" />
				</Box>

				<Stack direction={"column"} pt={"1rem"} spacing={1} textAlign="center">
					<Text color={"gray.600"}>{artisan}</Text>
					<Text color={"gray.500"} fontSize={"sm"}>
						{gen_location}
					</Text>
				</Stack>
				<Stack direction={"column"} spacing={1.5} textAlign="center">
					<Text color={"gray.700"} fontWeight={500} fontSize={"sm"} as="i" mt={5}>
						{brief}
					</Text>
					<Link href={store_url} color="teal.500">
						{store_url}
					</Link>
				</Stack>

				<Stack direction={"column"} pt={"3rem"}>
					<Heading fontSize={"md"}>Store Details</Heading>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{name}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{address}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{phone}
					</Text>
					<Text color={"gray.700"} fontWeight={500} fontSize={"0.85rem"}>
						{email}
					</Text>
				</Stack>
				<Stack direction={"column"} pt={"3rem"}>
					<Heading fontSize={"md"}>Store Highlights</Heading>
					<Text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua.
					</Text>
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
