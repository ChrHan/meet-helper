const body = document.body;
const observer = new MutationObserver(mutations => {
    for (let mutation of mutations) {
        if (mutation.type != 'childList')
            continue;

        for (let node of mutation.addedNodes) {
            if (node.textContent == 'call_end'
                && node.parentElement?.classList.contains('google-material-icons')) {
                console.log('Joined a call');
            }
        }
    }
});

observer.observe(body, {
    childList: true,
    subtree: true
});
