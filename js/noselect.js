(function () {
    var style = document.createElement('style');
    style.textContent =
        'html, body, body * {' +
        '  -webkit-user-select: none;' +
        '  -moz-user-select: none;' +
        '  user-select: none;' +
        '  -webkit-touch-callout: none;' +
        '}' +
        'input, textarea, [contenteditable="true"] {' +
        '  -webkit-user-select: text;' +
        '  -moz-user-select: text;' +
        '  user-select: text;' +
        '}';
    document.head.appendChild(style);

    function isEditable(el) {
        return el && el.closest && el.closest('input, textarea, [contenteditable="true"]');
    }

    document.addEventListener('selectstart', function (e) {
        if (!isEditable(e.target)) e.preventDefault();
    });
})();