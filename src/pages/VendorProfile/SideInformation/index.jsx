import { Image, Box, Container, Flex, Stack, Text, Heading, Button, useColorModeValue, Center } from "@chakra-ui/react";

export default function SideInformation(props) {
	const { artisan, gen_location, avatar, brief, address, phone, email, description } = props.profile;
	const { name, store_url } = props;
	return (
		<Box py={12}>
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
				<Stack direction={"column"} pt={"4rem"} textAlign="center">
					<Text>{artisan}</Text>
					<Text fontSize={"sm"}>{gen_location}</Text>
					<Text>{brief}</Text>
					<Text>{store_url}</Text>
				</Stack>
				<Stack direction={"column"} pt={"4rem"}>
					<Heading>Store Details</Heading>
					<Text>{name}</Text>
					<Text>{address}</Text>
					<Text>{phone}</Text>
					<Text>{email}</Text>
				</Stack>
				<Stack direction={"column"} pt={"4rem"}>
					<Heading>Store Highlights</Heading>
					<Text>{name}</Text>
					<Text>{address}</Text>
					<Text>{phone}</Text>
					<Text>{email}</Text>
				</Stack>

				<Stack direction={"column"} pt={"4rem"}>
					<Heading>Connect & Follow</Heading>
					<Flex>
						<Button>F</Button>
						<Button>T</Button>
						<Button>I</Button>
						<Button>L</Button>
					</Flex>
				</Stack>
			</Box>
		</Box>
	);
}
