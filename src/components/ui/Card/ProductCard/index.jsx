import { Flex, Box, Badge, Text, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
export default function ProductCard(props) {
	const property = {
		imageUrl: props.image,
		imageAlt: "Rear view of modern home with pool",
		beds: 3,
		baths: 2,
		title: props.name,
		formattedPrice: props.the_artisan,
		reviewCount: 34,
		rating: 4,
	};

	const PrincipleDisplay = (principles) => {
		return principles.replaceAll(",", "  ").trim().replaceAll("  ", " •");
	};

	// const property = {
	// 	imageUrl: "https://bit.ly/2Z4KKcF",
	// 	imageAlt: "Rear view of modern home with pool",
	// 	beds: 3,
	// 	baths: 2,
	// 	title: "Modern home in city center in the heart of historic Los Angeles",
	// 	formattedPrice: "$1,900.00",
	// 	reviewCount: 34,
	// 	rating: 4,
	// };
	return (
		<Flex w="full" alignItems="center" justifyContent="center">
			<Box
				bg="white"
				_dark={{
					bg: "gray.800",
				}}
				maxW="sm"
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
			>
				<Image
					src={property.imageUrl}
					alt={property.imageAlt}
					roundedTop="lg"
					objectFit={"cover"}
					w="sm"
					h={"280px"}
					onClick={props.onCLick}
					fallbackSrc="https://via.placeholder.com/250"
				/>

				<Box p="6">
					<Box display="flex" alignItems="baseline">
						{/* <Badge rounded="full" px="2" colorScheme="teal">
							New
						</Badge> */}
						<Box
							color="gray.500"
							fontWeight="semibold"
							letterSpacing="wide"
							fontSize="xs"
							textTransform="uppercase"
							// ml="2"
						>
							{/* {property.beds} beds &bull; {property.baths} baths */}
							{PrincipleDisplay(props.principles)}
						</Box>
					</Box>

					<Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
						{property.title}
					</Text>

					<Box>
						<Box as="span" color="gray.600" fontSize="sm">
							{property.formattedPrice}
						</Box>
					</Box>

					{/* <Box display="flex" mt="2" alignItems="center">
						{Array(5)
							.fill("")
							.map((_, i) => (
								<StarIcon key={i} color={i < property.rating ? "teal.500" : "gray.300"} />
							))}
						<Box as="span" ml="2" color="gray.600" fontSize="sm">
							{property.reviewCount} reviews
						</Box>
					</Box> */}
				</Box>
			</Box>
		</Flex>
	);
}
