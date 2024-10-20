const { ObjectId } = require("mongodb");

function Admins(allAdmins, app) {
  
  // Add admin
  app.post("/all-admins", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await allAdmins.insertOne(data);
    res.send(result);
  });

  // Get all admins
  app.get("/all-admins", async (req, res) => {
    const data = req.body;
    const cursor = await allAdmins.find(data).toArray();
    res.send(cursor);
  });

  // Get single admin by id
  app.get("/all-admins/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await allAdmins.find({ _id: new ObjectId(id) }).toArray();
    res.send(cursor);
  });

  // Update admin status
  app.put("/all-admins/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // Extract status from request body

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    try {
      const result = await allAdmins.updateOne(
        { _id: new ObjectId(id) }, // Find the admin by ID
        { $set: { status: status } } // Update the status
      );
      if (result.matchedCount === 0) {
        return res.status(404).send("Admin not found");
      }
      res.send(result);
    } catch (error) {
      console.error("Error updating admin:", error);
      res.status(500).send("Internal Server Error");
    }
  });

  // Delete admin by id
  app.delete("/all-admins/:id", async (req, res) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    try {
      const result = await allAdmins.deleteOne({ _id: new ObjectId(id) });
      if (result.deletedCount === 0) {
        return res.status(404).send("Admin not found");
      }
      res.send({ message: "Admin deleted successfully", result });
    } catch (error) {
      console.error("Error deleting admin:", error);
      res.status(500).send("Internal Server Error");
    }
  });
}

module.exports = Admins;
