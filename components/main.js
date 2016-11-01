import React, { Component } from 'react';
import {
	StyleSheet,
	AlertIOS,
	Navigator,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Msg from './message.js';
import Add from './addProduct.js';
import { styles } from './styles.js';
import Camera from 'react-native-camera';
import * as actions from './actions.js';

// Assumption: camera reads the bar code in camera view and returns upc data
// a helper function that generates upc code

var upcGenerator = () => {
	return Math.floor(Math.random() * Math.pow(10, 11));
}

class Main extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	showCamera: true,
  //     cameraType: Camera.constants.Type.back
  //   }
	}

	componentWillMount() {
		this.props.dispatch(actions.switchCamera('back'));
		this.props.dispatch(actions.controlCamera(true));
	}

	addProduct(data) {
		// this.setState({showCamera: false});
		this.props.dispatch(actions.controlCamera(false));
		this.props.navigator.push({
			title: 'add',
			component: Add
			// info: data
		});
		this.props.dispatch(actions.updateUpc(data));
	}

	_searchProduct(upcCode, context) {
		fetch('http://localhost:3000/checkCode', {
			method: 'POST',
			headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
	  	},
	  	body: JSON.stringify({
	  		upc: upcCode
	  	})
		}).then(function(res) {
			if (res.status !== 200) {
				AlertIOS.alert(
					'request error',
					'HTTP status = ' + res.status
				);
			} else {
				let product = JSON.parse(res._bodyText);
				let result = product.upc === undefined ? 'no item found' : 'product found! \nproduct_name: ' + product.product_name + '\nupc: ' + product.upc;
				context.props.dispatch(actions.updateMessage(result));
				context.props.navigator.push({
					title: 'message',
					component: Msg,
					// info: result
				});
			}
		});
	}

	scanCode() {
		let data = upcGenerator();
		let self = this;
		AlertIOS.alert(
			'Code Scanned!!',
			'Search product or upload product?',
			[{text: 'Search', onPress: () => {self._searchProduct(data, self)}},
			 {text: 'Upload', onPress: () => {self.addProduct(data)}}]
		)
  }

	render() {
		return (
			<Camera
        ref="camera"
        style={styles.container}
        onBarCodeRead={this.scanCode}
        type={this.props.cameraType}>
        <View style={styles.buttonBar}>
	        <Button style={styles.button} onPress={() => this.scanCode()}>Scan!!</Button>
				</View>
      </Camera>
		);
	}
};

const mapStateToProps = (store) => {
	// console.log('state: ', store);
	return {
		showCamera: store.camera.showCamera,
		cameraType: store.camera.cameraType,
		message: store.product.message
	}
};

export default connect(mapStateToProps)(Main)