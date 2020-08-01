import React, { Component } from "react";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			img_url: "",
			current: 0,
		};
	}

	users = ["gaearon", "acdlite", "yyx990803", "unclebob", "martinfowler"];

	componentDidMount() {
		this.load_img(this.users[this.state.current]);
	}

	load_img = async user => {
		fetch(`https://api.github.com/users/${user}`)
			.then(response => response.json())
			.then(data => data.avatar_url)
			.then(url => this.setState({ img_url: url }));
	};

	next = () => {
		let new_user =
			this.state.current < this.users.length - 1 ? this.state.current + 1 : 0;
		this.setState({ current: new_user, img_url: "" }, () =>
			this.load_img(this.users[this.state.current])
		);
	};

	previous = () => {
		let new_user =
			this.state.current > 0 ? this.state.current - 1 : this.users.length - 1;
		this.setState({ current: new_user, img_url: "" }, () =>
			this.load_img(this.users[this.state.current])
		);
	};

	render() {
		return (
			<div>
				<img src={this.state.img_url} alt="Loading..." /> <br />
				<button onClick={this.previous}>Previous</button>
				<button onClick={this.next}>Next</button>
			</div>
		);
	}
}

export default App;
