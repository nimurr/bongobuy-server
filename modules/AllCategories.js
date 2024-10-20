const { ObjectId } = require("mongodb");

function AllCategories (allCategories , app){
  
    app.post("/all-categories", async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await allCategories.insertOne(data);
        res.send(result);
      });
      app.get('/all-categories' , async (req , res )=>{
        const data = req.body;
        const cursor = await allCategories.find(data).toArray();
        res.send(cursor);
      })
      app.get('/all-categories/:id' , async (req , res )=>{
        const { id } = req.params; 
          const cursor = await allCategories.find({ _id: new ObjectId(id)  }).toArray(); 
          res.send(cursor);
      })

      app.put("/all-categories/:id", async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // Extract status from request body
      
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
      
        try {
          const result = await allCategories.updateOne(
            { _id: new ObjectId(id) }, // Find the booking by ID
            { $set: { status: status } } // Update the status
          );
          if (result.matchedCount === 0) {
            return res.status(404).send("Booking not found");
          }
          res.send(result);
        } catch (error) {
          console.error("Error updating booking:", error);
          res.status(500).send("Internal Server Error");
        }
      });

      app.delete("/all-categories/:id", async (req, res) => {
        const { id } = req.params;
    
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
    
        try {
          const result = await allCategories.deleteOne({ _id: new ObjectId(id) });
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

module.exports  = AllCategories;