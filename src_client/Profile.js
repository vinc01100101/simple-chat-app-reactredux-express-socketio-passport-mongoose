const React = require("react");
const ReactDOM = require("react-dom");
const reduxConfig = require("./redux/redux-config");

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			chatInput: "",
		};
		this._handleChanges = (e) => {
			this.setState({
				[e.target.id]: e.target.value,
			});
		};
		this._handleSend = () => {
			chatInput != "" &&
				(() => {
					this.emits("message", this.state.chatInput);
					this.setState({ chatInput: "" });
				})();
		};
		this._reduxActionCallback = (action, value) => {
			value ? this.props[action](value) : this.props[action];
		};
	}
	componentDidMount() {
		this.emits = require("./helpers/client-emits")(this._reduxActionCallback);
	}
	render() {
		return (
			<div>
				<h1>Profile Page!</h1>
				<ul>
					{this.props.msgData.length > 0 &&
						this.props.msgData.map((x, i) => {
							return (
								<li key={i}>
									<strong>{x.username} </strong> : {x.message}
								</li>
							);
						})}
				</ul>

				<input
					id="chatInput"
					type="text"
					onChange={this._handleChanges}
					value={this.state.chatInput}
				/>
				<button onClick={this._handleSend}>Send</button>
				<br />
				<a href="/logout">Log out</a>
			</div>
		);
	}
}

reduxConfig(Profile);
