$(function () {
    $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
    if(window.localStorage) {
        var tm = localStorage.getItem('pgb_Theme');
        if (tm !== '' || tm !== null || tm !== undefined) {
            $('html').attr('data-theme', tm);
        }else{
            $('html').attr('data-theme', 'light');
        }
    }
    function OpenInNewTab(url) {
        var win = window.open(url, '_blank');
        win.focus();
    }
    function addItems(){
        if($('#output').css('display') == 'block'){
            $('#output').css('display','none');
        }
        var num     = $('.clonedInput').length, // Checks to see how many "duplicatable" input fields we currently have
            newNum  = new Number(num + 1),      // The numeric ID of the new input field being added, increasing by 1 each time
            newElem = $('#entry' + num).clone().attr('id', 'entry' + newNum); // create the new element via clone(), and manipulate it's ID using newNum value

        /*  This is where we manipulate the name/id values of the input inside the new, cloned element
         Below are examples of what forms elements you can clone, but not the only ones.
         There are 2 basic structures below: one for an H2, and one for form elements.
         To make more, you can copy the one for form elements and simply update the classes for its label and input.
         Keep in mind that the .val() method is what clears the element when it gets cloned. Radio and checkboxes need .val([]) instead of .val('').
         */
        // H2 - section
        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('<div class="btn-group bigboy"><button type="button" class="btn btn-info">HERO ITEM <span class="label label-default">' + newNum+'</span></button><button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="previewItem large" href="javascript:;" data-hero="'+newNum+'">Preview Large</a></li><li><a class="previewItem small" href="javascript:;" data-hero="1">Preview Small</a></li></ul></div>');
        // Title - select
        newElem.find('.label_ttl').attr('for', 'ID' + newNum + '_title');
        newElem.find('.select_ttl').attr('id', 'ID' + newNum + '_title').attr('name', 'ID' + newNum + '_title').val('');

        // First name - text
        newElem.find('.label_fn').attr('for', 'ID' + newNum + '_first_name');
        newElem.find('.input_fn').attr('id', 'ID' + newNum + '_first_name').attr('name', 'ID' + newNum + '_first_name').val('');

        // Last name - text
        newElem.find('.label_ln').attr('for', 'ID' + newNum + '_last_name');
        newElem.find('.input_ln').attr('id', 'ID' + newNum + '_last_name').attr('name', 'ID' + newNum + '_last_name').val('');

        // Color - checkbox
        newElem.find('.label_checkboxitem').attr('for', 'ID' + newNum + '_checkboxitem');
        newElem.find('.input_checkboxitem').attr('id', 'ID' + newNum + '_checkboxitem').attr('name', 'ID' + newNum + '_checkboxitem').val([]);

        // Skate - radio
        newElem.find('.radio').attr('for', 'ID' + newNum + '_radioitem');
        newElem.find('.input_radio').attr('id', 'ID' + newNum + '_radioitem').attr('name', 'ID' + newNum + '_radioitem').val([]);

        // Email - text
        newElem.find('.label_email').attr('for', 'ID' + newNum + '_email_address');
        newElem.find('.input_email').attr('id', 'ID' + newNum + '_email_address').attr('name', 'ID' + newNum + '_email_address').val('');

        // Twitter handle (for Bootstrap demo) - append and text
        newElem.find('.label_twt').attr('for', 'ID' + newNum + '_twitter_handle');
        newElem.find('.input_twt').attr('id', 'ID' + newNum + '_twitter_handle').attr('name', 'ID' + newNum + '_twitter_handle').val('');
        newElem.find('.check_image').attr('data-handler', newNum);
        newElem.find('.check_alt_image').attr('data-handler', newNum);
        newElem.find('.input-group-addon.image_count').attr('style','').html('Shopify CDN');
        newElem.find('.mod-radio').attr('style','');

        // Insert the new element after the last "duplicatable" input field
        $('#entry' + num).after(newElem);
        $('#ID' + newNum + '_title').focus();

        // Enable the "remove" button. This only shows once you have a duplicated section.
        $('#btnDel').attr('disabled', false);

        // Right now you can only add 4 sections, for a total of 5. Change '5' below to the max number of sections you want to allow.
        if (newNum == 10)
            $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        var dateNow = new Date();
        $('.date_obj').datetimepicker({format: 'MM/DD/YYYY HH:mm'});
        $('.snapTo').append('<li><a href="#" class="gotoItem" data-item="'+newNum+'">Hero Item '+newNum+'</a></li>');
        $('html, body').animate({
            scrollTop: $('#entry' + newNum).offset().top-60
        }, 500);
        $('.btn-group.bigboy').find('.divider').remove();
        $('.removeThisItem').parent().remove();
        $('.btn-group.bigboy').last().find('ul').append('<li class="divider"></li><li><a class="removeThisItem" href="javascript:;">Remove</a></li>');
    }
    function deleteItems(){
        if($('.clonedInput').length > 1) {
            if ($('#output').css('display') == 'block') {
                $('#output').css('display', 'none');
            }
            // Confirmation dialog box. Works on all desktop browsers and iPhone.
            if (confirm("Are you sure you wish to remove this section? This cannot be undone.")) {
                var num = $('.clonedInput').length;
                // how many "duplicatable" input fields we currently have
                $('#entry' + num).slideUp('slow', function () {
                    $(this).remove();
                    // if only one element remains, disable the "remove" button
                    if (num - 1 === 1)
                        $('.btnDel').attr('disabled', true);
                    // enable the "add" button
                    $('.btnAdd').attr('disabled', false).prop('value', "add section");
                });
                $('.snapTo').find('.gotoItem:last').remove()
            }
            return false; // Removes the last section you added
        }else{
            alert('You cannot remove the first Hero Item.')
        }
    }
    function validateJSON(){
        $("#output_code").validateJSON({
            compress: false,
            reformat: true,
            onSuccess: function (json) {
                $('.overlay_message').css('display','inline-block').html('JSON Code is valid');
            },
            onError: function (error) {
                $('.overlay_message').css('display','inline-block').html('A JSON error has been encountered. The line on which the error has occured is highlighted.');
            }
        })
    }
    function errorHandler(){
        var errorLog = [],
            a = JSON.parse($('#output[data-reason="output"]').find('textarea').val()).hero,
            b = a.length,
            c = 0;
        for(var i =0;i<b;i++){
            if(a[i].date.start == ''){
                errorLog.push({form:(i+1),obj:"Start Date",prob:"No Value",elem:"objStart"});
                c++;
            }
            if(a[i].date.end == ''){
                errorLog.push({form:(i+1),obj:"End Date",prob:"No Value",elem:"objEnd"});
                c++;
            }
            if(a[i].title.en == ''){
                errorLog.push({form:(i+1),obj:"English Title",prob:"No Value",elem:"objTitleEN"});
                c++;
            }
            if(a[i].title.fr == ''){
                errorLog.push({form:(i+1),obj:"French Title",prob:"No Value",elem:"objTitleFR"});
                c++;
            }
            if(a[i].text.en == ''){
                errorLog.push({form:(i+1),obj:"English Text",prob:"No Value",elem:"objTextEN"});
                c++;
            }
            if(a[i].text.fr == ''){
                errorLog.push({form:(i+1),obj:"French Text",prob:"No Value",elem:"objTextFR"});
                c++;
            }
            if(a[i].button.label.en == ''){
                errorLog.push({form:(i+1),obj:"English Button Label",prob:"No Value",elem:"objButtonEN"});
                c++;
            }
            if(a[i].button.label.fr == ''){
                errorLog.push({form:(i+1),obj:"French Button Label",prob:"No Value",elem:"objButtonFR"});
                c++;
            }
            if(a[i].button.url == ''){
                errorLog.push({form:(i+1),obj:"Button URL",prob:"No Value",elem:"objButtonLink"});
                c++;
            }
            if(a[i].image.url == ''){
                errorLog.push({form:(i+1),obj:"Image URL",prob:"No Value",elem:"objImageMain"});
                c++;
            }
        }
        if(c > 0) {
            $('.errorList').css('display','inline-block');
            $('.errorListing').empty();
            for (var j = 0; j < errorLog.length; j++) {
                $('.errorListing').prepend('<li><a href="javascript:;" class="errorItem" data-item="'+j+'">Hero Item ' + errorLog[j].form + ' : ' + errorLog[j].obj + ' : ' + errorLog[j].prob + '</a></li>');
                registerErrorButtons(errorLog[j].form,errorLog[j].elem,j,errorLog[j].prob);
            }
            $('.errorList').find('button').html('Warnings<span class="label label-default numerrors">'+errorLog.length+'</span><span class="caret"></span>');
        }else{
            $('.errorList').css('display','none');
        }
    }
    function registerErrorButtons(num,elem,item,prob){
        $('body').on('click','.errorItem[data-item="'+item+'"]',function(){
            $('#entry'+num).find('.'+elem).css('background-color','rgba(238, 162, 54, 0.3)');
            $('#output').hide();
            $('html,body').css('overflow','auto');
            $('html, body').animate({
                scrollTop: $('#entry' + num+' .'+elem).offset().top-100
            }, 500);
            if($('.'+elem).parent().attr('class') !== 'input_holders'){
                $('.'+elem).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="'+prob+'"><span class="glyphicon glyphicon-exclamation-sign"></span></div>')
            }
        });
    }
    function traverseJSON(){
        if($('.blackify_overlay textarea').val() !== '') {
            var ctc = $('.blackify_overlay textarea').val(),
                prs = JSON.parse(ctc),
                obj = prs.hero,
                len = obj.length,
                formItems = $('.clonedInput').length,
                formArray = [];
            if(formItems < len){
                var build = true,
                    bItems = len-formItems;
            }
            for(var h = 0;h<bItems;h++){
                addItems();
            }
            for (var i = 0; i < len; i++) {
                formArray.push(obj[i]);
            }
            jsonToForm(formArray);
        }else{
            alert('Please generate or paste JSON before using this function')
        }
    }
    function jsonToForm(aCode){
        var jsLen = aCode.length;
        for(var i = 0;i<jsLen;i++){
            var jsForm = 'entry'+(i+1);
            $this = '#'+jsForm;
            $($this).find('.objStart').val(aCode[i].date.start);
            $($this).find('.objEnd').val(aCode[i].date.end);
            $($this).find('.objTitleEN').val(aCode[i].title.en);
            $($this).find('.objTitleFR').val(aCode[i].title.fr);
            $($this).find('.objTitleCol').val(aCode[i].title.color);
            $($this).find('.objTextEN').val(aCode[i].text.en);
            $($this).find('.objTextFR').val(aCode[i].text.fr);
            $($this).find('.objImageMain').val(aCode[i].image.url);
            $($this).find('.objImageAlt').val(aCode[i].image.altUrl);
            $($this).find('.objButtonEN').val(aCode[i].button.label.en);
            $($this).find('.objButtonFR').val(aCode[i].button.label.fr);
            $($this).find('.objButtonLink').val(aCode[i].button.url);
            $($this).find('.objButtonPopup option[value="'+aCode[i].popUpLink+'"]').attr('selected',true);
            $($this).find('.objButtonPopupLink option[value="'+aCode[i].button.popUpLinkID+'"]').attr('selected',true);
            $($this).find('.objCountdownShow option[value="'+aCode[i].showCountdown+'"]').attr('selected',true);
            //$($this).find('.objHeroTitleShow').val(aCode[i].showTitle);
            //$($this).find('.objHeroSubtitleShow').val(aCode[i].showSubTitle);
            $($this).find('.objHeroPromote option[value="'+aCode[i].promote+'"]').attr('selected',true);
            if($('#output').css('display') == 'block'){
                $('#output').hide();
                $('html,body').css('overflow','auto');
            }
            $('html,body').css('overflow','auto');
        }
    }
    function prepareJSON(){
        var c = [];
        var len = $('.clonedInput form').length;
        for(var i=0;i<len;i++){
            var a = $('#entry'+(i+1)+' form').serializeArray();
            c.push(a);
        }
        outputJson(c);
    }
    function outputJson(aCode){
        var nodes = aCode.length;
        var lastItem = nodes-1;
        var page_model='{\n    "hero": [\n';
        for(var i=0;i<nodes;i++){
            //mapping
            if(aCode[i][14].value == '' || aCode[i][14].value == null || aCode[i][14].value == undefined){
                var elemA = true;
            }else{
                elemA = aCode[i][14].value;
            }
            if(aCode[i][15].value == '' || aCode[i][15].value == null || aCode[i][15].value == undefined){
                var elemAA = true;
            }else{
                elemAA = aCode[i][15].value;
            }
            if(aCode[i][16].value == '' || aCode[i][16].value == null || aCode[i][16].value == undefined){
                var elemAAA = true;
            }else{
                elemAAA = aCode[i][16].value;
            }
            if(aCode[i][12].value == '' || aCode[i][12].value == null || aCode[i][12].value == undefined){
                var elemB = false;
            }else{
                elemB = aCode[i][12].value;
            }
            if(aCode[i][17].value == '' || aCode[i][17].value == null || aCode[i][17].value == undefined){
                var elemC = false;
            }else{
                elemC = aCode[i][17].value;
            }
            if(aCode[i][18] !== undefined) {
                if (aCode[i][18].value == '' || aCode[i][18].value == null || aCode[i][18].value == undefined) {
                    var elemD = true;
                } else {
                    elemD = aCode[i][18].value;
                }
            }else{
                elemD = true;
            }
            page_model += '{\n        "heroId": "hero-elem'+i+'",';
            page_model += '\n        "active": '+elemD+',';
            page_model += '\n        "showCountdown": '+elemA+',';
            page_model += '\n        "popUpLink": '+elemB+',';
            page_model += '\n        "date": {';
            page_model += '\n          "start": "'+aCode[i][0].value+'",';
            page_model += '\n          "end": "'+aCode[i][1].value+'"';
            page_model += '\n        },';
            page_model += '\n        "title": {';
            page_model += '\n          "en": "'+aCode[i][2].value.trim()+'",';
            page_model += '\n          "fr": "'+aCode[i][3].value.trim()+'",';
            page_model += '\n          "color": "'+aCode[i][4].value+'",';
            page_model += '\n          "showTitle": '+elemAA;
            page_model += '\n        },';
            page_model += '\n        "text": {';
            page_model += '\n          "en": "'+aCode[i][5].value.trim()+'",';
            page_model += '\n          "fr": "'+aCode[i][6].value.trim()+'",';
            page_model += '\n          "showSubTitle": '+elemAAA;
            page_model += '\n        },';
            page_model += '\n        "promote": '+elemC+',';
            page_model += '\n        "button": {';
            page_model += '\n          "label": {';
            page_model += '\n            "en": "'+aCode[i][9].value.trim()+'",';
            page_model += '\n            "fr": "'+aCode[i][10].value.trim()+'"';
            page_model += '\n          },';
            page_model += '\n        "url": "'+aCode[i][11].value+'",';
            page_model += '\n        "popUpLinkID": "'+aCode[i][13].value+'"';
            page_model += '\n        },';
            page_model += '\n        "image": {';
            page_model += '\n          "url": "'+aCode[i][7].value+'",';
            page_model += '\n          "altUrl": "'+aCode[i][8].value+'"';
            page_model += '\n        }';
            if(i<lastItem){
                page_model += '\n},\n';
            }
        }
        page_model += '\n      }\n   ]\n}';
        if($('#help').css('display') == 'block'){
            $('#help').css('display','none');
        }
        if($('#html-zone').css('display') == 'block'){
            $('#html-zone').css('display','none');
        }
        $('#output').attr('data-reason','output');
        $('#output').css('display','block');
        $('#output textarea').val(page_model);
        $("html, body").animate({ scrollTop: 0 }, 500).css('overflow','hidden');
        errorHandler()
    }
    function urlExists(testUrl) {
        var http = jQuery.ajax({
            type:"HEAD",
            url: 'https:' + testUrl,
            async: false
        });
        return http.status;
        // this will return 200 on success, and 0 or negative value on error
    }
    function validateImage(type,handler){
        if(type == 'main'){
            var a = $('.check_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val(),
                aa = $('.check_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image'),
                aaa = $('.check_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class');
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }else {
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b == 200) {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }else {
                        $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if(aaa == 'input_holders'){
                        $(aa).next().next().attr('style', '').html('Shopify CDN');
                    }else {
                        $(aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            }else{
                if(aaa == 'input_holders') {
                    $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                }else {
                    $(aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }else if(type == 'alt'){
            var a = $('.check_alt_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val(),
                aa = $('.check_alt_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image'),
                aaa = $('.check_alt_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class');
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }else{
                        $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                    }
                } else if (b == 200) {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }else {
                        $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    }
                } else {
                    if(aaa == 'input_holders') {
                        $(aa).next().next().attr('style', '').html('Shopify CDN');
                    }else {
                        $(aa).next().attr('style', '').html('Shopify CDN');
                    }
                }
            }else{
                if(aaa == 'input_holders') {
                    $(aa).next().next().css('background-color', '#eee').html('Nothing to validate');
                }else {
                    $(aa).next().css('background-color', '#eee').html('Nothing to validate');
                }
            }
        }
    }
    function previewFeature(heroItem){
        var dt = $('#entry'+heroItem).find('form').serializeArray(),
            start = dt[0].value,
            img = dt[7].value,
            titleColor = dt[4].value,
            titleText = dt[2].value,
            subTitleText = dt[5].value,
            buttonLabel = dt[9].value,
            buttonLink = dt[11].value,
            container = '#html-zone',
            target = '.render_output';
        var outputString = '<div data-instance="slide-0" data-str="'+img+'"';
            outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"';
            outputString += ' style="background-image: url('+img+'); background-position: 50% -55.2631578947369px;"><div class="hsContainer"><div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1" data-25-top="opacity: 0" data-anchor-target="#slide-0 .animated" style="opacity: 1;">';
            outputString += '<div itemscope="" itemtype="http://schema.org/Event" class="animated fadeIn delay-025s hero_head"><p itemprop="startDate" content="'+start+'" class="subtitle timedown is-countdown" id="countdown0" style="opacity:0.9"><span>Ends In  <b>11:29:39</b> </span></p>';
            outputString += '<h1 class="headline herobanner" style="'+titleColor+'">'+titleText+'</h1><p class="subtitle herobanner">'+subTitleText+'</p><a data-bleed="" href="'+buttonLink+'" class="action_button hero"><span class="trn" data-trn-key="">'+buttonLabel+'</span></a></div></div></div></div></div>';
        $(container).show();
        $(target).empty().append(outputString);
        }
    $('.btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('.btnDel').attr('disabled', true);
    $('body').on('click','.btnAdd',function () {
        addItems();
    }).on('click','.overlay_close',function(){
        $(this).parent().parent().hide();
        $('html,body').css('overflow','auto');
        $('.overlay_message').css('display','none')
    }).on('click','.select_content',function() {
        var $this = $('.blackify_overlay textarea');
        $this.select();
        // Work around Chrome's little problem
        $this.mouseup(function() {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    }).on('click','.gotoItem',function (){
        var a = $(this).data('item');
        $('html, body').animate({
            scrollTop: $('#entry' + a).offset().top-60
        }, 500);
        if($('#output').css('display')=='block'){
            $('html,body').css('overflow','auto');
            $('#output').css('display','none')
        }
        if($('#help').css('display') == 'block'){
            $('#help').css('display','none');
        }
    }).on('click','.about_app',function (e){
        window.open("http://davidemaser.github.io/pgd/release.html", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    }).on('click','.check_image',function(){
        var a = $(this).data('handler');
        validateImage('main',a);
    }).on('click','.check_alt_image',function(){
        var a = $(this).data('handler');
        validateImage('alt',a);
    }).on('click','.overlay_validate',function(){
        validateJSON();
    }).on('click','.previewItem.large',function(){
        $("html, body").animate({ scrollTop: 0 }, 500).css('overflow','hidden');
        var a = $(this).data('hero');
        previewFeature(a);
    }).on('click','.removeThisItem',function(){
        deleteItems();
    }).on('change','.input_radio',function(){
        var a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry','');
        if($(this).val()=='true'){
            $(this).parent().parent().css('border-left','6px solid #68B81F');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass('label-default');
            $('.gotoItem[data-item="'+a+'"]').removeClass('redout').attr('title','');
        }else{
            $(this).parent().parent().css('border-left','6px solid #FD0000');
            $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass('label-danger');
            $('.gotoItem[data-item="'+a+'"]').addClass('redout').attr('title','This Hero entry is not activated');
        }
    }).on('click','.copy-zone',function(){
        OpenInNewTab('https://github.com/davidemaser/');
    }).on('click','.showHelp',function(){
        $('#help').toggle();
        $("html, body").animate({ scrollTop: 0 }, 500);
        if($('#output').css('display') == 'block'){
            $('#output').css('display','none');
        }
        if($('#html-zone').css('display') == 'block'){
            $('#html-zone').css('display','none');
        }
    }).on('click','.help_close',function(){
        if($('#help').css('display') == 'block'){
            $(this).parent().parent().hide();
        }
    }).on('click','.renderer_close',function(){
        if($('#html-zone').css('display') == 'block'){
            $(this).parent().parent().hide();
            $('html,body').css('overflow','auto');
        }
    }).on('click','.btnDel',function () {
        deleteItems();
    }).on('click','.submit_json',function (){
        prepareJSON();
    }).on('click','.translate_json',function (){
        $('.overlay_message').html('');
        $("html, body").animate({ scrollTop: 0 }, 500).css('overflow','hidden');
        $('#output').attr('data-reason','translate').css('display','block').find('#output_code').val('').attr('placeholder','Paste you code here');
    }).on('click','.overlay_translate',function (){
        traverseJSON();
    }).on('click','.errors_reset',function (){
        $('input,select').attr('style','');
        $('.errorList').css('display','none');
        $('html,body').css('overflow','auto');
        $('.input_holders').find('.input_alerts').remove();
        $('.input_holders').contents().unwrap();
    }).on('click','input,select',function(){
        $(this).attr('style','');
        if($(this).parent().hasClass('input_holders')) {
            $(this).parent().find('.input_alerts').remove();
            $(this).unwrap();
        }
    }).on('click','.settings_toggle',function(){
        var a = $(this).data('theme');
        $('html').attr('data-theme',a);
        if(window.localStorage) {
            localStorage.setItem('pgb_Theme', a);
        }
    }).on('keyup','input',function(){
        var a = $(this).val().length;
        if($(this).hasClass('objTitleEN') || $(this).hasClass('objTitleFR') || $(this).hasClass('objTextEN') || $(this).hasClass('objTextFR')){
            var compLen = 35;
        }else if($(this).hasClass('objButtonEN') || $(this).hasClass('objButtonFR')){
            compLen = 15;
        }
        if(a > compLen){
            if($(this).parent().attr('class')!=='input_holders') {
                $(this).wrap('<div class="input_holders"></div>').parent().append('<div class="input_alerts" title="The length of your text may be too long for the hero banner container. Make sure to check that it displays correctly."><span class="glyphicon glyphicon-exclamation-sign"></span></div>');
                $(this).focus();
            }
        }else{
            if(a <= compLen){
                if($(this).parent().attr('class')=='input_holders') {
                    $(this).parent().find('.input_alerts').remove();
                    $(this).unwrap();
                    $(this).focus();
                }
            }
        }
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            $('.copy-zone').fadeIn(500);
        }else{
            $('.copy-zone').fadeOut(500);
        }
    });
    $(document).keydown(function(e) {
        if (e.keyCode == 71 && e.ctrlKey) {
            prepareJSON();
            e.preventDefault();
        }
        if (e.keyCode == 82 && e.ctrlKey) {
            deleteItems();
            e.preventDefault();
        }
        if (e.keyCode == 73 && e.ctrlKey) {
            addItems();
            e.preventDefault();
        }
        if (e.keyCode == 191 && e.ctrlKey) {
            window.open("http://davidemaser.github.io/pgd/release.html", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
            e.preventDefault();
        }
    });
    function launchBats(){
        var r = Math.random,
            n = 0,
            d = document,
            w = window,
            i = d.createElement('img'),
            z = d.createElement('div'),
            zs = z.style,
            a = w.innerWidth * r(),
            b = w.innerHeight * r();
        z.className = 'oooobats';
        zs.position = "fixed";
        zs.left = 0;
        zs.top = 0;
        zs.opacity = 0;
        z.appendChild(i);
        i.src = 'data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs=';
        d.body.appendChild(z);

        function R(o, m) {
            return Math.max(Math.min(o + (r() - .5) * 400, m - 50), 50)
        }

        function A() {
            var x = R(a, w.innerWidth),
                y = R(b, w.innerHeight),
                d = 5 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y));
            zs.opacity = n;
            n = 1;
            zs.transition = zs.webkitTransition = d / 1e3 + 's linear';
            zs.transform = zs.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
            i.style.transform = i.style.webkitTransform = (a > x) ? '' : 'scaleX(-1)';
            a = x;
            b = y;
            setTimeout(A, d);
        }
        setTimeout(A, r() * 3e3);
    }
    function killBats(){
        $('.oooobats').remove();
        $('.app_batsToggle').attr('data-status','allGone').html('Let In The Bats');
    }
    var d = new Date();
    var dt = d.getDate(),
        dm = d.getMonth()+1;
    if(dm == 10 && dt > 21) {
        $('.main_nav').append('<li class="divider"></li><li><a href="#" class="app_batsToggle" data-status="active">Kill The Bats</a></li>');
        $('body').on('click','.app_batsToggle',function(){
            if($(this).data('status') == 'active') {
                killBats();
            }else if($(this).data('status') == 'allGone') {
                launchBats();
                launchBats();
                launchBats();
                launchBats();
                launchBats();
                $('.app_batsToggle').data('status','active').html('Kill The Bats');
            }
        });
        launchBats();
        launchBats();
        launchBats();
        launchBats();
        launchBats();
    }
});