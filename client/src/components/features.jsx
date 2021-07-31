import FadeInSection from "./FadeInSection";

export const Features = (props) => {
	return (
		<div id="features" className="text-center">
			<div className="container">
				<FadeInSection>
					<div className="col-md-10 col-md-offset-1 section-title">
						<h2>Features</h2>
					</div>
				</FadeInSection>
				<div className="row">
					{props.data
						? props.data.map((d, i) => (
								<div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
									{" "}
									<FadeInSection>
										<i className={d.icon} style={{boxShadow: "0 10px 30px 1px rgb(0 0 0 / 30%)"}}></i>
									</FadeInSection>
									<FadeInSection>
										<h3>{d.title}</h3>
									</FadeInSection>
									<FadeInSection>
										<p>{d.text}</p>
									</FadeInSection>
								</div>
						  ))
						: "Loading..."}
				</div>
			</div>
		</div>
	);
};
