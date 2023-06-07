import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectDB();
    const prompts = await Prompt.find({}).populate("creator");
    console.log("Here: ", prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("Error: ", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
