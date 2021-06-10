
const languageMap = {
    'shadergraph': 'json',
    'meta': 'plaintext',
}

// Highlight code inside a .diff-details element
const highlightCode = function(el) {

    // Get all the code lines
    var lines = el.querySelectorAll('.line-value');

    if (lines.length > 0) {

        // Parse the extension out of the file name
        var extension = el.parentNode.querySelector('.filename').textContent.split('.').pop().trim();

        // Alias extensions to a language
        var language = languageMap[extension] ? languageMap[extension] : extension;

        lines.forEach(el => {

            // Sometimes highlightCode gets run several times for the same block
            // so skip if we've already added highlighting
            if (el.classList.contains('swarm-syntax-processed')) {
                return;
            }
            el.classList.add('swarm-syntax-processed');

            // Add a language hint
            el.classList.add('language-' + language);

            Prism.highlightElement(el);
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
