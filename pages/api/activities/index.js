import dbConnect from "@/db/connect";
import Activity from "@/db/models/Activity";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const activities = await Activity.find();

    return response.status(200).json(activities);
  }

  response.status(405).end(); // Method Not Allowed
}
