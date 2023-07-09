import { Route, Routes } from "react-router-dom";
import "./App.css";

import ShopRateCalculator from "./features/apps/ShopRateCalculator";

import CollectiveAgreementPage from "./pages/CollectiveAgreementPage";

import ArtisansPage from "./pages/ArtisansPage";
import Homepage from "./pages/Homepage";
import PolicyInformationPage from "./pages/PolicyInformationPage";

import ProductsPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";

import SignInPage from "./pages/SignInPage";

import Tools from "./pages/Tools";

import PageNotFound from "./pages/PageNotFound";

import OnboardingScreen from "./features/OnboardingScreen";
import ProfileWizard from "./features/ProfileWizard";

import MeasurementBox from "./features/apps/PatternGenerator/components/MeasurementBox";
import ContactPage from "./pages/ContactPage";
import CraftRecompositionPage from "./pages/CraftRecompositionPage";
import PatternGenerator from "./pages/PatternGenerator";
import PublicProfilePage from "./pages/PublicProfilePage";

import PrivacyPage from "./pages/PrivacyPage";
import QuestionsPage from "./pages/QuestionsPage";
import RegistrationPage from "./pages/RegistrationPage";
import TermsPage from "./pages/TermsPage";
function App() {
	localStorage.removeItem("chakra-ui-color-mode");
	return (
		<div className="h-full App">
			<Routes>
				{/* Core */}
				<Route path="/" element={<Homepage />} />
				<Route path="/artisans" element={<ArtisansPage />} />
				<Route path="/artisans/:name" element={<PublicProfilePage />} />
				<Route path="/products" element={<ProductsPage />} />
				<Route path="/contact" element={<ContactPage />} />

				{/* Policy Information */}
				<Route path="/policies/" element={<PolicyInformationPage />} />
				<Route path="/policies/terms-of-service" element={<TermsPage />} />
				<Route path="/policies/privacy" element={<PrivacyPage />} />
				<Route path="/policies/frequently-asked" element={<QuestionsPage />} />
				<Route path="/agreement" element={<CollectiveAgreementPage />} />

				{/* Tools */}
				<Route path="/tools" element={<Tools />} />
				<Route path="/shop-rate-calculator" element={<ShopRateCalculator />} />
				<Route path="/pattern-generator" element={<PatternGenerator />} />
				<Route path="/craft-recomposition" element={<CraftRecompositionPage />} />

				{/* Account */}
				<Route path="/login" element={<SignInPage />} />
				<Route path="/registration" element={<RegistrationPage />} />
				<Route path="/welcome" element={<OnboardingScreen />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/update-profile" element={<ProfileWizard />} />

				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</div>
	);
}

export default App;
