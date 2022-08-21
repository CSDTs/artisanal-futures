import { CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Center,
	chakra,
	Container,
	Flex,
	Heading,
	Link,
	SimpleGrid,
	SkeletonCircle,
	SkeletonText,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";
import useSWR from "swr";
import AuthService from "../../services/auth.service";
import MemberService from "../../services/member.service";
import ProfileCard from "./ProfileCard";
const override = {
	display: "block",
	margin: "0 auto",
};
export default function Profile() {
	const { user: member, isLoading, isError } = MemberService.getCurrentMemberInformation();
	const user = AuthService.getCurrentUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError && !AuthService.getCurrentUser()) navigate("/login");
	}, []);

	return (
		<Container maxW={"6xl"} mt={6}>
			{/* <Center py={6}>
				<Box padding="6" boxShadow="lg" maxW={"container.lg"} bg="white" w={"full"}>
					<SkeletonCircle size="20" mx={"auto"} />
					<SkeletonText mt="4" noOfLines={1} spacing="4" w={"25%"} mx={"auto"} />
					<SkeletonText mt="4" noOfLines={1} spacing="4" w={"25%"} mx={"auto"} />
					<Flex w={"25%"} mx={"auto"}>
						<SkeletonText mt="4" noOfLines={1} spacing="4" w={"25%"} mx={"auto"} />
						<SkeletonText mt="4" noOfLines={1} spacing="4" w={"25%"} mx={"auto"} />
						<SkeletonText mt="4" noOfLines={1} spacing="4" w={"25%"} mx={"auto"} />
					</Flex>
				</Box>
			</Center> */}
			{!isError && <ProfileCard slug={member?.slug} user={member?.acf} isLoading={isLoading} />}
			{/* {isError && user && <ProfileCard slug={""} user={user} isLoading={isLoading} />} */}

			{isError && user && (
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
						Hey,{" "}
						<chakra.span color={"blue.500"} fontWeight="500">
							{user?.user_display_name.split(" ")[0]}
						</chakra.span>
						! It seems like you were granted access to Artisanal Futures, with the next step being setting up your
						profile and store on the site. However, that service is temporarily down for maintenance. Check back later
						to finish setting up your account. If you have any questions, please let us know at{" "}
						<Link href="email:artisanalfutures@gmail.com" color={"teal.500"} fontWeight="bold">
							artisanalfutures@gmail.com
						</Link>
					</Text>
					<Button mt={8} colorScheme={"teal"} onClick={() => navigate("/")}>
						Back to Homepage
					</Button>
				</Box>
			)}
		</Container>
	);
}
