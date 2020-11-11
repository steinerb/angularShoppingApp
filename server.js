var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
var http = require('http').Server(app);

const MongoClient = require('mongodb').MongoClient;

//db specifications
const dbName = "angularShoppingAppDB";
const collectionName = "products";

const userName = "brian";
const password = "brian123";

const clusterName = 'cluster0';
const clusterInfo = 'm2uu4';

const uri = `mongodb+srv://${userName}:${password}@${clusterName}.${clusterInfo}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

var collection;
var client;



//db connection
MongoClient.connect(uri, {useUnifiedTopology: true}, function(error, result){
	client = result.db(dbName);	
	console.log("Database connected! \nDB info:\t", client);

	//also works:
		//collection = result.db('tcsdb').collection('students');
	collection = client.collection(collectionName);
	console.log("\nCollection reached! \nCollection info:\t", collection);
});

/*
app.post('/admin/addproduct', (req, res) => {
	let data = req.body;
	collection.insertOne(data).then(result => {
		console.log(result);
	})
});


*/