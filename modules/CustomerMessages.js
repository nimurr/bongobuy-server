const { ObjectId } = require("mongodb");

function CustomerMessages(customerMessage, app) {
  app.post("/customer-message", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await customerMessage.insertOne(data);
    res.send(result);
  });
  app.get("/customer-message", async (req, res) => {
    const data = req.body;
    const cursor = await customerMessage.find(data).toArray();
    res.send(cursor);
  });
  app.get("/customer-message/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await customerMessage
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.send(cursor);
  });

  app.put("/customer-message/:id", async (req, res) => {
    const { id } = req.params;
    const body = req?.body;

    console.log(body);

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    try {
      const result = await customerMessage.updateOne(
        { _id: new ObjectId(id) },
        { $set: { orderStatus } } // Update only orderStatus
      );

      if (result.matchedCount === 0) {
        return res.status(404).send("Order not found");
      }
      res.send(result);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = CustomerMessages;
