import { Box, Image } from "@chakra-ui/react";
import PropTypes from "prop-types";

const HeroImage = ({ url, alt }) => {
	return (
		<Box
			position={{
				lg: "absolute",
			}}
			top={{
				lg: 0,
			}}
			bottom={{
				lg: 0,
			}}
			right={{
				lg: 0,
			}}
			w={{
				lg: "50%",
			}}
			border="solid 1px transparent">
			<Image h={[56, 72, 96, "full"]} w="full" fit="cover" src={url} alt={alt} loading="lazy" />
		</Box>
	);
};

HeroImage.propTypes = {
	url: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

export default HeroImage;
