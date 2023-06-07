import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

//GET
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("error in fetching promp: ", error);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
//PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  console.log("Editing post", request);
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("error in update prompt: ", error);
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//DELETE

export const DELETE = async (request, { params }) => {
  try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log("error in deleting prompt: ", error);
    return new Response("Failed to deleting prompt", { status: 500 });
  }
};
