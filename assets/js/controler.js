/**
 * Created by david-maser on 17/07/15.
 */
var mouseX;
var mouseY;
$(document).mousemove( function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});
function Hilitor(id, tag)
{

    var targetNode = document.getElementById(id) || document.body;
    var hiliteTag = tag || "EM";
    var skipTags = new RegExp("^(?:" + hiliteTag + "|SCRIPT|FORM|SPAN)$");
    var colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    var wordColor = [];
    var colorIdx = 0;
    var matchRegex = "";
    var openLeft = false;
    var openRight = false;

    this.setMatchType = function(type)
    {
        switch(type)
        {
            case "left":
                this.openLeft = false;
                this.openRight = true;
                break;
            case "right":
                this.openLeft = true;
                this.openRight = false;
                break;
            case "open":
                this.openLeft = this.openRight = true;
                break;
            default:
                this.openLeft = this.openRight = false;
        }
    };

    this.setRegex = function(input)
    {
        input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|");
        var re = "(" + input + ")";
        if(!this.openLeft) re = "\\b" + re;
        if(!this.openRight) re = re + "\\b";
        matchRegex = new RegExp(re, "i");
    };

    this.getRegex = function()
    {
        var retval = matchRegex.toString();
        retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, "");
        retval = retval.replace(/\|/g, " ");
        return retval;
    };

    // recursively apply word highlighting
    this.hiliteWords = function(node)
    {
        if(node === undefined || !node) return;
        if(!matchRegex) return;
        if(skipTags.test(node.nodeName)) return;

        if(node.hasChildNodes()) {
            for(var i=0; i < node.childNodes.length; i++)
                this.hiliteWords(node.childNodes[i]);
        }
        if(node.nodeType == 3) { // NODE_TEXT
            if((nv = node.nodeValue) && (regs = matchRegex.exec(nv))) {
                if(!wordColor[regs[0].toLowerCase()]) {
                    wordColor[regs[0].toLowerCase()] = colors[colorIdx++ % colors.length];
                }

                var match = document.createElement(hiliteTag);
                match.appendChild(document.createTextNode(regs[0]));
                match.style.backgroundColor = wordColor[regs[0].toLowerCase()];
                match.style.fontStyle = "inherit";
                match.style.color = "#000";

                var after = node.splitText(regs.index);
                after.nodeValue = after.nodeValue.substring(regs[0].length);
                node.parentNode.insertBefore(match, after);
            }
        }
    };

    // remove highlighting
    this.remove = function()
    {
        var arr = document.getElementsByTagName(hiliteTag);
        while(arr.length && (el = arr[0])) {
            var parent = el.parentNode;
            parent.replaceChild(el.firstChild, el);
            parent.normalize();
        }
    };

    // start highlighting at target node
    this.apply = function(input)
    {
        this.remove();
        if(input === undefined || !input) return;
        this.setRegex(input);
        this.hiliteWords(targetNode);
    };

}

var basket = [];

function historyPush(that,dir){
    if(dir == 'f') {
        basket.push(that);
    }else if(dir == 'r') {
        basket.pop();
    }
}
$(function(){
    $("pre").hover(function() {
        var codeInnerWidth = $("code", this).width() + 10;
        if (codeInnerWidth > 500) {
            $(this).stop(true, false).css({zIndex:"99",position:"relative",overflow:"hidden"}).animate({width:codeInnerWidth+"px"});
        }
    }, function() {
        $(this).stop(true, false).animate({width:500});
    });
});
function freshMarks(mode){
    var historyEL = '.bks-history-am';
    if(mode == 'add') {
        $(historyEL).empty();
        var a = searchFREE.length;
        for (var i = 0; i < a; i++) {
            if (searchFREE[i] !== '') {
                $(historyEL).append('<div class="bm-tab"><span class="ion-ios-circle-filled search-tab"></span>' + searchFREE[i] + '</div>');
            }
        }
    }else if(mode == 'flush') {
        searchFREE = [];
        $(historyEL).empty().append('Empty');
    }
}
function OpenInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
$(window).scroll(function() {
    if ($(this).scrollTop() > 1){
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }
});
$(document).ready(function(){
    getTutorials();
    $('body').on("mouseover",".ttip",function(){
        var a = $(this).attr('data-attribute');
        switch(a) {
            case 'Liquid':
                var dt = 'Liquid is the language used to build the shopify front end';
                break;
            case 'js':
                dt = 'JS refers to JavaScript. Most of the site\'s front end functionalities have been scripted in Javascript';
                break;
            case 'jq':
                dt = 'jQuery is a powerful JavaScript library that extends the core features of JavaScript.';
                break;
            case 'vanilla':
                dt = 'Vanilla JavaScript is the name used to differentiates core JavaScript from other more extended JavaScript libraries (i.e. jQuery, Prototype...) ';
                break;
            case 'api':
                dt = 'API, an abbreviation of application program interface, is a set of routines, protocols, and tools for building software applications. The API specifies how software components should interact and APIs are used when programming graphical user interface (GUI) components.';
                break;
            case 'tld':
                dt = 'A top-level domain (TLD) is one of the domains at the highest level in the hierarchical Domain Name System of the Internet. The top-level domain names are installed in the root zone of the name space.';
                break;
            case 'dom':
                dt = 'The Document Object Model (DOM) is an application programming interface (API) for valid HTML and well-formed XML documents. It defines the logical structure of documents and the way a document is accessed and manipulated.';
                break;
            case 'json':
                dt = 'JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999.';
                break;
            case 'ajax':
                dt = 'Ajax is not a single technology, but a group of technologies. HTML and CSS can be used in combination to mark up and style information. The DOM is accessed with JavaScript to dynamically display – and allow the user to interact with – the information presented.';
                break;
            case 'mq':
                dt = 'Media Queries is a CSS3 module allowing content rendering to adapt to conditions such as screen resolution (e.g. smartphone screen vs. computer screen). It became a W3C recommended standard in June 2012, and is a cornerstone technology of Responsive web design.';
                break;
            case 'mvc':
                dt = 'Model–view–controller (MVC) is a software architectural pattern for implementing user interfaces. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user.';
                break;
            default:
                dt = a;
        }
        $('body').append('<div class="hover-tip">'+dt+'</div>');
        $('.hover-tip').css({'top':mouseY,'left':mouseX});

    }).on('mouseout','.ttip',function(){
        $('.hover-tip').remove();

    }).on('click','.ld-js',function(){
        var a = $(this).attr('data-json');
        loadJSON(a);
        historyPush(a,'f');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }).on('click','.tutorials',function(){
        $('.bks-tutorial').show();
        $('.search-zone').hide();
        $('.pgbuilder-zone').hide();
    }).on('click','.history-back',function(){
        history.back();
        historyPush(null,'r');
    }).on('click','.history-search',function(){
        $('.search-zone').toggle();
        $('.bks-tutorial').hide();
        $('.pgbuilder-zone').hide();
    }).on('click','.popover-close',function(){
        $('.bks-history').hide();
    }).on('click','.popover-tutorials-close',function(){
        $('.bks-tutorial').hide();
    }).on('click','.popover-pgbuilder-zone-close',function(){
        $('.pgbuilder-zone').hide();
    }).on('click','.popover-flush',function(){
        freshMarks('flush');
    }).on('click','.goto-admin',function(){
        OpenInNewTab('https://lasthunt.myshopify.com/admin/auth/login');
    }).on('click','.wizard',function(){
        $('.bks-tutorial').hide();
        $('.search-zone').hide();
        $('.pgbuilder-zone').toggle();
       }).on('click','.pgb-cta',function(){
        var a = $(this).data('load');
        OpenInNewTab(a);
    }).on('click','.bookmarker',function(){
        if(searchFREE.length) {
            $('.bks-history').show();
        }else{
            $('.bks-history-am').html('Empty');
            $('.bks-history').show();
        }
    }).on('click','.tut-cta',function(){
        var a = $(this).attr('data-load');
        console.log(a);
        loadJSON(a);
    });
});
$(window).on('hashchange', function(){
    var a = window.location.href.slice(window.location.href.indexOf('#') + 1);
    var b = $("label").find("[data-json='" + a + "']");
    if(a.indexOf("tut")>-1) {
        loadJSON(a);
    }
});
var searchFREE = searchFREE || [];
function loadJSON(page){
    var key = '#keywords',
        dataZone = '#data-zone';
    if(page == null || page == ''){
        var def = 'intro';
    }else{
        def = page;
    }
    $.ajax({
        type:'GET',
        url:"data/"+def+".json",
        success:function(data) {
            var myHilitor2;
            myHilitor2 = new Hilitor("data-zone");
            myHilitor2.setMatchType("left");
            $('#keywords').keyup(function(){
                myHilitor2.apply(this.value);
            });
            $('.ion-ios-reload').click(function(){
                if($(key).val() !== "") {
                    searchFREE.push($('#keywords').val().trim());
                }
                myHilitor2.remove();
                $(key).val('');
                freshMarks('add');
            });
            $(dataZone).empty();
            location.hash = def;
            var o = data.content.content.length;
            for (var i=0;i<o;i++){
                var ctc = data.content.content[i].paragraph,
                format = data.content.content[i].type,
                type = typeof data.content.content[i].paragraph;
                switch(format)
                {
                    case "text":
                        var a = '<p>',
                            b = '</p>';
                        break;
                    case "deprecated-text":
                        a = '<p class="deprecated">';
                        b = '</p>';
                        break;
                    case "italic":
                        a = '<p class="italic">';
                        b = '</p>';
                        break;
                    case "warning":
                        a = '<div class="warning"><span class="ion-ios-close-outline"></span>';
                        b = '</div>';
                        break;
                    case "info":
                        a = '<div class="info">';
                        b = '</div>';
                        break;
                    case "note":
                        a = '<div class="note">';
                        b = '</div>';
                        break;
                    case "header":
                        a = '<h1>';
                        b = '</h1>';
                        break;
                    case "subsection":
                        a = '<h2 class="underline italic">';
                        b = '</h2>';
                        break;
                    case "pre":
                        a = '<pre>';
                        b = '</pre>';
                        break;
                    case "bold-header":
                        a = '<h3 class="bold">';
                        b = '</3>';
                        break;
                    case "underline-header":
                        a = '<h3 class="underline">';
                        b = '</h3>';
                        break;
                    default:
                        a = '';
                        b = '';
                }
                if(type == 'object'){
                    var expects = data.content.content[i].type;
                    if(expects == 'ul' || expects == 'ol'){
                        var xlen = data.content.content[i].paragraph.length,
                            lobjs = [];
                        for(var j=0;j<xlen;j++){
                            lobjs.push('<li>'+data.content.content[i].paragraph[j].item+'</li>');
                        }
                        var trimmed = lobjs.join().replace(/,/g,'');
                        $('#data-zone').append('<'+expects+'>'+trimmed+'</'+expects+'>');
                    }else if(expects == 'table' || expects == 'deprecated-table'){
                        var tb = [];
                            xlen = data.content.content[i].paragraph.length;
                        for(var k=0;k<xlen;k++){
                            tb.push('<tr>');
                            var ylen = data.content.content[i].paragraph[k].row.length;
                            for(var l=0;l<ylen;l++){
                                if(data.content.content[i].paragraph[k].row[l].column == null){
                                    tb.push('<td>&nbsp;</td>');
                                }else {
                                    tb.push('<td>' + data.content.content[i].paragraph[k].row[l].column + '</td>');
                                }
                            }
                            tb.push('</tr>');
                        }
                        trimmed = tb.join().replace(/,/g,'');
                        $('#data-zone').append('<table class="'+expects+'"><tbody>'+trimmed+'</table></tbody>');
                    }
                }else{
                    $('#data-zone').append(a + ctc + b).attr('data-page', data.content.title);
                }
            }
        },
        error:function(){
            console.log('oops');
        },
        dataType:'json'
    })
}
function getTutorials(){
    $.ajax({
        type:'GET',
        url:"data/tutorials.json",
        success:function(data) {
            var ylen = data.content.content.length;
            for (i=0;i<ylen;i++){
                $('.bks-tutorials-am').append('<div class="tut-pins"><a href="#" data-load="'+data.content.content[i].link+'" class="tut-cta">'+data.content.content[i].paragraph+'</a></div>');
            }
        },
        error:function(){
            console.log('oops');
        },
        dataType:'json'
    })
}
