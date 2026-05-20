import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];


const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_PUBLIC_KEY);

const modelCandidates = [
    import.meta.env.VITE_GEMINI_MODEL,
    "gemini-2.0-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-flash",
].filter((modelName, index, arr) => modelName && arr.indexOf(modelName) === index);

const defaultModelName = modelCandidates[0] || "gemini-2.0-flash";

const createModel = (modelName) => genAI.getGenerativeModel({ model: modelName, safetySettings });

const isModelUnavailableError = (error) => {
    const message = error?.message || "";
    return message.includes("[404") || message.includes("is not found for API version") || message.includes("is not supported for generateContent");
};

export const sendMessageStreamWithFallback = async (prompt) => {
    let lastModelError = null;

    for (const modelName of modelCandidates) {
        try {
            const chat = createModel(modelName).startChat();
            const result = await chat.sendMessageStream(prompt);
            return { result, modelName };
        } catch (error) {
            if (!isModelUnavailableError(error)) {
                throw error;
            }
            lastModelError = error;
        }
    }

    throw lastModelError || new Error("No available Gemini model could be used for streaming.");
};

const model = createModel(defaultModelName);

export default model