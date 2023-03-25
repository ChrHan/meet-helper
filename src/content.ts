async function getCurrentTabId(): Promise<number> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ type: 'getTabId' }, (response) => {
            resolve(response.tabId);
        });
    });
}

async function remindToScreenshot() {
    await chrome.runtime.sendMessage({ type: 'takeScreenshot' })
}

const body = document.body;
const observer = new MutationObserver(async mutations => {
    for (let mutation of mutations) {
        if (mutation.type != 'childList')
            continue;

        for (let node of mutation.addedNodes) {
            if (node.textContent == 'call_end'
                && node.parentElement?.classList.contains('google-material-icons')) {
                setTimeout(remindToScreenshot, 5 * 1000);
                setTimeout(remindToScreenshot, 5 * 60 * 1000);
            }
        }
    }
});

observer.observe(body, {
    childList: true,
    subtree: true
});

(async () => {
    const currentTabId = await getCurrentTabId();
    console.log(`Current tab ID: ${currentTabId}`);
})();
