var express = require('express');
var bp = require('body-parser');
var app = express();
app.use(bp.json());
app.use(bp.urlencoded({extended:true}));
var http = require('http').Server(app);

const PORT = 3000;

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

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


//guest tools
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
	//delete product
app.delete('/admin/products/:id', (req, res) => {
	const id = req.params.id;
	productCollection.deleteOne({_id: ObjectId(id)});
	res.send('product deleted successfully');
})
	//update product
app.put('/admin/products/:id/:attr/:val',(req,res)=>{
    var data = req.body;
    var id = req.params.id;
    var attr = req.params.attr;
    var val = req.params.val;
   
    try {data[attr] = eval(val)} catch {data[attr] = String(val)};

    productCollection.updateOne({_id: ObjectId(id)},{$set:data})
    res.send('product is updated')
})
	//add user
app.post('/admin/users', (req, res) => {
	let data = req.body;
	userCollection.insertOne(data).then(result => {
		console.log(result);
		res.send('user added successfully');
	});
})
	//delete user
app.delete('/admin/users/:email', (req, res) => {
	const email = req.params.email;
	userCollection.deleteOne({email: email});
	res.send('user deleted successfully');
})
	//update user
app.put('/admin/users/:email/:attr/:val',(req,res)=>{
    var data = req.body;
    var email = req.params.email;
    var attr = req.params.attr;
    var val = req.params.val;
   
    try {data[attr] = eval(val)} catch {data[attr] = String(val)};

    userCollection.updateOne({email: email},{$set:data})
    res.send('user is updated')
})

//user tools
	//get products
app.get('/user/products', (req, res) => {
	productCollection.find().toArray().then(result => {
		console.log('displaying products');
		res.send(result);
	})
})
	//get product
app.get('/user/products/:name/:brand', (req, res) => {

	const name = req.params.name;
	const brand = req.params.brand;

	productCollection.findOne({name: name, brand: brand}, function(error, product) {
		if(error) throw error;

		if(product)
		{
			console.log("product found! info:");
			Object.values(product).forEach((prop)=> console.log(prop));
			res.json(product);
		}
		else
		{
			console.log("no products found.")
			res.send({});
		}
	})
})



app.listen(PORT, () => {
	console.log('server is ready');
})