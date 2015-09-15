/*
 David Maser 2015 -64.2
 Date : June 22 2015

 */
function urlExists(testUrl) {
    var http = jQuery.ajax({
        type:"HEAD",
        url: 'https:' + testUrl,
        async: false
    });
    return http.status;
    // this will return 200 on success, and 0 or negative value on error
}
function shoppifyCreatePage(){
    jQuery.post('https://1b86c025540a1c7acf215c1bb2b6eb21:8337d12669193f8ed77d55a5703fcc31@lasthunt.myshopify.com/admin/pages.json',
        {
            "page": {
                "title": "Testing A Page",
                "body_html": "<h1>Just a page test</h1>"
            }
        });
}
function validateImage(type){
if(type == 'main'){
    var a = $('#image_gl').val();
    if(a !== '') {
        	var b = urlExists(a);
        if (b !== 200) {
            $('#image_gl').css('background-color', 'rgba(255, 51, 0, 0.2)');
            $('.image_count').css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html('Image does not exist');
        } else if (b == 200) {
            $('.image_count').attr('style', '').css('background-color', 'rgb(82, 197, 82)').html('Image validated');
            $('#image_gl').attr('style', '');
        } else {
            $('.image_count').attr('style', '').html('Shopify CDN');
        }
    }
}else if(type == 'alt'){
    var a = $('#alt_image_gl').val();
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
function showLineBreaks(val) {
    var obj = '#content_value';
    if(val == 'a'){
        var a = $(obj).val(),
        b = a.replace(/<div/g,'\n<div').replace(/<\/div><\/div>/g,'</div>\n</div>'),
        c = b.replace('<div id="start_date">','   <div id="start_date">').replace('<div id="end_date">','   <div id="end_date">').replace('<div id="show_count">','   <div id="show_count">').replace('<div id="ongoing_event">','   <div id="ongoing_event">').replace('<div id="popup_link">','   <div id="popup_link">').replace(/<div class="event-active-bg">/g,'   <div class="event-active-bg">').replace(/<div class="event-active-content">/g,'   <div class="event-active-content">').replace(/<p class="headline">/g,'\n         <p class="headline">').replace(/<p class="subtitle">/g,'\n         <p class="subtitle">').replace(/<\/p><\/div>/g,'</p>\n</div>').replace('|-|','\n|-|');
        $(obj).val(c.replace('\n',''));
    }else{
        var a = $(obj).val().replace(/\n/g,'').replace(/> /g,'>').replace(/>        /g,'>').replace(/>  /g,'>'); $('#content_value').val(a);
    }
}
function resetErrors(){
    $('.label:not(.error_message):not(.warning_message)').removeClass('label-warning').removeClass('label-danger').addClass('label-default');
    $('.badge').remove();$('.panel-heading').find('.label-info').remove();
    $('.input-group-addon').attr('style','');
    $('.date_starts,.date_ends').html('Strict date format');
    $('.en_title_count,.fr_title_count,.en_subtitle_count,.fr_subtitle_count').html('30 characters max');
    $('.en_btlabel_count,.fr_btlabel_count').html('18 characters max');
    $('#image_gl').attr('style','');
    $('.image_count').html('Shopify CDN');
}
function errorViewer(){
    var pg = '#pageBuilder',
        ctobj = '#content_value',
        erobj = '.error_message',
        waobj = '.warning_message';
    $(pg).find('span.label').removeClass('label-danger').addClass('label-default');
    $(pg).find('span.label').removeClass('label-warning').addClass('label-default');
    $('.label-info').remove();
    $('span.badge').remove();
    var err = [],
    warn = [],
    log = [],
    wog = [],
    ct = $(ctobj).val(),
    ctEN = $(ctobj).val().split('|-|')[0],
    ctFR = $(ctobj).val().split('|-|')[1],
    eK1 = ct.split('<div id="start_date">')[1],
    e1 = eK1.split('</div>')[0].length,
    eK2 = ct.split('<div id="end_date">')[1],
    e2 = eK2.split('</div>')[0].length;
    if(ctEN.indexOf('#ee3600;') > -1){
        var eK3 = ctEN.split('<p class="headline" style="color:#ee3600;">')[1];
        var e3 = eK3.split('</p>')[0].length;
    }else if(ctEN.indexOf('#000;') > -1){
            eK3 = ctEN.split('<p class="headline" style="color:#000;">')[1];
            e3 = eK3.split('</p>')[0].length;
    }else if(ctEN.indexOf('#9bd000;') > -1){
            eK3 =ctEN.split('<p class="headline" style="color:#9bd000;">')[1];
            e3 = eK3.split('</p>')[0].length;
    }else if(ctEN.indexOf('#fff;') > -1){
        eK3 = ctEN.split('<p class="headline">')[1];
        e3 = eK3.split('</p>')[0].length;
    }else {
        eK3 = ctEN.split('<p class="headline">')[1];
        e3 = eK3.split('</p>')[0].length;
    }
    var eK4 = ctEN.split('<p class="subtitle">')[1],
    e4 = eK4.split('</p>')[0].length,
    eK5 = ctEN.split('<img src="')[1],
    e5 = eK5.split('" />')[0].length,
    e5L = eK5.split('" />')[0],
    eK6 = ctEN.split('href="')[1],
    e6 = eK6.split('"')[0].length,
    eK7 = ctEN.split('class="action_button">')[1],
    e7 = eK7.split('</a>')[0].length;
    if(ctFR.indexOf('#ee3600;') > -1){
        var fK3 = ctFR.split('<p class="headline" style="color:#ee3600;">')[1];
        var f3 = fK3.split('</p>')[0].length;
    }else if(ctFR.indexOf('#000;') > -1){
        fK3 = ctFR.split('<p class="headline" style="color:#000;">')[1];
        f3 = fK3.split('</p>')[0].length;
    }else if(ctFR.indexOf('#9bd000;') > -1){
        fK3 =ctFR.split('<p class="headline" style="color:#9bd000;">')[1];
        f3 = fK3.split('</p>')[0].length;
    }else if(ctFR.indexOf('#fff;') > -1){
        fK3 = ctFR.split('<p class="headline">')[1];
        f3 = fK3.split('</p>')[0].length;
    }else {
        fK3 = ctFR.split('<p class="headline">')[1];
        f3 = fK3.split('</p>')[0].length;
    }
    var fK4 = ctFR.split('<p class="subtitle">')[1],
    f4 = fK4.split('</p>')[0].length,
    fK7 = ctFR.split('class="action_button">')[1],
    f7 = fK7.split('</a>')[0].length;
    if(e1 == 0){
        err.push('No Start Date');
        log.push('start_date');
    }
    if(e2 == 0){
        err.push('No End Date');
        log.push('end_date');
    }
    if(e3 == 0){
        warn.push('No English Title');
        wog.push('title_en');
    }
    if(e3 > 30){
        warn.push('English Title is too long');
        wog.push('title_en');
    }
    if(f3 == 0){
        warn.push('No French Title');
        wog.push('title_fr');
    }
    if(f3 > 30){
        warn.push('French Title is too long');
        wog.push('title_fr');
    }
    if(e4 == 0){
        warn.push('No English Subtitle');
        wog.push('subtitle_en');
    }
    if(e4 > 30){
        warn.push('English Subtitle is too long');
        wog.push('subtitle_en');
    }
    if(f4 == 0){
        warn.push('No French Subtitle');
        wog.push('subtitle_fr');
    }
    if(f4 > 30){
        warn.push('French Subtitle is too long');
        wog.push('subtitle_fr');
    }
    if(e5 == 0 || e5L == 'undefined'){
        err.push('Image is missing');
        log.push('image_gl');
    }
    if(e6 == 0){
        warn.push('Button link is missing');
        wog.push('button_link_gl');
    }
    if(e7 < 3){
        err.push('English button label is missing');
        log.push('button_label_en');
    }
    if(e7 > 18){
        warn.push('English button label is too long');
        wog.push('button_label_en');
    }
    if(f7 < 3){
        err.push('French button label is missing');
        log.push('button_label_fr');
    }
    if(f7 > 18){
        warn.push('French button label is too long');
        wog.push('button_label_fr');
    }
    if(err.length == 0){
        $('.error_message').css('opacity','0');
        $('.error_bubble').empty();
    }else{
        $('<span class="badge">'+err.length+'</span>&nbsp;&nbsp;').insertBefore($('.action_utilities').find('span'));
        $(erobj).mouseover(function(){
            $('.error_bubble').show();
        });
        $(erobj).mouseout(function(){
            $('.error_bubble').hide();
        });
        if(err.length > 1){
            var er_show = '';
            for(i=0;i<err.length;i++){
                er_show += err[i]+'<br />';
            }
            $('.error_bubble').html(er_show);
        }else{
            $('.error_bubble').html(err);
        }
        $(erobj).css('opacity','1');
        var err_mess = '<span class="glyphicon glyphicon-remove-sign" aria-hidden="true"></span>';
        err_mess += err.length+' error';
        if(err.length > 1) {
            err_mess += 's';
        }
        $(erobj).html(err_mess);
    }
    if(warn.length == 0){
        $('.warning_message').css('opacity','0');
        $('.warning_bubble').empty();
    }else{
        $(waobj).mouseover(function(){
            $('.warning_bubble').show();
        });
        $(waobj).mouseout(function(){
            $('.warning_bubble').hide();
        });
        if(warn.length > 1){
            var warn_show = '';
            for(i=0;i<warn.length;i++){
                warn_show += warn[i]+'<br />';
            }
            $('.warning_bubble').html(warn_show);
        }else{
            $('.warning_bubble').html(warn);
        }
        $(waobj).css('opacity','1');
        var warn_mess = '<span class="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>';
        warn_mess += warn.length+' warning';
        if(warn.length > 1) {
            warn_mess += 's';
        }
        $(waobj).html(warn_mess);
    }
    for(i=0;i<log.length;i++){
        $('#'+log[i]).parent().parent().find('.label').removeClass('label-default').addClass('label-danger');
        $('<span class="label label-info" title="'+err[i]+'"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></span>').insertAfter($('#'+log[i]).parent().parent().find('.label').first());
    }
    for(i=0;i<wog.length;i++){
        $('#'+wog[i]).parent().parent().find('.label').removeClass('label-default').addClass('label-warning');
        //$('<span class="label label-info"><span class="glyphicon glyphicon-arrow-left" aria-hidden="true"></span></span>').insertAfter($('#'+log[i]).parent().parent().find('.label').first());
    }

}
function appendTimer(mode) {
    var a = $('.subtitle.timedown.is-countdown').length;
    if (a == 0) {
        if (mode == 'add') {
            var ctc = '<div itemprop="startDate" content="2015-05-22T11:00:00-06:00" class="b_line_exo is-countdown"><span>starts in <b>2<span class="force_lower"> days</span> 22:22:22</b> </span></div>';
            $('#html-view').append(ctc);
        } else if (mode == 'rem') {
            $('.b_line_exo').remove();
        }
    }
}
function checkOngoing(){
    var dd = '.dropdown-menu',
    ct = $('#content_value').val();
    if(ct.indexOf('<div id="ongoing_event">') > -1) {
        var a = ct.split('<div id="ongoing_event">')[1],
        b = a.split('</div>')[0];
    }else{
        b = 'false';
    }
    if(b == 'true'){
        $(dd).find('li:nth-child(1)').hide();
        $(dd).find('li:nth-child(2)').hide();
        $(dd).find('li:nth-child(3)').hide();
    }else{
        $(dd).find('li:nth-child(1)').show();
        $(dd).find('li:nth-child(2)').show();
        $(dd).find('li:nth-child(3)').show();
    }
}
function txtLengthCounter(){
    var en_sd = $('#start_date').val().length;
    if(en_sd==0){
        $('.date_starts').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Can\'t be empty');
    }else {
        $('.date_starts').attr('style','').html('Strict date format');
    }

    var en_ed = $('#end_date').val().length;
    if(en_ed<1){
        $('.date_ends').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Can\'t be empty');
    }else {
        $('.date_ends').attr('style','').html('Strict date format');
    }

    var en_t = $('#title_en').val().length,
    en_t_limit = 30;
    if(en_t>en_t_limit){
        $('.en_title_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((en_t_limit-en_t) > 1 || (en_t_limit-en_t) == 0){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.en_title_count').attr('style','').html(en_t_limit-en_t + ' '+trailing+' remaining');
    }

    var fr_t = $('#title_fr').val().length,
    fr_t_limit = 30;
    if(fr_t>fr_t_limit){
        $('.fr_title_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((fr_t_limit-fr_t) > 1 || (fr_t_limit-fr_t) == 0){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.fr_title_count').attr('style','').html(fr_t_limit-fr_t + ' '+trailing+' remaining');
    }

    var en_s = $('#subtitle_en').val().length,
    en_s_limit = 30;
    if(en_s>en_s_limit){
        $('.en_subtitle_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((en_s_limit-en_s) > 1 || (en_s_limit-en_s) == 0){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.en_subtitle_count').attr('style','').html(en_s_limit-en_s + ' '+trailing+' remaining');
    }

    var fr_s = $('#subtitle_fr').val().length,
    fr_s_limit = 30;
    if(fr_s>fr_s_limit){
        $('.fr_subtitle_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((fr_s_limit-fr_s) > 1 || (fr_s_limit-fr_s) == 0){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.fr_subtitle_count').attr('style','').html(fr_s_limit-fr_s + ' '+trailing+' remaining');
    }

    var en_l = $('#button_label_en').val().length,
    en_l_limit = 18;
    if(en_l>en_l_limit){
        $('.en_btlabel_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((en_l_limit-en_l) > 1 || (en_l_limit-en_l) == 0){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.en_btlabel_count').attr('style','').html(en_l_limit-en_l + ' '+trailing+' remaining');
    }

    var fr_l = $('#button_label_fr').val().length,
    fr_l_limit = 18;
    if(fr_l>fr_l_limit){
        $('.fr_btlabel_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
    }else {
        if((fr_l_limit-fr_l) > 1){
            var trailing = 'characters';
        }else{
            trailing = 'character';
        }
        $('.fr_btlabel_count').attr('style','').html(fr_l_limit-fr_l + ' '+trailing+' remaining');
    }

}
function getContent(){
    try{
        if($('#unclosed-tag-finder-input').val() !== ''){
            var a = $('#unclosed-tag-finder-input').val(),
            a_clean = a.replace(/(\r\n|\n|\r)/gm,"").replace(/&amp;/g,'&').replace(/&gt;/g,'>').replace(/&apos;/g,"\'"),
            b_EN = a_clean.split('|-|')[0],
            b_FR = a_clean.split('|-|')[1],
            c = b_EN,
            d = c.split('<div id="event-active-today">')[0],
            d_str1 = d.split('<div id="start_date">')[1],
            d_ob1 = d_str1.split('</div>')[0],
            d_str2 = d.split('<div id="end_date">')[1],
            d_ob2 = d_str2.split('</div>')[0],
            d_str3 = d.split('<div id="show_count">')[1],
            d_ob3 = d_str3.split('</div>')[0],
            d_str4 = d.split('<div id="ongoing_event">')[1],
            d_ob4 = d_str4.split('</div>')[0];
            if(d_ob4 == ''){
                d_ob4 = 'false';
            }
            d_str44 = d.split('<div id="promote_hero">')[1],
            d_ob44 = d_str44.split('</div>')[0];
            if(d_ob44 == ''){
                d_ob44 = 'false';
            }
            var d_str5 = d.split('<div id="popup_link">')[1];
            var d_ob5 = d_str5.split('</div>')[0];

            if(d.indexOf('<div id="show_title">') > -1) {
                var d_str6 = d.split('<div id="show_title">')[1];
                var d_ob6 = d_str6.split('</div>')[0];
                if (d_ob6 == '') {
                    d_ob6 = 'true';
                }
            }else{
                d_ob6 = 'true';
            }

 if(d.indexOf('<div id="alt_image">') > -1) {
                var d_str66 = d.split('<div id="alt_image">')[1];
                var d_ob66 = d_str66.split('</div>')[0];
            }else{
                d_ob66 = '';
            }

            if(d.indexOf('<div id="show_subtitle">') > -1) {
                var d_str7 = d.split('<div id="show_subtitle">')[1];
                var d_ob7 = d_str7.split('</div>')[0];
                if (d_ob7 == '') {
                    d_ob7 = 'true';
                }
            }else{
                d_ob7 = 'true';
            }

            var e = c.split('<div id="event-active-today">')[1],
            e_str1 = e.split('<div class="event-active-bg"><img src="')[1],
            e_ob1 = e_str1.split('" /></div>')[0],
            e_str2 = e.split('<p class="headline')[1],
            e_str3 = e_str2.split('">')[1],
            e_ob2 = e_str3.split('</p>')[0].replace(/<(?:.|\n)*?>/gm, '').replace('<span style="color: #000000;">','').replace('<span style="color:#000000;">','').replace('<span style="color: #000;">','').replace('<span style="color:#000;">','').replace('<span style="color: #ffffff;">','').replace('<span style="color:#ffffff;">','').replace('<span style="color: #fff;">','').replace('<span style="color:#fff;">','').replace('</span>','');
            if(e.indexOf('style="color:') > -1) {
                var e_ob4 = e.split('style="color:')[1];
                var e_str4 = e_ob4.split(';">')[0].replace(' ','').replace('#000000','#000').replace('#ffffff','#fff').replace('#FFFFFF','#FFF');
            }else{
                var e_str4 = '#fff';
            }
            var e_str3 = e.split('<p class="subtitle">')[1],
            e_ob3 = e_str3.split('</p>')[0].replace(/<(?:.|\n)*?>/gm, ''),
            f = e.split('<div class="event-active-cta">')[1],
            g = f.split('</div>')[0];
            if(g.indexOf('id="') > -1){
                var g_str1 = g.split('<a id="')[1];
                var g_ob1 = g_str1.split('"')[0];
                $('#pop_up_ID').css('opacity',1);
            }else{
                var g_ob1 = 'popup-1';
            }
            var h_str1 = g.split('class="action_button">')[1],
            h_ob1 = h_str1.split('</a>')[0].trim().replace(/<(?:.|\n)*?>/gm, '');
            if(g.indexOf('href=""') > -1 || g.indexOf('href=" "') > -1){
                var i_ob1 = '#';
            }else if(g.indexOf('href="/"') > -1 || g.indexOf('href="/ "') > -1){
                var i_ob1 = '';
            }else {
                var i_str1 = g.split('href="')[1];
                var i_ob1 = i_str1.split('" class="action_button">')[0].replace('http://www.ladernierechasse.com', '').replace('http://www.thelasthunt.com', '');
            }
            //french
            var c_fr = b_FR,
            e_fr = c_fr.split('<div id="event-active-today">')[1],
            e_fr_str1 = e_fr.split('<div class="event-active-bg"><img src="')[1],
            e_fr_ob1 = e_fr_str1.split('" /></div>')[0],
            e_fr_str2 = e_fr.split('<p class="headline')[1],
            e_fr_str3 = e_fr_str2.split('">')[1],
            e_fr_ob2 = e_fr_str3.split('</p>')[0].replace(/<(?:.|\n)*?>/gm, '').replace('<span style="color: #000000;">','').replace('<span style="color:#000000;">','').replace('<span style="color: #000;">','').replace('<span style="color:#000;">','').replace('<span style="color: #ffffff;">','').replace('<span style="color:#ffffff;">','').replace('<span style="color: #fff;">','').replace('<span style="color:#fff;">','').replace('</span>',''),
            e_fr_str3 = e_fr.split('<p class="subtitle">')[1],
            e_fr_ob3 = e_fr_str3.split('</p>')[0].replace(/<(?:.|\n)*?>/gm, ''),
            f_fr = e_fr.split('<div class="event-active-cta">')[1],
            g_fr = f_fr.split('</div>')[0],
            h_fr_str1 = g_fr.split('class="action_button">')[1],
            h_fr_ob1 = h_fr_str1.split('</a>')[0].trim().replace(/<(?:.|\n)*?>/gm, '');
            $('#start_date').val(d_ob1);
            $('#end_date').val(d_ob2);
            $('#show_count').val(d_ob3);
            $('#sis_ongoing').val(d_ob4);
            $('#promote_hero').val(d_ob44);
            $('#image_gl').val(e_ob1);
		$('#alt_image_gl').val(d_ob66);
            $('#title_en').val(e_ob2);
            $('#title_fr').val(e_fr_ob2);
            $('#subtitle_en').val(e_ob3);
            $('#subtitle_fr').val(e_fr_ob3);
            $('#button_label_en').val(h_ob1);
            $('#button_label_fr').val(h_fr_ob1);
            $('#button_link_gl').val(i_ob1);
            $('#pop_up_ID').val(g_ob1);
            $('#pop_up_link').val(d_ob5);
            $('#title_color').val(e_str4);
            $('#show_title').val(d_ob6);
            $('#show_subtitle').val(d_ob7);
            switch(e_str4) {
                case '#fff':
                    var b = 'white';
                    break;
                case '#000':
                    var b = 'black';
                    break;
                case '#9bd000':
                    var b = 'green';
                    break;
                case '#ee3600':
                    var b = 'red';
                    break;
                default: var b = 'white'
            }
            $('.selector-color:not(.'+b+')').removeClass('glyphicon glyphicon-ok')
            $('.selector-color.'+b).addClass('glyphicon glyphicon-ok')
        }else{
            alert('You haven\'t entered any content. I\'m going to close now!!!');
        }
        txtLengthCounter();
    }catch(e){
        alert('Something went wrong. Your code can\'t be translated to the Page Builder form.\n\nTry creating your page from scratch or running the code cleaner utility first.');
    }
}
function livePreview(mode,lang,code){
    var htobj = '#html-view';
    if(mode == 'small') {
        $(htobj).attr('style','');
        $('.preview').addClass('mini').removeClass('fullsize');
        $('.well.well-lg').attr('style','');
        if (lang == 'en') {
            $(htobj).html('');
            $(htobj).html(code.split('|-|')[0]);
            $('#content_value').css('opacity', 0);
        } else if (lang == 'fr') {
            $(htobj).html('');
            $(htobj).html(code.split('|-|')[1]);
            $('#content_value').css('opacity', 0);
        } else if (lang == 'all') {
            $(htobj).html('');
            $(htobj).html(code.replace('|-|', ''));
            $('#content_value').css('opacity', 0);
        }
    }else if(mode == 'full'){
        $('.hepaT').remove();
        try {
            $(htobj).css('left', '0px');
            if (lang == 'en') {
                var a = code.split('|-|')[0];
            } else if (lang == 'fr') {
                var a = code.split('|-|')[1];
            }
            if(code.split('|-|')[0].indexOf('<div id="alt_image">')>-1){
                var a1 = code.split('|-|')[0].split('<div id="alt_image">')[1];
                var img = a1.split('</div>')[0];
            }else {
                var a1 = a.split('src="')[1];
                var img = a1.split('"')[0];
            }
            if(a.indexOf('#ee3600;') > -1){
                var a2 = a.split('<p class="headline" style="color:#ee3600;">')[1];
                var addSt = ' style="color:#ee3600;"';
            }else if(a.indexOf('#000;') > -1){
                var a2 = a.split('<p class="headline" style="color:#000;">')[1];
                var addSt = ' style="color:#000;"';
            }else if(a.indexOf('#9bd000;') > -1){
                var a2 = a.split('<p class="headline" style="color:#9bd000;">')[1];
                var addSt = ' style="color:#9bd000;"';
            }else if(a.indexOf('#fff;') > -1){
                var a2 = a.split('<p class="headline">')[1];
                var addSt = ' style="color:#fff;"';
            }else {
                var a2 = a.split('<p class="headline">')[1];
                var addSt = '';
            }
            var h1 = a2.split('</p>')[0],
            a3 = a.split('<p class="subtitle">')[1],
            sub = a3.split('</p>')[0],
            a4 = a.split('href="')[1],
            link = a4.split('" class="action_button">')[0],
            a5 = a.split('class="action_button">')[1],
            cta = a5.split('</a>')[0],
            ht = '<div data-str="' + img + '"';
            ht += 'id="slide-4" class="hero fwidth root-4">';
            ht += '<div class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;"';
            ht += ' data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-4"';
            ht += ' style="background-image: url(' + img + '); background-position: 50% -55.2631578947369px;">';
            ht += '<div class="hsContainer">';
            ht += '<div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1"';
            ht += ' data-25-top="opacity: 0" data-anchor-target="#slide-4 .animated" style="opacity: 1;">';
            ht += '<div class="animated fadeIn delay-025s hero_head">';
            ht += '<p class="subtitle timedown is-countdown" id="countdown4" style="opacity:0.9"><span>ends in  <b>2<span class="force_lower"> day</span>22:22:22</b> </span></p>';
            ht += '<h1 class="headline herobanner"'+addSt+'>' + h1 + '</h1>';
            ht += '<p class="subtitle herobanner">' + sub + '</p>';
            ht += '<a id="" href="' + link + '" class="action_button hero">' + cta + '</a>';
            ht += '</div></div></div></div></div>';
            $('.preview').removeClass('mini').addClass('fullsize');
            $('.well.well-lg').css('width','100%');
            $(htobj).html('');
            $(htobj).html(ht);
            $('#content_value').css('opacity', 0);
        }catch(e){
            alert('The code is not valid TLH Hero code or it is missing key attributes');
        }
    }
}
function codeOutput(scan){
    var ctvobj = '#content_value',
    a = $('#pageBuilder').serializeArray(),
        start_dr = a[0].value,
        end_dr = a[1].value,
        title_en = a[2].value.replace(/<(?:.|\n)*?>/gm, '').replace('<span style="color: #000000;">','').replace('<span style="color:#000000;">','').replace('<span style="color: #000;">','').replace('<span style="color:#000;">','').replace('<span style="color: #ffffff;">','').replace('<span style="color:#ffffff;">','').replace('<span style="color: #fff;">','').replace('<span style="color:#fff;">','').replace('</span>',''),
        title_fr = a[3].value.replace(/<(?:.|\n)*?>/gm, '').replace('<span style="color: #000000;">','').replace('<span style="color:#000000;">','').replace('<span style="color: #000;">','').replace('<span style="color:#000;">','').replace('<span style="color: #ffffff;">','').replace('<span style="color:#ffffff;">','').replace('<span style="color: #fff;">','').replace('<span style="color:#fff;">','').replace('</span>',''),
        title_color = a[4].value,
        subtitle_en = a[5].value.replace(/<(?:.|\n)*?>/gm, ''),
        subtitle_fr = a[6].value.replace(/<(?:.|\n)*?>/gm, ''),
        image_gl = a[7].value.replace('http://www.thelasthunt.com','').replace('http://www.ladernierechasse.com',''),
	alt_image_gl = a[8].value.replace('http://www.thelasthunt.com','').replace('http://www.ladernierechasse.com',''),
        button_label_en = a[9].value.replace(/<(?:.|\n)*?>/gm, ''),
        button_label_fr = a[10].value.replace(/<(?:.|\n)*?>/gm, ''),
        button_link_gl = a[11].value.replace('http://www.thelasthunt.com','').replace('http://www.ladernierechasse.com',''),
        pop_up_link = a[12].value,
        pop_up_ID= a[13].value,
        show_counter = a[14].value;
    if(a[15].value !== '') {
        is_ongoing = a[15].value;
    }else{
        is_ongoing = 'false';
    }
    if(a[18].value !== '') {
        promote_hero = a[18].value;
    }else{
        promote_hero = 'false';
    }
    if(a[16].value !== '') {
        is_title_show = a[16].value;
    }else{
        is_title_show = 'false';
    }
    if(a[17].value !== '') {
        is_subtitle_show = a[17].value;
    }else{
        is_subtitle_show = 'false';
    }
    if(image_gl.indexOf('_1024x1024') > -1 || image_gl.indexOf('_2048x2048') > -1 || image_gl.indexOf('_600x600') > -1 || image_gl.indexOf('_480x480') > -1 || image_gl.indexOf('_large') > -1 || image_gl.indexOf('_medium') > -1 || image_gl.indexOf('_grande') > -1 || image_gl.indexOf('_compact') > -1){
        var dnkIm = image_gl.replace('https:','').replace('http:','');

    }else{
        if(is_ongoing !== 'true'){
            var altSize = '_2048x2048';
        }else{
            var altSize = '_1024x1024';
        }
        if(image_gl.indexOf('.jpg') > -1){
            var altIm = image_gl.split('.jpg')[0],
            altForm = '.jpg',
            altSize = '_2048x2048',
            dnkIm = altIm.replace('https:','').replace('http:','')+altSize+altForm;
        }else if(image_gl.indexOf('.png') > -1){
            var altIm = image_gl.split('.png')[0],
            altForm = '.png',
            altSize = '_2048x2048',
            dnkIm = altIm.replace('https:','').replace('http:','')+altSize+altForm;
        }else if(image_gl.indexOf('.gif') > -1){
            var altIm = image_gl.split('.gif')[0],
            altForm = '.gif',
            altSize = '_2048x2048',
            dnkIm = altIm.replace('https:','').replace('http:','')+altSize+altForm;
        }

    }
    var page_model='<div style="display: none;">';
    page_model += '<div id="start_date">'+start_dr+'</div>';
    page_model += '<div id="end_date">'+end_dr+'</div>';
    page_model += '<div id="show_count">'+show_counter+'</div>';
    page_model += '<div id="ongoing_event">'+is_ongoing+'</div>';
    page_model += '<div id="promote_hero">'+promote_hero+'</div>';
    page_model += '<div id="popup_link">'+pop_up_link+'</div>';
    page_model += '<div id="show_title">'+is_title_show+'</div>';
    page_model += '<div id="show_subtitle">'+is_subtitle_show+'</div>';
if(alt_image_gl !== ''){
	page_model += '<div id="alt_image">'+alt_image_gl+'</div>';
}
    page_model += '</div>';
    page_model += '<div id="event-active-today">';
    page_model += '<div class="event-active-bg">';
    page_model += '<img src="'+dnkIm+'" />';
    page_model += '</div>';
    page_model += '<div class="event-active-content">';
    page_model += '<p class="headline"';
    if(title_color !== '#fff'){
        page_model += ' style="color:'+title_color+';"';
    }
    page_model += '>'+title_en+'</p>';
    page_model += '<p class="subtitle">'+subtitle_en+'</p>';
    page_model += '</div>';
    page_model += '<div class="event-active-cta"><a';
    if(pop_up_link == 'true'){
        page_model += ' id="'+pop_up_ID+'"';
    }
    page_model += ' href="';
    if(button_link_gl.charAt(0) == '/'){
        if(button_link_gl.length == 1){
            button_link_gl = '';
        }
    }else if(button_link_gl == ''){
        button_link_gl = '';
    }else{
        if(button_link_gl !== '#' || button_link_gl !== '') {
            page_model += '/';
        }
    }
    page_model += button_link_gl+'" class="action_button"> '+button_label_en+' </a></div>';
    page_model += '</div>';
    page_model += '|-|';
    page_model += '<div id="event-active-today">';
    page_model += '<div class="event-active-bg">';
    page_model += '<img src="'+dnkIm+'" />';
    page_model += '</div>';
    page_model += '<div class="event-active-content">';
    page_model += '<p class="headline"';
    if(title_color !== '#fff'){
        page_model += ' style="color:'+title_color+';"';
    }
    page_model += '>'+title_fr+'</p>';
    page_model += '<p class="subtitle">'+subtitle_fr+'</p>';
    page_model += '</div>';
    page_model += '<div class="event-active-cta"><a'
    if(pop_up_link == 'true'){
        page_model += ' id="'+pop_up_ID+'"';
    }
    page_model += ' href="';
    if(button_link_gl.charAt(0) == '/'){
    }else{
        if(button_link_gl !== '#' || button_link_gl !== '') {
            page_model += '/';
        }
    }
    page_model += button_link_gl+'" class="action_button"> '+button_label_fr+' </a></div>';
    page_model += '</div>';
    if(scan == true){
        $("html, body").animate({ scrollTop: 0 }, "slow");
    }
    if(urlExists(dnkIm) == 200) {
        $(ctvobj).html(page_model);
        $('#preview_page_EN').click(function() {
            $('.hepa').remove();
            $(this).append('<span class="glyphicon glyphicon-ok hepa"></span>');
            livePreview('small','en',page_model)
        });
        $('#preview_page_hero_EN').click(function() {
            $('.hepa').remove();
            $(this).append('<span class="glyphicon glyphicon-ok hepa"></span>');
            livePreview('full','en',page_model)
        });
        $('#preview_page_FR').click(function() {
            $('.hepa').remove();
            $(this).append('<span class="glyphicon glyphicon-ok hepa"></span>');
            livePreview('small','fr',page_model)
        });
        $('#preview_page_hero_FR').click(function() {
            $('.hepa').remove();
            $(this).append('<span class="glyphicon glyphicon-ok hepa"></span>');
            livePreview('full','fr',page_model)
        });
        $('#preview_page_BOTH').click(function() {
            livePreview('small','all',page_model);
            $('.hepa').remove();
            $(this).append('<span class="glyphicon glyphicon-ok hepa"></span>');
        });
        $(ctvobj).css('background-color','#fff');
        if(scan == true) {
            $('.see_overlay').show();
        }
    }else{
        $(ctvobj).css('background-color','rgba(255, 0, 0, 0.2)');
        $(ctvobj).html('Unable to generate HTML\n\nREASON : Image does not exist!\n\nMake sure the image you have selected exists and try again');
        $('.see_overlay').show();
        //alert('the image file you entered does not exist');
    }
}

function codeCleaner(){
    var uctobj = '#unclosed-tag-finder-input',
    ucbobj = '#unclosed-tag-finder-button',
    a = $(uctobj).val(),
    b = a.replace(/<br>/g,'').replace(/<br\/>/g,'').replace(/<br \/>/g,'').replace(/ style="text-align: left;"/g,'').replace(/ style="float: none;"/g,'').replace(/ style="text-align: right"/g,'').replace(/ style="text-align: center"/g,'').replace(/alt="" /g,'').replace(/'/g,"&apos;").replace(/(\r\n|\n|\r)/gm,"").replace('<span style="color: #000000;">','').replace('<span style="color:#000000;">','').replace('<span style="color: #000;">','').replace('<span style="color:#000;">','').replace('<span style="color: #ffffff;">','').replace('<span style="color:#ffffff;">','').replace('<span style="color: #fff;">','').replace('<span style="color:#fff;">','').replace('</span>',''),
    c = b.trim();
    $(uctobj).val(c);
    $(ucbobj).removeClass('btn-primary').addClass('btn-success').removeClass('btn-danger');
    $(ucbobj).attr('value','Your code has been cleaned');
}

function initDates(){
    var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
    d = new Date(),
    m = monthNames[d.getMonth()],
    da = d.getDate(),
    ye = d.getFullYear(),
    ho = ('0' + d.getHours()).slice(-2),
    mi = ('0' + d.getMinutes()).slice(-2),
    se = ('0' + d.getSeconds()).slice(-2);
    $('.months').val(m);
    $('.days').val(da);
    $('.years').val(ye);
    $('.hours').val(ho);
    $('.minutes').val(mi);
    $('.seconds').val(se);
    xpmo = m;
    xrmo = m;
    xpda = da;
    xrda = da;
    xpye = ye;
    xrye = ye;
    xpho = ho;
    xrho = ho;
    xpmi = mi;
    xrmi = mi;
    xpse = se;
    xrse = se;
    $('#start_date').attr('placeholder',xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    $('#end_date').attr('placeholder',xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
}
$('document').ready(function(){
    $('.sparta').click(function(){
        if($(this).hasClass('glyphicon-eye-close')){
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        }else if($(this).hasClass('glyphicon-eye-open')){
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }
        $('.autosuggest.starting').toggle();
    });
    $('.athena').click(function(){
        if($(this).hasClass('glyphicon-eye-close')){
            $(this).removeClass('glyphicon-eye-close').addClass('glyphicon-eye-open');
        }else if($(this).hasClass('glyphicon-eye-open')){
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }
        $('.autosuggest.ending').toggle();
    });
    initDates();

var target = document.querySelector('#image_gl');
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  });
	});
	var config = { attributes: true,subtree: true, childList: true, characterData: true };
	observer.observe(target, config);
	//observer.disconnect();
	
    $('#pop_up_ID').css('opacity',0.3);

    function isSelfClosingTag(tagName) {
        return tagName.match(/area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script/i);
    }

    $('#unclosed-tag-finder-button').click(function () {
        $('#results-alert').show();
        var input = $('#unclosed-tag-finder-input').val(),
        tags = [];
        $.each(input.split('\n'), function (i, line) {
            $.each(line.match(/<[^>]*[^/]>/g) || [], function (j, tag) {
                var matches = tag.match(/<\/?([a-z0-9]+)/i);
                if (matches) {
                    tags.push({tag: tag, name: matches[1], line: i+1, closing: tag[1] == '/'});
                }
            });
        });
        if (tags.length == 0) {
            $('#unclosed-tag-finder-results').text('No tags found.');
            return;
        }
        var openTags = [],
        error = false,
        indent = 0;
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if (tag.closing) {
                var closingTag = tag;
                if (isSelfClosingTag(closingTag.name)) {
                    continue;
                }
                if (openTags.length == 0) {
                    $('#unclosed-tag-finder-results').text('Closing tag ' + closingTag.tag + ' on line ' + closingTag.line + ' does not have corresponding open tag.');
                    $('#unclosed-tag-finder-button').removeClass('btn-primary').removeClass('btn-success').addClass('btn-danger');
                    $('#unclosed-tag-finder-button').attr('value','Your code has tag errors');
                    return;
                }
                var openTag = openTags[openTags.length - 1];
                if (closingTag.name != openTag.name) {
                    $('#unclosed-tag-finder-results').text('Closing tag ' + closingTag.tag + ' on line ' + closingTag.line + ' does not match open tag ' + openTag.tag + ' on line ' + openTag.line + '.');
                    $('#unclosed-tag-finder-button').removeClass('btn-primary').removeClass('btn-success').addClass('btn-danger');
                    $('#unclosed-tag-finder-button').attr('value','Your code has tag errors');
                    return;
                } else {
                    openTags.pop();
                }
            } else {
                var openTag = tag;
                if (isSelfClosingTag(openTag.name)) {
                    continue;
                }
                openTags.push(openTag);
            }
        }
        if (openTags.length > 0) {
            var openTag = openTags[openTags.length - 1];
            $('#unclosed-tag-finder-results').text('Open tag ' + openTag.tag + ' on line ' + openTag.line + ' does not have a corresponding closing tag.');
            $('#unclosed-tag-finder-button').removeClass('btn-primary').removeClass('btn-success').addClass('btn-danger');
            return;
        }
        $('#unclosed-tag-finder-results').text('Success: No unclosed tags found.');
        codeCleaner();
    });
    $('#pop_up_link').change(function(){
        if($(this).val() == 'true') {
            //$('#pop_up_ID').prop('disabled',false);
            $('#pop_up_ID').css('opacity',1);
        }else if($(this).val() == 'false') {
            //$('#pop_up_ID').prop('disabled',true);
            $('#pop_up_ID').css('opacity',0.3);
        }
    });

    $('#button_link_gl').keyup(function(){
        if($(this).val().indexOf('http') > -1 || $(this).val().indexOf('www') > -1) {
            $('.link_alert').remove();
            $(this).css('background-color','#FF3333');
            $('<div class="link_alert">ONLY use relative links. A relative link looks like : /collections/mens-clothing</div>').insertAfter(this);
        }else{
            $(this).attr('style','');
            $('.link_alert').remove();
        }
    });

    $('.starting .months').change(function(){
        xpmo = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });
    $('.starting .days').change(function(){
        xpda = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });
    $('.starting .years').change(function(){
        xpye = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });
    $('.starting .hours').change(function(){
        xpho = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });
    $('.starting .minutes').change(function(){
        xpmi = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });
    $('.starting .seconds').change(function(){
        xpse = $(this).val();
        $('#start_date').val(xpmo+' '+xpda+', '+xpye+' '+xpho+':'+xpmi+':'+xpse);
    });

    $('.ending .months').change(function(){
        xrmo = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });
    $('.ending .days').change(function(){
        xrda = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });
    $('.ending .years').change(function(){
        xrye = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });
    $('.ending .hours').change(function(){
        xrho = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });
    $('.ending .minutes').change(function(){
        xrmi = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });
    $('.ending .seconds').change(function(){
        xrse = $(this).val();
        $('#end_date').val(xrmo+' '+xrda+', '+xrye+' '+xrho+':'+xrmi+':'+xrse);
    });

    $('.generate_page').click(function(){
        $('.hepa').remove();
        $('.hepaT').remove();
        $('#html-view').html('');
        $('#content_value').attr('style','');
        $('.well.well-lg').attr('style','');
        codeOutput(true);
        checkOngoing();
        errorViewer();
    });
    $(document).keydown(function(e) {
        console.log(e.keyCode);
        if(e.keyCode == 71 && e.ctrlKey){
            $('.generate_page').click();
            return false;
        }
        if(e.keyCode == 85 && e.ctrlKey){
            $('.cleaner_open').click();
            return false;
        }
});
    $('#content_value').click(function() {
        $(this).select();
    });
    $('#unclosed-tag-merge-button').click(function () {
        codeCleaner();
        getContent();
        $('.see_cleaner_overlay').hide(250);
        codeOutput(false);
        checkOngoing();
        errorViewer();
        $('li').attr('style','');
    });
    $('#unclosed-tag-finder-input').click(function() {
        $(this).select();
    });
    $('.see_overlay .glyphicon-remove').click(function() {
        $('.see_overlay').hide();
        $('li').attr('style','');
    });
    $('.see_help_overlay .glyphicon-remove').click(function() {
        $('.see_help_overlay').hide();
        $('li').attr('style','');
    });
    $('.see_cleaner_overlay .glyphicon-remove').click(function() {
        $('.see_cleaner_overlay').hide();
        $('#cleaner_content_value').attr('style','');
        $('#cleaner_error_value').attr('style','');
        $('li').attr('style','');
    });
    $('.cleaner_open').click(function() {
        $('.see_cleaner_overlay').show();
        $('.well.well-lg').attr('style','');
        $("html, body").animate({ scrollTop: 0 }, "slow");
    });
    $('#title_color').change(function(){
        var a = $(this).val();
        switch(a) {
            case '#fff':
                var b = 'white';
                break;
            case '#000':
                var b = 'black';
                break;
            case '#9bd000':
                var b = 'green';
                break;
            case '#ee3600':
                var b = 'red';
                break;
            default: var b = 'white'
        }
        $('.selector-color:not(.'+b+')').removeClass('glyphicon glyphicon-ok')
        $('.selector-color.'+b).addClass('glyphicon glyphicon-ok')
    });
    $('.selector-color').click(function(){
        if($(this).hasClass('white')){
            var a = '#fff';
        }else if($(this).hasClass('black')){
            var a = '#000';
        }else if($(this).hasClass('green')){
            var a = '#9bd000';
        }else if($(this).hasClass('red')){
            var a = '#ee3600';
        }
        $('#title_color').val(a);
        $('.selector-color').not(this).removeClass('glyphicon glyphicon-ok');
        $(this).addClass('glyphicon glyphicon-ok');
    });
$('#close_preview_page').click(function(){
    $('.hepa').remove();
    $('#html-view').html('');
    $('#content_value').css('opacity', 1);
    $('.preview').removeClass('fullsize').attr('style','');
    $('.well.well-lg').attr('style','');
});
    $('.find_errors').click(function(){
        codeOutput(false);
        checkOngoing();
        errorViewer();
    });
    $('#timer_preview_page').click(function(){
        var a = $('.b_line_exo.is-countdown').length,
        b = $('.fullsize').length,
        c = $('.event-active-bg').length;

            if(a == 0 && b == 0 && c == 1) {
                appendTimer('add');
                $('.hepaT').remove();
                $(this).append('<span class="glyphicon glyphicon-ok hepaT"></span>');
            }else {
                appendTimer('rem');
                $('.hepaT').remove();
            }
    });
    $('#title_en').keyup(function(){
        var val = $(this).val().length,
        nth = 30-val;
        if(nth < 0){
            $('.en_title_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.en_title_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#title_fr').keyup(function(){
        var val = $(this).val().length,
        nth = 30-val;
        if(nth < 0){
            $('.fr_title_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.fr_title_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#subtitle_en').keyup(function(){
        var val = $(this).val().length,
        nth = 30-val;
        if(nth < 0){
            $('.en_subtitle_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.en_subtitle_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#subtitle_fr').keyup(function(){
        var val = $(this).val().length,
        nth = 30-val;
        if(nth < 0){
            $('.fr_subtitle_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.fr_subtitle_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#button_label_en').keyup(function(){
        var val = $(this).val().length,
        nth = 18-val;
        if(nth < 0){
            $('.en_btlabel_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.en_btlabel_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#button_label_fr').keyup(function(){
        var val = $(this).val().length,
        nth = 18-val;
        if(nth < 0){
            $('.fr_btlabel_count').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Overlimit');
        }else {
            $('.fr_btlabel_count').attr('style','').html(nth + ' characters remaining');
        }
    });
    $('#start_date').keyup(function(){
        var en_sd = $('#start_date').val().length;
        if(en_sd<1){
            $('.date_starts').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Can\'t be empty');
        }else {
            $('.date_starts').attr('style','').html('Strict date format');
        }
    });
    $('#end_date').keyup(function(){
        var en_ed = $('#end_date').val().length;
        if(en_ed<1){
            $('.date_ends').css('background-color','#ff3300').css('font-weight','bold').css('color','#fff').html('Can\'t be empty');
        }else {
            $('.date_ends').attr('style','').html('Strict date format');
        }
    });

    $('#check_image').click(function(e) {
        validateImage('main');
        e.preventDefault();
    });
$('#alt_check_image').click(function(e) {
        validateImage('alt');
        e.preventDefault();
    });
    $('#clear_image').click(function(e) {
        $('#image_gl').val('').attr('style','');
        $('.image_count').attr('style', '').html('Shopify CDN');
        e.preventDefault();
    });
$('#alt_clear_image').click(function(e) {
        $('#alt_image_gl').val('').attr('style','');
        $('.alt_image_count').attr('style', '').html('Shopify CDN');
        e.preventDefault();
    });
    $('.need_help').click(function(e) {
        $('.help_message_holder').empty();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.see_help_overlay').show();
        if($(this).hasClass('top_1')){
            $('.help_message_holder').html("<h3><span class=\"label label-default\">Open link in a popup ?</span></h3><p>By default, hero page links send users to another page on the same site. Usually these are product or collection links. </p> <p>You can, however, set the link to open a modal window (pop-up) that will display a shopify page object. This can be usefull if the hero is an information banner, a direct call to action, an invite to an external source or simply does not require the user to be sent to another page.</p><p>The shopify page object will be loaded into the modal and it's title presented as the modal title. Modals are already pre-scripted with a close button, wells and gutters.</p><p>Click <span class=\"label label-info\">YES</span> if you want your link to open in a modal popup. You will need to define what content to load into the modal itself.</p>");
        }else if($(this).hasClass('top_2')){
            $('.help_message_holder').html("<h3><span class=\"label label-default\">Link To Which ID ?</span></h3><p>The ID refers to the shopify page object that has been defined in the theme settings.</p><p>Find the <span class=\"label label-info\">PROMOTIONAL PARAMETERS</span> tab in the theme settings. At the bottom of the <span class=\"label label-info\">HERO BANNER SETTINGS</span> section you will find a Pop Up Page 1 and a Pop Up Page 2 list menu. From each list menu, you can link a shopify page object to the predefined IDs.</p><p>The Pop Up Page 1 shopify page object is linked to popup-1 ID. If you select Popup 1 from the page designer form, this is the page that will be loaded into the modal.</p><p>To link another page, or create a new page for your modal, you can either select an existing page from the Pop Up Page 1 or Pop Up Page 2 list menus, or create a new page and select it from the list menus.</p><p><span class=\"label label-warning\">NOTE:</span> Even if you bind a page to a pop up in page designer, you must activate the Hero Popups by checking the <span class=\"label label-info\">Activate Hero Popups</span> checkbox.</p><p><span class=\"label label-primary\">HELP:</span> Is the list menu greyed out? Make sure you've selected <span class=\"label label-info\">YES</span> in the <span class=\"label label-info\">OPEN LINK IN A POPUP</span> list menu.</p>");
        }else if($(this).hasClass('top_3')){
            $('.help_message_holder').html("<h3><span class=\"label label-default\">Show Countdown Timer ?</span></h3><p>Depending on what kind of sale you have programmed in a hero sale banner or block, you may want to disable the countdown timer, hence masking the countdown. A default <span class=\"label label-info\">COMING SOON</span> message will be displayed in place of the timer.</p><p>This can be very usefull if you don't know when the sale will begin but still want to advertise it.</p><p>The <span class=\"label label-info\">Coming Soon</span> text can be customised in the <span class=\"label label-info\">Promotional Parameters</span><span class=\"glyphicon glyphicon-arrow-right\"></span><span class=\"label label-info\">Hero Banner Settings</span></p>");
        }else if($(this).hasClass('top_4')){
            $('.help_message_holder').html("<h3><span class=\"label label-default\">Is This An Ongoing Event ?</span></h3><p>By default, the hero banner object come in two formats. The large hero banner displays current sales or events that are presently running with a <span class=\"label label-info\">count-down</span> timer. The block hero banner displays upcoming sales and events with a <span class=\"label label-info\">count-up</span> timer.</p><p>In order to display sales that are currently active but that are less important than the main hero banner, the ongoing events attribute was created. This allows us to display hero events in a hero block format with a <span class=\"label label-info\">count-down</span> timer. You can therefore have more then one current sale running on your home page at the same time.</p><p>Ongoing sales use the same format as hero blocks although they have the same class attributes as hero banners.</p><p><span class=\"label label-warning\">NOTE:</span> Ongoing events are scripted after the page loads. Their code is injected into the document after the liquid template has been rendered. For this reason, they will always display <span class=\"label label-info\">after</span> the upcoming events hero blocks</p>");
        }
    });
    $('.reset_page').click(function(e) {
        resetErrors();
    });
	$('#toggle_line_breaks').click(function(e) {
if($(this).hasClass('dope')) {
	showLineBreaks('b');
	$(this).removeClass('dope');
}else{
        showLineBreaks('a');
	$(this).addClass('dope');
}
    });

    $('.app_info_toggle').click(function(e){
        /**
         *use url https://www.googledrive.com/host/0B4onXKnKkE6AWGNaYTZuRl9MRGs when on google drive
         */
        window.open("https://www.googledrive.com/host/0B4onXKnKkE6AWGNaYTZuRl9MRGs ", "_blank","scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no");
    })
});

