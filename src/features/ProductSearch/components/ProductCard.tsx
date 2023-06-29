import { FC } from "react";

import ProductUtil from "@/features/ProductSearch/utils/product.utils";
import ProductDetails from "./ProductDetails";

interface IProps {
	name: string;
	image: string;
	the_artisan: string;
	principles: string;
	url: string;
	description: string;
	materials: string;
	assessment: Array<any>;
	onCLick: () => void;
}

const ProductCard: FC<IProps> = (props) => {
	return (
		<ProductDetails {...props}>
			<div className="max-w-sm border rounded-lg shadow-lg h-full cursor-pointer hover:shadow-xl hover:border-indigo-200 hover:shadow-indigo-200 ">
				<img
					src={props.image}
					alt={`Image of ${props.name}`}
					className="rounded-t-lg object-cover aspect-square w-full"
					onClick={props.onCLick}
					onError={({ currentTarget }) => {
						currentTarget.onerror = null; // prevents looping
						currentTarget.src = "https://via.placeholder.com/720";
					}}
				/>

				<div className="p-6 flex flex-col ">
					<p className="text-slate-500 font-semibold tracking-wide text-xs uppercase">
						{ProductUtil.formatPrinciplesDisplay(props.principles)}
					</p>

					<h3 className="mt-3 font-semibold leading-3 mb-3 capitalize ">{props.name}</h3>

					<span className="text-slate-600 text-sm capitalize ">{props.the_artisan}</span>
				</div>
			</div>
		</ProductDetails>
	);
};
export default ProductCard;
