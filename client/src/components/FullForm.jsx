import React, { useState } from "react";
import Form from "./form";
import Results from "./Results";

function FullForm() {
	const [submitted, setSubmitted] = useState(false);

	return <div>{submitted ? <Results /> : <Form setSubmitted={setSubmitted} />}</div>;
}

export default FullForm;
