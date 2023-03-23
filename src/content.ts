async function remindToScreenshot() {
    await chrome.runtime.sendMessage({ event: 'joined_call' })
}

const body = document.body;
const observer = new MutationObserver(async mutations => {
    for (let mutation of mutations) {
        if (mutation.type != 'childList')
            continue;

        for (let node of mutation.addedNodes) {
            if (node.textContent == 'call_end'
                && node.parentElement?.classList.contains('google-material-icons')) {
                remindToScreenshot();

                setTimeout(remindToScreenshot, 5 * 60 * 1000);
            }
        }
    }
});

observer.observe(body, {
    childList: true,
    subtree: true
});
