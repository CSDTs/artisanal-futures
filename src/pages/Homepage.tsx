import { Features, Hero } from "@/components/Homepage";
import Footer from "@/layout/Footer";
import Navigation from "@/layout/Navigation";
const Homepage = () => {
	return (
		<>
			<Navigation />
			<div className="max-w-6xl px-3 mx-auto">
				<Hero />
				<Features />

				<div className="text-center">
					<h2 className="mt-12 text-3xl font-bold">Artisanal Technologies for Generative Justice</h2>
					<img
						src="img/flowchart.png"
						alt="Flowchart showing the generative nature of artisanal tech"
						className="w-full "
						loading="lazy"
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Homepage;
