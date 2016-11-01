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
import server from './serverAddress.js';

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

	componentDidMount() {
		this.props.dispatch(actions.switchCamera('back'));
		this.props.dispatch(actions.controlCamera(true));
		// console.log('@DID MOUNT: ', this.props.showCamera);
	}

	addProduct(data) {
		// this.setState({showCamera: false});
		this.props.dispatch(actions.controlCamera(true));
		this.props.navigator.push({
			title: 'add',
			component: Add
			// info: data
		});
		this.props.dispatch(actions.updateUpc(data));
	}

	_searchProduct(upcCode, context) {
		let endpoint = server + '/checkCode';
		fetch(endpoint, {
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

	scanCode(e) {
		this.props.dispatch(actions.controlCamera(false));
		let self = this;
		AlertIOS.alert(
			'Code Scanned!!',
			'Search product or upload product?',
			[{text: 'Search', onPress: () => {self._searchProduct(e.data, self)}},
			 {text: 'Upload', onPress: () => {self.addProduct(e.data)}}]
		)
  }

  renderCamera() {
  	if (this.props.showCamera) {
  		return (
  			<Camera
	        ref="camera"
	        style={styles.container}
	        onBarCodeRead={this.scanCode.bind(this)}
	        type={this.props.cameraType}>
	      </Camera>
  		);
  	} else {
  		return (
  			<View></View>
  		);
  	}
  }

	render() {
		return (
			this.renderCamera()
		);
	}
};

const mapStateToProps = (store) => {
	// console.log('@store: ', store);
	return {
		showCamera: store.camera.showCamera,
		cameraType: store.camera.cameraType,
		message: store.product.message
	}
};

export default connect(mapStateToProps)(Main)


// <View style={styles.buttonBar}>
// 		        <Button style={styles.button} onPress={() => this.scanCode()}>Scan!!</Button>
// 					</View>