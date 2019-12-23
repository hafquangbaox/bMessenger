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
    blur = (blur === 'blur' ? true : false);
    inline = (inline === 'inline' ? true : false);
    try {
        chrome.storage.sync.set({
            turnOn: turnOn,
            blur: blur,
            inline: inline
        }, function() {
            browserSupportSync = true;

            chrome.contextMenus.removeAll(function(){
                createContextMenu({
                    turnOn: turnOn,
                    blur: blur,
                    inline: inline
                });
            });

            chrome.tabs.query({
                "url": [
                    "*://*.fb.com/*",
                    "*://*.facebook.com/*",
                    "*://*.m.me/*",
                    "*://*.messenger.com/*"
                ]
            }, function(tabs) {
                try {
                    if( tabs.length > 0 ){
                        for(var i = 0; i < tabs.length; i++){
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

        localStorage.setItem('bMessenger', JSON.stringify({
            turnOn: turnOn,
            blur: blur,
            inline: inline
        }));

        setTimeout(function(){
            if( browserSupportSync === false ){
                // Browser not support sync storage, so need read from localstorage
                console.log('Browser not support sync storage, so need read from localstorage');

                chrome.contextMenus.removeAll(function(){
                    createContextMenu({
                        turnOn: turnOn,
                        blur: blur,
                        inline: inline
                    });
                });

                chrome.tabs.query({
                    "url": [
                        "*://*.fb.com/*",
                        "*://*.facebook.com/*",
                        "*://*.m.me/*",
                        "*://*.messenger.com/*"
                    ]
                }, function(tabs) {
                    try {
                        if( tabs.length > 0 ){
                            for(var i = 0; i < tabs.length; i++){
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

            } else {
                console.log('The chrome.storage.sync working fine!');
            }
        }, 1000);

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
        inline: false
    }, function(items) {
        browserSupportSync = true;

        chrome.contextMenus.removeAll(function(){
            createContextMenu(items);
        });

        if (!!document.getElementById('turn-on') === true) document.getElementById('turn-on').checked = items.turnOn;
        if (!!document.getElementById('effect-blur') === true && items.blur) document.getElementById('effect-blur').checked = items.blur;
        if (!!document.getElementById('hover-inline') === true && items.inline) document.getElementById('hover-inline').checked = items.inline;
    });

    setTimeout(function(){
        if( browserSupportSync === false ){
            // Browser not support sync storage, so need read from localstorage
            console.log('Browser not support sync storage, so need read from localstorage');
            var configData = localStorage.getItem('bMessenger');
            console.log('configData', configData);
            var defaultConfigs = {
                turnOn: true,
                blur: false,
                inline: false
            };
            var configs = defaultConfigs;
            try{
                if( !!configData === true ) configs = JSON.parse(configData);
                else {
                    localStorage.setItem('bMessenger', JSON.stringify(configData));
                }

            } catch(e){
                console.log('Parse config json error', e);
            }

            chrome.contextMenus.removeAll(function(){
                createContextMenu(configs);
            });

            if (!!document.getElementById('turn-on') === true) document.getElementById('turn-on').checked = configs.turnOn;
            if (!!document.getElementById('effect-blur') === true && configs.blur) document.getElementById('effect-blur').checked = configs.blur;
            if (!!document.getElementById('hover-inline') === true && configs.inline) document.getElementById('hover-inline').checked = configs.inline;

        } else {
            console.log('The chrome.storage.sync working fine!');
        }
    }, 1000);

}

function createContextMenu(config){

    chrome.contextMenus.create({type:'radio', title:'Enable extension', checked: config.turnOn === true ? true : false, onclick: searchText});
    chrome.contextMenus.create({type:'radio', title:'Disable extension', checked: config.turnOn === true ? false : true, onclick: searchText});
    chrome.contextMenus.create({type:'separator'});

    chrome.contextMenus.create({type:'radio', title:'Effect blur', checked: config.blur === true ? true : false, onclick: searchText});
    chrome.contextMenus.create({type:'radio', title:'Effect mirror', checked: config.blur === true ? false : true, onclick: searchText});
    chrome.contextMenus.create({type:'separator'});

    chrome.contextMenus.create({type:'radio', title:'Hover inline', checked: config.inline === true ? true : false, onclick: searchText});
    chrome.contextMenus.create({type:'radio', title:'Hover block', checked: config.inline === true ? false : true, onclick: searchText});

}
function searchText(info, tabs){
    console.log(info, tabs);
    // var myQuery = encodeURI('https://www.google.com/search?q=' + info.selectionText);
    // chrome.tabs.create({
    //     url: myQuery
    // });
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

// Standard Google Universal Analytics code
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga'); // Note: https protocol here

ga('create', 'UA-109078055-6', 'auto'); // Enter your GA identifier
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');
ga('send', 'pageview', '/popup.html'); // Specify the virtual path
