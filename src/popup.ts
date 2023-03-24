async function captureTab() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const screenshotUrl = await new Promise<string>((resolve) => {
      chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' }, (screenshotUrl) => {
        resolve(screenshotUrl);
      });
    });
    return screenshotUrl;
  }
  
  async function handleCaptureTab() {
    const screenshotUrl = await captureTab();
    chrome.tabs.create({ url: screenshotUrl });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const captureButton = document.getElementById('captureButton') as HTMLButtonElement;
    captureButton.addEventListener('click', handleCaptureTab);
  });
  