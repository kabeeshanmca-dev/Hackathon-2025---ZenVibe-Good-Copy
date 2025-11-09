import { GoogleGenAI, Type } from "@google/genai";
import type { ModerationResult } from '../types';

// This function safely accesses the environment variable, preventing a crash
// in browser environments where `process` is not defined. This is a common
// issue when deploying to platforms like Vercel.
const getApiKey = (): string | undefined => {
  try {
    // Check if `process` and `process.env` exist before trying to access the API key.
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    return undefined;
  } catch (e) {
    console.error("Could not access process.env.API_KEY. This is normal in some environments.", e);
    return undefined;
  }
};

const API_KEY = getApiKey();
export let ai: GoogleGenAI | null = null;

// Initialize the AI service only if the key is available.
// A try/catch block adds an extra layer of protection against initialization errors.
if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  } catch(e) {
    console.error("Failed to initialize GoogleGenAI, AI features will be disabled.", e);
    ai = null;
  }
} else {
  console.error("CRITICAL: API_KEY environment variable not set. ZenVibe's AI features will be disabled.");
}

const moderationSchema = {
  type: Type.OBJECT,
  properties: {
    isPositive: {
      type: Type.BOOLEAN,
      description: "True if the content is positive, supportive, and safe for a teen audience. False otherwise."
    },
    reason: {
      type: Type.STRING,
      description: "If not positive, provide a brief, gentle, non-judgmental explanation for why the content is not suitable. If positive, provide a short affirmation."
    },
    isSevere: {
        type: Type.BOOLEAN,
        description: "True ONLY if the content explicitly discusses immediate plans, methods, or strong intent for self-harm or harming others. False for general sadness or non-threatening negativity."
    }
  },
  required: ['isPositive', 'reason', 'isSevere']
};

export const moderateContent = async (content: string): Promise<ModerationResult> => {
  if (!ai) {
    return { isPositive: false, reason: "Moderation service is currently unavailable.", isSevere: false };
  }
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the following text: "${content}"`,
        config: {
            systemInstruction: `You are a content moderator for a teen mental health support app called ZenVibe. Your primary goal is to ensure all content is positive, supportive, and safe. The content must not contain bullying, hate speech, self-harm encouragement, explicit negativity, dismissive language, or anything unsafe for teens. Crucially, you must identify content that suggests an immediate risk. If a user explicitly mentions plans, methods, or a strong, immediate intent to harm themselves or someone else, you MUST set isSevere to true. Vague expressions of sadness or frustration are not severe. Your response must conform to the provided JSON schema.`,
            responseMimeType: "application/json",
            responseSchema: moderationSchema,
        },
    });

    const jsonString = response.text.trim();
    const result: ModerationResult = JSON.parse(jsonString);
    return result;

  } catch (error) {
    console.error("Error moderating content:", error);
    return {
      isPositive: false,
      reason: "Could not check your message at this time. Please try again later.",
      isSevere: false,
    };
  }
};

export const generateSupportiveReply = async (postContent: string): Promise<string> => {
    if (!ai) {
      return "Thanks for sharing. It takes courage to open up, and you're not alone in feeling this way.";
    }
    try {
         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `A teen posted this on a peer support app: "${postContent}". Write a short (2-3 sentences), empathetic, and supportive reply. The reply should validate their feelings and offer encouragement. Do not give advice.`,
            config: {
                systemInstruction: `You are a supportive teen on the ZenVibe app. Your tone is like a peer: warm, caring, and positive, but not overly formal or robotic. Use emojis naturally.`,
            },
        });
        
        let replyText = response.text.trim();
        // Clean up response, remove quotes if any
        if (replyText.startsWith('"') && replyText.endsWith('"')) {
            replyText = replyText.substring(1, replyText.length - 1);
        }
        return replyText;
    } catch(error) {
        console.error("Error generating supportive reply:", error);
        return "Thanks for sharing. It takes courage to open up, and you're not alone in feeling this way.";
    }
};

export const getQuizFeedback = async (score: number): Promise<string> => {
    if (!ai) {
      return "Thank you for sharing how you feel. Remember that every step, big or small, is part of your journey.";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `A teen in a mental wellness app just scored ${score.toFixed(1)} out of 10 on their initial stress level quiz. A higher score indicates higher stress. Write a short, encouraging, and non-clinical message (1-2 sentences) for them. The tone should be warm, supportive, and empathetic, like an AI friend named Aura. If the score is high (above 7), be extra gentle and focus on acknowledging their struggle. If it's mid-range (4-7), be encouraging about the journey. If it's low (under 4), be celebratory and positive about their low stress level.`,
            config: {
                systemInstruction: `You are Aura, an AI friend on the ZenVibe app. Your tone is warm, caring, and positive. You do not give advice.`,
            },
        });
        
        let feedbackText = response.text.trim();
        // Clean up response, remove quotes if any
        if (feedbackText.startsWith('"') && feedbackText.endsWith('"')) {
            feedbackText = feedbackText.substring(1, feedbackText.length - 1);
        }
        return feedbackText;
    } catch(error) {
        console.error("Error generating quiz feedback:", error);
        return "Thank you for sharing how you feel. Remember that every step, big or small, is part of your journey.";
    }
};