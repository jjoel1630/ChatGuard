import React from "react";
import { Table } from "reactstrap";
import TableCats from "./tableCats";

function Results() {
	return (
		// <div
		// 	style={{
		// 		display: "flex",
		// 		justifyContent: "center",
		// 		width: "100%",
		// 		height: "100vh",
		// 		color: "black",
		// 		textAlign: "center",
		// 		margin: "auto",
		// 	}}>
		// 	{/* <h1 style={{fontWeight: 900}}>Questionare Based Analysis</h1> */}
		// 	<div style={{ marginTop: "13%", fontSize: "35px" }}>
		// 		<div>
		// 			<h1>
		// 				<h1 style={{ fontWeight: 800, marginBottom: "5%", marginTop: "-11%" }}>
		// 					Supplemental Questionare
		// 				</h1>
		// 				<h3 style={{ textAlign: "center", color: "#787878", marginBottom: "-1%" }}>
		// 					Please answer the following questionare designed to enhance our
		// 					assessment of <br /> your situation. The questions are inspired by the
		// 					National Center for Biotechnology <br /> Information's sexual harrasment
		// 					research in 2018.
		// 				</h3>

		// 				<h1 style={{ fontWeight: 800, marginBottom: "15%" }}>Your Total: 92</h1>
		// 			</h1>
		// 		</div>
		// 	</div>
		// 	<TableCats />
		// 	<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
		// 		<button className="btn btn-primary">
		// 			Back
		// 		</button>
		// 	</div>

		// </div>
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100%",
				height: "100vh",
			}}>
			<div style={{}}>
				<div
					style={{
						marginTop: "2em",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}>
					<div
						style={{
							textAlign: "center",
							width: "60%",
							display: "block",
							color: "black",
						}}>
						<h1 style={{ fontWeight: 900 }}>Supplemental Questionare</h1>
						<h3 style={{ color: "#787878" }}>
							These questions were inspired by the National Center for Biotechnology
							Information's sexual harassment research in 2018.
						</h3>
						<h1 style={{ fontWeight: 800 }}>Your Total: 78</h1>
					</div>
				</div>
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
					<TableCats />
				</div>
				<div style={{ width: "100%" }}>
					<button
						type="reset"
						value="Reset"
						href="/form"
						className="submitButton"
						style={{
							display: "block",
							margin: "0 auto",
						}}>
						Back
					</button>
				</div>
			</div>
		</div>
	);
}

export default Results;
