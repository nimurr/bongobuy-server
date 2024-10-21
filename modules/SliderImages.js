const { ObjectId } = require("mongodb");

function SliderImages(sliderImages, app) {
  app.post("/slider-images", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await sliderImages.insertOne(data);
    res.send(result);
  });
  app.get("/slider-images", async (req, res) => {
    const data = req.body;
    const cursor = await sliderImages.find(data).toArray();
    res.send(cursor);
  });
  app.get("/slider-images/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await sliderImages
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.send(cursor);
  });

  app.put("/slider-images/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Extract status from request body
 
    const result = await sliderImages.updateOne(
      { _id: new ObjectId(id) }, // Find the booking by ID
      {
        $set: {
            images : data.images
        },
      } // Update the status
    );
    res.send(result);
  });
}

module.exports = SliderImages;
