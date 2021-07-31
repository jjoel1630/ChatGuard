import React, { useRef } from "react";
import "../styles/Analysis.css";
import pedo from "../imgs/pedo.jpg";
import OverallAnalysis from "./OverallAnalysis";
import FadeInSection from "./FadeInSection";

function Analysis({ analysisRef }) {
	// const scrollDown = () => {
	// 	window.scrollTo({
	// 		top: overallAnalysisRef.current.getBoundingClientRect().top - 81,
	// 		behavior: "smooth",
	// 	});
	// };

	return (
		<>
			<div
				style={{
					position: "relative",
					height: "100vh",
				}}
				ref={analysisRef}>
				<div id="analysis" className="analysis">
					<FadeInSection>
						<h1 style={{ paddingTop: "1vh", color: "black", fontWeight: "bold" }}>
							<center>Your Upload</center>
						</h1>
					</FadeInSection>
					<FadeInSection>
						<div style={{ display: "block", textAlign: "center", margin: "0 auto" }}>
							<img
								src={pedo}
								style={{ paddingTop: "30px", width: "600px", height: "auto" }}
							/>
						</div>
					</FadeInSection>
					<FadeInSection>
						<div className="arrow-container" style={{ marginTop: "1em" }}>
							<a href="#overall-analysis">
								<div class="arrow"></div>
							</a>
						</div>
					</FadeInSection>
				</div>
			</div>
		</>
	);
}

export default Analysis;
