import { Stack, Text } from "@chakra-ui/react";

export default function CardButton({ callback, title, Icon }) {
	return (
		<Stack spacing={0} align={"center"} onClick={() => callback()} cursor={"pointer"}>
			<Text fontWeight={600} fontSize={"xl"}>
				<Icon />
			</Text>
			<Text fontSize={"sm"} color={"gray.500"}>
				{title}
			</Text>
		</Stack>
	);
}
