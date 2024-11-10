const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const dotenv = require("dotenv"); 
const AddProductsItem = require("./modules/AddProducts");
const AllReviewsItems = require("./modules/AllReviews");
const UserInformation = require("./modules/UserInformation");
const AllCategories = require("./modules/AllCategories");
const CustomerMessages = require("./modules/CustomerMessages");
const CustomerOrders = require("./modules/CustomerOrders");
const Admins = require("./modules/Admins");
const SiteSettings = require("./modules/SiteSettings");
const SliderImages = require("./modules/SliderImages");
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const helmet = require('helmet');

// console.log(process.env.DB_USER)



// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON request bodies
app.use(helmet())

// const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0oqi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// var uri="mongodb://aniktawhidbd:<db_password>@<hostname>/?ssl=true&replicaSet=atlas-yakmff-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

// MongoClient.connect(uri, function(err, client) {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //=========== Connection DataBase =============
    const database = client.db("eCommerce");
    const addProducts = database.collection("all-products");
    const allReviews = database.collection("all-reviews");
    const UserInfo = database.collection("all-userInfo");
    const allCategories = database.collection("all-categories");
    const customerMessage = database.collection("all-customer-messages");
    const customerOrder = database.collection("all-customer-orders");
    const allAdmins = database.collection("all-admins");
    const allSiteSettings = database.collection("all-allSiteSettings");
    const sliderImages = database.collection("all-SliderImages");

    //============ Modules API ============= 
    AddProductsItem(addProducts , app);
    AllReviewsItems(allReviews , app);
    UserInformation(UserInfo , app);
    AllCategories(allCategories , app);
    CustomerMessages(customerMessage , app);
    CustomerOrders(customerOrder , app);
    Admins(allAdmins , app);
    SiteSettings(allSiteSettings , app);
    SliderImages(sliderImages , app);
    
    
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/check', (req, res)=>{
  res.send('Check Is ready to !!');
})
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
