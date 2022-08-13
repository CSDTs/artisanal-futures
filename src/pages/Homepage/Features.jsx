import { Box, Flex, Heading, Icon, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FcGraduationCap, FcServices, FcShop } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const Feature = ({ title, text, icon, onClick }) => {
	return (
		<Box bg={"white"} pt={"2rem"} pb={"2rem"} textAlign="center" onClick={onClick}>
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
				<Heading fontWeight={700} color={"gray.900"}>
					{title}
				</Heading>
				<Text color={"gray.600"}>{text}</Text>
			</Stack>
		</Box>
	);
};

export default function Features() {
	const navigate = useNavigate();
	return (
		<Box p={4} bg={"gray.400"} mt={"3rem"}>
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
				/>
				<Feature
					icon={<Icon as={FcServices} w={10} h={10} />}
					title={"Utilize Free Tools"}
					text={"Use our collection of free tools"}
				/>
			</SimpleGrid>
		</Box>
	);
}
