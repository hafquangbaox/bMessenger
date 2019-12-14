(function() {
    // ——————————————————————————————————————————————————
    // TextScramble
    // ——————————————————————————————————————————————————
    "use strict";

    var TextScramble =
        /*#__PURE__*/
        function() {
            function TextScramble(el) {
                this.el = el;
                this.chars = '!<>-_\\/[]{}—=+*^?#________';
                this.update = this.update.bind(this);
            }

            var _proto = TextScramble.prototype;

            _proto.setText = function setText(newText) {
                var _this = this;

                if (!!this.el === false) return;
                var oldText = this.el.innerText;
                var length = Math.max(oldText.length, newText.length);
                var promise = new Promise(function(resolve) {
                    return _this.resolve = resolve;
                });
                this.queue = [];

                for (var i = 0; i < length; i++) {
                    var from = oldText[i] || '';
                    var to = newText[i] || '';
                    var start = Math.floor(Math.random() * 40);
                    var end = start + Math.floor(Math.random() * 40);
                    this.queue.push({
                        from: from,
                        to: to,
                        start: start,
                        end: end
                    });
                }

                cancelAnimationFrame(this.frameRequest);
                this.frame = 0;
                this.update();
                return promise;
            };

            _proto.update = function update() {
                var output = '';
                var complete = 0;

                for (var i = 0, n = this.queue.length; i < n; i++) {
                    var _this$queue$i = this.queue[i],
                        from = _this$queue$i.from,
                        to = _this$queue$i.to,
                        start = _this$queue$i.start,
                        end = _this$queue$i.end,
                        char = _this$queue$i.char;

                    if (this.frame >= end) {
                        complete++;
                        output += to;
                    } else if (this.frame >= start) {
                        if (!char || Math.random() < 0.28) {
                            char = this.randomChar();
                            this.queue[i].char = char;
                        }

                        output += "<span class=\"dud\">" + char + "</span>";
                    } else {
                        output += from;
                    }
                }

                this.el.innerHTML = output;

                if (complete === this.queue.length) {
                    this.resolve();
                } else {
                    this.frameRequest = requestAnimationFrame(this.update);
                    this.frame++;
                }
            };

            _proto.randomChar = function randomChar() {
                return this.chars[Math.floor(Math.random() * this.chars.length)];
            };

            return TextScramble;
        }();

    // ——————————————————————————————————————————————————
    // Example
    // ——————————————————————————————————————————————————

    var phrases = [
        'Hi ^_^',
        'Now you can see me',
        'you\'re going to realize',
        'just as I did',
        'that there\'s a difference',
        'between knowing the path',
        'and walking the path'
    ]

    var el = document.querySelector('.text-title')
    var fx = new TextScramble(el)

    var counter = 0
    var next = function() {
        if (!!fx === false || !!fx.setText(phrases[counter]) === false) return;
        fx.setText(phrases[counter]).then(function() {
            setTimeout(next, 800)
        })
        counter = (counter + 1) % phrases.length
    }

    next();
})();

// Saves options to chrome.storage
function saveOptions() {

    var turnOn = document.getElementsByName('turn-on')[0].checked;
    var blur = document.querySelector('input[name="effect"]:checked').value;
    var inline = document.querySelector('input[name="hover"]:checked').value;
    blur = (blur === 'blur' ? true : false);
    inline = (inline === 'inline' ? true : false);
    try {
        console.log('here 0');
        chrome.storage.sync.set({
            turnOn: turnOn,
            blur: blur,
            inline: inline
        }, function() {
            console.log('here 1');
            chrome.tabs.query({
                "url": [
                    "http://*.fb.com/*",
                    "http://*.facebook.com/*",
                    "https://*.fb.com/*",
                    "https://*.facebook.com/*",
                    "http://*.m.me/*",
                    "http://*.messenger.com/*",
                    "https://*.m.me/*",
                    "https://*.messenger.com/*"
                ]
            }, function(tabs) {
                console.log(tabs);
                console.log('here 3');
                try {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: "reloadCSS"
                    }, function(response) {});
                } catch (e) {
                    alert("Error from Extensions bMessenger, restart browser and contact to author");
                }
            });
        });
    } catch (e) {
        alert("Error from Extensions bMessenger, restart browser and contact to author");
    }
}

// Restores select box and checkbox state using the preferences
function restoreOptions() {
    chrome.storage.sync.get({
        turnOn: true,
        blur: true,
        inline: true
    }, function(items) {
        if (!!document.getElementById('turn-on') === true) document.getElementById('turn-on').checked = items.turnOn;
        if (!!document.getElementById('effect-blur') === true && items.blur) document.getElementById('effect-blur').checked = items.blur;
        if (!!document.getElementById('hover-inline') === true && items.inline) document.getElementById('hover-inline').checked = items.inline;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
if (!!document.getElementById('turn-on') === true) document.getElementById('turn-on').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('effect-blur') === true) document.getElementById('effect-blur').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('effect-flip') === true) document.getElementById('effect-flip').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('hover-inline') === true) document.getElementById('hover-inline').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('hover-block') === true) document.getElementById('hover-block').addEventListener('change', function() {
    saveOptions();
});