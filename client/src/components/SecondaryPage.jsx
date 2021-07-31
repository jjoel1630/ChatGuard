import React, { useState, useEffect, useRef } from "react";
import Analysis from "./Analysis";
import OverallAnalysis from "./OverallAnalysis";
import Upload from "./Upload";
import { Navigation } from "./navigation";

function SecondaryPage() {
	// const [count, setCount] = useState(0);
	const [file, setFile] = useState("");
	const [buttonClick, setButtonClick] = useState(false);
	const analysisRef = useRef(null);

	useEffect(() => {
		if (file) {
			window.scrollTo({
				top: analysisRef.current.getBoundingClientRect().top - 81,
				behavior: "smooth",
			});
		}
	}, [file]);

	return (
		<>
			<Navigation />
			<Upload file={file} setFile={setFile} />
			<Analysis file={file} setButtonClick={setButtonClick} analysisRef={analysisRef} />
			<OverallAnalysis />
		</>
	);
}

export default SecondaryPage;
