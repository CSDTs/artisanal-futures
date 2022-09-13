import {
	Box,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";

import ProductUtil from "../../utils/product.utils";
import ProductDetails from "./ProductDetails";

export default function ProductDetailCard(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const displayedProduct = {
		imageUrl: props.image,
		imageAlt: `Image of ${props.name}`,
		title: props.name,
		formattedPrice: props.the_artisan,
	};

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} size={"4xl"} scrollBehavior={"inside"}>
				<ModalOverlay />
				<ModalContent maxW="5xl">
					<ModalCloseButton />
					<ModalBody>
						<ProductDetails {...props} />
					</ModalBody>
				</ModalContent>
			</Modal>

			<section onClick={onOpen}>
				<Flex w="full" alignItems="center" justifyContent="center">
					<Box
						bg="white"
						_dark={{
							bg: "gray.800",
						}}
						maxW="sm"
						borderWidth="1px"
						rounded="lg"
						shadow="lg">
						<Image
							src={displayedProduct.imageUrl}
							alt={displayedProduct.imageAlt}
							roundedTop="lg"
							objectFit={"cover"}
							w={"sm"}
							h={"280px"}
							onClick={props.onCLick}
							fallbackSrc="https://via.placeholder.com/250"
						/>

						<Box p="6">
							<Box display="flex" alignItems="baseline">
								<Box
									color="gray.500"
									fontWeight="semibold"
									letterSpacing="wide"
									fontSize="xs"
									textTransform="uppercase">
									{ProductUtil.formatPrinciplesDisplay(props.principles)}
								</Box>
							</Box>

							<Text mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
								{displayedProduct.title}
							</Text>

							<Box>
								<Box as="span" color="gray.600" fontSize="sm">
									{displayedProduct.formattedPrice}
								</Box>
							</Box>
						</Box>
					</Box>
				</Flex>
			</section>
		</>
	);
}
