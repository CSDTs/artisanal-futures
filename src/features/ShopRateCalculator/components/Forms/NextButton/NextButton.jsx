import { Button } from "@chakra-ui/react";

export default function NextButton({ handleClick }) {
	return (
		<Button
			fontFamily={"heading"}
			mt={8}
			w={"full"}
			bgGradient="linear(to-r, red.400,pink.400)"
			color={"white"}
			_hover={{
				bgGradient: "linear(to-r, red.400,pink.400)",
				boxShadow: "xl",
			}}
			onClick={handleClick}
		>
			Next
		</Button>
	);
}
