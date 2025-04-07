const switchComp = document.getElementById("switch");

chrome.storage.sync.get(["privacyMode", "privacyStartTime"], (data) => {
  if (data.privacyMode) {
    switchComp.classList.add("on");
    document.getElementById("label").textContent = "ON";
  }
});

switchComp.addEventListener("click", () => {
  const label = document.getElementById("label");
  switchComp.classList.toggle("on");
  const isOn = switchComp.classList.contains("on");
  label.textContent = isOn ? "ON" : "OFF";

  const update = { privacyMode: isOn };
  if (isOn) {
    update.privacyStartTime = Date.now(); 
  } else {
    update.privacyStartTime = null;
  }

  chrome.storage.sync.set(update);
});
