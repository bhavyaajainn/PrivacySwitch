chrome.webNavigation.onCommitted.addListener((details) => {
    if (details.frameId === 0) {
      chrome.storage.sync.get(["privacyMode", "privacyStartTime"], (data) => {
        if (data.privacyMode && data.privacyStartTime) {
          setTimeout(() => {
            chrome.history.search(
              {
                text: '', 
                maxResults: 10,
                startTime: data.privacyStartTime
              },
              (results) => {
                const match = results.find(item => item.url === details.url);
                if (match) {
                  chrome.history.deleteUrl({ url: match.url }, () => {
                  });
                }
              }
            );
          }, 1000); 
        }
      });
    }
  });
  