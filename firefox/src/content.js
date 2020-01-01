/**
 * @author Bao Ha <quangbao1994@gmail.com> 
 * @facebook Hà Quang Bão <https://www.facebook.com/hafquangbaox>
 * @github lozthiensu <https://github.com/lozthiensu/bMessenger>
 * This extension is called bMessenger on firefox add-ons store. But the bastard who reviews this extension on browser.extensions doesn't allow using that name. So I had to change the name to "Protect message". But its name on github is still https://github.com/lozthiensu/bMessenger
 */

var styleEffect = {
    // One attr
    blur10: 'filter:blur(10px);',
    blur25: 'filter:blur(25px);',
    overflowHidden: 'overflow:hidden!important;',
    flipMirror: 'transform: rotateY(180deg);-webkit-transform:rotateY(180deg);-moz-transform:rotateY(180deg);-o-transform:rotateY(180deg);-ms-transform:rotateY(180deg);unicode-bidi:bidi-override;',
    none: 'display:none;',
    // Append
    borderRadius: function(x) {
        return 'border-radius:' + x + ';';
    },
    rightAlign: 'text-align:right;',
    inlineBlock: 'display:inline-block;',
    block: 'display:block;',
    table: 'display:table;',
    width: 'width:fit-content;',
};

var selector = {
    m: {
        blur: {
            left: {
                'blur10': [{
                    isComponent: 'name',
                    selector: 'ul>li[role="row"]>div>a>div>div>div:first-of-type>span',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'a>div>div>div>span',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'ul>li[role="row"]>div>a>div>div>div:last-child>span',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'a>div>div>div:last-child>span',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineNears: true,
                    blockNears: false,
                }, ],
                'blur25': [{
                    isComponent: 'avatar',
                    selector: 'ul>li[role="row"]>div>a>div>div[data-tooltip-position="right"]>div',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'a>div>div[data-tooltip-position="right"]>div',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'other',
                    selector: 'ul>li[role="row"]>div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>img',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>img',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'other',
                    selector: 'ul>li[role="row"]>div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>div>div',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>div>div',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineNears: true,
                    blockNears: false,
                }, ]
            },
            center: {
                'blur10': [{
                    isComponent: "name",
                    selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:nth-of-type(2)',
                    inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                    inlineSelector: 'div:first-of-type>div:nth-of-type(2)',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'name',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>h5',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>h5',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'span>div:first-child>div>div:not(:first-child)',
                    inline: 'div[role="main"]>span>div:first-child',
                    inlineSelector: 'div>div:not(:first-child)',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>span:not([data-hover="none"])',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div>div>span:not([data-hover="none"])',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>a>blockquote',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div>a>blockquote',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div.clearfix>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div.clearfix>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div>a',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>div>a',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div[data-hover="tooltip"]>div>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>div[data-hover="tooltip"]>div>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>span>span>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'span>span>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div>div>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div>div>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>div>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>div>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>div>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>div>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "other",
                    selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:last-child',
                    inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                    inlineSelector: 'div:first-of-type>div:last-child',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }],
                'blur25': [

                    {
                        isComponent: "avatar",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div:first-child>div.uiPopover>div>div>img',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div:first-child>div.uiPopover>div>div>img',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        borderRadius: '25%',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "avatar",
                        selector: 'span>div:first-child>div>div:first-child>div>img',
                        inline: 'div[role="main"]>span>div:first-child',
                        inlineSelector: 'div>div:first-child',
                        block: 'div[role="main"]',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "avatar",
                        selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:first-of-type',
                        inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                        inlineSelector: 'div:first-of-type>div:first-child',
                        block: 'div[role="main"]',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "name",
                        selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:nth-of-type(2)',
                        inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                        inlineSelector: 'div:first-of-type>div:nth-of-type(2)',
                        block: 'div[role="main"]',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>div>img',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div>div>div>div>img',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>div>div',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div>div>div>div>div',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>div[role="img"]',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div>div>div>div[role="img"]',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div>div>a>div',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div.clearfix>div>div>a>div',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div>div>div>div>span>div',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div>div>div>div>span>div',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "message",
                        selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:last-of-type>div>span>div',
                        inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                        inlineSelector: 'div:last-of-type>div>span>div',
                        block: 'div[role="main"]',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "other",
                        selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div>div>span>div>div>ul',
                        inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                        inlineSelector: 'div>div>span>div>div>ul',
                        block: 'div[role="main"]',
                        inlineNears: true,
                        blockNears: false,
                    }, {
                        isComponent: "other",
                        selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>span',
                        inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                        inlineSelector: 'div>div.clearfix>span',
                        block: 'div[role="presentation"]>div>div.uiScrollableArea',
                        inlineNears: true,
                        blockNears: false,
                    },

                ],
                'overflowHidden': [],
            },
        },
        flip: {
            left: {
                'flipMirror': [{
                    isComponent: 'avatar',
                    selector: 'ul>li[role="row"]>div>a>div>div[data-tooltip-position="right"]>div',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'a>div>div[data-tooltip-position="right"]>div',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'name',
                    selector: 'ul>li[role="row"]>div>a>div>div>div:first-of-type>span',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div>a>div>div>div:first-of-type>span',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    rightAlign: true,
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'ul>li[role="row"]>div>a>div>div>div:last-child>span',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div>a>div>div>div:last-child>span',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'other',
                    selector: 'ul>li[role="row"]>div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>img',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>img',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'other',
                    selector: 'ul>li[role="row"]>div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>div>div',
                    inline: 'ul>li[role="row"]',
                    inlineSelector: 'div[role="gridcell"]:nth-child(2)>div[aria-haspopup="true"][role="button"]>div>div',
                    block: 'div.uiScrollableArea>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div[role="navigation"]',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, ]
            },
            center: {
                'flipMirror': [
                {
                    isComponent: "avatar",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div:first-child>div.uiPopover>div>div>img',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div:first-child>div.uiPopover>div>div>img',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.uiScrollableArea.fade.contentAfter>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:first-of-type>div:first-of-type',
                    inline: 'div.uiScrollableArea.fade.contentAfter>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:first-of-type>div:first-of-type',
                    inlineSelector: 'div:first-of-type',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'span>div:first-child>div>div:first-child>div>img',
                    inline: 'div[role="main"]>span>div:first-child',
                    inlineSelector: 'div>div:first-child',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'name',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>h5',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>h5',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'span>div:first-child>div>div:not(:first-child)',
                    inline: 'div[role="main"]>span>div:first-child',
                    inlineSelector: 'div>div:not(:first-child)',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'name',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div.clearfix:first-of-type>div.direction_ltr',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div.clearfix:first-of-type>div.direction_ltr',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>span:not([data-hover="none"])',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div>div>span:not([data-hover="none"])',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    rightAlign: true,
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>div>a',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div>div>a',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div>a>blockquote',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'div>div>div>a>blockquote',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }
                // , {
                //     isComponent: "message",
                //     selector: 'div.uiScrollableAreaContent>div>div>div>div>div>div>div.clearfix>div',
                //     inline: 'div.uiScrollableAreaContent>div>div>div>div',
                //     inlineSelector: 'div>div>div.clearfix>div',
                //     block: 'div[role="presentation"]>div>div.uiScrollableArea',
                //     inlineNears: true,
                //     blockNears: false,
                // }
                , {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div>a',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>div>a',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div[data-hover="tooltip"]>div>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>div[data-hover="tooltip"]>div>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: 'message',
                    selector: 'div.uiScrollableAreaContent>div>div>div>div>span>span>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div',
                    inlineSelector: 'span>span>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div>div>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>div>div>div',
                    rightAlign: true,
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>div>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>div>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>div>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>div>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>span>span>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div',
                    inlineSelector: 'span>span>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }
                // , {
                //     isComponent: "message",
                //     selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>div>div>a>div',
                //     inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                //     inlineSelector: 'div>div.clearfix>div>div>a>div',
                //     block: 'div[role="presentation"]>div>div.uiScrollableArea',
                //     inlineNears: true,
                //     blockNears: false,
                // }
                , {
                    isComponent: "message",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div>div>div>div>span>div',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div>div>div>div>span>div',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div:last-of-type>div>span>div',
                    inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                    inlineSelector: 'div:last-of-type>div>span>div',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "other",
                    selector: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div>div>div>span>div>div>ul',
                    inline: 'div[data-testid="info_panel"]>div>div>div.uiScrollableAreaWrap>div.uiScrollableAreaBody>div.uiScrollableAreaContent>div',
                    inlineSelector: 'div>div>span>div>div>ul',
                    block: 'div[role="main"]',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "other",
                    selector: 'div.uiScrollableAreaContent>div>div>div>div.clearfix>div>div.clearfix>span',
                    inline: 'div.uiScrollableAreaContent>div>div>div>div.clearfix',
                    inlineSelector: 'div>div.clearfix>span',
                    block: 'div[role="presentation"]>div>div.uiScrollableArea',
                    inlineNears: true,
                    blockNears: false,
                }, ],
                'overflowHidden': [],
            }

        }
    },
    fb: {
        blur: {
            drop: {
                'blur10': [{
                    isComponent: "name",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    inline: 'a.messagesContent',
                    inlineSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)',
                    inline: 'a.messagesContent',
                    inlineSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)',
                    inlineNears: true,
                    blockNears: false,
                }],
                'blur25': [{
                    isComponent: "avatar",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    inline: 'a.messagesContent',
                    inlineSelector: 'div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    inlineNears: true,
                    blockNears: false,
                }]
            },
            window: {
                'blur10': [{
                    isComponent: "name",
                    selector: 'div.fbNubFlyoutInner>div>div>div>div:nth-child(2)>div>div>a>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>a>span',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div:nth-child(2)>div:nth-child(1)>div>a>span',
                    inline: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(2)>div:nth-child(1)>div>a>span',
                    block: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    blockSelector: 'div>div>div:nth-child(2)>div:nth-child(1)>div>a>span',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div>div:nth-child(2)>div:nth-child(1)',
                    inline: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div',
                    inlineSelector: 'div:nth-child(2)>div:nth-child(1)',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.seen>span',
                    inline: 'div.seen',
                    inlineSelector: 'span',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr blockquote',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>div>div>div>div>div>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>div>div>div>div[data-testid="attachment_root"]>span>div>div:first-child',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>div>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>span>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>div>div[data-hover="tooltip"]',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div>div>div>div>div:nth-child(1)>div.direction_ltr>div>div:nth-child(1)>div:nth-child(2)>div>span',
                    inline: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div',
                    inlineSelector: 'div>div>div>div:nth-child(1)>div.direction_ltr>div>div:nth-child(1)>div:nth-child(2)>div>span',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div>div>div>div>div:nth-child(1)>div.clearfix:nth-child(1)>div.direction_ltr',
                    inline: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div',
                    inlineSelector: 'div>div>div>div:nth-child(1)>div.clearfix:nth-child(1)>div.direction_ltr',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }],
                'blur25': [{
                    isComponent: "avatar",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div:nth-child(1)>a>div',
                    inline: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>a>div',
                    block: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    blockSelector: 'div>div>div:nth-child(1)>a>div',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div:nth-child(1)>div>a>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div:nth-child(1)>div>a>div>img',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutInner>div>div>div>div:nth-child(1)>a>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>a>div>img',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>span>div>div>a>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div[data-testid="attachment_root"]>span>div[role="img"]',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div[data-testid="attachment_root"]>span>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>div>div>div>div>span>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div>div>div>table',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div[data-testid="attachment_root"]>div>div>a>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div[data-testid="attachment_root"]>span>div>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.direction_ltr>div[data-testid="attachment_root"]>span>div>div>div>a>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner div.direction_ltr span>div>img.img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'img.img',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "other",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner div.fbNubFlyoutFooter div[role="presentation"]>ul>li:last-child',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner div.fbNubFlyoutFooter',
                    inlineSelector: ' div[role="presentation"]>ul>li:last-child',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, ],
                'overflowHidden': [
                    // {
                    //     isComponent: "message",
                    //     selector: 'div.direction_ltr>div[maxwidth="158"]',
                    //     inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    //     block: 'div.fbDockChatTabFlyout'
                    // }
                ]
            }
        },
        flip: {
            drop: {
                'flipMirror': [{
                    isComponent: "avatar",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    inline: 'a.messagesContent',
                    inlineSelector: 'div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(1)>div>div>div>div>div',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    inline: 'a.messagesContent',
                    inlineSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div.author>span:nth-child(1)',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'a.messagesContent>div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>span:nth-child(2)',
                    inline: 'a.messagesContent',
                    inlineSelector: ' div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>span:nth-child(2)',
                    block: 'div.uiScrollableAreaWithShadow',
                    blockSelector: 'div[direction="left"]>div:nth-child(2)>div>div:nth-child(2)>div>div:nth-child(2)>div>span:nth-child(2)',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }]
            },
            window: {
                'flipMirror': [{
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutInner>div>div>div>div:nth-child(1)>a>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>a>div>img',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutInner>div>div>div>div:nth-child(1)>a>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>a>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div:nth-child(1)>div>a>div>img',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div:nth-child(1)>div>a>div>img',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div:nth-child(1)>a>div',
                    inline: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>a>div',
                    block: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    blockSelector: 'div>div>div:nth-child(1)>a>div',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "avatar",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar>div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div:nth-child(1)>div:nth-child(1)>div:nth-child(1)>a',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubFlyoutInner>div>div>div>div:nth-child(2)>div>div>a>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>a>span',
                    block: 'div.fbDockChatTabFlyout',
                    blockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div:nth-child(1)>div>a',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(1)>div>a',
                    block: 'div#ChatTabsPagelet',
                    blockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div:nth-child(2)>div:first-of-type>div>a',
                    inline: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    inlineSelector: 'div>div>div:nth-child(2)>div:first-of-type>div>a',
                    block: 'div#ChatTabsPagelet',
                    blockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div>div:nth-child(2)>div[class="_4tdx"]:nth-child(1)',
                    inline: 'div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div>div>div>div>div',
                    inlineSelector: 'div:nth-child(2)>div[class="_4tdx"]:nth-child(1)',
                    block: 'div.fbDockChatTabFlyout',
                    inlineBlockDisplay: true,
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.seen>span',
                    inline: 'div.seen',
                    inlineSelector: 'span',
                    block: 'div.fbDockChatTabFlyout',
                    inlineBlockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "name",
                    selector: 'div.fbNubGroup>div>div>div>div>div.titlebar>div>div>div>div:nth-child(1)',
                    inline: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    inlineSelector: 'div>div>div>div:nth-child(1)',
                    block: 'div.fbNubGroup>div>div>div>div>div.titlebar',
                    blockSelector: 'div>div>div:nth-child(1)>a>div',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div>div>div>div>span>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div>div>div>div>span>span',
                    block: 'div.fbDockChatTabFlyout',
                    blockDisplay: true,
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div>div>div>div>div[data-testid="attachment_root"]>span>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div>div>div>div>div[data-testid="attachment_root"]>span>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>div:nth-child(1)>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>div:nth-child(1)>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>span:nth-child(1)>div>div>a>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>span:nth-child(1)>div>div>a>div>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>span:nth-child(1)>div>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div[data-testid="attachment_root"]>span:nth-child(1)>div>div>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div:nth-child(1)>div.direction_ltr',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div:nth-child(1)>div.direction_ltr',
                    block: 'div.fbDockChatTabFlyout',
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div>div>div>div>div>div.direction_ltr>div:first-child>div>div:not(:first-child)>div>div>a>blockquote',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div:first-child>div>div:not(:first-child)>div>div>a>blockquote',
                    block: 'div.fbDockChatTabFlyout',
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div>div>div>div>div>div>div>div.direction_ltr>div:first-child>div>div:not(:first-child)>div>div>div>span>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    inlineSelector: 'div>div>div>div>div.direction_ltr>div:first-child>div>div:not(:first-child)>div>div>div>span>span',
                    block: 'div.fbDockChatTabFlyout',
                    blockDisplay: true,
                    rightAlign: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>div>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    blockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>span>span',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    blockDisplay: true,
                    inlineNears: true,
                    blockNears: false,
                }, {
                    isComponent: "message",
                    selector: 'span[data-testid="log_message_text"]>span>div>div>div',
                    inline: 'div.fbNubFlyoutOuter>div.fbNubFlyoutInner>div:nth-child(2)>div>div>div>div:nth-child(2)>div>div:nth-child(1)>div>div',
                    block: 'div.fbDockChatTabFlyout',
                    inlineNears: true,
                    blockNears: false,
                }],
            }
        }
    }
};

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

function applyCSS() {
    var browserSupportSync = false;
    browser.storage.local.get({
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

        // browser.storage.local.get({
        //     dataset: {},
        // }, function(rs) {
        //     try {
        //         selector = JSON.parse(rs.dataset);
        //     } catch (e){
        //         console.log(e);
        //         alert('Extension "Protect message error, restart broswer or reinstall extension to got work!"')
        //     }
            handleStyle(items);
        // });
        // checkData(items.lastUpdate);
    });

}
   
function checkData( timestamp ){
    httpGet( 'https://raw.githubusercontent.com/lozthiensu/bMessenger/master/version.txt', function(rs){
        if( !rs ) console.log('Can\'t check version of dataset');
        else if ( +rs > timestamp ){
            updateDataset(rs);
        } else {
            console.log('Latest dataset');
        }
    });
}

function updateDataset(timestamp){
    httpGet( 'https://raw.githubusercontent.com/lozthiensu/bMessenger/master/dataset.txt', function(rs){
        if( !rs ) console.log('Can\'t get dataset');
        else {
            try {
                var dataset = JSON.parse(rs);
                browser.storage.local.set({
                    dataset: rs
                }, function() {
                    console.log('Save dataset success');
                    selector = JSON.parse(rs);
                });
                browser.storage.local.set({
                    lastUpdate: timestamp
                }, function() {
                    console.log('Save lastUpdate success');
                });
            } catch( e ){
                console.log('Can\' parse dataset');
            }
        }
    });
}

function handleStyle(config) {
    if (!config.turnOn) {
        var element = document.getElementById('bMessenger');
        if (!!element === true) element.innerHTML = '';
        return;
    }
    var hostname = document.location.hostname;
    var arrComponents = [];
    if (config.turnAvatar) arrComponents.push('avatar');
    if (config.turnName) arrComponents.push('name');
    if (config.turnMessage) arrComponents.push('message');
    if (config.turnOther) arrComponents.push('other');
    config.arrComponents = arrComponents;
    if (hostname === 'www.messenger.com') {
        handleM(config);
    } else if (hostname === 'www.facebook.com') {
        var href = document.location.href;
        if (href.indexOf('https://www.facebook.com/messages/t/') >= 0) {
            handleM(config);
        } else {
            handleFB(config);
        }
    } else {
        console.log('No same domain');
    }
}

function handleM(config) {
    console.log('Apply m style');
    var styleText = '';
    if (config.blur) {
        for (var pos in selector.m.blur) {
            for (var key in selector.m.blur[pos]) {
                var temp = '';
                for (var i = 0; i < selector.m.blur[pos][key].length; i++) {

                    var obj = selector.m.blur[pos][key][i];

                    // Select only component will apply effect
                    var foundComponent = false;
                    for (var _i = 0; _i < config.arrComponents.length; _i++) {
                        if (obj.isComponent === config.arrComponents[_i]) {
                            foundComponent = true;
                            break;
                        }
                    }
                    if (!foundComponent) continue;
                    // Select only component will apply effect

                    var tempSetDisplay = '';

                    if (config.inline) {
                        tempSetDisplay += obj.inline + ':not(:hover)' + getCharacterAfterHover(obj.inlineNears) + (!!obj.inlineSelector === false ? obj.selector : obj.inlineSelector) + '{';
                    } else {
                        tempSetDisplay += obj.block + ':not(:hover)' + getCharacterAfterHover(obj.blockNears) + (!!obj.blockSelector === false ? obj.selector : obj.blockSelector) + '{';
                    }
                    tempSetDisplay += styleEffect[key];

                    if (!!obj.blockDisplay === true) {
                        tempSetDisplay += styleEffect.block;
                    } else if (!!obj.inlineBlockDisplay === true) {
                        tempSetDisplay += styleEffect.inlineBlock;
                    } else if (!!obj.table === true) {
                        tempSetDisplay += styleEffect.table;
                    }

                    if (!!obj.borderRadius === true) {
                        tempSetDisplay += styleEffect.borderRadius(obj.borderRadius);
                    }

                    if (!!obj.rightAlign === true) {
                        tempSetDisplay += styleEffect.rightAlign;
                    }

                    tempSetDisplay += '}';
                    temp += tempSetDisplay;

                }

                styleText += temp;

            }
        }

    } else {
        for (var pos in selector.m.flip) {
            for (var key in selector.m.flip[pos]) {
                var temp = '';
                for (var i = 0; i < selector.m.flip[pos][key].length; i++) {

                    var obj = selector.m.flip[pos][key][i];

                    // Select only component will apply effect
                    var foundComponent = false;
                    for (var _i = 0; _i < config.arrComponents.length; _i++) {
                        if (obj.isComponent === config.arrComponents[_i]) {
                            foundComponent = true;
                            break;
                        }
                    }
                    if (!foundComponent) continue;
                    // Select only component will apply effect

                    var tempSetDisplay = '';

                    if (config.inline) {
                        tempSetDisplay += obj.inline + ':not(:hover)' + getCharacterAfterHover(obj.inlineNears) + (!!obj.inlineSelector === false ? obj.selector : obj.inlineSelector) + '{';
                    } else {
                        tempSetDisplay += obj.block + ':not(:hover)' + getCharacterAfterHover(obj.blockNears) + (!!obj.blockSelector === false ? obj.selector : obj.blockSelector) + '{';
                    }
                    tempSetDisplay += styleEffect[key];

                    if (!!obj.blockDisplay === true) {
                        tempSetDisplay += styleEffect.block;
                    } else if (!!obj.inlineBlockDisplay === true) {
                        tempSetDisplay += styleEffect.inlineBlock;
                    } else if (!!obj.table === true) {
                        tempSetDisplay += styleEffect.table;
                    }

                    if (!!obj.borderRadius === true) {
                        tempSetDisplay += styleEffect.borderRadius(obj.borderRadius);
                    }

                    if (!!obj.rightAlign === true) {
                        tempSetDisplay += styleEffect.rightAlign;
                    }

                    tempSetDisplay += '}';
                    temp += tempSetDisplay;

                }

                styleText += temp;

            }
        }
    }

    if (!!document.getElementById("bMessenger") === false) {
        var style = document.createElement('style');
        style.type = 'text/css';
        var textnode = document.createTextNode(styleText);
        style.appendChild(textnode);
        style.setAttribute('id', 'bMessenger');
        document.body.appendChild(style);
    } else {
        document.getElementById("bMessenger").innerHTML = styleText;
    }
}
function getCharacterAfterHover(flag){
    if( flag ) return '>';
    return ' ';
}
function handleFB(config) {
    console.log('Apply fb style');
    var styleText = '';
    if (config.blur) {
        for (var pos in selector.fb.blur) {
            for (var key in selector.fb.blur[pos]) {
                var temp = '';
                var hover = '';
                for (var i = 0; i < selector.fb.blur[pos][key].length; i++) {

                    var obj = selector.fb.blur[pos][key][i];

                    // Select only component will apply effect
                    var foundComponent = false;
                    for (var _i = 0; _i < config.arrComponents.length; _i++) {
                        if (obj.isComponent === config.arrComponents[_i]) {
                            foundComponent = true;
                            break;
                        }
                    }
                    if (!foundComponent) continue;
                    // Select only component will apply effect

                    var tempSetDisplay = '';

                    if (config.inline) {
                        tempSetDisplay += obj.inline + ':not(:hover)' + getCharacterAfterHover(obj.inlineNears) + (!!obj.inlineSelector === false ? obj.selector : obj.inlineSelector) + '{';
                    } else {
                        tempSetDisplay += obj.block + ':not(:hover)' + getCharacterAfterHover(obj.blockNears) + (!!obj.blockSelector === false ? obj.selector : obj.blockSelector) + '{';
                    }
                    tempSetDisplay += styleEffect[key];

                    if (!!obj.blockDisplay === true) {
                        tempSetDisplay += styleEffect.block;
                    } else if (!!obj.inlineBlockDisplay === true) {
                        tempSetDisplay += styleEffect.inlineBlock;
                    } else if (!!obj.table === true) {
                        tempSetDisplay += styleEffect.table;
                    }

                    if (!!obj.borderRadius === true) {
                        tempSetDisplay += styleEffect.borderRadius(obj.borderRadius);
                    }

                    if (!!obj.rightAlign === true) {
                        tempSetDisplay += styleEffect.rightAlign;
                    }

                    tempSetDisplay += '}';
                    temp += tempSetDisplay;

                }

                styleText += temp;

            }
        }

    } else {
        for (var pos in selector.fb.flip) {
            for (var key in selector.fb.flip[pos]) {
                var temp = '';
                for (var i = 0; i < selector.fb.flip[pos][key].length; i++) {

                    var obj = selector.fb.flip[pos][key][i];

                    // Select only component will apply effect
                    var foundComponent = false;
                    for (var _i = 0; _i < config.arrComponents.length; _i++) {
                        if (obj.isComponent === config.arrComponents[_i]) {
                            foundComponent = true;
                            break;
                        }
                    }
                    if (!foundComponent) continue;
                    // Select only component will apply effect

                    var tempSetDisplay = '';

                    if (config.inline) {
                        tempSetDisplay += obj.inline + ':not(:hover)' + getCharacterAfterHover(obj.inlineNears) + (!!obj.inlineSelector === false ? obj.selector : obj.inlineSelector) + '{';
                    } else {
                        tempSetDisplay += obj.block + ':not(:hover)' + getCharacterAfterHover(obj.blockNears) + (!!obj.blockSelector === false ? obj.selector : obj.blockSelector) + '{';
                    }
                    tempSetDisplay += styleEffect[key];

                    if (!!obj.blockDisplay === true) {
                        tempSetDisplay += styleEffect.block;
                    } else if (!!obj.inlineBlockDisplay === true) {
                        tempSetDisplay += styleEffect.inlineBlock;
                    } else if (!!obj.table === true) {
                        tempSetDisplay += styleEffect.table;
                    }

                    if (!!obj.borderRadius === true) {
                        tempSetDisplay += styleEffect.borderRadius(obj.borderRadius);
                    }

                    if (!!obj.rightAlign === true) {
                        tempSetDisplay += styleEffect.rightAlign;
                    }

                    tempSetDisplay += '}';
                    temp += tempSetDisplay;

                }

                styleText += temp;

            }
        }
    }

    if (!!document.getElementById("bMessenger") === false) {
        var style = document.createElement('style');
        style.type = 'text/css';
        var textnode = document.createTextNode(styleText);
        style.appendChild(textnode);
        style.setAttribute('id', 'bMessenger');
        document.body.appendChild(style);
    } else {
        document.getElementById("bMessenger").innerHTML = styleText;
    }
}

function main(){

    applyCSS();
    console.log('Running');
    

}

main();

browser.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        try {
            if (request.action == "reloadCSS") {
                applyCSS();
                sendResponse({
                    status: "recived"
                });
            }
        } catch (e) {
            console.log(e);
            alert("Error from Extensions bMessenger, restart browser and contact to author");
        }
    });
