let lastTypedPrompt = "";
let previousLoggedPrompt = "";

// 1. Live Tracker: Updates the variable whenever you type
document.addEventListener(
  "input",
  (event) => {
    const input =
      document.querySelector(".ql-editor.textarea") || // Gemini
      document.querySelector("#prompt-textarea"); // ChatGPT

    if (input) {
      lastTypedPrompt = (input.innerText || input.value).trim();
    }
  },
  true,
);

// 2. Captures the prompt and saves to Chrome Storage
function logPrompt() {
  // NEW: First, check if recording is actually enabled
  chrome.storage.local.get(
    { isRecording: true, promptHistory: [] },
    (result) => {
      // IF TOGGLE IS OFF, STOP HERE
      if (result.isRecording === false) {
        console.log("Recording is OFF. Skipping log.");
        return;
      }

      if (lastTypedPrompt && lastTypedPrompt !== previousLoggedPrompt) {
        console.log("Saving to storage now...");

        const promptData = {
          site: window.location.hostname.includes("gemini")
            ? "Gemini"
            : "ChatGPT",
          time: new Date().toLocaleString(),
          prompt: lastTypedPrompt,
        };

        let history = result.promptHistory;
        history.unshift(promptData);

        // Keep only last 100 entries
        chrome.storage.local.set(
          { promptHistory: history.slice(0, 100) },
          () => {
            if (chrome.runtime.lastError) {
              console.error("Storage Set Error:", chrome.runtime.lastError);
            } else {
              console.log("SUCCESS: Data is now in Chrome storage.");
            }
          },
        );

        previousLoggedPrompt = lastTypedPrompt;
        lastTypedPrompt = "";
      }
    },
  );
}

// 3. Listener for "Enter" key
document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      setTimeout(logPrompt, 50);
    }
  },
  true,
);

// 4. Listener for Send Buttons
document.addEventListener(
  "click",
  (event) => {
    const sendButton = event.target.closest(
      'button.send-button, button[aria-label="Send message"], button[data-testid="send-button"]',
    );

    if (sendButton) {
      setTimeout(logPrompt, 50);
    }
  },
  true,
);
