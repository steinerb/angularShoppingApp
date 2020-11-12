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

var client;
var database;
var productCollection;
var userCollection;


//db connection
MongoClient.connect(uri, {useUnifiedTopology: true}, function(error, result){
	client = result.db(dbName);	
	database = result.db();
	console.log("Database connected! \nDB info:\t", database);

	//also works:
		//collection = result.db('tcsdb').collection('students');
	productCollection = client.collection("products");
	userCollection = client.collection("users");
	console.log("\nCollections reached!\n");
});

//sign up
app.post('/sign-up/users', (req, res) => {
	let data = req.body;
	userCollection.insertOne(data).then(result => {
		console.log(result);
		res.send('user added successfully');
	});
})

//find user by email
app.get('/finduser/:email', (req, res) => {
	var email = req.params.email;
	userCollection.findOne({email: email}, function(error, user) {
		if(error) throw error;

		if(user)
		{
			console.log("user found! info:");
			Object.values(user).forEach((prop)=> console.log(prop));
			res.json(user);
		}
		else
		{
			console.log("no users found.")
			res.send({});
		}

	})
})

//admin tools
//add product
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