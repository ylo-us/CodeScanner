import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import { styles } from './styles.js';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Main from './main.js';

class Msg extends Component {
	constructor(props) {
		super(props);
	}

	back() {
		this.props.navigator.pop();
	}

	render() {
		console.log('msg: ', this.props.message);
		return (
			<View style={styles.container}>
				<Text>{this.props.message}</Text>
					<Button style={styles.button}onPress={() => this.back()}>Back!!</Button>
			</View>
		)
	}
}

const mapStateToProps = (store) => {
	// console.log('state: ', store);
	return {
		message: store.product.message
	}
};

export default connect(mapStateToProps)(Msg)