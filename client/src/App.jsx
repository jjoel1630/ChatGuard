import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import Upload from "./components/Upload";
import PedoProfileMaker from "./components/PedoProfileMaker";
import { Contact } from "./components/contact";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import Form from "./components/form";
import Post from "./components/post";
import Results from "./components/Results";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SecondaryPage from "./components/SecondaryPage";
import FullForm from "./components/FullForm";

export const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1000,
	speedAsDuration: true,
});

const App = () => {
	const [landingPageData, setLandingPageData] = useState({});
	useEffect(() => {
		setLandingPageData(JsonData);
	}, []);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<div>
						<Navigation />
						<Header data={landingPageData.Header} />
						<Features data={landingPageData.Features} />
						<About data={landingPageData.About} />
						<Team data={landingPageData.Team} />
						<Contact data={landingPageData.Contact} />
					</div>
				</Route>
				<Route path="/upload/">
					<Navigation />
					<Upload />
				</Route>
				<Route path="/results/">
					<Navigation />
					<Results />
				</Route>
				<Route path="/test">
					<SecondaryPage />
				</Route>
				<Route path="/form">
					<Navigation />
					{/* <Form /> */}
					<FullForm />
				</Route>
				<Route path="/profile-maker">
					<Navigation />
					<PedoProfileMaker />
				</Route>
				{/* <Route path="/post">
					<Navigation />
					<Post />
				</Route> */}
			</Switch>
		</Router>
	);
};

export default App;
