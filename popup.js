const intervalInput = document.getElementById("interval");
const saveButton = document.getElementById("save");
const tipElement = document.getElementById("tip");

const tips = [
  "Stretch your arms and back.",
  "Take a walk for a few minutes.",
  "Look at something 20 feet away for 20 seconds.",
  "Drink a glass of water.",
  "Do some deep breathing exercises."
];

// Load saved interval and show a random tip
chrome.storage.sync.get(["interval"], (data) => {
  if (data.interval) {
    intervalInput.value = data.interval;
  }
  tipElement.textContent = tips[Math.floor(Math.random() * tips.length)];
});

// Save the interval when the button is clicked
saveButton.addEventListener("click", () => {
  const interval = parseInt(intervalInput.value);
  if (interval > 0) {
    chrome.storage.sync.set({ interval });
    alert("Interval saved successfully");
    chrome.runtime.sendMessage({ type: "updateAlarm", interval });
  }
});