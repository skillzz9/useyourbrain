document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("history-container");

  chrome.storage.local.get({ promptHistory: [] }, (result) => {
    if (result.promptHistory.length === 0) {
      container.innerHTML = "<p>No prompts recorded yet.</p>";
      return;
    }

    result.promptHistory.forEach((item) => {
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
  });
});
