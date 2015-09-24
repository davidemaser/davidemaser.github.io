/*
Author: Tristan Denyer (based on Charlie Griefer's original clone code, and some great help from Dan - see his comments in blog post)
Plugin repo: https://github.com/tristandenyer/Clone-section-of-form-using-jQuery
Demo at http://tristandenyer.com/using-jquery-to-duplicate-a-section-of-a-form-maintaining-accessibility/
Ver: 0.9.4.1
Last updated: Sep 24, 2014

The MIT License (MIT)

Copyright (c) 2011 Tristan Denyer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
$(function () {
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
        newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html('<span class="label label-default">HERO ITEM ' + newNum+'</span>');

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
        newElem.find('.label_radio').attr('for', 'ID' + newNum + '_radioitem');
        newElem.find('.input_radio').attr('id', 'ID' + newNum + '_radioitem').attr('name', 'ID' + newNum + '_radioitem').val([]);

        // Email - text
        newElem.find('.label_email').attr('for', 'ID' + newNum + '_email_address');
        newElem.find('.input_email').attr('id', 'ID' + newNum + '_email_address').attr('name', 'ID' + newNum + '_email_address').val('');

        // Twitter handle (for Bootstrap demo) - append and text
        newElem.find('.label_twt').attr('for', 'ID' + newNum + '_twitter_handle');
        newElem.find('.input_twt').attr('id', 'ID' + newNum + '_twitter_handle').attr('name', 'ID' + newNum + '_twitter_handle').val('');
        newElem.find('.check_image').attr('data-handler', newNum);

        // Insert the new element after the last "duplicatable" input field
        $('#entry' + num).after(newElem);
        $('#ID' + newNum + '_title').focus();

        // Enable the "remove" button. This only shows once you have a duplicated section.
        $('#btnDel').attr('disabled', false);

        // Right now you can only add 4 sections, for a total of 5. Change '5' below to the max number of sections you want to allow.
        if (newNum == 10)
            $('.btnAdd').attr('disabled', true).prop('value', "You've reached the limit"); // value here updates the text in the 'add' button when the limit is reached
        $('.date_obj').datetimepicker({format: 'DD/MM/YYYY HH:mm'});
        $('.snapTo').append('<li><a href="#" class="gotoItem" data-item="'+newNum+'">Hero Item '+newNum+'</a></li>');
        $('html, body').animate({
            scrollTop: $('#entry' + newNum).offset().top-60
        }, 500);
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
                $('.overlay_message').html('JSON Code is valid');
            },
            onError: function (error) {
                $('.overlay_message').html('A JSON error has been encountered. The line on which the error has occured is highlighted.');
            }
        })
    }
    $('body').on('click','.btnAdd',function () {
        addItems();
    }).on('click','.overlay_close',function(){
        $(this).parent().parent().hide();
        $('html,body').css('overflow','auto');
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
    }).on('click','.about_app',function (e){
        window.open("http://davidemaser.github.io/pgd/release.html", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    }).on('click','.check_image',function(){
        var a = $(this).data('handler');
        validateImage('main',a);
    }).on('click','.overlay_validate',function(){
        validateJSON();
    });

    function traverseJSON(){
        if($('.blackify_overlay textarea').val() !== '') {
            var ctc = $('.blackify_overlay textarea').val(),
                prs = JSON.parse(ctc),
                obj = prs.hero,
                len = obj.length,
                formItems = $('.clonedInput').length;
            if(formItems < len){
                var build = true,
                    bItems = len-formItems;
            }
            for(var h = 0;h<bItems;h++){
                addItems();
            }
            for (var i = 0; i < len; i++) {
                console.log(obj[i]);
            }
        }else{
            alert('Please generate or paste JSON before using this function')
        }
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
            page_model += '{\n        "hero-id": "hero-elem'+i+'",';
            page_model += '\n        "active": '+elemD+',';
            page_model += '\n        "showCountdown": '+elemA+',';
            page_model += '\n        "popUpLink": '+elemB+',';
            page_model += '\n        "date": {';
            page_model += '\n          "start": "'+aCode[i][0].value+'",';
            page_model += '\n          "end": "'+aCode[i][1].value+'"';
            page_model += '\n        },';
            page_model += '\n        "title": {';
            page_model += '\n          "en": "'+aCode[i][2].value+'",';
            page_model += '\n          "fr": "'+aCode[i][3].value+'",';
            page_model += '\n          "color": "'+aCode[i][4].value+'"';
            page_model += '\n        },';
            page_model += '\n        "text": {';
            page_model += '\n          "en": "'+aCode[i][5].value+'",';
            page_model += '\n          "fr": "'+aCode[i][6].value+'"';
            page_model += '\n        },';
            page_model += '\n        "promote": '+elemC+',';
            page_model += '\n        "button": {';
            page_model += '\n          "label": {';
            page_model += '\n            "en": "'+aCode[i][9].value+'",';
            page_model += '\n            "fr": "'+aCode[i][10].value+'"';
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
        $('#output').css('display','block');
        $('#output textarea').val(page_model);
        $("html, body").animate({ scrollTop: 0 }, 500).css('overflow','hidden');
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
            var a = $('.check_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val();
            var aa = $('.check_image[data-handler="'+handler+'"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image');
            console.log(a);
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                } else if (b == 200) {
                    $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                } else {
                    $(aa).next().attr('style', '').html('Shopify CDN');
                }
            }
        }else if(type == 'alt'){
            var a = $('#alt_image_gl').val().replace('https:','').replace('http:','');
            if(a !== '') {
                var b = urlExists(a);
                if (b !== 200) {
                    $('#alt_image_gl').css('background-color', 'rgba(255, 51, 0, 0.2)');
                    $('.alt_image_count').css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
                } else if (b == 200) {
                    $('.alt_image_count').attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
                    $('#alt_image_gl').attr('style', '');
                } else {
                    $('.alt_image_count').attr('style', '').html('Shopify CDN');
                }
            }
        }
    }

    $('.btnDel').click(function () {
        deleteItems();
    });
    $('.submit_json').click(function (){
        var c = [];
        var len = $('.clonedInput form').length;
        for(var i=0;i<len;i++){
            var a = $('#entry'+(i+1)+' form').serializeArray();
            c.push(a);
        }
        outputJson(c);
    });
    $('.translate_json').click(function (){
        traverseJSON();
    });
    // Enable the "add" button
    $('.btnAdd').attr('disabled', false);
    // Disable the "remove" button
    $('.btnDel').attr('disabled', true);
});