import { FC } from "react";

interface IProps {
	url: string;
	alt?: string;
}

const HeroImage: FC<IProps> = ({ url, alt }) => {
	return (
		<div className="block border border-transparent border-solid lg:top-0 lg:bottom-0 lg:right-0 lg:w-1/2 lg:absolute">
			<img src={url} alt={alt} loading="lazy" className="object-cover w-full h-full " />
		</div>
	);
};

export default HeroImage;
