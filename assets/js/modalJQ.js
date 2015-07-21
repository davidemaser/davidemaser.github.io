/**
 * Created by david-maser on 15/07/15.
 */
(function ( $ ) {

    $.fn.makeModal = function( options ) {
        var settings = $.extend({
            // These are the defaults.
            title: "Title",
            color: "#fff",
            highlight: "#428bca",
            body:"Description",
            button:{
                instance:"warn",
                text:"demo",
                callback:""
            }
        }, options );
        var model = '<div class="modal-mask"></div>';
        model += '<div class="modal-container">';
        model += '<div class="modal-header"><div class="modal-close-button"><button class="close">×</button></div><div class="modal-title">'+settings.title+'</div></div>';
        model += '<div class="modal-content">'+settings.body+'</div>';
        model += '<div class="modal-footer">';
        if(settings.button.instance !== 'none') {
            model += '<div class="modal-footer-buttons"><button class="md-button '+settings.button.instance+'">'+settings.button.text+'</button></div>';
        }
        model += '</div>';
        model += '</div>';
        return this.prepend(model);

    };

}( jQuery ));