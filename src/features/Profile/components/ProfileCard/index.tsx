import {
	Avatar,
	Box,
	Center,
	Flex,
	Heading,
	Image,
	Skeleton,
	SkeletonCircle,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

import { MdOutlineAccountBox, MdOutlineSettings, MdOutlineStorefront } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import UndergoingMaintenance from "../UndergoingMaintenance";
import ProfileCardButton from "./CardButton";

const ProfileCard = ({ isLoading, user }) => {
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
					overflow={"hidden"}>
					<Skeleton isLoaded={!isLoading}>
						<Image
							h={"120px"}
							w={"full"}
							src={
								"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
							}
							objectFit={"cover"}
						/>
					</Skeleton>
					<Flex justify={"center"} mt={-12}>
						{!isLoading && (
							<Avatar
								size={"xl"}
								src={user?.profile_image_url}
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
									{user?.first_name}
								</Heading>

								<Text color={"gray.500"}>{user?.business?.biz_name.trim()}</Text>
							</Stack>
						</Skeleton>
						<Stack direction={"row"} justify={"center"} spacing={6}>
							{user?.slug && (
								<ProfileCardButton
									callback={() => navigate("/artisans/" + user?.slug)}
									title="Profile"
									Icon={MdOutlineAccountBox}
								/>
							)}

							{(user?.membership_id || user?.about_me) && (
								<ProfileCardButton
									callback={() => navigate("/update-profile")}
									title="Update"
									Icon={MdOutlineSettings}
								/>
							)}
						</Stack>
					</Box>
				</Box>
			</Center>
			{!user?.membership_id && user?.slug == "" && <UndergoingMaintenance user={user} />}
		</>
	);
};
export default ProfileCard;
