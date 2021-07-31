import FadeInSection from "./FadeInSection";

export const Team = (props) => {
	return (
		<div id="team" className="text-center">
			<div className="container">
				<FadeInSection>
					<div className="col-md-8 col-md-offset-2 section-title">
						<h2>Meet the Team</h2>
					</div>
				</FadeInSection>
				<div id="row">
					{props.data
						? props.data.map((d, i) => (
								<div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
									<div className="thumbnail">
										{" "}
										<FadeInSection>
											<img
												src={d.img}
												style={{
													width: "300px",
													height: "300px",
													maxHeight: "100%",
													maxWidth: "100%",
													display: "block",
													objectFit: "cover",
												}}
												alt="..."
												className="team-img"
											/>
										</FadeInSection>
										<div className="caption">
											<FadeInSection>
												<h4>{d.name}</h4>
											</FadeInSection>
											<FadeInSection>
												<p>{d.job}</p>
											</FadeInSection>
										</div>
									</div>
								</div>
						  ))
						: "loading"}
				</div>
			</div>
		</div>
	);
};
