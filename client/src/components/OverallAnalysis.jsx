import React, { useState, useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import "../styles/OverallAnalysis.css";
import FadeInSection from "./FadeInSection";
import emImage from "../imgs/em.png";
import newradialchart from "../imgs/newradialchart.png";
import Link from "react";

function OverallAnalysis() {
	return (
		<div style={{ height: "100%" }}>
			<h1
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: "50px",
					color: "black",
					fontWeight: "bold",
					fontFamily: "Raleway, Sans Serif",
				}}>
				Your Results
			</h1>

			<div className="exclamation-mark">
				<img src={emImage} />
			</div>
			<div
				style={{
					width: "100%",
					textAlign: "center",
				}}>
				<h1 style={{ color: "#787878", fontSize: "1.6em" }}>
					According to our algorithm, the conversation has signs of{" "}
					<strong style={{ color: "#575757", fontWeight: 800 }}>sexual harassment</strong>{" "}
					<br />
					<br /> The severity of your situation is
					<strong style={{ color: "rgb(61, 136, 255)", fontWeight: 800 }}> 7.7/10</strong>
				</h1>
			</div>
			<div className="flex-container">
				{/* <div className="flex-box">
					
					<img src={newradialchart} style={{ width: "100%", height: "100%" }} />
				</div> */}
				<div className="flex-box">
					<h1>Get Help</h1>
					<h3 style={{ textAlign: "center", color: "black", lineHeight: "1.4" }}>
						Our recommendation for action based on the severity calculated: <br />
					</h3>
					<h3 style={{ color: "#787878", textAlign: "center" }}>
						Report and block the individual, and if the situation escalates, consider
						texting "BRAVE" to 741741 to connect with a trained crisis counselor
					</h3>
				</div>
				<div className="flex-box topics">
					<h1 style={{ marginBottom: "1em" }}>Topics Discussed</h1>
					<div className="topic-pill" style={{ color: "white" }}>
						<p>hot</p>
					</div>
					<div className="topic-pill" style={{ color: "white" }}>
						<p>uncomfortable</p>
					</div>
					<div className="topic-pill" style={{ color: "white" }}>
						<p>stop</p>
					</div>
					<div className="topic-pill" style={{ color: "white" }}>
						<p>feeling</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OverallAnalysis;
