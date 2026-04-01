// services/ollama.ts

const OLLAMA_URL = "http://localhost:11434/api/generate";

// Define the "Personality" here so it's easy to edit
const SYSTEM_PROMPT = `
### INSTRUCTION:
You are a classification engine. You output ONLY the rating and a short reason.
Do NOT use phrases like "A tricky one" or "This is easy".
Do NOT talk to the user.

### CRITERIA:
- GOOD: User asks for concepts, tutorials, commands, or "how-to".
- BAD: User asks to "write for me", "give me code", or "solve this".

### EXAMPLES:
Prompt: "write an essay for me"
Output: RATING: BAD - Requesting direct content generation bypasses the learning process.

Prompt: "what is a react component"
Output: RATING: GOOD - Asking for a conceptual definition encourages understanding.

### TASK:
Evaluate this prompt:`;

export const getPromptEvaluation = async (promptText: string) => {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        // We wrap the user prompt with the system rules EVERY time
        prompt: `${SYSTEM_PROMPT}\nEvaluate this prompt: "${promptText}" [/INST]`,
        stream: false,
        options: {
          temperature: 0.1, // Near zero to prevent "hallucination"
          num_predict: 50,  // Keep it short
          stop: ["[/INST]", "\n"]
        },
      }),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Ollama Error:", error);
    return "Error: Local AI is offline.";
  }
};