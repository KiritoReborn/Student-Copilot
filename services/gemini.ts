import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Models
const PRO_MODEL = 'gemini-3-pro-preview';
const LITE_MODEL = 'gemini-flash-lite-latest';
const STANDARD_MODEL = 'gemini-3-flash-preview';

export const checkContentSafety = async (text: string): Promise<{ safe: boolean; reason?: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: STANDARD_MODEL,
      contents: `You are a content moderator for a student university forum. 
      Analyze the following text. Determine if it contains hate speech, bullying, severe profanity, self-harm, or threats. 
      Critique strictly but allow normal venting or academic frustration.
      
      Text: "${text}"
      
      Respond with valid JSON only: { "safe": boolean, "reason": "short explanation if unsafe" }`,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const jsonText = response.text;
    if (jsonText) {
      return JSON.parse(jsonText);
    }
    return { safe: true };
  } catch (error) {
    console.error("AI Safety Check Error:", error);
    return { safe: true };
  }
};

export const getWellnessSupport = async (mood: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: STANDARD_MODEL,
      contents: `The student user reported feeling "${mood}". 
      Provide a 2-sentence supportive, empathetic, and non-medical response. 
      Suggest a tiny actionable step (like "drink water" or "take a deep breath").`,
    });
    return response.text || "I'm here for you. Take a deep breath and keep going.";
  } catch (error) {
    console.error("AI Wellness Check Error:", error);
    return "Remember to take care of yourself. You've got this.";
  }
};

export const getCareerAdvice = async (skill: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: STANDARD_MODEL,
      contents: `Give a 1-sentence tip for a student learning "${skill}" to improve their career prospects.`,
    });
    return response.text || "Focus on building a portfolio project using this skill.";
  } catch (error) {
    console.error("AI Career Advice Error:", error);
    return "Practice consistent problem solving to master this.";
  }
};

// Chatbot Feature
export interface AiChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const getAiChatResponse = async (history: AiChatMessage[], message: string, usePro: boolean): Promise<string> => {
  try {
    const model = usePro ? PRO_MODEL : LITE_MODEL;
    
    // Convert history to API format
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: "You are the 'Student Life Co-Pilot', a helpful, professional, and empathetic university assistant. You help students with academics, career advice, mental health (supportive only, not medical), and daily student life. Keep responses concise and practical."
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};

export const getQuickInsight = async (): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: LITE_MODEL,
      contents: "Give me a single short, motivating, and unique productivity tip for a university student. Max 20 words.",
    });
    return response.text || "Small steps every day lead to big success.";
  } catch (error) {
    console.error("Quick Insight Error:", error);
    return "Stay consistent and believe in yourself!";
  }
};

// --- NEW WELLNESS FEATURES ---

export const analyzeHolisticWellbeing = async (data: any): Promise<{ status: string; advice: string; color: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: `Analyze this student's holistic data:
      Academics: Attendance ${data.academic.avgAttendance}%, Lowest Grade ${data.academic.lowestGrade}%
      Sleep (Avg): ${data.wellness.avgSleep} hours
      Mood (Avg 1-5): ${data.wellness.avgMood}
      
      Determine their wellbeing status (Thriving, Coping, At Risk, Burned Out).
      Provide 1 short sentence of personalized advice connecting the data points (e.g., "Your grades are high, but your sleep is low...").
      
      Respond with JSON: { "status": "string", "advice": "string", "color": "green|yellow|orange|red" }`,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    const json = JSON.parse(response.text || '{}');
    return json;
  } catch (error) {
    return { status: "Stable", advice: "Keep maintaining a balanced schedule.", color: "green" };
  }
};

export const getJournalingResponse = async (entry: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: `You are an empathetic, non-judgmental AI journaling companion for a student.
      The student wrote: "${entry}"
      
      Respond in a way that validates their feelings, asks a gentle reflective question, or offers a grounding technique. 
      Do NOT diagnose. Keep it under 50 words.`,
    });
    return response.text || "I hear you. Writing this down is a great step. How can you be kind to yourself today?";
  } catch (error) {
    return "Thank you for sharing. Taking time to reflect is important.";
  }
};
