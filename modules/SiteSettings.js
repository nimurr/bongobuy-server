const { ObjectId } = require("mongodb");

function SiteSettings(allSiteSettings, app) {
  app.post("/site-settings", async (req, res) => {
    const data = req.body;
    console.log(data);
    const result = await allSiteSettings.insertOne(data);
    res.send(result);
  });
  app.get("/site-settings", async (req, res) => {
    const data = req.body;
    const cursor = await allSiteSettings.find(data).toArray();
    res.send(cursor);
  });
  app.get("/site-settings/:id", async (req, res) => {
    const { id } = req.params;
    const cursor = await allSiteSettings
      .find({ _id: new ObjectId(id) })
      .toArray();
    res.send(cursor);
  });

  app.put("/site-settings/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body; // Extract status from request body

    const result = await allSiteSettings.updateOne(
      { _id: new ObjectId(id) }, // Find the booking by ID
      {
        $set: {
          email: data.email,
          phone: data.phone,
          fullAddress: data.fullAddress,
          wpNumber: data.wpNumber,
          fbLink: data.fbLink,
          appLink: data.appLink,
          instaLink: data.instaLink,
          // color: data.color,
          linkedinLink: data.linkedinLink,
        },
      } // Update the status
    );
    res.send(result);
  });
}

module.exports = SiteSettings;
