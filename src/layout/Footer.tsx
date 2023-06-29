const Footer = () => {
	return (
		<footer className="bg-slate-50 text-slate-700 mt-16 p-4">
			<section className="max-w-6xl flex mx-auto w-full py-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
					<div className="flex-start flex flex-col gap-2">
						<h5 className="font-semibold text-lg pb-2">Products</h5>
						<a href="/products">All</a>
						<a href="/artisans">Artisans</a>
						<a href="/tools">Tools</a>
					</div>
					<div className="flex-start flex flex-col gap-2">
						<h5 className="font-semibold text-lg pb-2">The Collective</h5>
						<a href="#!">About Us</a>
						<a href="/registration">Become an Artisan</a>
						<a href="/contact">Contact Us</a>
					</div>
					<div className="flex-start flex flex-col gap-2">
						<h5 className="font-semibold text-lg pb-2">Legal</h5>
						<a href="/agreement">The Artisanal Futures Collective Agreement</a>
						<a href="/policies/privacy">Privacy Policy</a>
						<a href="/policies/terms-of-service">Terms of Service</a>
					</div>
					<div className="flex-start flex flex-col gap-2">
						<h5 className="font-semibold text-lg pb-2">Follow Us</h5>
						<a href="#!">Facebook</a>
						<a href="#!">Twitter</a>
						<a href="#!">Instagram</a>
					</div>
				</div>
			</section>

			<section className="py-10">
				<div className="flex items-center justify-center before:border-b before:border-b-slate-200 before:flex-grow before:mr-8 after:border-b after:border-b-slate-200 after:flex-grow after:ml-8 ">
					<img src={"img/logo.png"} className="h-7" alt="Site logo" />
				</div>
				<p className="pt-6 text-sm text-center">© 2023 Artisanal Futures. All rights reserved</p>
			</section>
		</footer>
	);
};
export default Footer;
