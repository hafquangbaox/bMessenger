/**
 * @author Bao Ha <quangbao1994@gmail.com> 
 * @facebook Hà Quang Bão <https://www.facebook.com/hafquangbaox>
 * @github lozthiensu <https://github.com/lozthiensu/bMessenger>
 * This extension is called bMessenger on firefox add-ons store. But the bastard who reviews this extension on chrome extensions doesn't allow using that name. So I had to change the name to "Protect message". But its name on github is still https://github.com/lozthiensu/bMessenger
 */

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
        'Protect message setting',
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
    var browserSupportSync = false;
    var turnOn = document.getElementsByName('turn-on')[0].checked;
    var blur = document.querySelector('input[name="effect"]:checked').value;
    var inline = document.querySelector('input[name="hover"]:checked').value;
    var turnAvatar = document.getElementsByName('turn-avatar')[0].checked;
    var turnName = document.getElementsByName('turn-name')[0].checked;
    var turnMessage = document.getElementsByName('turn-message')[0].checked;
    var turnOther = document.getElementsByName('turn-other')[0].checked;
    blur = (blur === 'blur' ? true : false);
    inline = (inline === 'inline' ? true : false);
    try {
        chrome.storage.sync.set({
            turnOn: turnOn,
            blur: blur,
            inline: inline,
            turnAvatar: turnAvatar,
            turnName: turnName,
            turnMessage: turnMessage,
            turnOther: turnOther,
        }, function() {
            browserSupportSync = true;

            chrome.tabs.query({
                "url": [
                    "*://*.fb.com/*",
                    "*://*.facebook.com/*",
                    "*://*.m.me/*",
                    "*://*.messenger.com/*"
                ]
            }, function(tabs) {
                try {
                    if (tabs.length > 0) {
                        for (var i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {
                                action: "reloadCSS"
                            }, function(response) {});
                        }
                    } else {
                        console.log('Not have tabs match with query');
                    }
                } catch (e) {
                    console.log(e);
                    alert("Error from background Extensions bMessenger, restart browser and contact to author");
                }
            });
        });

    } catch (e) {
        console.log(e);
        alert("Error from background Extensions bMessenger, restart browser and contact to author");
    }
}

// Restores select box and checkbox state using the preferences
function restoreOptions() {
    var browserSupportSync = false;
    chrome.storage.sync.get({
        turnOn: true,
        blur: false,
        inline: false,
        turnAvatar: true,
        turnName: true,
        turnMessage: true,
        turnOther: true,
    }, function(items) {
        browserSupportSync = true;

        if (!!document.getElementById('turn-on') === true) document.getElementById('turn-on').checked = items.turnOn;
        if (!!document.getElementById('effect-blur') === true && items.blur) document.getElementById('effect-blur').checked = items.blur;
        if (!!document.getElementById('hover-inline') === true && items.inline) document.getElementById('hover-inline').checked = items.inline;
        if (!!document.getElementById('turn-avatar') === true) document.getElementById('turn-avatar').checked = items.turnAvatar;
        if (!!document.getElementById('turn-name') === true) document.getElementById('turn-name').checked = items.turnName;
        if (!!document.getElementById('turn-message') === true) document.getElementById('turn-message').checked = items.turnMessage;
        if (!!document.getElementById('turn-other') === true) document.getElementById('turn-other').checked = items.turnOther;

    });

}

function createContextMenu(config) {
    chrome.contextMenus.removeAll(function() {

        chrome.contextMenus.create({
            type: 'radio',
            id: "enable",
            title: 'Enable extension',
            checked: config.turnOn === true ? true : false,
            onclick: getActionContext
        });
        chrome.contextMenus.create({
            type: 'radio',
            id: "disable",
            title: 'Disable extension',
            checked: config.turnOn === true ? false : true,
            onclick: getActionContext
        });
        chrome.contextMenus.create({
            type: 'separator'
        });

        chrome.contextMenus.create({
            type: 'radio',
            id: "blur",
            title: 'Effect blur',
            checked: config.blur === true ? true : false,
            onclick: getActionContext
        });
        chrome.contextMenus.create({
            type: 'radio',
            id: "mirror",
            title: 'Effect mirror',
            checked: config.blur === true ? false : true,
            onclick: getActionContext
        });
        chrome.contextMenus.create({
            type: 'separator'
        });

        chrome.contextMenus.create({
            type: 'radio',
            id: "inline",
            title: 'Hover inline',
            checked: config.inline === true ? true : false,
            onclick: getActionContext
        });
        chrome.contextMenus.create({
            type: 'radio',
            id: "block",
            title: 'Hover block',
            checked: config.inline === true ? false : true,
            onclick: getActionContext
        });
    });
    console.log('Run create context');

};


function getActionContext(info, tab) {
    console.log(info);
    var keyChange = '';
    var valueChange = info.checked;
    if (info.menuItemId === 'enable' || info.menuItemId === 'disable') {
        valueChange = info.menuItemId === 'enable' ? true : false;
        keyChange = 'turnOn';
    } else if (info.menuItemId === 'blur' || info.menuItemId === 'mirror') {
        valueChange = info.menuItemId === 'blur' ? true : false;

        keyChange = 'blur';
    } else if (info.menuItemId === 'inline' || info.menuItemId === 'block') {
        valueChange = info.menuItemId === 'inline' ? true : false;
        keyChange = 'inline';
    }

    var browserSupportSync = false;
    chrome.storage.sync.get({
        turnOn: true,
        blur: false,
        inline: false,
        turnAvatar: true,
        turnName: true,
        turnMessage: true,
        turnOther: true,
    }, function(items) {
        browserSupportSync = true;
        items[keyChange] = valueChange;

        updateContextSetting(items);

    });

}
initConfig();

function initConfig() {
    var browserSupportSync = false;
    chrome.storage.sync.get({
        turnOn: true,
        blur: false,
        inline: false,
        turnAvatar: true,
        turnName: true,
        turnMessage: true,
        turnOther: true,
        lastUpdate: 0,
    }, function(items) {
        browserSupportSync = true;

        createContextMenu(items);
        checkData(items.lastUpdate);

    });
}

function checkData( timestamp ){
    httpGet( 'https://raw.githubusercontent.com/lozthiensu/bMessenger/master/version.txt', function(rs){
        if( !rs ) console.log('Can\'t check version of dataset');
        else {
            document.getElementById("update-button").innerHTML = 'Last updated at ' + new Date(+rs * 1000).formatMMDDYYYY() + '. Click here for updates.';
        }
    });
}

Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
}

function updateContextSetting(configs) {
    console.log('Update', configs);
    var browserSupportSync = false;
    try {
        chrome.storage.sync.set(configs, function() {
            browserSupportSync = true;

            chrome.tabs.query({
                "url": [
                    "*://*.fb.com/*",
                    "*://*.facebook.com/*",
                    "*://*.m.me/*",
                    "*://*.messenger.com/*"
                ]
            }, function(tabs) {
                try {
                    if (tabs.length > 0) {
                        for (var i = 0; i < tabs.length; i++) {
                            chrome.tabs.sendMessage(tabs[i].id, {
                                action: "reloadCSS"
                            }, function(response) {});
                        }
                    } else {
                        console.log('Not have tabs match with query');
                    }
                } catch (e) {
                    console.log(e);
                    alert("Error from background Extensions bMessenger, restart browser and contact to author");
                }
            });
        });

    } catch (e) {
        console.log(e);
        alert("Error from background Extensions bMessenger, restart browser and contact to author");
    }
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
if (!!document.getElementById('turn-avatar') === true) document.getElementById('turn-avatar').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('turn-name') === true) document.getElementById('turn-name').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('turn-message') === true) document.getElementById('turn-message').addEventListener('change', function() {
    saveOptions();
});
if (!!document.getElementById('turn-other') === true) document.getElementById('turn-other').addEventListener('change', function() {
    saveOptions();
});

function httpGet(theUrl, callback) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(this.responseText);
            callback(this.responseText);
        }
    }
    xmlhttp.open("GET", theUrl, true);
    xmlhttp.send();
}