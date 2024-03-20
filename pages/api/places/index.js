import dbConnect from "../../../db/connect";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find().populate("activities reviews");

    return response.status(200).json(places);
  }

  if (request.method === "POST") {
    try {
      const { name, region, description } = request.body;
      const image = "/images/placeholder.jpg";
      const newPlace = new Place({
        name,
        region,
        description,
        image,
      });
      //const savedPlace = await newPlace.save();

      return response.status(201).json(savedPlace);
    } catch (error) {
      return response.status(500).json({ error: "Server error" });
    }
  }
  response.status(405).end(); // Method Not Allowed
}
