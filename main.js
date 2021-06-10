
const languageMap = {
    'shadergraph': 'json',
    'meta': 'plaintext',
}

// Highlight code inside a .diff-details element
const highlightCode = function(el) {

    // Get all the code lines
    var lines = el.querySelectorAll('.line-value');

    if (lines.length > 0) {

        // Parse the extention out of the file name
        var extension = el.parentNode.querySelector('.filename').textContent.split('.').pop().trim();
        var language = languageMap[extension] ? languageMap[extension] : extension;

        lines.forEach(el => {

            // Sometimes highlightCode gets run several times for the same block
            // so skip if we've already added highlighting
            if (el.classList.contains('swarm-syntax-processed')) {
                return;
            }
            el.classList.add('swarm-syntax-processed');

            // Strip HTML and escape
            var code = escapeHtml(el.textContent);

            // Wrap the code in the an element to stop highlightJs messing with background styles,
            // and add a language detection hint
            el.innerHTML = '<span class="language-' + language + '">' + code + '</span>';

            // Run highlightJs on the span element
            hljs.highlightElement(el.firstElementChild);
        });
    }    
}


// Observe DOM changes

const targetNode = document.querySelector('.change-files');
const config = { childList: true, subtree: true };
const callback = function(mutationsList, observer) {
    for(const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            if (mutation.target.classList.contains('diff-details')) {
                highlightCode(mutation.target)
            }
        }
    }
};
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);
