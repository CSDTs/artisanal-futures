import {
	Container,
	Heading,
	Text,
	SkeletonCircle,
	SkeletonText,
	Box,
	SimpleGrid,
	Center,
	Flex,
} from "@chakra-ui/react";
import ProfileCard from "./ProfileCard";
import useSWR from "swr";
import axios from "axios";
import MemberService from "../../services/member.service";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
const override = {
	display: "block",
	margin: "0 auto",
};
export default function Profile() {
	const { user, isLoading, isError } = MemberService.getMemberInformation(
		JSON.parse(localStorage.getItem("user")).membership_id
	);

	useEffect(() => {
		console.log(user);
	}, [user]);
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

			<ProfileCard slug={user?.slug} user={user?.acf} isLoading={isLoading} />
		</Container>
	);
}
