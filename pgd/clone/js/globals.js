/**
 * Created by david-maser on 30/10/15.
 */
var app = {
    lang:"en_EN",
    user:"guest",
    callback:true,
    export:"json",
    dialog:true,
    save:true,
    listener:"window",
    version:"../assets/project/release.json",
    languageRoot:"data/language/",
    methods:{
        g:"get",
        p:"post"
    },
    dom:{
        b:"body",
        h:"html"
    },
    objects:{
        o:"#output",
        e:"#entry",
        h:"#html-zone",
        w:"#wrapper",
        i:".input_holders",
        b:".blackify_overlay",
        c:".check_image",
        ca:".check_alt_image",
        he:"#help",
        hi:".help_item",
        cl:".clonedInput",
        r:"html,body",
        bo:"body",
        g:".glyphicon",
        l:".loadLsItems",
        ls:"#loadandsave-zone",
        ro:".render_output",
        re:".reordered",
        el:".errorList",
        form:{
            l:"schema/layout.json"
        }
    },
    handlers:{
        d:'data-handler',
        t:'data-theme',
        i:'data-item',
        r:'data-reason',
        s:'data-split'
    },
    params:{
        s:'small',
        e:'error',
        g:'good'
    },
    storage:{
        t:'pgb_Theme',
        n:'pgb_SavedNode_LS'
    },
    language:{
        e:'en',
        f:'fr'
    },
    animation:{
        d:{
            min:500,
            max:5000
        }
    }
};