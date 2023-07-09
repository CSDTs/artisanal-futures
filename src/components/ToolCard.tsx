import { FC } from "react";

interface IAppCardProps {
	title: string;
	subtitle: string;
	image: string;
	callback: () => void;
	type?: string;
}

const ToolCard: FC<IAppCardProps> = ({ title, subtitle, image, callback }) => {
	return (
		<div className="cursor-pointer group h-full " onClick={callback}>
			<div className="flex flex-col items-center w-10/12 mx-auto my-3 overflow-hidden transition-all duration-200 rounded-lg shadow-lg md:max-w-s lg:max-w-xs group-hover:bg-slate-500 group-active:shadow-lg group-active:shadow-blue-200 h-full ">
				<img
					className="rounded-t-lg object-cover aspect-square w-full transition-all duration-200 group-hover:contrast-75"
					src={image}
					alt={title}
				/>
				<div className="w-full px-4 py-2 ">
					<h1 className="text-xl font-semibold text-gray-700 transition-all duration-200 group-hover:text-white">
						{title}
					</h1>
					<p className="mt-1 text-sm text-gray-500 transition-all duration-200 group-hover:text-white">{subtitle}</p>
				</div>
			</div>
		</div>
	);
};

export default ToolCard;
