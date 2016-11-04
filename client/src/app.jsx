import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			product: []
		};
	}

	componentWillMount() {
		const self = this;
		axios.get('http://localhost:3000/web')
		.then(function(res) {
			self.setState({product: res.data});
		})
		.catch(function(err) {
			console.log('error at componentWillMount: ', err);
		})
	}

	addProduct() {
		const self = this;
		let productName = document.getElementById('productName').value;
		let upc = document.getElementById('upc').value;
		axios.post('http://localhost:3000/addProduct', {
			product_name: productName,
			upc: upc
		}).then(function(res) {
			axios.get('http://localhost:3000/web').then(function(res) {
				self.setState({product: res.data});
			}).catch(function(err) {
				console.log('error: ', err);
			})
		}).catch(function(err) {
			console.log('error happened: ', error);
		})
	}

	render() {
		console.log(this.state.product);
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
					<table className="table table-bordered">
						<thead>
							<tr>
								<th>Product Name</th>
								<th>UPC Code</th>
							</tr>
						</thead>
						<tbody>
							{this.state.product.map((product) => {
								return (
									<tr>
										<td>{product.product_name}</td>
										<td>{product.upc}</td>
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