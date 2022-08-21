import { CloseIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Center,
	Flex,
	Heading,
	Image,
	Link,
	Skeleton,
	SkeletonCircle,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { BsGearFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { MdOutlineAccountBox, MdOutlineSettings, MdOutlineStorefront } from "react-icons/md";
import { username } from "react-lorem-ipsum";
import { useNavigate } from "react-router-dom";
export default function ProfileCard({ isLoading, user, slug }) {
	const navigate = useNavigate();

	return (
		<>
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
								user?.profile?.cover_image ||
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
									{user?.full_name || user?.user_display_name}
								</Heading>

								<Text color={"gray.500"}>{user?.business?.name.trim()}</Text>
							</Stack>
						</Skeleton>
						<Stack direction={"row"} justify={"center"} spacing={6}>
							{slug && (
								<Stack spacing={0} align={"center"} onClick={() => navigate("/artisans/" + slug)}>
									<Text fontWeight={600} fontSize={"xl"}>
										<MdOutlineAccountBox />
									</Text>
									<Text fontSize={"sm"} color={"gray.500"}>
										Profile
									</Text>
								</Stack>
							)}
							{user?.business?.website && (
								<Stack
									spacing={0}
									align={"center"}
									onClick={() => window.open(user?.business?.website, "_blank").focus()}
								>
									<Text fontWeight={600} fontSize={"xl"}>
										<MdOutlineStorefront />
									</Text>
									<Text fontSize={"sm"} color={"gray.500"}>
										Store
									</Text>
								</Stack>
							)}

							{(user?.membership_id || user?.profile) && (
								<Stack spacing={0} align={"center"} onClick={() => navigate("/new")}>
									<Text fontWeight={600} fontSize={"xl"}>
										<MdOutlineSettings />
									</Text>
									<Text fontSize={"sm"} color={"gray.500"}>
										Settings
									</Text>
								</Stack>
							)}
						</Stack>
					</Box>
				</Box>
			</Center>
			{!user?.membership_id && slug == "" && (
				<Box textAlign="center" py={10} px={6}>
					<Box display="inline-block">
						<Flex
							flexDirection="column"
							justifyContent="center"
							alignItems="center"
							bg={"red.500"}
							rounded={"50px"}
							w={"55px"}
							h={"55px"}
							textAlign="center"
						>
							<CloseIcon boxSize={"20px"} color={"white"} />
						</Flex>
					</Box>
					<Heading as="h2" size="xl" mt={6} mb={2}>
						Account Setup Undergoing Maintenance
					</Heading>
					<Text color={"gray.500"}>
						Hey! It seems like you were granted access to Artisanal Futures, with the next step being setting up your
						profile and store on the site. However, that service is temporarily down for maintenance. Check back later
						to finish setting up your account. If you have any questions, please let us know at{" "}
						<Link href="email:artisanalfutures@gmail.com" color={"teal.500"} fontWeight="bold">
							artisanalfutures@gmail.com
						</Link>
					</Text>
				</Box>
			)}
		</>
	);
}
