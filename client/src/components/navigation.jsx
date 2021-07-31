import logo from "../imgs/logo.png";
import "../styles/navigation.css";

export const Navigation = (props) => {
	return (
		<nav id="menu" className="navbar navbar-default navbar-fixed-top">
			<div className="container">
				<div className="navbar-header">
					<button
						type="button"
						className="navbar-toggle collapsed"
						data-toggle="collapse"
						data-target="#bs-example-navbar-collapse-1">
						{" "}
						<span className="sr-only">Toggle navigation</span>{" "}
						<span className="icon-bar"></span> <span className="icon-bar"></span>{" "}
						<span className="icon-bar"></span>{" "}
					</button>
					<a className="navbar-brand page-scroll" href="/">
						<img
							src={logo}
							style={{ height: 65, width: 65, position: "absolute", top: "8px" }}
						/>
					</a>{" "}
				</div>

				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav navbar-right">
						<li>
							<a href="/#features" className="page-scroll">
								Features
							</a>
						</li>
						<li>
							<a href="/#about" className="page-scroll">
								About
							</a>
						</li>
						<li>
							<a href="/#team" className="page-scroll">
								Team
							</a>
						</li>
						<li>
							<a href="/#contact" className="page-scroll">
								Contact
							</a>
						</li>
						<li>
							<a href="/upload" className="page-scroll">
								Upload
							</a>
						</li>
						<li>
							<a href="/form" className="page-scroll">
								Form
							</a>
						</li>
						<li>
							<a href="/profile-maker" className="page-scroll">
								Profiles
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
