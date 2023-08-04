import { FC } from "react";

interface IProps {
	title: string;
	text: string;
	icon: JSX.Element;
	onClick: () => void;
}
const FeatureCard: FC<IProps> = ({ title, text, icon, onClick }) => {
	return (
		<div
			className="h-full min-h-full pt-8 pb-8 text-center bg-white cursor-pointer hover:shadow-md hover:gray-100"
			onClick={onClick}>
			<div className="aspect-[2.618]">
				<span className="flex items-center justify-center w-full h-16 min-h-full mb-1 rounded-full">{icon}</span>
				<h2 className="text-2xl font-bold slate-700">{title}</h2>
				<p className="slate-300">{text}</p>
			</div>
		</div>
	);
};

export default FeatureCard;
