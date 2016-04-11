/**
 * Created by david-maser on 04/06/15.
 */
global_v = '';
function printVersion(ver){
    global_v = ver;
    console.log(ver);
}
function checkDecadent(verl){
    var a = global_v;
    var b = verl;
    if(a <= b){
        return 0;
    }else{
        return 1;
    }
}
function loadVersion(){
    $.ajax({
        type:'GET',
        url:"assets/project/release.json",
        success:function(data) {
            var kdata = data.project,
                se_version = kdata.version;
            printVersion(se_version);
        },
        error:function(){
            return false;
        },
        dataType:'json'
    });
}
function loadJSON(){
    loadVersion();
    $.ajax({
        type:'GET',
        url:"assets/project/release.json",//use assets/project/release.json when on local drive
        success:function(data) {
            var builder = ' <div class="object master">';
            var imagearray = [];
            var kdata = data.project;
            var prj_name = kdata.name,
                prj_author = kdata.author,
                prj_licensing = kdata.licensing,
                prj_version = kdata.version,
                prj_revision = kdata.revision,
                prj_download = kdata.downloadlink,
                prj_semantic = kdata.semantic,
                prj_errors = kdata.errors,
                prj_updates = kdata.updates,
                prj_history = kdata.history;
            var vcontrol = prj_version;
            //checkVersion(vcontrol);
            //setTimeout("console.log(global_v)",1000);
            builder += '<div class="object title"><h2>App Name : '+prj_name+'</h2></div>';
            builder += '<div class="object author"><h4><span class="label label-default" title="Author">'+prj_author+'</span></h4></div>';
            builder += '<div class="object licensing"><h4><span class="label label-default" title="Author">'+prj_licensing+'</span></h4></div>';
            builder += '<div class="object version"><h4><span class="label label-default" title="Version">'+prj_version+'</span></h4></div>';
            builder += '<div class="object revision"><h4><span class="label label-success" title="Revision">'+prj_revision+'</span></h4></div>';
            builder += '<div class="object build"><h4><span class="label label-primary" title="Build">'+prj_semantic.build+'</span></h4></div>';
            builder += '<div class="object minified"><h4><span class="label label-info">Minified : '+prj_semantic.minified+'</span></h4></div>';
            builder += '<div class="object download"><a class="version_check" target="_blank" href="'+prj_download+'" title="Download Page-Builder to your computer" data-version="'+prj_version+'"><h4><span class="label label-info"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></span></h4></a></div></div>'
            builder += '<div class="object semantic">';
            builder += '<div class="btn-group"><button type="button" class="btn btn-default">Languages</button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu">';
            for(var i=0; i<prj_semantic.language.length; i++)
            {
                builder += '<li><a tabindex="[i]" href="#">'+prj_semantic.language[i]+'</a></li>';
            }
            builder += '</ul></div>';

            builder += '<div class="btn-group"><button type="button" class="btn btn-default">External Sources</button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu">';
            for(var j=0; j<prj_semantic.externals.length; j++)
            {
                builder += '<li><a tabindex="[j]" href="#">'+prj_semantic.externals[j]+'</a></li>';
            }
            builder += '</ul></div>';
            builder += '</div>';
            builder += '<div class="panel panel-default"><div class="panel-heading">Errors <span class="badge">'+prj_errors.length+'</span><span class="partridge glyphicon glyphicon-option-vertical"></span></div>';
            for(var k=0; k<prj_errors.length; k++) {
                builder += '<div class="panel-body"><div class="object lineitem"><h4><span class="label label-danger line-error" title="Source Line">'+prj_errors[k].line+'</span></h4></div><div class="object lineitem">'+prj_errors[k].file+'</div><div class="object lineitem">'+prj_errors[k].issue+'</div><div class="object lineitem"><div class="btn-group"><button type="button" class="btn btn-default">Fixes</button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="'+[k]+'" href="#">'+prj_errors[k].fix.solution+'</a></li><li role="presentation"><a role="menuitem" tabindex="'+[k]+'" href="#">Applied : '+prj_errors[k].fix.applied+'</a></li></ul></div></div></div>';            }
            builder += '</div>';

            builder += '<div class="panel panel-default"><div class="panel-heading">Updates <span class="badge">'+prj_updates.length+'</span><span class="partridge glyphicon glyphicon-option-vertical"></span></div>';
            for(var i=0; i<prj_updates.length; i++) {
                builder += '<div class="panel-body"><div class="object lineitem"><h4><span class="label label-primary line-update" title="Source Line">'+prj_updates[i].line+'</span></h4></div><div class="object lineitem">'+prj_updates[i].file+'</div><div class="object lineitem">'+prj_updates[i].structure+'</div><div class="object lineitem">'+prj_updates[i].utility+'</div><div class="object lineitem"><div class="btn-group"><button type="button" class="btn btn-default">Update Status</button><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" href="#">Scoped : '+prj_updates[i].appstatus.scoped+'</a></li><li role="presentation"><a role="menuitem" href="#">Version : '+prj_updates[i].appstatus.version+'</a></li><li role="presentation"><a role="menuitem" href="#">Candidate : '+prj_updates[i].appstatus.candidate+'</a></li><li role="presentation"><a role="menuitem" href="#">Request : '+prj_updates[i].appstatus.request+'</a></li></ul></div>';                if(prj_updates[i].appstatus.scoped == true){
                    builder += '<div class="object checks"><span class="glyphicon glyphicon-ok-circle"></span></div>';
                }
                builder += '</div></div>';
            }
            builder += ' </div>';
            //history
            builder += '<div class="panel panel-default"><div class="panel-heading">History <span class="badge">'+prj_history.length+'</span><span class="partridge glyphicon glyphicon-option-horizontal"></span></div>';
            for(var i=0; i<prj_history.length; i++) {
                builder += '<div class="panel-body topelement"><div class="object lineitem"><h4><span class="label label-primary line-update" title="Version">'+prj_history[i].version+'</span></h4></div><div class="object lineitem">'+prj_history[i].date+'</div>';
            builder += '<div class="object lineitem">';
                if(prj_history[i].failsafe == 'minor'){
                    builder += '<span class="label label-default" title="Version">';
                }else if(prj_history[i].failsafe == 'major'){
                    builder += '<span class="label label-info" title="Version">';
                }
                builder += prj_history[i].failsafe+'</span></div><div class="object lineitem" title="Code Author">'+prj_history[i].author+'</div>';
                builder += '<div class="object checks basic"><span class="glyphicon glyphicon-plus"></span></div>';
                if(prj_history[i].codeblocks.length > 0) {
                    builder += '<div class="panel-body subitem">';
                    for(j=0;j<prj_history[i].codeblocks.length;j++) {
                        builder += '<div class="object full lineitem">';
                        builder += '<div class="object history item"><span class="glyphicon glyphicon-link" aria-hidden="true"></span>' + prj_history[i].codeblocks[j].item+'</div>';
                        builder += '<div class="object history revision">';
                        if(prj_history[i].codeblocks[j].revision == 'minor'){
                            builder += '<span class="label label-default" title="Revision">'
                        }else if(prj_history[i].codeblocks[j].revision == 'major'){
                            builder += '<span class="label label-info" title="Revision">'
                        }
                        builder += prj_history[i].codeblocks[j].revision+'</span></div>';
                        builder += '<div class="object history impact"><span class="label label-info" title="Scope">' + prj_history[i].codeblocks[j].impact+'</span></div>';
                        builder += '<div class="object history codestatus"><span class="label label-success" title="Status">' + prj_history[i].codeblocks[j].codestatus+'</span></div>';
                        builder += '</div>';
                    }
                    builder += '</div>';
                }
                builder += '</div>';
            }
            builder += '</div>';

            for(var i=0; i<kdata.length; i++)
            {
                imagearray.push(kdata[i]);
            }

            builder += '</div>';
            $('.release-data').append(builder);
            $('.insta-item').on({
                click: function() {
                    toggleBoxes($(this));
                }
            });
            $('.topelement').click(function(){
                if($(this).find('.basic').find('.glyphicon').hasClass('glyphicon-plus')){
                    $(this).find('.basic').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                }else if($(this).find('.basic').find('.glyphicon').hasClass('glyphicon-minus')){
                    $(this).find('.basic').find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
                }
                $(this).find('.subitem').toggle();
            });

            $('.panel-heading').click(function(){
                $(this).parent().find('.panel-body').toggle();
                if($(this).find('.partridge').hasClass('glyphicon-option-horizontal')){
                    $(this).find('.partridge').removeClass('glyphicon-option-horizontal').addClass('glyphicon-option-vertical');
                }else{
                    $(this).find('.partridge').removeClass('glyphicon-option-vertical').addClass('glyphicon-option-horizontal');
                }
            });
            $('.version_check').click(function(e){
                var sel = $(this).attr('data-version');
                if(checkDecadent(sel) == 0){
                    e.preventDefault();
                    $('body').prepend('<div class="alert alert-success updalert" role="alert"><span class="glyphicon glyphicon-remove-sign alert-collapse" aria-hidden="true"></span><strong>Up To Date</strong><br>You are currently running the latest version of Page Builder</div>');
                    $('.version_check').hide();
                    $('.alert-collapse').click(function(){
                        $(this).parent().remove();
                    });
                }else{
                    $('body').prepend('<div class="alert alert-danger updalert" role="alert"><span class="glyphicon glyphicon-remove-sign alert-collapse" aria-hidden="true"></span><strong>New Version Found</strong><br>A new version of Page Builder is available for download</div>');
                    $('.version_check').show();
                    $('.alert-collapse').click(function(){
                        $(this).parent().remove();
                    });
                    return;
                }
            });
        },
        error:function(){
            $('#insta-holder').append('<h1>Error</h1><p>Woops, looks like we\'re unable to load the data at this time.</p>');
        },
        dataType:'json'
    })
}
$('document').ready(function(){
    setTimeout("$('.panel-body:not(.topelement)').css('display','none')",500);
    
    $('.topelement').click(function(){
        $(this).closest('.subitem').toggle();
    });
    setTimeout("$('.version_check').click()",2000);
    setTimeout("$('.updalert').hide(200)",8000);
});
loadJSON();
