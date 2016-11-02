import React, { Component } from 'react';
import {
	StyleSheet,
	AlertIOS,
	Navigator,
	Text,
	TextInput,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { styles } from './styles.js';
import Button from 'react-native-button';
import * as actions from './actions.js';
import server from './serverAddress.js';

class Add extends Component {
	constructor(props) {
		super(props);
		// this.state = {
		// 	product_name: '',
		// 	upc: this.props.info
		// }
	}

	goBack() {
		this.props.dispatch(actions.controlCamera(true));
		this.props.navigator.pop();
	}

	uploadProduct(context) {
		// console.log('product_name: ', this.state.product_name);
		// console.log('upc: ', this.state.upc);
		let self = context;
		if (this.props.product_name === '') {
			AlertIOS.alert(
				'Warning!!',
				'Please enter a product name'
			);
		} else if (this.props.upc === undefined) {
			AlertIOS.alert(
				'Warning!!',
				'UPC code is not valid'
			);
		} else {
			// console.log('this.props.product_name: ', this.props.product_name);
			// console.log('this.props.upc: ', this.props.upc);
			let endpoint = server + '/addProduct';
			fetch(endpoint, {
				method: 'POST', 
				headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
		  	},
		  	body: JSON.stringify({
		  		product_name: this.props.product_name,
		  		upc: this.props.upc
		  		// product_name: this.state.product_name,
		  		// upc: this.state.upc
		  	})
		  }).then(function(res) {
		  	let result = JSON.parse(res._bodyText);
		  	// console.log('result from server: ', result);
		  	AlertIOS.alert(
					'The following product is added:',
					'product_name: ' + result.product_name + '\nupc Code: ' + result.upc,
					[{text: 'Back', onPress: () => {self.goBack()}}]
				);
		  });	
		}
		
	}

	render() {
		return (
    	<View style={{flex: 3}}>
        <TextInput 
					style={styles.textInput}
					placeholder="Enter Product Name Here"
					placeholderTextColor='#45990D'
					onChangeText={(text) => this.props.dispatch(actions.updateProductName(text))} />
					<View style={styles.buttonBar}>
		        <Button style={styles.button} onPress={() => this.uploadProduct(this)}>Upload!!</Button>
						<Button style={styles.button} onPress={() => this.goBack()}>Back!!</Button>
					</View>
			</View>
		)
	}
}

const mapStateToProps = (store) => {
	// console.log('state: ', store);
	return {
		product_name: store.product.product_name,
		upc: store.product.upc
	}
};

export default connect(mapStateToProps)(Add)
