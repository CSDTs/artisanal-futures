import React, { useState } from "react";
// Chakra imports
import {
	Avatar,
	AvatarGroup,
	Badge,
	Box,
	Button,
	DarkMode,
	Flex,
	Icon,
	Image,
	Skeleton,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { MdPeople } from "react-icons/md";

export default function TeamCard({ title, subtitle, type, image, callback }) {
	let boxBg = useColorModeValue("white", "#111c44 ");
	let mainText = useColorModeValue("gray.800", "white");
	let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
	let iconColor = useColorModeValue("brand.200", "white");

	const [hasLoaded, setHasLoaded] = useState(false);
	return (
		<Box role="group" w={{ base: "100%", md: "345px" }}>
			<Flex
				borderRadius="20px"
				bg={boxBg}
				_groupHover={{
					bg: "blue.400",
				}}
				cursor="pointer"
				// _hover={{
				// 	bg: "blue.400",
				// 	color: "white",
				// 	_dark: {
				// 		bg: "gray.600",
				// 	},
				// }}
				p="20px"
				h={{ base: "auto", md: "375px" }}
				w={{ base: "100%", md: "345px" }}
				onClick={callback}
				alignItems="center"
				direction="column">
				{/* <Flex w="100%" mb="18px">
					<Flex w="38px" h="38px" align="center" justify="center" borderRadius="50%" me="12px" bg={iconBox}>
						<Icon w="24px" h="24px" as={MdPeople} color={iconColor} />
					</Flex>
					<Text my="auto" fontWeight="600" color={mainText} textAlign="center" fontSize="xl" me="auto">
						Teams
					</Text>
					<Button w="38px" h="38px" align="center" justify="center" borderRadius="12px" me="12px" bg={iconBox}>
						<Icon w="24px" h="24px" as={IoEllipsisHorizontalSharp} color={iconColor} />
					</Button>
				</Flex> */}
				<Skeleton isLoaded={hasLoaded}>
					<Image
						src={image}
						maxW="100%"
						borderRadius="20px"
						mb="10px"
						boxShadow="base"
						onLoad={() => {
							setHasLoaded(true);
						}}
					/>
				</Skeleton>
				<Text
					_groupHover={{
						color: "white",
					}}
					fontWeight="600"
					color={mainText}
					textAlign="start"
					fontSize="xl"
					w="100%">
					{title}
				</Text>
				<Text
					_groupHover={{
						color: "white",
					}}
					fontWeight="400"
					color={mainText}
					textAlign="start"
					fontSize="lg"
					w="100%">
					{subtitle}
				</Text>
				<Flex mt="auto" justify="space-between" w="100%" align="center">
					<DarkMode>
						<Badge
							borderRadius="9px"
							size="md"
							colorScheme="green"
							color="green.400"
							textAlign="center"
							display="flex"
							justifyContent="center"
							alignItems="center">
							{type}
						</Badge>
					</DarkMode>
					{/* <AvatarGroup size="sm" max={4} color={iconColor} fontSize="9px" fontWeight="700">
						<Avatar src="https://i.ibb.co/CmxNdhQ/avatar1.png" />
						<Avatar src="https://i.ibb.co/cFWc59B/avatar2.png" />
						<Avatar src="https://i.ibb.co/vLQJVFy/avatar3.png" />
						<Avatar src="https://i.ibb.co/8mcrvQk/avatar4.png" />
						<Avatar src="https://i.ibb.co/CmxNdhQ/avatar1.png" />
						<Avatar src="https://i.ibb.co/cFWc59B/avatar2.png" />
						<Avatar src="https://i.ibb.co/vLQJVFy/avatar3.png" />
						<Avatar src="https://i.ibb.co/8mcrvQk/avatar4.png" />
					</AvatarGroup> */}
				</Flex>
			</Flex>
		</Box>
	);
}
