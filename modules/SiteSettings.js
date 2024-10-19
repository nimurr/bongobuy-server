const { ObjectId } = require("mongodb");

function SiteSettings (allSiteSettings , app){
  
    app.post("/site-settings", async (req, res) => {
        const data = req.body;
        console.log(data);
        const result = await allSiteSettings.insertOne(data);
        res.send(result);
      });
      app.get('/site-settings' , async (req , res )=>{
        const data = req.body;
        const cursor = await allSiteSettings.find(data).toArray();
        res.send(cursor);
      })
      app.get('/site-settings/:id' , async (req , res )=>{
        const { id } = req.params; 
          const cursor = await allSiteSettings.find({ _id: new ObjectId(id)  }).toArray(); 
          res.send(cursor);
      })

      app.put("/site-settings/:id", async (req, res) => {
        const { id } = req.params;
        const { status } = req.body; // Extract status from request body
      
        if (!ObjectId.isValid(id)) {
          return res.status(400).send("Invalid ID format");
        }
      
        try {
          const result = await allSiteSettings.updateOne(
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

}

module.exports  = SiteSettings;