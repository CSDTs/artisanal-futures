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
					<Flex
						w={"100%"}
						h={16}
						align={"center"}
						justify={"center"}
						// color={"white"}
						rounded={"full"}
						//
						mb={1}
					>
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
	return (
		<Box p={4} bg={"gray.200"} mt={"3rem"}>
			<SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
				<Feature
					icon={<Icon as={FcShop} w={10} h={10} />}
					title={"Shop Our Stores"}
					text={"Browse our artisans' shops and webpages"}
					onClick={() => navigate("/stores")}
				/>
				<Feature
					icon={<Icon as={FcGraduationCap} w={10} h={10} />}
					title={"Share Knowledge"}
					text={"Share your artisanal knowledge with others"}
					onClick={() => (window.location.href = "https://fourm.artisanalfutures.org/")}
				/>
				<Feature
					icon={<Icon as={FcServices} w={10} h={10} />}
					title={"Utilize Free Tools"}
					text={"Use our collection of free tools"}
					onClick={() => navigate("/tools")}
				/>
			</SimpleGrid>
		</Box>
	);
}
