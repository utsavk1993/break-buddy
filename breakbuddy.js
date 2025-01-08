// Initialize alarm with the default or saved interval
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["interval"], (data) => {
    const interval = data.interval || 15;
    chrome.alarms.create("breakReminder", { periodInMinutes: interval });
  });
});

// Update alarm when the user saves a new interval
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "updateAlarm" && message.interval) {
    chrome.alarms.clear("breakReminder", () => {
      chrome.alarms.create("breakReminder", { periodInMinutes: message.interval });
    });
  }
});

// Show notification on alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "breakReminder") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Take a Break!",
      message: "It's time to step away from the screen and take a short break.",
      priority: 2,
    });
  }
});
