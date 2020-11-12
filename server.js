var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
var http = require('http').Server(app);

const PORT = 3000;

const MongoClient = require('mongodb').MongoClient;

//db specifications
const dbName = "angularShoppingAppDB";

const userName = "brian";
const password = "brian123";

const clusterName = 'cluster0';
const clusterInfo = 'm2uu4';

const uri = `mongodb+srv://${userName}:${password}@${clusterName}.${clusterInfo}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

var productCollection;
var userCollection;
var client;



//db connection
MongoClient.connect(uri, {useUnifiedTopology: true}, function(error, result){
	client = result.db(dbName);	
	console.log("Database connected! \nDB info:\t", client);

	//also works:
		//collection = result.db('tcsdb').collection('students');
	productCollection = client.collection("products");
	console.log("\nCollection reached! \nCollection info:\t", productCollection, "\n");
});


app.post('/admin/products', (req, res) => {
	let data = req.body;
	productCollection.insertOne(data).then(result => {
		console.log(result);
		res.send('product added successfully');
	});
})



app.listen(PORT, () => {
	console.log('server is ready');
})