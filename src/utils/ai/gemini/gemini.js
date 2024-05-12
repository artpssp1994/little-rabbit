import { GoogleGenerativeAI } from "@google/generative-ai";

const APIKey = "AIzaSyDVfgiKhidV5ub9i5DVtH0M9EFBNDpi7YE"

const genAI = new GoogleGenerativeAI(APIKey);

const geminiGenerate = async (resumeText) => {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = 
  `Please review resume below and give advice to make it more professional in Thai language \n
  --------------------------------
  ` + resumeText;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log("gemini success");
  console.log(text);
  return text
}

export { geminiGenerate }