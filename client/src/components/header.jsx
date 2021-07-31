import "../styles/header.css";
import logopng from "../imgs/logo.png";
import mergedLogo from "../imgs/ChatGuard.png";

export const Header = (props) => {
	return (
		<header id="header">
			<div className="intro">
				<div className="overlay">
					<div className="container">
						<div className="row">
							{/* <div className="image" style={{ position: "relative" }}>
								<img
									src={logopng}
									style={{
										height: "100px",
										width: "100px",
										position: "absolute",
										top: "70%",
										left: "73%",
										transform: "translateY(350%)",
									}}
								/>
							</div> */}

							{/* <img src={mergedLogo} /> */}

							<div className="col-md-8 col-md-offset-2 intro-text">
								<h1 style={{ color: "white", fontWeight: 800 }}>Chatguard</h1>
								<p style={{ color: "white", fontWeight: 300 }}>
									Using AI to ensure minors' protection from and awareness of sexual harassment on social networking services
								</p>
								<a href="#features" className="btn btn-custom btn-lg page-scroll">
									Learn More
								</a>{" "}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
