const React = require("react");
const ReactDOM = require("react-dom");
const Redux = require("redux");
const ReactRedux = require("react-redux");

module.exports = (Component) => {
	//constant action types
	const ADD_MESSAGE = "ADD_MESSAGE";

	//actions
	const actAddMessage = (msgData) => {
		return { type: ADD_MESSAGE, msgData };
	};

	//default states
	const defaultChatState = {
		msgData: [],
	};

	//reducers
	const chatReducer = (state = defaultChatState, action) => {
		switch (action.type) {
			case ADD_MESSAGE:
				//NEVER MUTATE STATES
				const clone = Object.assign({}, state, {
					msgData: [...state.msgData, action.msgData],
				});
				return clone;
				break;
			default:
				return state;
		}
	};

	//root reducer for multiple reducers
	const rootReducer = Redux.combineReducers({
		chatReducer,
	});

	//our redux store
	const store = Redux.createStore(rootReducer);

	//map state and dispatch to props
	const mapStateToProps = (state) => ({
		msgData: state.chatReducer.msgData,
	});

	const mapDispatchToProps = (dispatch) => ({
		addMessage: (msgData) => {
			dispatch(actAddMessage(msgData));
		},
	});

	//call provider and connect from react-redux
	const Provider = ReactRedux.Provider;
	const connect = ReactRedux.connect;

	const ConnectedComponent = connect(
		mapStateToProps,
		mapDispatchToProps
	)(Component);

	class AppWrapper extends React.Component {
		render() {
			return (
				<Provider store={store}>
					<ConnectedComponent />
				</Provider>
			);
		}
	}

	const node = document.querySelector("#root");
	ReactDOM.render(<AppWrapper />, node);
};
