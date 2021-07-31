import { useState } from "react";
import emailjs from "emailjs-com";
import FadeInSection from "./FadeInSection";

const initialState = {
	name: "",
	email: "",
	message: "",
};
export const Contact = (props) => {
	const [{ name, email, message }, setState] = useState(initialState);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setState((prevState) => ({ ...prevState, [name]: value }));
	};
	const clearState = () => setState({ ...initialState });

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(name, email, message);
		emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID").then(
			(result) => {
				console.log(result.text);
				clearState();
			},
			(error) => {
				console.log(error.text);
			}
		);
	};
	return (
		<div>
			<div id="contact">
				<div className="container" style={{ display: "block" }}>
					<div className="col-md-12">
						<div className="row">
							<div className="section-title" style={{ position: "relative" }}>
								<FadeInSection>
									<h2 style={{ textAlign: "center", fontWeight: "bold" }}>
										Get In Touch
									</h2>
								</FadeInSection>
								<FadeInSection>
									<p style={{ textAlign: "center" }}>
										Please fill out the form below to send us an email and we
										will get back to you as soon as possible.
									</p>
								</FadeInSection>
							</div>
							<form name="sentMessage" validate onSubmit={handleSubmit}>
								<div className="row">
									<div className="col-md-6">
										<div className="form-group">
											<FadeInSection>
												<input
													type="text"
													id="name"
													name="name"
													className="form-control"
													placeholder="Name"
													required
													onChange={handleChange}
												/>
											</FadeInSection>
											<FadeInSection>
												<p className="help-block text-danger"></p>
											</FadeInSection>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<FadeInSection>
												<input
													type="email"
													id="email"
													name="email"
													className="form-control"
													placeholder="Email"
													required
													onChange={handleChange}
												/>
											</FadeInSection>
											<FadeInSection>
												<p className="help-block text-danger"></p>
											</FadeInSection>
										</div>
									</div>
								</div>
								<div className="form-group">
									<FadeInSection>
										<textarea
											name="message"
											id="message"
											className="form-control"
											rows="4"
											placeholder="Message"
											required
											onChange={handleChange}></textarea>
									</FadeInSection>
									<FadeInSection>
										<p className="help-block text-danger"></p>
									</FadeInSection>
								</div>
								<FadeInSection>
									<div id="success"></div>
								</FadeInSection>
								<FadeInSection>
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
										}}>
										<button type="submit" className="btn btn-custom btn-lg">
											Send Message
										</button>
									</div>
								</FadeInSection>
							</form>
						</div>
					</div>
					<div className="col-md-12">
						<div className="row">
							<div className="social">
								<FadeInSection>
									<ul>
										<li>
											<a href={props.data ? props.data.facebook : "/"}>
												<i className="fa fa-facebook"></i>
											</a>
										</li>
										<li>
											<a href={props.data ? props.data.twitter : "/"}>
												<i className="fa fa-twitter"></i>
											</a>
										</li>
										<li>
											<a href={props.data ? props.data.youtube : "/"}>
												<i className="fa fa-youtube"></i>
											</a>
										</li>
									</ul>
								</FadeInSection>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* <div id='footer'>
        <div className='container text-center'>
          <p>
            &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
            <a href='http://www.templatewire.com' rel='nofollow'>
              TemplateWire
            </a>
          </p>
        </div>
      </div> */}
		</div>
	);
};
