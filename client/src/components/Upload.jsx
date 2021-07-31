import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Upload.css";
import Analysis from "./Analysis";
import OverallAnalysis from "./OverallAnalysis";
import FadeInSection from "./FadeInSection";

function Upload() {
	const history = useHistory();
	const analysisRef = useRef(null);
	const overallAnalysisRef = useRef(null);
	const [file, setFile] = useState("");

	const onFileChange = (e) => setFile(e.target.files[0]);

	useEffect(() => {
		if (file) {
			document.querySelector(".loader-container").style.display = "block";
			setTimeout(() => {
				document.querySelector(".loader-container").style.display = "none";

				setTimeout(() => {
					window.scrollTo({
						top: analysisRef.current.getBoundingClientRect().top - 81,
						behavior: "smooth",
					});
				}, 50);
			}, 15000);
		}
	}, [file]);

	// useEffect(() => {
	// 	if (file === "") history.push("/upload");
	// }, []);

	return (
		<>
			<div className="wrapper" style={{ position: "relative" }}>
				<div
					className="upload-text"
					style={{
						fontFamily: "'Raleway', sans-serif",
						color: "black",
						position: "absolute",
						top: "43%",
						left: "50%",
						transform: "translate(-50%, -80%)",
					}}>
					<h1>
						<h1 style={{ fontWeight: 800 }}>Upload File</h1>
					</h1>
				</div>
				<div
					className="file-upload"
					style={{
						position: "absolute",
						top: "60%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}>
					<input onChange={onFileChange} type="file" />
					<div className="arrow-icon">
						<i className="fa fa-arrow-up"></i>
					</div>
				</div>
			</div>

			<div className="loader-container">
				<div>
					<div className="loader-circle"></div>
					<h3>Loading...</h3>
				</div>
			</div>

			<div style={{ display: file === "" ? "none" : "block" }}>
				{/* style={{ display: file === "" ? "none" : "block" }} */}
				<Analysis analysisRef={analysisRef} text={file} />
			</div>
			<div style={{ display: file === "" ? "none" : "block" }}>
				{/* style={{ display: file === "" ? "none" : "block" }} */}
				<OverallAnalysis overallAnalysisRef={overallAnalysisRef} />
			</div>
		</>
	);
}

export default Upload;
