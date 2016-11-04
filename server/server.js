var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db').db;
var Product = require('./db').Product;
var app = express();
var port = process.env.port || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

app.get('/web', function(req, res) {
	var upc = [];
	Product.find(function(err, products) {
		if (err) {
			res.status(400).json(err);
		} else {
			if (products) {
				products.forEach(function(product) {
					var result = {};
					result.product_name = product.product_name;
					result.upc = product.upc;
					upc.push(result);
				})
			}
			res.status(200).json(upc);
		}
	})
});

app.post('/addProduct', function(req, res) {
	console.log(req.body);
	Product.create(req.body, function(err, product) {
		res.setHeader('Content-Type', 'application/json');
		if (err) {
			res.status(400).json(err);
		} else {
			var result = {};
			if (product) {
				result.product_name = product.product_name;
				result.upc = product.upc;
			}
			res.status(200).json(result);
		}
	})
});

app.post('/checkCode', function(req, res) {
	Product.find({upc: req.body.upc}, function(err, product) {
		res.setHeader('Content-Type', 'application/json');
		if (err) {
			res.status(400).json(err);
		} else {
			var result = {};
			if (product[0]) {
				result.product_name = product[0].product_name;
				result.upc = product[0].upc;
			}
			res.status(200).json(result);
		}
	})
});

app.listen(port, function() {
	console.log('running on port: ', port);
})