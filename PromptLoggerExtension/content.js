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
      lastTypedPrompt = input.innerText || input.value;
    }
  },
  true,
);

// 2. Captures the prompt and saves to Chrome Storage
function logPrompt() {
  if (lastTypedPrompt && lastTypedPrompt.trim() !== previousLoggedPrompt) {
    console.log("Saving to storage now...");

    const promptData = {
      site: window.location.hostname.includes("gemini") ? "Gemini" : "ChatGPT",
      time: new Date().toLocaleString(),
      prompt: lastTypedPrompt.trim(),
    };

    chrome.storage.local.get({ promptHistory: [] }, (result) => {
      if (chrome.runtime.lastError) {
        console.error("Storage Get Error:", chrome.runtime.lastError);
        return;
      }

      let history = result.promptHistory;
      history.unshift(promptData);

      chrome.storage.local.set({ promptHistory: history.slice(0, 100) }, () => {
        if (chrome.runtime.lastError) {
          console.error("Storage Set Error:", chrome.runtime.lastError);
        } else {
          console.log("SUCCESS: Data is now in Chrome storage.");
        }
      });
    });

    previousLoggedPrompt = lastTypedPrompt.trim();
    lastTypedPrompt = "";
  }
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

// 4. Listener for Send Buttons (with 50ms safety delay)
document.addEventListener(
  "click",
  (event) => {
    // Combined selectors for Gemini and ChatGPT buttons
    const sendButton = event.target.closest(
      'button.send-button, button[aria-label="Send message"], button[data-testid="send-button"]',
    );

    if (sendButton) {
      // Small delay ensures we capture the input before the site clears the textarea
      setTimeout(logPrompt, 50);
    }
  },
  true,
);
