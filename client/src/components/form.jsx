import React, { useState } from "react";
import "../styles/form.css";
import FadeInSection from "./FadeInSection";

function Form({ setSubmitted }) {
	const [questionNum, setQuestionNum] = useState(0);

	const onSubmit = (e) => {
		setSubmitted(true);
	};

	const questions = [
		{
			qName: "Do you feel uncomfortable online?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you inapropriately made fun of?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Has saying no made little impact?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you feel unsafe online?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you feel pressured to go along with something?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you discriminated because of your gender?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Is your body emphasiszed in your conversation?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you scared about the person harrasing you?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you stressed or anxious when messaging?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are sexual jokes made about you?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you feel obligated to listen to the person harrasing you?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you getting less sleep?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you physically threatened?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you overthink about your situation?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you feel humiliated?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you being blackmailed?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you shown innapropriate images without your consent?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you getting more head or backaches?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Is personal information about you shared?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are slurs used against you?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are you afraid to speak to others about your situation?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Has anyone made you insecure about yourself?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Are rude jokes made behind your back?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Do you feel depressed or upset?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
		{
			qName: "Have you been asked to send pictures of yourself?",
			options: ["Not At All", "Somewhat", "Moderately", "Extremely"],
		},
	];

	return (
		<div className="form-container">
			<div className="h1andoptions">
				<h1
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						marginTop: "15%",
						marginBottom: "3%",
						color: "black",
					}}>
					{questions[questionNum].qName}
				</h1>
				<div>
					{questions[questionNum].options.map((option, idx) => (
						<div className="parentForm" key={idx}>
							<label className="rad-label">
								<input type="radio" className="rad-input" name="rad" />
								<div className="rad-design"></div>
								<div className="rad-text">{option}</div>
							</label>
						</div>
					))}
				</div>

				<div className="button-container">
					{questionNum !== questions.length - 1 ? (
						<>
							<button
								className="progressBtns next"
								onClick={() =>
									setQuestionNum((prevQuestionNum) => prevQuestionNum - 1)
								}
								disabled={questionNum === 0}
								style={{ fontWeight: 900 }}>
								&#8592;
							</button>
							<button
								className="progressBtns previous"
								onClick={() => {
									setQuestionNum((prevQuestionNum) => prevQuestionNum + 1);
									const input = document.querySelector(
										"input[type=radio]:checked"
									);
									if (input) input.checked = 0;
								}}
								disabled={questionNum === questions.length - 1}
								style={{ fontWeight: 900 }}>
								{"\u{02192}"}
							</button>
						</>
					) : (
						<>
							<button
								className="progressBtns previous"
								onClick={() =>
									setQuestionNum((prevQuestionNum) => prevQuestionNum - 1)
								}
								disabled={questionNum === 0}
								style={{ fontWeight: 900 }}>
								&#8592;
							</button>
							<button className="submitBtn" onClick={onSubmit}>
								Submit
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default Form;
