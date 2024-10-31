const { ObjectId } = require("mongodb");

function CustomerOrders(customerOrder, app) {
  app.post("/customer-orders", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await customerOrder.insertOne(data);
    res.send(result);
  });
  app.get("/customer-orders", async (req, res) => {
    const data = req.body;
    const cursor = await customerOrder.find(data).toArray();
    res.send(cursor);
  });
  app.get("/customer-orders/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await customerOrder
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.send(cursor);
  });

  app.put("/customer-orders/:id", async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    console.log(body)

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    try {
      const result = await customerOrder.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            deliveryArea: body.deliveryArea,
            email: body.email,
            fullAddress: body.fullAddress,
            fullName: body.fullName,
            number: body.number,
            productImages: body.productImages,
            orderStatus: body.orderStatus,
            productName: body.productName,
            productPrice: body.productPrice,
            productQuantity: body.productQuantity,
            productSize: body.productSize,
            status: body.status,
          },
        } // Update only orderStatus
      );

      if (result.matchedCount === 0) {
        return res.status(404).send("Order not found");
      }
      res.send(result);
      console.log('update data successfully !!1')
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // if (!ObjectId.isValid(id)) {
  //   return res.status(400).send("Invalid ID format");
  // }

  // try {
  //   const result = await customerOrder.updateOne(
  //     { _id: new ObjectId(id) }, // Find the booking by ID
  //     { $set: { status: status } } // Update the status
  //   );
  //   if (result.matchedCount === 0) {
  //     return res.status(404).send("Booking not found");
  //   }
  //   res.send(result);
  // } catch (error) {
  //   console.error("Error updating booking:", error);
  //   res.status(500).send("Internal Server Error");
  // }
}

module.exports = CustomerOrders;
