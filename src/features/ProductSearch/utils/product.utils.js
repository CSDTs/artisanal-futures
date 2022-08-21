const formatToTitleString = (word) => {
	return word
		.toLowerCase()
		.split(" ")
		.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(" ");
};

// TODO: Verify attribute (principle) format to either update function or remove
const sanitizeAttributes = (attributes) => {
	let sanitizedAttributes = attributes.replace(",", "  ");
	sanitizedAttributes = sanitizedAttributes.replace("d,", "d");
	sanitizedAttributes = sanitizedAttributes.replace("e,", "e");
	sanitizedAttributes = sanitizedAttributes.replace("y,", "y");

	return sanitizedAttributes;
};

const formatPrinciplesDisplay = (principles) => {
	return principles.replaceAll(",", "  ").trim().replaceAll("  ", " • ");
};
const ProductUtil = {
	formatToTitleString,
	sanitizeAttributes,
	formatPrinciplesDisplay,
};

export default ProductUtil;
