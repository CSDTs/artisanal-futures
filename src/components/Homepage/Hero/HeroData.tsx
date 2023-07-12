import { Icon } from "@chakra-ui/react";
import { FC } from "react";

interface IProps {
	title: string;
	description: string;
	callToAction: {
		callback: () => void;
		text: string;
	};
}

const HeroData: FC<IProps> = ({ title, description, callToAction }) => {
	return (
		<div className="mx-auto max-w-7xl">
			<div className="relative z-10 pb-8 bg-white border border-transparent lg:max-w-2xl lg:w-full">
				<Icon
					display={{
						base: "none",
						lg: "block",
					}}
					position="absolute"
					right={0}
					top={0}
					bottom={0}
					h="full"
					w={48}
					color="white"
					transform="translateX(50%)"
					fill="currentColor"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
					aria-hidden="true">
					<polygon points="50,0 100,0 50,100 0,100" />
				</Icon>
				<div className="items-center px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 md:mt-16 lg:mt-20 xl:mt-28">
					<div className="flex flex-col items-center justify-center w-full text-center lg:justify-start">
						<h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">{title}</h1>
						<p className="mx-auto mt-3 text-lg sm:mt-5 md:mt-5 md:text-xl sm:max-w-xl lg:mx-0 text-slate-500">
							{description}
						</p>
						<div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
							<button
								className="px-3 py-2 font-semibold transition-all rounded-md bg-slate-100 hover:bg-slate-200 focus:bg-slate-300"
								onClick={callToAction.callback}>
								{callToAction.text}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HeroData;
