import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import serverAdd from './../../components/serverAddress.js'
class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			product: []
		};
	}

	componentWillMount() {
		this.refresh();
	}

	refresh() {
		const self = this;
		axios.get(serverAdd + '/web')
		.then(function(res) {
			console.log('res.data from get /web: ', res.data);
			self.setState({product: res.data});
		})
		.catch(function(err) {
			console.log('error at refresh: ', err);
		})
	}

	remove() {
		const self = this;

		let target = []; 
		$('.check:checkbox:checked').each(function() {
			let node = $(this)['0'].parentNode;
			target.push(node.parentNode.children[1].innerText);
			node.parentNode.removeChild(node);
		});

		axios.post(serverAdd + '/removeProduct', {
			target: target
		}).then(function(res) {
			self.refresh();
		}).catch(function(err) {
			console.log('error at remove: ', err);
		})
	}


	addProduct() {
		const self = this;
		let productName = document.getElementById('productName');
		let upc = document.getElementById('upc');
		axios.post(serverAdd + '/addProduct', {
			product_name: productName.value,
			upc: upc.value
		}).then(function(res) {
			self.refresh();
		}).catch(function(err) {
			console.log('error happened: ', error);
		})
		productName.value = '';
		upc.value = '';
	}

	render() {
		// console.log(this.state.product);
		return (
			<div className="container">
				<img src="./src/image/omg.png" className="img-rounded" width="309" height="88" />
				<h1>Welcome to Code Scanner</h1>
				<div className="container">
					<span>Product Name:
						<input type="text" id="productName" className="form-control"></input>
					</span>
					<span>UPC Code:
						<input type="text" id="upc" className="form-control"></input>
					</span>
					<button type="button" 
									className="btn btn-success" 
									onClick={()=> {this.addProduct()}}>Add New Product</button>
				</div>
				<div className="container">
					<h3>Inventory</h3>
					<button type="button" 
									className="btn btn-info" 
									onClick={() => {this.refresh()}}>Refresh</button>
					<button type="button" 
									className="btn btn-warning" 
									onClick={() => {this.remove()}}>Remove</button>
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>UPC Code</th>
								<th>remove?</th>
							</tr>
						</thead>
						<tbody>
							{this.state.product.map((product) => {
								return (
									<tr>
										<td>{product.product_name}</td>
										<td>{product.upc}</td>
										<td><input type="checkbox" className="check"/></td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}


ReactDOM.render(<App />, document.getElementById('app'));