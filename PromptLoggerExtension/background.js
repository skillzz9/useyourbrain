// This runs in the background of Chrome
console.log("Service Worker Started!");

// Listen for messages from your Next.js app (External)
chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    // 1. Fetching History (Aligned with Hook)
    if (request.action === "getHistory") {
      chrome.storage.local.get({ promptHistory: [] }, (data) => {
        sendResponse({ history: data.promptHistory });
      });
      return true;
    }

    // 2. Clearing History
    if (request.action === "clearHistory") {
      chrome.storage.local.set({ promptHistory: [] }, () => {
        sendResponse({ success: true });
      });
      return true;
    }

    // 3. Updating Recording Toggle (IMPORTANT: Added this)
    if (request.action === "updateSettings") {
      chrome.storage.local.set({ isRecording: request.isRecording }, () => {
        sendResponse({ success: true });
      });
      return true;
    }
  },
);

// Optional: Listen for internal messages (from your popup)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "ping") {
    sendResponse({ status: "alive" });
  }
});
