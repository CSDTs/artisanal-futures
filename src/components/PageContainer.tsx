import { Footer, Navigation } from "@/layout";
import { FC, ReactNode } from "react";

interface IPageProps {
	children: ReactNode;
	title?: string;
	subtitle?: string;
}
const PageContainer: FC<IPageProps> = ({ title, subtitle, children }) => {
	return (
		<div className="h-full min-h-screen flex flex-col justify-between ">
			<div>
				<Navigation />
				<main className="max-w-6xl p-4 mt-6 mx-auto">
					{title && <h1 className=" text-5xl font-semibold">{title}</h1>}
					{subtitle && <p className="lead mt-2 mb-3 text-2xl text-slate-400">{subtitle}</p>}
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default PageContainer;
