function notifyUserToTakeScreenshot() {
    chrome.notifications.create({
        iconUrl: 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-512dp/logo_meet_2020q4_color_1x_web_512dp.png',
        title: "You've joined a call.",
        message: "Don't forget to take a screenshot.",
        type: 'basic',
        priority: 2,
        requireInteraction: true
    });
}

async function takeScreenshot(tabId: number) {
    try {
        const tab = await chrome.tabs.get(tabId);
        await chrome.tabs.update(tabId, { active: true });
        const dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, { format: 'png' });

        chrome.tabs.create({ url: dataUrl });
    } catch (error) {
        console.error(error);
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tabId = sender.tab?.id;

    if (request.type === 'getTabId') {
        sendResponse({ tabId });
    } else if (request.type === 'remindToScreenshot') {
        notifyUserToTakeScreenshot();
    } else if (request.type === 'takeScreenshot') {
        if (tabId !== undefined) {
            takeScreenshot(tabId);
        }
    }
})
