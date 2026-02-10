import { GoogleGenAI } from "@google/genai";

// Initialize AI with potential environment variable
// If no key is present, the mock fallbacks in the catch blocks will handle the logic.
const apiKey = process.env.GEMINI_API_KEY || 'dummy-key';
const ai = new GoogleGenAI({ apiKey });

// Models
const PRO_MODEL = 'gemini-1.5-pro-latest';
const LITE_MODEL = 'gemini-1.5-flash-latest';

// Helper to check if AI is available
// We'll simulate availability if the key is long enough, otherwise fall back.
const isAiAvailable = apiKey.length > 10 && apiKey !== 'dummy-key';

// --- UTILS ---

const safeJSONParse = (text: string, fallback: any) => {
  try {
    // Remove markdown code blocks if present
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanText);
  } catch (e) {
    console.warn("JSON Parse Failed, using fallback:", e);
    return fallback;
  }
};

// --- CORE FUNCTIONS ---

export const checkContentSafety = async (text: string): Promise<{ safe: boolean; reason?: string }> => {
  if (!isAiAvailable()) return { safe: true };
  try {
    // In a real app, we'd use the moderation API.
    return { safe: true };
  } catch (error) {
    return { safe: true };
  }
};

export const getWellnessSupport = async (mood: string): Promise<string> => {
  if (!isAiAvailable()) {
    const responses: Record<string, string> = {
      'Sad': "I'm sorry you're feeling down. Maybe take a short walk or listen to your favorite song?",
      'Stressed': "It sounds like a lot is on your plate. Remember to take deep breaths. You've got this.",
      'Happy': "That's wonderful! Hold onto this feeling. What made your day special?",
      'Anxious': "Anxiety can be tough. Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you feel..."
    };
    return responses[mood] || "I'm here for you. Take a deep breath and keep going.";
  }

  try {
    const response = await ai.models.generateContent({
      model: LITE_MODEL,
      contents: `The student user reported feeling "${mood}". 
      Provide a 2-sentence supportive, empathetic, and non-medical response. 
      Suggest a tiny actionable step.`,
    });
    return response.text || "Remember to take care of yourself.";
  } catch (error) {
    return "Remember to take care of yourself. You've got this.";
  }
};

export const getCareerAdvice = async (skill: string): Promise<string> => {
  if (!isAiAvailable()) return `Build a small project using ${skill} to showcase your ability.`;

  try {
    const response = await ai.models.generateContent({
      model: LITE_MODEL,
      contents: `Give a 1-sentence tip for a student learning "${skill}" to improve their career prospects.`,
    });
    return response.text || `Build a small project using ${skill} to showcase your ability.`;
  } catch (error) {
    return "Practice consistent problem solving to master this.";
  }
};

export const getQuickInsight = async (): Promise<string> => {
  if (!isAiAvailable()) {
     const tips = [
         "Review your lecture notes within 24 hours to boost retention.",
         "Take a 5-minute break every hour to stay fresh.",
         "Hydration improves cognitive function by 15%. Drink water!",
         "Sleep is when your brain consolidates memory. Aim for 7+ hours."
     ];
     return tips[Math.floor(Math.random() * tips.length)];
  }

  try {
    const response = await ai.models.generateContent({
      model: LITE_MODEL,
      contents: "Give me a single short, motivating, and unique productivity tip for a university student. Max 20 words.",
    });
    return response.text || "Stay consistent and believe in yourself!";
  } catch (error) {
    return "Stay consistent and believe in yourself!";
  }
};

// --- ADVANCED ANALYSIS (FACULTY & STUDENT) ---

export const analyzeDropoutRisk = async (studentData: any): Promise<{ riskLevel: 'Low'|'Medium'|'High', reason: string, intervention: string }> => {
    // Fallback for demo
    if (!isAiAvailable()) {
        const gpa = Number(studentData.gpa);
        const attendance = Number(studentData.attendance || 100);

        if (gpa < 2.5) return {
            riskLevel: 'High',
            reason: "GPA has dropped below 2.5 and attendance is irregular.",
            intervention: "Schedule an academic counseling session immediately."
        };
        if (attendance < 80) return {
            riskLevel: 'Medium',
            reason: "Attendance has fallen below 80% in major courses.",
            intervention: "Send a check-in email to understand potential barriers."
        };
        return {
            riskLevel: 'Low',
            reason: "Student is performing well across all metrics.",
            intervention: "Encourage to join the honors program."
        };
    }

    try {
        const response = await ai.models.generateContent({
            model: PRO_MODEL,
            contents: `Analyze this student data for dropout risk:
            GPA: ${studentData.gpa}
            Attendance: ${studentData.attendance}%
            Missed Assignments: ${studentData.missedAssignments}

            Return strictly JSON: { "riskLevel": "Low"|"Medium"|"High", "reason": "string", "intervention": "string" }`,
            config: { responseMimeType: 'application/json' }
        });

        return safeJSONParse(response.text || '{}', { riskLevel: 'Low', reason: "Analysis failed", intervention: "None" });
    } catch (e) {
        return { riskLevel: 'Low', reason: "AI Service Unavailable", intervention: "Manual review required" };
    }
};

export const getCareerRoadmap = async (major: string, interest: string): Promise<any[]> => {
    // Fallback
    if (!isAiAvailable()) {
        return [
            { id: '1', title: `Master Fundamentals of ${major}`, status: 'completed' },
            { id: '2', title: `Build a "${interest}" Project`, status: 'in_progress' },
            { id: '3', title: 'Contribute to Open Source', status: 'todo' },
            { id: '4', title: 'Apply for Internships', status: 'todo' }
        ];
    }

    try {
        const response = await ai.models.generateContent({
            model: PRO_MODEL,
            contents: `Create a 4-step career roadmap for a ${major} student interested in ${interest}.
            Return strictly JSON array: [{ "id": "string", "title": "string", "status": "todo" }]`,
            config: { responseMimeType: 'application/json' }
        });

        return safeJSONParse(response.text || '[]', []);
    } catch (e) {
        return [];
    }
};

// --- WELLNESS MODULE SPECIFIC ---

export const analyzeHolisticWellbeing = async (data: any): Promise<{ status: string; advice: string; color: string }> => {
  if (!isAiAvailable()) {
    // Determine status based on simple heuristics from the mock data
    const mood = data.wellness.avgMood;
    const sleep = data.wellness.avgSleep;

    if (mood < 2.5 || sleep < 5) {
      return { status: "At Risk", advice: "Your recent sleep and mood logs indicate high stress. Consider a counseling session.", color: "orange" };
    } else if (mood < 3.5) {
      return { status: "Coping", advice: "You're doing okay, but try to prioritize sleep this week.", color: "yellow" };
    }
    return { status: "Thriving", advice: "Great balance! Keep maintaining your current routine.", color: "green" };
  }

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: `Analyze this student's holistic data:
      Academics: Attendance ${data.academic.avgAttendance}%, Lowest Grade ${data.academic.lowestGrade}%
      Sleep (Avg): ${data.wellness.avgSleep} hours
      Mood (Avg 1-5): ${data.wellness.avgMood}
      
      Determine their wellbeing status (Thriving, Coping, At Risk, Burned Out).
      Provide 1 short sentence of personalized advice connecting the data points.
      
      Respond with strictly JSON: { "status": "string", "advice": "string", "color": "green|yellow|orange|red" }`,
      config: {
        responseMimeType: 'application/json'
      }
    });
    
    return safeJSONParse(response.text || '{}', { status: "Stable", advice: "Keep maintaining a balanced schedule.", color: "green" });
  } catch (error) {
    return { status: "Stable", advice: "Keep maintaining a balanced schedule.", color: "green" };
  }
};

export const getJournalingResponse = async (entry: string): Promise<string> => {
  if (!isAiAvailable()) return "Thank you for sharing. Writing is a powerful tool for clarity. How did that make you feel?";

  try {
    const response = await ai.models.generateContent({
      model: PRO_MODEL,
      contents: `You are an empathetic, non-judgmental AI journaling companion for a student.
      The student wrote: "${entry}"
      
      Respond in a way that validates their feelings, asks a gentle reflective question, or offers a grounding technique. 
      Do NOT diagnose. Keep it under 50 words.`,
    });
    return response.text || "I hear you. Writing this down is a great step.";
  } catch (error) {
    return "Thank you for sharing. Taking time to reflect is important.";
  }
};
