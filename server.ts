import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));

  // Part 2: The Generation API Route
  app.post("/api/generate", async (req, res) => {
    try {
      const { image, style } = req.body;

      if (!image) {
        return res.status(400).json({ error: "Image is required" });
      }

      // Initialize Gemini
      const userApiKey = process.env.API_KEY;
      const envApiKey = process.env.GEMINI_API_KEY;
      
      // Use user key if provided, otherwise system key
      let apiKey = userApiKey || envApiKey;
      
      if (!apiKey || apiKey.includes("YOUR_") || apiKey.includes("MY_")) {
        return res.status(401).json({ 
          error: "No valid Gemini API key found. Please select a key using the 'Upgrade to 4K' button." 
        });
      }

      let ai = new GoogleGenAI({ apiKey });
      
      // Try high-quality model if user provided a key
      let modelName = userApiKey ? 'gemini-3.1-flash-image-preview' : 'gemini-2.5-flash-image';
      
      // Construct the detailed prompt
      const prompt = `Professional macro product photography of this exact jewelry piece on ${style}. 
      Physically accurate ray-traced reflections, sharp diamond facets, dramatic studio lighting, 
      high-end commercial aesthetic, 8k resolution, cinematic composition, luxury jewelry maison style.`;

      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              {
                inlineData: {
                  data: image.split(',')[1] || image,
                  mimeType: "image/png",
                },
              },
              {
                text: prompt,
              },
            ],
          },
          config: {
            ...(modelName === 'gemini-3.1-flash-image-preview' ? {
              imageConfig: {
                aspectRatio: "1:1",
                imageSize: "1K"
              }
            } : {
              imageConfig: {
                aspectRatio: "1:1"
              }
            })
          }
        });

        // Extract the generated image
        let generatedBase64 = null;
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            generatedBase64 = part.inlineData.data;
            break;
          }
        }

        if (!generatedBase64) {
          throw new Error("The model did not return an image. Please try a different prompt or style.");
        }

        return res.json({ image: generatedBase64, modelUsed: modelName });

      } catch (genError: any) {
        console.error("Generation Error:", genError);
        
        // If the 3.1 model failed due to auth/permissions but we have a system key, try falling back to 2.5
        if (userApiKey && (genError.message?.includes("API_KEY_INVALID") || genError.message?.includes("401") || genError.message?.includes("not found"))) {
          console.log("User key failed, attempting fallback to system key with 2.5 model...");
          
          if (envApiKey && envApiKey !== userApiKey) {
            const fallbackAi = new GoogleGenAI({ apiKey: envApiKey });
            const fallbackResponse = await fallbackAi.models.generateContent({
              model: 'gemini-2.5-flash-image',
              contents: {
                parts: [
                  {
                    inlineData: {
                      data: image.split(',')[1] || image,
                      mimeType: "image/png",
                    },
                  },
                  {
                    text: prompt,
                  },
                ],
              },
              config: {
                imageConfig: { aspectRatio: "1:1" }
              }
            });

            let fallbackBase64 = null;
            for (const part of fallbackResponse.candidates[0].content.parts) {
              if (part.inlineData) {
                fallbackBase64 = part.inlineData.data;
                break;
              }
            }

            if (fallbackBase64) {
              return res.json({ 
                image: fallbackBase64, 
                modelUsed: 'gemini-2.5-flash-image',
                warning: "Your custom API key failed. We've generated a standard quality image instead."
              });
            }
          }
        }
        
        // If we can't fall back, throw the original error
        throw genError;
      }
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      const isAuthError = error.message?.includes("API_KEY_INVALID") || error.message?.includes("401") || error.message?.includes("not found");
      res.status(isAuthError ? 401 : 500).json({ 
        error: error.message || "Internal server error",
        isAuthError
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Zentara Server running on http://localhost:${PORT}`);
  });
}

startServer();
