const React = require("react");
const errorDom = document.querySelector("#errorDom").textContent;

module.exports = (props) => (
	<p style={{ color: "red" }}>{props.error || errorDom}</p>
);
