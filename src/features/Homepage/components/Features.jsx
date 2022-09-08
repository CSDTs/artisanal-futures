import { Box, Flex, Heading, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FcGraduationCap, FcServices, FcShop } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Feature = ({ title, text, icon, onClick }) => {
	return (
		<Box role="group">
			<Box
				bg={"white"}
				pt={"2rem"}
				pb={"2rem"}
				textAlign="center"
				onClick={onClick}
				cursor={"pointer"}
				_groupHover={{
					boxShadow: "md",
					bg: "gray.100",
				}}
			>
				<Stack>
					<Flex w={"100%"} h={16} align={"center"} justify={"center"} rounded={"full"} mb={1}>
						{icon}
					</Flex>
					<Heading
						fontWeight={700}
						_groupHover={{
							color: "gray.700",
						}}
						color={"gray.800"}
					>
						{title}
					</Heading>
					<Text color={"gray.500"}>{text}</Text>
				</Stack>
			</Box>
		</Box>
	);
};

export default function Features() {
	const navigate = useNavigate();

	const FEATURE_DATA = [
		{
			icon: FcShop,
			title: "Shop Our Stores",
			text: "Browse our artisans' shops and webpages",
			handleClick: () => navigate("/artisans"),
		},
		{
			icon: FcGraduationCap,
			title: "Share Knowledge",
			text: "Share your artisanal knowledge with others",
			handleClick: () => (window.location.href = `${import.meta.env.VITE_FOURM_URL}`),
		},
		{
			icon: FcServices,
			title: "Utilize Free Tools",
			text: "Use our collection of free tools",
			handleClick: () => navigate("/tools"),
		},
	];

	return (
		<Box p={4} bg={"gray.200"} mt={"3rem"}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				{FEATURE_DATA.map((feature, index) => (
					<section key={"feature-" + index}>
						<Feature
							icon={<Icon as={feature.icon} w={10} h={10} />}
							title={feature.title}
							text={feature.text}
							onClick={feature.handleClick}
						/>
					</section>
				))}
			</SimpleGrid>
		</Box>
	);
}
