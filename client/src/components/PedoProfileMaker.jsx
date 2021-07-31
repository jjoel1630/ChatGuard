import React, { useEffect, useRef, useState } from "react";
import FadeInSection from "./FadeInSection";
import Post from "./post";
import "../styles/PedoProfileMaker.css";

function PedoProfileMaker() {
	const [showPost, setShowPost] = useState(false);
	const [fixedTime, setFixedTime] = useState();
	const postRef = useRef(null);

	const showModalBox = () => setShowPost(true);

	useEffect(() => {
		if (showPost) {
			window.scrollTo({
				top: postRef.current.getBoundingClientRect().top - 81,
				behavior: "smooth",
			});
		}
	}, [showPost]);

	useEffect(() => {
		let time = new Date();
		time = time.toLocaleDateString();
		// time = time.split(" ");
		// let pmOrAm = time.pop();
		// time = time.join();
		// time = time.split(":");
		// time.pop();
		// time = time.join(":");
		// time = `${time} ${pmOrAm}`;
		setFixedTime(time);
	}, []);

	return (
		<>
			<div className="pedo-container">
				<div className="pedo-header">
					<h1
						style={{
							color: "black",
							alignText: "center",
							marginTop: "2em",
						}}>
						Make a Profile for This Harasser
					</h1>
				</div>
				<div className="pedo-fluid">
					<form className="pedo-form">
						<div>
							<input type="text" placeholder="Date" className="textinput" />
							<input type="text" placeholder="Identifier" className="textinput" />
							<input
								type="text"
								placeholder="Profile Picture Description"
								className="textinput"
							/>
							<input
								type="text"
								placeholder="Social Networking Platform"
								className="textinput"
							/>
							<input
								type="text"
								placeholder="What They Discussed"
								className="textinput"
							/>
							{/* <Link to="/post">
								<button
									type="reset"
									value="Reset"
									href="/post"
									className="submitButton"
									style={{
										color: "white",
										boxShadow: "0 10px 30px 1px rgb(0 0 0 / 60%)",
									}}>
									Submit
								</button>
							</Link> */}
						</div>
					</form>
				</div>
				<button
					onClick={showModalBox}
					className="submitButton"
					style={{
						color: "white",
						boxShadow: "0 10px 30px 1px rgb(0 0 0 / 60%)",
					}}>
					Create Profile
				</button>
			</div>

			{showPost ? (
				<div ref={postRef}>
					<FadeInSection>
						<Post
							name={"Pablo"}
							description={
								"Pablo was harassing me on discord. He was trying to video call me and kept asking me to send pictures. This was very scary and terrifying. I was so helpless."
							}
							social1={{ name: "Discord" }}
							social2={{ name: "Profile Picture", id: "Anime Character" }}
							date={fixedTime}
						/>
						<h1 style={{ textAlign: "center" }}>. . .</h1>
						<Post
							name={"Jeffery_13"}
							description={
								"Jeffery started of as just a nice guy I met on the internet. However, he wanted to meet me irl but I told him I wasn't ready. This angered him and he started harrasing me. Everyday he said he would find where I lived and hurt me and my family if I didn't tell my address."
							}
							date={"7/25/2021"}
							social1={{ name: "Twitter" }}
							social2={{ name: "Profile Picture", id: "Baseball Bat" }}
						/>
						<Post
							name={"Mark Rogers"}
							description={
								"Mark went to my highschool and was known for being the creepy guy. He would always make weird and creepy jokes. Just yesterday, he started calling me uncomfortable names like baby and bae. I told him to stop but he wouldn't and started texting all my friends even more weird stuff."
							}
							date={"7/25/2021"}
							social1={{ name: "Discord" }}
							social2={{ name: "Profile Picture", id: "Picture of Basketball" }}
						/>
						<Post
							name={"@sarah423_"}
							description={
								"Sarah has always been very rude to me. I always ignored her and didn't care about what she said. However, what hurt me was when she created a groupchat to just talk trash about me. There were 9 other people saying mean things about me in that group."
							}
							date={"7/24/2021"}
							social1={{ name: "Snapchat" }}
							social2={{
								name: "Profile Picture",
								id: "Girl with blonde hair and sunglasses",
							}}
						/>
					</FadeInSection>
				</div>
			) : null}
		</>
	);
}

export default PedoProfileMaker;
