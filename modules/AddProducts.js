const { ObjectId } = require("mongodb");

function AddProductsItem(addProducts, app) {
  app.post("/addProducts", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await addProducts.insertOne(data);
    res.send(result);
  });

  app.get("/addProducts", async (req, res) => {
    const cursor = await addProducts.find({}).toArray();
    res.send(cursor);
  });

  app.get("/addProducts/:id", async (req, res) => {
    const { id } = req.params;
    const product = await addProducts.findOne({ _id: new ObjectId(id) });
    res.send(product);
  });

  app.put("/addProducts/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    console.log(id, data);
    const result = await addProducts.updateOne(
      { _id: new ObjectId(id) },
      { $set: { 
        name: data.pName,
        category: data.category,
        quantity: data.quantity,
        pCode: data.pCode,
        rPrice: data.rPrice,
        discount: data.discount,
        sizes: data.sizes,
        description: data.description,
        uploadImages: data.uploadImages,
      } }
    );
    res.send(result);
  });

  // Delete product by ID
  app.delete("/addProducts/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await addProducts.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send({ error: "Failed to delete product" });
    }
  });
}

module.exports = AddProductsItem;
