import Footer from "@/layout/Footer";
import Navigation from "@/layout/Navigation";
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
				<main className="max-w-6xl p-4 mx-auto mt-6">
					{title && <h1 className="mb-6 text-4xl font-semibold">{title}</h1>}
					{subtitle && <p className="mt-1 font-light">{subtitle}</p>}
					{children}
				</main>
			</div>
			<Footer />
		</div>
	);
};

export default PageContainer;
