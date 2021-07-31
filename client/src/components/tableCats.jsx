import React from "react";
import { Table } from "reactstrap";

function TableCats() {
	return (
		// <div style={{ position: "absolute", top: "50%"}}>
		//   <Table hover>
		//     <tbody>
		//       <tr style = {{color: "black"}}>
		//         <th scope="row">1</th>
		//         <td>RAIN</td>
		//         <td>RAIN is an organization that helps kids that are being sexually harrased.</td>
		//       </tr>
		//       <tr style = {{color: "black"}}>
		//         <th scope="row">2</th>
		//         <td>Crissis Text Line</td>
		//         <td>Crissis Text Line can help you with sexual harrasment. Text HOME to 741741.</td>
		//       </tr>
		//       <tr style = {{color: "black"}}>
		//         <th scope="row">3</th>
		//         <td>Cross Roads</td>
		//         <td>Cross Roads is another crisis line that deals with sexual harrasment.</td>
		//       </tr>
		//       <tr style = {{color: "black"}}>
		//         <th scope="row">4</th>
		//         <td>Contact a Crisis Councler</td>
		//         <td>Text 741741 to get in touch with a Crisis Councler.</td>
		//       </tr>
		//       <tr style = {{color: "black"}}>
		//         <th scope="row">5</th>
		//         <td>Self Helpline App</td>
		//         <td>Download the Self Helpline App to have all day support with proffesionals.</td>
		//       </tr>
		//     </tbody>
		//   </Table>
		// </div>

		<div style={{}}>
			{/* position: "absolute", top: "44%", marginTop: "9%" */}
			<Table hover>
				<thead>
					<tr style={{ color: "black", height: "40px" }}>
						<th style={{ textAlign: "center" }}>Range</th>
						<th style={{ textAlign: "right" }}>Level of Harrassment</th>
					</tr>
				</thead>
				<tbody>
					<tr style={{ color: "black" }}>
						<td>1-20</td>
						<td style={{ textAlign: "right" }}>
							You are not likely being sexually harrased
						</td>
					</tr>
					<tr style={{ color: "black" }}>
						<td>21-40</td>
						<td style={{ textAlign: "right" }}>
							You are being put into an uncomfortable situation
						</td>
					</tr>
					<tr style={{ color: "black" }}>
						<td>41-60</td>
						<td style={{ textAlign: "right" }}>
							You are being objectified and/or excluded
						</td>
					</tr>
					<tr style={{ color: "black", fontWeight: 900, color: "#3d88ff" }}>
						<td>61-80</td>
						<td style={{ textAlign: "right" }}>
							You are being bullied and/or threatened
						</td>
					</tr>
					<tr style={{ color: "black" }}>
						<td>81-100</td>
						<td style={{ textAlign: "right" }}>
							You are likely being sexually targeted or harrassed
						</td>
					</tr>
				</tbody>
			</Table>
		</div>
	);
}

export default TableCats;
