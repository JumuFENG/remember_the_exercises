function sendResizeMessage() {
    window.parent.postMessage({message: 'resize'}, '*');
}

function toggle_description() {
    var desc = document.getElementById('brinza-task-description');
    desc.style.display = desc.style.display == 'none' ? 'block' : 'none';
    sendResizeMessage();
}

var windowWidth = null;

window.onload = function(e) {
    sendResizeMessage();
    windowWidth = window.innerWidth;
}

window.onresize = function(e) {
    if (window.innerWidth != windowWidth) {
        sendResizeMessage();
        windowWidth = window.innerWidth;
    };
}
