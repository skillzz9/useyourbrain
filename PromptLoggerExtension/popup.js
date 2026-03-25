document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("history-container");
  const recordToggle = document.getElementById("recordToggle");

  // 1. Load the recording state and the prompt history
  chrome.storage.local.get(
    {
      promptHistory: [],
      isRecording: true,
    },
    (result) => {
      // Set the toggle switch state
      if (recordToggle) {
        recordToggle.checked = result.isRecording;
      }

      // Render the history list
      if (result.promptHistory.length === 0) {
        container.innerHTML = "<p>No prompts recorded yet.</p>";
      } else {
        // Clear container before rendering (prevents duplicates)
        container.innerHTML = "";

        // Reverse to show newest prompts at the top
        [...result.promptHistory].forEach((item) => {
          const div = document.createElement("div");
          div.className = "entry";
          div.innerHTML = `
          <div class="meta">
            <span class="site-tag">${item.site}</span> | ${item.time}
          </div>
          <div class="prompt-text">${item.prompt}</div>
        `;
          container.appendChild(div);
        });
      }
    },
  );

  // 2. Listen for toggle changes to update settings
  if (recordToggle) {
    recordToggle.addEventListener("change", () => {
      const newState = recordToggle.checked;
      chrome.storage.local.set({ isRecording: newState }, () => {
        console.log(`Recording turned ${newState ? "ON" : "OFF"}`);
      });
    });
  }
});
