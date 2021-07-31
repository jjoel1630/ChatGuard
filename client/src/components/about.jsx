import FadeInSection from "./FadeInSection";

export const About = (props) => {
	return (
		<div id="about">
			<div className="container">
				<div className="row">
					<FadeInSection>
						<div className="col-xs-12 col-md-6">
							{" "}
							<img src="img/about.jpg" className="img-responsive" alt="" />{" "}
						</div>
					</FadeInSection>
					<div className="col-xs-12 col-md-6">
						<div className="about-text">
							<FadeInSection>
								<h2>About Us</h2>
							</FadeInSection>
							<FadeInSection>
								<p>{props.data ? props.data.paragraph : "loading..."}</p>
							</FadeInSection>
							<FadeInSection>
								<h3>Why Choose Us?</h3>
							</FadeInSection>
							<div className="list-style">
								<div className="col-lg-6 col-sm-6 col-xs-12">
									<ul>
										{props.data
											? props.data.Why.map((d, i) => (
													<FadeInSection>
														<li key={`${d}-${i}`}>{d}</li>
													</FadeInSection>
											  ))
											: "loading"}
									</ul>
								</div>
								<div className="col-lg-6 col-sm-6 col-xs-12">
									<ul>
										{props.data
											? props.data.Why2.map((d, i) => (
													<FadeInSection>
														<li key={`${d}-${i}`}> {d}</li>
													</FadeInSection>
											  ))
											: "loading"}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
