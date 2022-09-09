import { Box, Stack, useColorModeValue, VStack } from "@chakra-ui/react";

export default function CustomFormContainer({ handleOnSubmit, children }) {
	return (
		<Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
			<Box>
				<VStack spacing={{ base: 4, md: 8, lg: 20 }}>
					<Stack spacing={{ base: 4, md: 8, lg: 20 }} direction={{ base: "column", md: "row" }}>
						<Box
							bg={useColorModeValue("white", "gray.700")}
							borderRadius="lg"
							p={8}
							color={useColorModeValue("gray.700", "whiteAlpha.900")}
							shadow="base">
							<VStack as={"form"} spacing={5} onSubmit={handleOnSubmit}>
								{children}
							</VStack>
						</Box>
					</Stack>
				</VStack>
			</Box>
		</Box>
	);
}
