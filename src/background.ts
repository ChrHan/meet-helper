chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'getTabId') {
        const tabId = sender.tab?.id;
        sendResponse({ tabId });
    } else if (request.type === 'remindToScreenshot') {
        chrome.notifications.create({
            iconUrl: 'https://fonts.gstatic.com/s/i/productlogos/meet_2020q4/v1/web-512dp/logo_meet_2020q4_color_1x_web_512dp.png',
            title: "You've joined a call.",
            message: "Don't forget to take a screenshot.",
            type: 'basic',
            priority: 2,
            requireInteraction: true
        });
    }
})
