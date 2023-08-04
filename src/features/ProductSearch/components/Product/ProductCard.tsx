import { FC, useCallback } from "react";

import { ProductDetails } from "@/features/ProductSearch/components/Product";

interface IProps {
	name: string;
	image: string;
	the_artisan: string;
	principles: string;
	url: string;
	description: string;
	// materials: string;
	assessment: Array<any>;
	// onCLick: () => void;
}

const formatAttributes = (attributes: string) => {
	return attributes.replaceAll(",", "  ").trim().replaceAll("  ", " • ");
};

const ProductCard: FC<IProps> = (props) => {
	return (
		<ProductDetails {...props}>
			<div className="max-w-sm border rounded-lg shadow-lg h-full cursor-pointer hover:shadow-xl hover:border-indigo-200 hover:shadow-indigo-200 ">
				<img
					src={props.image}
					alt={`Image of ${props.name}`}
					className="rounded-t-lg object-cover aspect-square w-full"
					onError={({ currentTarget }) => {
						currentTarget.onerror = null; // prevents looping
						currentTarget.src = "/img/background-fallback.jpg";
					}}
				/>

				<div className="p-6 flex flex-col ">
					<p className="text-slate-500 font-semibold tracking-wide text-xs uppercase">
						{formatAttributes(props.principles)}
					</p>

					<h3 className="mt-3 font-semibold leading-3 mb-3 capitalize ">{props.name}</h3>

					<span className="text-slate-600 text-sm capitalize ">{props.the_artisan}</span>
				</div>
			</div>
		</ProductDetails>
	);
};
export default ProductCard;
