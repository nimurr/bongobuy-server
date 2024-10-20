const { ObjectId } = require("mongodb");

function AddProductsItem(addProducts, app) {
  app.post("/addProducts", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await addProducts.insertOne(data);
    res.send(result);
  });
  app.get("/addProducts", async (req, res) => {
    const data = req.body;
    const cursor = await addProducts.find(data).toArray();
    res.send(cursor);
  });
  app.get("/addProducts/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await addProducts.find({ _id: new ObjectId(id) }).toArray();
    res.send(cursor);
  });

  app.put("/addProducts/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Extract status from request body
    console.log(id, data);
    const result = await addProducts.updateOne(
      { _id: new ObjectId(id) }, // Find the booking by ID
      { $set: { 
        name : data.pName,
        category: data.category,
        quantity:data.quantity,
        pCode:data.pCode,
        rPrice:data.rPrice,
        discount:data.discount,
        sizes:data.sizes,
        description:data.description,
        uploadImages:data.uploadImages,
       } }
    );
    res.send(result);
  });
}

module.exports = AddProductsItem;
