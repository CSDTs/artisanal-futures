import {
	Heading,
	Avatar,
	Box,
	Center,
	Image,
	Flex,
	Text,
	Stack,
	Button,
	useColorModeValue,
	SkeletonCircle,
	Skeleton,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";

import { ImProfile } from "react-icons/im";
import { MdOutlineAccountBox, MdOutlineSettings, MdOutlineStorefront } from "react-icons/md";
import { useNavigate } from "react-router-dom";
export default function ProfileCard({ isLoading, user, slug }) {
	const navigate = useNavigate();
	return (
		<Center py={6}>
			<Box
				maxW={"container.lg"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"2xl"}
				rounded={"md"}
				overflow={"hidden"}
			>
				<Skeleton isLoaded={!isLoading}>
					<Image
						h={"120px"}
						w={"full"}
						src={
							user?.profile.cover_image ||
							"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
						}
						objectFit={"cover"}
					/>
				</Skeleton>
				<Flex justify={"center"} mt={-12}>
					{!isLoading && (
						<Avatar
							size={"xl"}
							src={user?.profile_image}
							alt={"Author"}
							css={{
								border: "2px solid white",
							}}
						/>
					)}
					{isLoading && <SkeletonCircle size={"92"} />}
				</Flex>

				<Box p={6}>
					<Skeleton isLoaded={!isLoading}>
						<Stack spacing={0} align={"center"} mb={5}>
							<Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
								{user?.full_name}
							</Heading>

							<Text color={"gray.500"}>{user?.business?.name.trim()}</Text>
						</Stack>
					</Skeleton>
					<Stack direction={"row"} justify={"center"} spacing={6}>
						<Stack spacing={0} align={"center"} onClick={() => navigate("/artisans/" + slug)}>
							<Text fontWeight={600} fontSize={"xl"}>
								<MdOutlineAccountBox />
							</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Profile
							</Text>
						</Stack>
						<Stack spacing={0} align={"center"} onClick={() => window.open(user?.business?.website, "_blank").focus()}>
							<Text fontWeight={600} fontSize={"xl"}>
								<MdOutlineStorefront />
							</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Store
							</Text>
						</Stack>
						<Stack spacing={0} align={"center"} onClick={() => navigate("/new")}>
							<Text fontWeight={600} fontSize={"xl"}>
								<MdOutlineSettings />
							</Text>
							<Text fontSize={"sm"} color={"gray.500"}>
								Settings
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Box>
		</Center>
	);
}
