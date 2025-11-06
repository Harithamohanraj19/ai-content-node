import {GoogleGenAI} from '@google/genai';
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);


export const generateContent = async ( req, res) => {
    const {topic, mode} = req.body;

    if(!topic){
        return res.status(200).json({error:"Topic is required"});
    }

    try {

      let prompt;

      if (mode === "summarize") {
        prompt = `Summarize the following text briefly:\n\n${topic}`;
      } else if (mode === "rewrite") {
        prompt = `Rewrite the following text with better readability:\n\n${topic}`;
      } else {
        prompt = `Write a short article about: ${topic}`;
      }

      const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
      });
      console.log(response.text);
    
      const output = response.text;
      res.json({ content: output });

    }
    catch (error) {
      console.error("API error:", error);
      res.status(500).json({ error: "AI generation failed." });
    }
};