function injectScript(file, node) {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
}
injectScript( chrome.extension.getURL('/prism.js'), 'body');
injectScript( chrome.extension.getURL('/escape-html.js'), 'body');
injectScript( chrome.extension.getURL('/main.js'), 'body');
