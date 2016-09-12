###*
# @copyright webapp created by David Maser for use on The Last Hunt site. Use outside of the Altitude-Sports domains is not allowed.
# @type {{locale: string, user: string, callback: boolean, export: string, dialog: boolean, save: boolean, listener: string, methods: {g: string, p: string}, objects: {o: string, e: string, h: string, i: string, b: string, c: string, ca: string, he: string, hi: string, cl: string, r: string, bo: string, g: string, l: string}, handlers: {d: string, t: string, i: string, r: string, s: string}}}
# @param mess
# @param state
# @require globals.js
###

#"use strict";
pfLang = app.lang
pfHero = 0
pfMode = app.params.s
pfExport = 'hero'
sPos = 0
core = 
  panelAlert: (mess, state) ->

    ###*
    # Creates a bottom panel alert view
    # that slides into view with a
    # defined message.
    ###

    if app.dialog is true
      mPane = '.panel-body.bottom_level_bt'
      if state is app.params.e
        $(mPane).find(app.objects.g).removeClass('allGood').removeClass('glyphicon-ok').addClass('allBad').addClass 'glyphicon-remove'
        dispLeng = app.animation.d.max
      else if state is app.params.g
        $(mPane).find(app.objects.g).removeClass('allBad').removeClass('glyphicon-remove').addClass('allGood').addClass 'glyphicon-ok'
        dispLeng = 10000
      $(mPane).slideDown()
      $(mPane).find('.inner_message').html mess
      setTimeout '$(\'.panel-body.bottom_level_bt\').slideUp()', dispLeng
    return
  getVersion: (init) ->

    ###*
    # Recovers and displays the app version from
    # the release.json file. init=false checks the
    # current version against the server json and
    # initializes and update prompt if the local
    # version is outdated.
    ###

    try
      $.ajax
        type: app.methods.g
        url: app.version
        success: (data) ->
          ver = data.project.version
          sup = data.project.history.length - 1
          lup = data.project.history[sup].date
          if init is true
            document.title = 'Page Builder ' + ver
            $('.version_number').attr('title', 'You are using version ' + ver + ', last updated ' + lup).html ver
            $('html').attr 'data-version', ver
            core.tagNew ver
          else if init is false
            cur = $('html').attr('data-version')
            if cur < ver or cur > ver
              core.initVersionUpdate()
          return
    catch e
      console.log e
    return
  languageManager: (lng) ->
    lng = $('html').attr('data-language') or lng
    switch lng
      when 'en_EN'
        newLang = 'fr_FR'
      when 'fr_FR'
        newLang = 'en_EN'
    try
      $.ajax
        type: app.methods.g
        url: 'data/language/' + newLang + '.json'
        success: (data) ->
          dataLen = data.node.section[0].actions.length
          lngContainer = []
          i = 0
          while i < dataLen
            lngContainer.push
              objID: data.node.section[0].actions[i].id
              objTran: data.node.section[0].actions[i].translate
            $('[data-lang-id="' + data.node.section[0].actions[i].id + '"]').html data.node.section[0].actions[i].translate
            i++
          console.log lngContainer
          return
    catch e
      console.log e
    return
  initVersionUpdate: ->

    ###*
    # Prompts the user to reload the page if a
    # newer version of the app has been detected
    # remotely.
    ###

    $('.init-update').remove()
    pageData = '<div class="init-update"><div class="blackify_overlay"><div class="prompt-update"><div class="prompt-icon"><span class="glyphicon glyphicon-cloud-download" aria-hidden="true"></span></div><div class="prompt-message">A newer version of the PageBuilder app has been detected. Do you want to load the newer version now? <br><br>Make sure you save all your work before answering YES.</div><div class="prompt-choice"><button type="button" class="btn btn-update true" data-toggle="dropdown" aria-expanded="false">YES</button><button type="button" class="btn btn-update false" data-toggle="dropdown" aria-expanded="false">NO</button></div></div></div></div>'
    $(app.dom.b).append(pageData).on('click', '.btn-update.true', ->
      location.reload()
      return
    ).on 'click', '.btn-update.false', ->
      $(this).parent().parent().parent().parent().remove()
      core.panelAlert 'Version update stopped. The update prompt will reappear at the next update interval.', 'good'
      return
    return
  tagNew: (ver) ->

    ###*
    # Tags new items by comparing the current app
    # version to the data-version attribute on
    # main menu links
    ###

    cssBlock = '<style>.main_nav a[data-version="' + ver + '"]:after {content: "new";float: right;background-color: #f0ad4e;padding: 2px 5px;font-size: 10px;color: #fff;font-weight: bold;}</style>'
    $(app.dom.b).append(cssBlock).find('a[data-version="' + ver + '"]').attr 'title', 'This feature is new to the current version'
    return
  initializeForm: ->

    ###*
    # creates the initial form instance by
    # populating the parent container with
    # elements defined in a layout.json
    # file
    ###

    $.ajax
      type: app.methods.g
      url: app.objects.form.l
      success: (data) ->
        dataBlock = data.layout
        htmlBlock = '<div id="entry1" class="clonedInput" ' + app.handlers.s + '="1"><form action="' + dataBlock.form_action + '" method="' + dataBlock.method + '" id="' + dataBlock.form_id + '" role="form">'
        htmlBlock += dataBlock.header
        htmlBlock += '<fieldset>'
        blockContent = dataBlock.block
        blockLen = blockContent.length
        i = 0
        while i < blockLen
          if blockContent[i].display != 'custom'
            if i % 2 is 0 or i is 0
              if blockContent[i].wrap_group is true
                htmlBlock += '<div class="' + blockContent[i].wrap_group_class + '">'
              htmlBlock += '<div class="form-group">'
              blocker = ' lItem'
            else
              blocker = ''
            if blockContent[i].display != 'empty'
              switch blockContent[i].display
                when 'full'
                  line = ''
                  blocker = ''
                when 'half'
                  line = 'half_span'
              htmlBlock += '<div class="' + line + ' ' + blocker + '">'
              htmlBlock += '<label class="label_fn control-label" for="' + blockContent[i].obj_id + '">' + blockContent[i].label + '</label>'
              if blockContent[i].wrap is true
                htmlBlock += '<div class="' + blockContent[i].wrap_class + '">'
              if blockContent[i].inject_code != ''
                htmlBlock += blockContent[i].inject_code
              if blockContent[i].input_obj is 'text'
                htmlBlock += '<input'
                if blockContent[i].obj_id != ''
                  htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"'
                htmlBlock += ' type="text" placeholder="' + blockContent[i].placeholder + '" class="input_fn form-control'
                if blockContent[i].class != ''
                  htmlBlock += ' ' + blockContent[i].class
                if blockContent[i].obj_label != ''
                  htmlBlock += ' ' + blockContent[i].obj_label
                htmlBlock += '"'
                if blockContent[i].options != null
                  opLen = blockContent[i].options.length
                  j = 0
                  while j < opLen
                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"'
                    j++
                if blockContent[i].data != null
                  dtLen = blockContent[i].data.length
                  k = 0
                  while k < dtLen
                    htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"'
                    k++
                htmlBlock += '>'
              else if blockContent[i].input_obj is 'radio'
                htmlBlock += '<input'
                htmlBlock += ' type="radio"'
                if blockContent[i].class != ''
                  htmlBlock += ' class="' + blockContent[i].class + '"'
                if blockContent[i].obj_label != ''
                  htmlBlock += ' ' + blockContent[i].obj_label
                if blockContent[i].obj_id != ''
                  htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"'
                if blockContent[i].options != null
                  opLen = blockContent[i].options.length
                  j = 0
                  while j < opLen
                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"'
                    if blockContent[i].options[j].default != undefined
                      htmlBlock += ' ' + blockContent[i].options[j].default
                    j++
                if blockContent[i].data != null
                  dtLen = blockContent[i].data.length
                  k = 0
                  while k < dtLen
                    htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"'
                    k++
                htmlBlock += '>'
              else if blockContent[i].input_obj is 'select'
                htmlBlock += '<select'
                if blockContent[i].class != ''
                  htmlBlock += ' class="form-control ' + blockContent[i].class + '"'
                if blockContent[i].obj_label != ''
                  htmlBlock += ' ' + blockContent[i].obj_label
                if blockContent[i].obj_id != ''
                  htmlBlock += ' id="' + blockContent[i].obj_id + '" name="' + blockContent[i].obj_id + '"'
                  if blockContent[i].data != null
                    dtLen = blockContent[i].data.length
                    k = 0
                    while k < dtLen
                      htmlBlock += ' data-' + blockContent[i].data[k].item + '="' + blockContent[i].data[k].value + '"'
                      k++
                htmlBlock += '>'
                if blockContent[i].options != null
                  opLen = blockContent[i].options.length
                  j = 0
                  while j < opLen
                    htmlBlock += '<option'
                    htmlBlock += ' ' + blockContent[i].options[j].item + '="' + blockContent[i].options[j].value + '"'
                    if blockContent[i].options[j].default != undefined
                      htmlBlock += ' ' + blockContent[i].options[j].default
                    htmlBlock += '>' + blockContent[i].options[j].label
                    htmlBlock += '</option>'
                    j++
                htmlBlock += '</select>'
              if blockContent[i].append != ''
                htmlBlock += blockContent[i].append
              if blockContent[i].wrap is true
                htmlBlock += '</div>'
              htmlBlock += '</div>'
            if i % 2 is 1
              htmlBlock += '</div>'
              if blockContent[i].wrap_group is true
                htmlBlock += '</div>'
          else
            htmlBlock += blockContent[i].inject_code
          i++
        htmlBlock += '</fieldset>'
        htmlBlock += '</form></div>'
        return
    return
  switchModes: (va) ->

    ###*
    # switches the page builder mode from
    # Hero builder mode to Hello Bar
    # builder mode
    ###

    if va is 'hello'
      $('*[data-role="hero"]').css 'display', 'none'
      $('*[data-role="hello"]').css 'display', 'block'
      pfExport = 'hello'
      $('.submit_json').attr 'data-nmode', 'hello'
      core.panelAlert 'Switched to Hello Banner Creation mode', 'good'
    else
      $('*[data-role="hello"]').css 'display', 'none'
      $('*[data-role="hero"]').attr 'style', ''
      pfExport = 'hero'
      $('.submit_json').attr 'data-nmode', 'hero'
      core.panelAlert 'Switched to Hero Banner Creation mode', 'good'
    return
  initializeTheme: ->

    ###*
    # reads and/or sets the html theme data attribute
    # from the local storage item
    ###

    if window.localStorage
      tm = localStorage.getItem(app.storage.t)
      if tm is null or tm is undefined
        $('html').attr app.handlers.t, 'light'
      else
        $('html').attr app.handlers.t, tm
    else
      $('html').attr app.handlers.t, 'light'
    return
  initHelp: ->

    ###*
    # Initialize the help view by loading items
    # from the help.json file
    ###

    $.ajax
      type: app.methods.g
      url: 'data/help.json'
      success: (data) ->
        h = 0
        while h < data.items.length
          if h > 0
            push = 'push_block'
          else
            push = ''
          $('.help-items').append '<li><a class="helpItem" data-target="' + h + '">' + data.items[h].title + '</a></li>'
          $('.help_panel_holder').append '<div class="help_item" id="hlp' + h + '" data-helper="' + h + '"><h4 class="' + push + '">' + data.items[h].title + '</h4>' + data.items[h].block + '</div>'
          h++
        return
      error: ->
        core.panelAlert 'Unable to load Help Contents from JSON source', 'error'
        return
    return
  setHeadSec: ->

    ###*
    # sets head section items that display in a button model
    # the locally saved hero items for rapid translation of
    # the JSON data
    ###

    try
      isReady = localStorage.getItem(app.storage.n)
      if isReady != null
        $(app.objects.l).css 'display', 'inline-block'
        $('#import_json').css 'display', 'block'
        $('.lsLoad').find('li').remove()
        a = localStorage.getItem(app.storage.n).split(',')
        long = a.length
        if long > 1
          i = 0
          while i < long
            if a[i] != ''
              $('.lsLoad').append '<li><a href="#" class="loadItem" ' + app.handlers.i + '="' + a[i] + '">' + a[i] + '</a></li>'
            i++
        else
          $(app.objects.l).hide()
      else
        $(app.objects.l).css 'display', 'none'
        $('#import_json').css 'display', 'none'
    catch e
      console.log e
    return
  launchBats: ->

    ###*
    # A useless script that runs at halloween
    # and shows flying bats on the page.
    ###

    r = Math.random
    n = 0
    d = document
    w = window
    i = d.createElement('img')
    z = d.createElement('div')
    zs = z.style
    a = w.innerWidth * r()
    b = w.innerHeight * r()

    R = (o, m) ->
      Math.max Math.min(o + (r() - .5) * 400, m - 50), 50

    A = ->
      `var d`
      x = R(a, w.innerWidth)
      y = R(b, w.innerHeight)
      d = 5 * Math.sqrt((a - x) * (a - x) + (b - y) * (b - y))
      zs.opacity = n
      n = 1
      zs.transition = zs.webkitTransition = d / 1e3 + 's linear'
      zs.transform = zs.webkitTransform = 'translate(' + x + 'px,' + y + 'px)'
      i.style.transform = i.style.webkitTransform = if a > x then '' else 'scaleX(-1)'
      a = x
      b = y
      setTimeout A, d
      return

    z.className = 'oooobats'
    zs.position = 'fixed'
    zs.left = 0
    zs.top = 0
    zs.opacity = 0
    z.appendChild i
    i.src = 'data:image/gif;base64,R0lGODlhMAAwAJECAAAAAEJCQv///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJAQACACwAAAAAMAAwAAACdpSPqcvtD6NcYNpbr4Z5ewV0UvhRohOe5UE+6cq0carCgpzQuM3ut16zvRBAH+/XKQ6PvaQyCFs+mbnWlEq0FrGi15XZJSmxP8OTRj4DyWY1lKdmV8fyLL3eXOPn6D3f6BcoOEhYaHiImKi4yNjo+AgZKTl5WAAAIfkECQEAAgAsAAAAADAAMAAAAnyUj6nL7Q+jdCDWicF9G1vdeWICao05ciUVpkrZIqjLwCdI16s+5wfck+F8JOBiR/zZZAJk0mAsDp/KIHRKvVqb2KxTu/Vdvt/nGFs2V5Bpta3tBcKp8m5WWL/z5PpbtH/0B/iyNGh4iJiouMjY6PgIGSk5SVlpeYmZqVkAACH5BAkBAAIALAAAAAAwADAAAAJhlI+py+0Po5y02ouz3rz7D4biSJbmiabq6gCs4B5AvM7GTKv4buby7vsAbT9gZ4h0JYmZpXO4YEKeVCk0QkVUlw+uYovE8ibgaVBSLm1Pa3W194rL5/S6/Y7P6/f8vp9SAAAh+QQJAQACACwAAAAAMAAwAAACZZSPqcvtD6OctNqLs968+w+G4kiW5omm6ooALeCusAHHclyzQs3rOz9jAXuqIRFlPJ6SQWRSaIQOpUBqtfjEZpfMJqmrHIFtpbGze2ZywWu0aUwWEbfiZvQdD4sXuWUj7gPos1EAACH5BAkBAAIALAAAAAAwADAAAAJrlI+py+0Po5y02ouz3rz7D4ZiCIxUaU4Amjrr+rDg+7ojXTdyh+e7kPP0egjabGg0EIVImHLJa6KaUam1aqVynNNsUvPTQjO/J84cFA3RzlaJO2495TF63Y7P6/f8vv8PGCg4SFhoeIg4UQAAIfkEBQEAAgAsAAAAADAAMAAAAnaUj6nL7Q+jXGDaW6+GeXsFdFL4UaITnuVBPunKtHGqwoKc0LjN7rdes70QQB/v1ykOj72kMghbPpm51pRKtBaxoteV2SUpsT/Dk0Y+A8lmNZSnZlfH8iy93lzj5+g93+gXKDhIWGh4iJiouMjY6PgIGSk5eVgAADs='
    d.body.appendChild z
    setTimeout A, r() * 3e3
    return
  killBats: ->

    ###*
    # Removes the flying bats from the dom
    ###

    $('.oooobats').remove()
    $('.batsToggle').attr('data-status', 'allGone').html 'Let In The Bats'
    return
  resetItems: ->

    ###*
    # Checks if page items have been moved
    # and resets them to their original position
    # based on the numeric value of their ID
    ###

    if $(app.objects.re).length > 0
      $(app.objects.w).find(app.objects.cl).sort((a, b) ->
        $(a).attr('id').replace('entry', '') - $(b).attr('id').replace('entry', '')
      ).appendTo app.objects.w
      $(app.objects.re).remove()
      core.panelAlert 'Items reset to their original position', 'good'
    else
      core.panelAlert 'All items are in their original position', 'error'
    return
  choseLocalSave: ->

    ###*
    # Populates the load saved data from
    # localstorage item and presents it
    # in a dropdown modal
    ###

    try
      $('#loadandsave-zone').attr(app.handlers.r, 'load').css 'display', 'block'
      a = localStorage.getItem(app.storage.n)
      target = $('.lsOptions')
      if a != null or a != undefined
        b = a.split(',')
        bLen = b.length
        $('.lsOptions').find('option').remove()
        $(target).append '<option value="null">SELECT</option>'
        i = 0
        while i < bLen
          $(target).append '<option value="' + b[i] + '">' + b[i] + '</option>'
          i++
      else
        $(target).append '<option value="null">No Local Storage Found</option>'
    catch e
    return
  doLocalSave: (method) ->
    if method is 'do' or method is null
      $('#loadandsave-zone').attr('data-reason', 'save').css 'display', 'block'
    else if method is 'reset'
      localStorage.setItem 'pgb_SavedNode_LS', ''
      i = 0
      len = localStorage.length
      while i < len
        key = localStorage.key(i)
        if key.indexOf('pgb_SavedNode_') > -1 and key.indexOf('pgb_SavedNode_LS') < 0
          localStorage.removeItem key
        i++
    return
  scrollState: (meth) ->

    ###*
    # Checks the users scroll position on the
    # window and displays a progress bar
    # below the main menu navs
    ###

    winHeight = $(window).height()
    docHeight = $(document).height()
    progressBar = $('progress')
    max = undefined
    value = undefined
    max = docHeight - winHeight
    progressBar.attr 'max', max
    if meth is 'a'
      winHeight = $(window).height()
      docHeight = $(document).height()
      max = docHeight - winHeight
      progressBar.attr 'max', max
      value = $(window).scrollTop()
      progressBar.attr 'value', value
    else if meth is 'b'
      value = $(window).scrollTop()
      progressBar.attr 'value', value
    return
  OpenInNewTab: (url) ->

    ###*
    # Simple open url in new tab function
    ###

    win = window.open(url, '_blank')
    win.focus()
    return
  addMulti: (num) ->

    ###*
    # Adds multiple hero items to the current
    # instance
    ###

    i = 0
    while i < num
      core.addItems()
      i++
    core.panelAlert 'Items Added', 'good'
    return
  jumpToHelper: (a) ->

    ###*
    # Animates the help item click to bring
    # into view the correct help item
    ###

    $('.help_panel_holder').animate
      scrollTop: $(app.objects.hi + '[data-helper="' + a + '"]').offset().top
      duration: app.animation.d.min
    $(app.objects.hi).animate
      opacity: 0.4
      duration: app.animation.d.min
    $(app.objects.hi + '[data-helper="' + a + '"]').animate
      opacity: 1
      duration: app.animation.d.min
    return
  saveNodeToLS: (val, name) ->
    if window.localStorage
      if localStorage.getItem('pgb_SavedNode_LS') is null or localStorage.getItem('pgb_SavedNode_LS') is undefined
        localStorage.setItem 'pgb_SavedNode_LS', ''
      getList = localStorage.getItem('pgb_SavedNode_LS')
      getListLen = getList.split(',').length
      if getListLen > 0
        newList = getList + ',' + name
      else
        newList = name
      localStorage.setItem 'pgb_SavedNode_LS', newList
      localStorage.setItem 'pgb_SavedNode_' + name, val
      core.panelAlert 'Data Saved To Local Storage', 'good'
    return
  addItems: ->

    ###*
    # Add new items to the form. Duplicates a
    # form block
    ###

    if $(app.objects.o).css('display') is 'block'
      $(app.objects.o).css 'display', 'none'
    num = $(app.objects.cl).length
    newNum = new Number(num + 1)
    newElem = $(app.objects.e + num).clone().attr('id', 'entry' + newNum)
    # create the new element via clone(), and manipulate it's ID using newNum value
    newElem.find('.heading-reference').attr('id', 'ID' + newNum + '_reference').attr('name', 'ID' + newNum + '_reference').html '<div class="btn-group bigboy"><button type="button" class="btn btn-info">ITEM <span class="label label-default">' + newNum + '</span></button><button type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="caret"></span><span class="sr-only">Toggle Dropdown</span></button><ul class="dropdown-menu"><li><a class="previewItem large" href="javascript:;" data-hero="' + newNum + '" data-role="hero">Preview Large</a></li><li><a class="previewItem small" href="javascript:;" data-hero="' + newNum + '" data-role="hero">Preview Small</a></li></ul></div>'
    newElem.attr app.handlers.s, newNum
    newElem.find('.label_ttl').attr 'for', 'ID' + newNum + '_title'
    newElem.find('.select_ttl:not(".objButtonPopupLink")').attr('id', 'ID' + newNum + '_title').attr('name', 'ID' + newNum + '_title').val ''
    newElem.find('.label_fn').attr 'for', 'ID' + newNum + '_first_name'
    newElem.find('.input_fn').attr('id', 'ID' + newNum + '_first_name').attr('name', 'ID' + newNum + '_first_name').val ''
    newElem.find('.label_ln').attr 'for', 'ID' + newNum + '_last_name'
    newElem.find('.input_ln').attr('id', 'ID' + newNum + '_last_name').attr('name', 'ID' + newNum + '_last_name').val ''
    newElem.find('.label_checkboxitem').attr 'for', 'ID' + newNum + '_checkboxitem'
    newElem.find('.input_checkboxitem').attr('id', 'ID' + newNum + '_checkboxitem').attr('name', 'ID' + newNum + '_checkboxitem').val []
    newElem.find('.radio:nth-child(1)').attr('for', 'ID' + newNum + '_radioitemA').find('.input_radio').attr('id', 'ID' + newNum + '_radioitemA').attr('name', 'ID' + newNum + '_radioitem').val []
    newElem.find('.radio:nth-child(2)').attr('for', 'ID' + newNum + '_radioitemB').find('.input_radio').attr('id', 'ID' + newNum + '_radioitemB').attr('name', 'ID' + newNum + '_radioitem').val []
    newElem.find('.label_email').attr 'for', 'ID' + newNum + '_email_address'
    newElem.find('.input_email').attr('id', 'ID' + newNum + '_email_address').attr('name', 'ID' + newNum + '_email_address').val ''
    newElem.find('.label_twt').attr 'for', 'ID' + newNum + '_twitter_handle'
    newElem.find('.input_twt').attr('id', 'ID' + newNum + '_twitter_handle').attr('name', 'ID' + newNum + '_twitter_handle').val ''
    newElem.find(app.objects.c).attr app.handlers.d, newNum
    newElem.find('.check_alt_image').attr app.handlers.d, newNum
    newElem.find('.input-group-addon.image_count').attr('style', '').html 'Shopify CDN'
    newElem.find('.mod-radio').attr 'style', ''
    $('.clonedInput:last').after newElem
    $('#ID' + newNum + '_title').focus()
    $('#btnDel').attr 'disabled', false
    if newNum is 10
      $('.btnAdd').attr('disabled', true).prop 'value', 'You\'ve reached the limit'
    # value here updates the text in the 'add' button when the limit is reached
    dateNow = new Date
    $('.date_obj').datetimepicker format: 'MM/DD/YYYY HH:mm'
    $('.snapTo').append '<li><a href="#" class="gotoItem" ' + app.handlers.i + '="' + newNum + '">Item ' + newNum + '</a></li>'
    $(app.objects.r).animate { scrollTop: $(app.objects.e + newNum).offset().top - 60 }, app.animation.d.min
    $('.btn-group.bigboy:not(.helpMePlease)').last().find('ul').append '<li class="divider" data-role="hero"></li><li><a class="removeThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Remove</a></li><li class="divider"></li><li><a class="moveUpThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Move Up<span class="glyphicon glyphicon-arrow-up"></span></a></li><li><a class="moveDownThisItem" ' + app.handlers.i + '="' + newNum + '" href="javascript:;">Move Down<span class="glyphicon glyphicon-arrow-down"></span></a></li>'
    $(app.objects.e + newNum).find('.mod-radio').find('input').first().prop 'checked', true
    core.scrollState 'a'
    core.panelAlert 'Item Added', 'good'
    return
  deleteItems: (elem) ->

    ###*
    # Delete items from the form instance and
    # removes them from the dom reference
    ###

    if $(app.objects.cl).length > 1
      if $(app.objects.o).css('display') is 'block'
        $(app.objects.o).css 'display', 'none'
      #var num = $(app.objects.cl).length;
      if elem is 'last'
        a = $('.clonedInput:last').attr('id')
        b = a.replace('entry', '')
        $('#' + a).slideUp 'slow', ->
          $(this).remove()
          # if only one element remains, disable the "remove" button
          if elem - 1 is 1
            $('.btnDel').attr 'disabled', true
          # enable the "add" button
          $('.btnAdd').attr('disabled', false).prop 'value', 'add section'
          return
        $('.snapTo').find('.gotoItem[' + app.handlers.i + '="' + b + '"]').parent().remove()
        core.scrollState 'a'
      else
        $(app.objects.e + elem).slideUp 'slow', ->
          $(this).remove()
          # if only one element remains, disable the "remove" button
          if elem - 1 is 1
            $('.btnDel').attr 'disabled', true
          # enable the "add" button
          $('.btnAdd').attr('disabled', false).prop 'value', 'add section'
          return
        $('.snapTo').find('.gotoItem[' + app.handlers.i + '="' + elem + '"]').parent().remove()
        core.scrollState 'a'
      core.panelAlert 'Last Item Removed', 'good'
      return false
      # Removes the last section you added
    return
  validateJSON: ->

    ###*
    # Validate the JSON that has been exported
    # when the user clicks the button
    ###

    $('#output_code').validateJSON
      compress: false
      reformat: true
      onSuccess: (json) ->
        core.panelAlert 'JSON Code is valid', 'good'
        return
      onError: (error) ->
        core.panelAlert 'A JSON error has been encountered. The line on which the error has occured is highlighted.', 'error'
        return
    return
  errorHandler: ->

    ###*
    # Generic error handler that checks if certain
    # form objects are filled and outputs a dropdown
    # list with anchor links
    ###

    errorLog = []
    a = JSON.parse($(app.objects.o + '[' + app.handlers.r + '="output"]').find('textarea').val()).hero
    b = a.length
    c = 0
    i = 0
    while i < b
      if a[i].date.start is ''
        errorLog.push
          form: i + 1
          obj: 'Start Date'
          prob: 'No Value. FATAL'
          elem: 'objStart'
          die: true
        c++
      if a[i].date.end is ''
        errorLog.push
          form: i + 1
          obj: 'End Date'
          prob: 'No Value. FATAL'
          elem: 'objEnd'
          die: true
        c++
      if a[i].title.en is ''
        errorLog.push
          form: i + 1
          obj: 'English Title'
          prob: 'No Value'
          elem: 'objTitleEN'
          die: false
        c++
      if a[i].title.fr is ''
        errorLog.push
          form: i + 1
          obj: 'French Title'
          prob: 'No Value'
          elem: 'objTitleFR'
          die: false
        c++
      if a[i].text.en is ''
        errorLog.push
          form: i + 1
          obj: 'English Text'
          prob: 'No Value'
          elem: 'objTextEN'
          die: false
        c++
      if a[i].text.fr is ''
        errorLog.push
          form: i + 1
          obj: 'French Text'
          prob: 'No Value'
          elem: 'objTextFR'
          die: false
        c++
      if a[i].button.label.en is ''
        errorLog.push
          form: i + 1
          obj: 'English Button Label'
          prob: 'No Value'
          elem: 'objButtonEN'
          die: false
        c++
      if a[i].button.label.fr is ''
        errorLog.push
          form: i + 1
          obj: 'French Button Label'
          prob: 'No Value'
          elem: 'objButtonFR'
          die: false
        c++
      if a[i].button.url is ''
        errorLog.push
          form: i + 1
          obj: 'Button URL'
          prob: 'No Value'
          elem: 'objButtonLink'
          die: false
        c++
      if a[i].image.url is ''
        errorLog.push
          form: i + 1
          obj: 'Image URL'
          prob: 'No Value'
          elem: 'objImageMain'
          die: false
        c++
      i++
    errorLog.reverse()
    #present the errors in the right direction
    if c > 0
      $(app.objects.el).css 'display', 'inline-block'
      $('.errorListing').empty()
      j = 0
      while j < errorLog.length
        $('.errorListing').prepend '<li><a href="javascript:;" class="errorItem ' + errorLog[j].die + '" ' + app.handlers.i + '="' + j + '">Item ' + errorLog[j].form + ' : ' + errorLog[j].obj + ' : ' + errorLog[j].prob + '</a></li>'
        core.registerErrorButtons errorLog[j].form, errorLog[j].elem, j, errorLog[j].prob, errorLog[j].die
        j++
      $(app.objects.el).find('button').html 'Warnings<span class="label label-default numerrors">' + errorLog.length + '</span><span class="caret"></span>'
    else
      $(app.objects.el).css 'display', 'none'
    return
  registerErrorButtons: (num, elem, item, prob, die) ->

    ###*
    # Binds each error item created by the
    # errorHandler function to a click handler
    # that animates scroll to the specific
    # error item
    ###

    $(app.objects.bo).on 'click', '.errorItem[' + app.handlers.i + '="' + item + '"]', ->
      if die is true
        $(app.objects.e + num).find('.' + elem).css('background-color', 'rgba(238, 54, 54, 0.3)').css('border-color', 'red').attr 'placeholder', 'Leaving this field empty will cause the hero banner function to fail'
      else
        $(app.objects.e + num).find('.' + elem).css 'background-color', 'rgba(238, 162, 54, 0.3)'
      $(app.objects.o).hide()
      $(app.objects.r).css 'overflow', 'auto'
      $(app.objects.r).animate { scrollTop: $(app.objects.e + num + ' .' + elem).offset().top - 100 }, app.animation.d.min
      if $('.' + elem).parent().attr('class') != 'input_holders'
        $('.' + elem).wrap('<div class="input_holders"></div>').parent().append '<div class="input_alerts" title="' + prob + '"><span class="glyphicon glyphicon-exclamation-sign"></span></div>'
      return
    return
  traverseJSON: (storage, nodeName) ->

    ###*
    # Reads JSON that is pasted in the form in
    # translate JSON mode and prepares and formats
    # it to be output to the corresponding
    # form objects
    ###

    if $(app.objects.b + ' textarea').val() != '' or localStorage.getItem('pgb_SavedNode') != ''
      if storage is false
        ctc = $(app.objects.b + ' textarea').val()
        if ctc is ''
          core.panelAlert 'Form Does Not Contain JSON Data', 'error'
      else if storage is true and nodeName != ''
        if localStorage.getItem('pgb_SavedNode_' + nodeName) != undefined and localStorage.getItem('pgb_SavedNode_' + nodeName) != null and localStorage.getItem('pgb_SavedNode_' + nodeName) != ''
          ctc = localStorage.getItem('pgb_SavedNode_' + nodeName).replace(',null', '')
        else
          core.panelAlert 'No Data Found In Local Storage', 'error'
      prs = JSON.parse(ctc)
      obj = prs.hero
      len = obj.length
      formItems = $(app.objects.cl).length
      formArray = []
      if formItems < len
        build = true
        bItems = len - formItems
      h = 0
      while h < bItems
        core.addItems()
        h++
      i = 0
      while i < len
        formArray.push obj[i]
        i++
      core.jsonToForm formArray
      core.panelAlert 'Data Translated To Form', 'good'
    else
      core.panelAlert 'Please generate or paste JSON before using this function', 'error'
    return
  jsonToForm: (aCode) ->

    ###*
    # Takes formatted JSON sent from the TraverseJSON
    # function and outputs it to the mapped form
    # element
    ###

    jsLen = aCode.length
    i = 0
    while i < jsLen
      jsForm = 'entry' + i + 1
      formEl = '#' + jsForm
      $(formEl).find('.objStart').val aCode[i].date.start
      $(formEl).find('.objEnd').val aCode[i].date.end
      $(formEl).find('.objTitleEN').val aCode[i].title.en
      $(formEl).find('.objTitleFR').val aCode[i].title.fr
      $(formEl).find('.objTitleCol').val aCode[i].title.color
      $(formEl).find('.objTextEN').val aCode[i].text.en
      $(formEl).find('.objTextFR').val aCode[i].text.fr
      $(formEl).find('.objImageMain').val aCode[i].image.url
      $(formEl).find('.objImageAlt').val aCode[i].image.altUrl
      $(formEl).find('.objButtonEN').val aCode[i].button.label.en
      $(formEl).find('.objButtonFR').val aCode[i].button.label.fr
      $(formEl).find('.objButtonLink').val aCode[i].button.url
      if aCode[i].date.delay is true or aCode[i].date.delay is false
        setTimeout 'panelAlert(\'Some delay entries are not numerical. Make sure to set all delay entries to a numerical value manually.\',\'error\')', 2000
      else if aCode[i].date.delay is '' or aCode[i].date.delay is null or aCode[i].date.delay is undefined or aCode[i].date.delay is 'undefined'
        $(formEl).find('.objDelay').val 0
      else
        $(formEl).find('.objDelay').val aCode[i].date.delay
      $(formEl).find('.objCountdownShow').val aCode[i].showCountdown
      $(formEl).find('.objButtonPopup option[value="' + aCode[i].popUpLink + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objButtonPopupLink option[value="' + aCode[i].button.popUpLinkID + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objCountdownShow option[value="' + aCode[i].showCountdown + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objHeroSticky option[value="' + aCode[i].sticky + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objHeroTitleShow option[value="' + aCode[i].title.showTitle + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objHeroSubtitleShow option[value="' + aCode[i].text.showSubTitle + '"]').attr('selected', true).prop 'selected', true
      $(formEl).find('.objHeroPromote option[value="' + aCode[i].promote + '"]').attr('selected', true).prop 'selected', true
      if aCode[i].active is true
        $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop 'checked', true
        $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop 'checked', false
      else if aCode[i].active is false
        $(formEl).find('.mod-radio').css('border-left-width', '6px').css('border-left-style', 'solid').css 'border-left-color', 'rgb(253, 0, 0)'
        $(formEl).find('.mod-radio').find('input[type="radio"]').first().prop 'checked', false
        $(formEl).find('.mod-radio').find('input[type="radio"]').last().prop 'checked', true
      if $(app.objects.o).css('display') is 'block'
        $(app.objects.o).hide()
        $(app.objects.r).css 'overflow', 'auto'
      $(app.objects.r).css 'overflow', 'auto'
      i++
    return
  prepareJSON: (meth, name, mode) ->

    ###*
    # Serializes the form data in a JSON format
    # and passes the data to the outputJson
    # function
    ###

    c = []
    if mode is 'hero' or mode is '' or mode is null or mode is undefined
      $('.clonedInput form fieldset[data-role="hero"]').each ->
        a = $(this).serializeArray()
        c.push a
        return
      if meth is 'full'
        core.outputJson c, meth, null, mode
      else if meth is 'save'
        core.outputJson c, meth, name, 'hero'
    else if mode is 'hello'
      $('.clonedInput form fieldset[data-role="hello"]').each ->
        a = $(this).serializeArray()
        c.push a
        return
      core.outputJson c, 'full', null, 'hello'
    return
  outputJson: (aCode, meth, name, mode) ->

    ###*
    # Receives the serialized data parsed in the
    # prepareJSON function and outputs JSON
    # formatted code to the output view
    ###

    try
      nodes = aCode.length
      lastItem = nodes - 1
      if mode is 'hello'
        page_model = '{\n    "hello": [\n'
        i = 0
        while i < nodes
          page_model += '       {\n        "helloItem": "hello' + i + '",'
          page_model += '\n        "date": {'
          page_model += '\n          "start": "' + aCode[i][0].value + '",'
          page_model += '\n          "end": "' + aCode[i][1].value + '"'
          page_model += '\n        },'
          page_model += '\n        "text": {'
          page_model += '\n          "en": "' + aCode[i][2].value.trim().replace(/"/g, '') + '",'
          page_model += '\n          "fr": "' + aCode[i][3].value.trim().replace(/"/g, '') + '"'
          page_model += '\n        }'
          if i < lastItem
            page_model += '\n},\n'
          i++
        page_model += '\n      }\n   ]\n}'
      else if mode is 'hero'
        page_model = '{\n    "hero": [\n'
        i = 0
        while i < nodes
          #mapping
          console.log aCode[i][13].value
          if aCode[i][13].value is '' or aCode[i][13].value is null or aCode[i][13].value is undefined
            elemAAAA = 'null'
          else
            elemAAAA = aCode[i][13].value
          if aCode[i][14].value is '' or aCode[i][14].value is null or aCode[i][14].value is undefined
            elemA = true
          else
            elemA = aCode[i][14].value
          if aCode[i][15].value is '' or aCode[i][15].value is null or aCode[i][15].value is undefined
            elemAA = true
          else
            elemAA = aCode[i][15].value
          if aCode[i][16].value is '' or aCode[i][16].value is null or aCode[i][16].value is undefined
            elemAAA = true
          else
            elemAAA = aCode[i][16].value
          if aCode[i][12].value is '' or aCode[i][12].value is null or aCode[i][12].value is undefined
            elemB = false
          else
            elemB = aCode[i][12].value
          if aCode[i][17].value is '' or aCode[i][17].value is null or aCode[i][17].value is undefined
            elemC = false
          else
            elemC = aCode[i][17].value
          if aCode[i][20] != undefined
            if aCode[i][20].value is '' or aCode[i][20].value is null or aCode[i][20].value is undefined
              elemD = true
            else
              elemD = aCode[i][20].value
          else
            elemD = true
          if aCode[i][18] != undefined
            if aCode[i][18].value is '' or aCode[i][18].value is null or aCode[i][18].value is undefined
              elemDD = false
            else
              elemDD = aCode[i][18].value
          else
            elemDD = false
          if aCode[i][19] != undefined
            if aCode[i][19].value is '' or aCode[i][19].value is null or aCode[i][19].value is undefined
              elemE = 0
            else
              elemE = aCode[i][19].value
          else
            elemE = 0
          page_model += '{\n        "heroId": "hero-elem' + i + '",'
          page_model += '\n        "active": ' + elemD + ','
          page_model += '\n        "sticky": ' + elemDD + ','
          page_model += '\n        "showCountdown": ' + elemA + ','
          page_model += '\n        "popUpLink": ' + elemB + ','
          page_model += '\n        "date": {'
          page_model += '\n          "start": "' + aCode[i][0].value + '",'
          page_model += '\n          "end": "' + aCode[i][1].value + '",'
          page_model += '\n          "delay": ' + elemE
          page_model += '\n        },'
          page_model += '\n        "title": {'
          page_model += '\n          "en": "' + aCode[i][2].value.trim() + '",'
          page_model += '\n          "fr": "' + aCode[i][3].value.trim() + '",'
          page_model += '\n          "color": "' + aCode[i][4].value + '",'
          page_model += '\n          "showTitle": ' + elemAA
          page_model += '\n        },'
          page_model += '\n        "text": {'
          page_model += '\n          "en": "' + aCode[i][5].value.trim() + '",'
          page_model += '\n          "fr": "' + aCode[i][6].value.trim() + '",'
          page_model += '\n          "showSubTitle": ' + elemAAA
          page_model += '\n        },'
          page_model += '\n        "promote": ' + elemC + ','
          page_model += '\n        "button": {'
          page_model += '\n          "label": {'
          page_model += '\n            "en": "' + aCode[i][9].value.trim() + '",'
          page_model += '\n            "fr": "' + aCode[i][10].value.trim() + '"'
          page_model += '\n          },'
          page_model += '\n        "url": "' + aCode[i][11].value + '",'
          page_model += '\n        "popUpLinkID": "' + elemAAAA + '"'
          page_model += '\n        },'
          page_model += '\n        "image": {'
          page_model += '\n          "url": "' + aCode[i][7].value + '",'
          page_model += '\n          "altUrl": "' + aCode[i][8].value + '"'
          page_model += '\n        }'
          if i < lastItem
            page_model += '\n},\n'
          i++
        page_model += '\n      }\n   ]\n}'
      if meth is 'full'
        if $(app.objects.he).css('display') is 'block'
          $(app.objects.he).css 'display', 'none'
        if $(app.objects.h).css('display') is 'block'
          $(app.objects.h).css 'display', 'none'
        if $(app.objects.ls).css('display') is 'block'
          $(app.objects.ls).css 'display', 'none'
        $(app.objects.o).attr app.handlers.r, 'output'
        $(app.objects.o).css 'display', 'block'
        $(app.objects.o + ' textarea').val page_model
        $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css 'overflow', 'hidden'
        if mode is 'hero'
          core.errorHandler()
        core.panelAlert 'JSON Exported Successfuly', 'good'
      else
        core.saveNodeToLS page_model, name
    catch e
      core.panelAlert 'An unknown error has occured. Please make sure all required fields are filled.', 'error'
    return
  urlExists: (testUrl) ->

    ###*
    # Check if an url exists
    ###

    http = jQuery.ajax(
      type: 'HEAD'
      url: 'https:' + testUrl
      async: false)
    http.status
    # this will return 200 on success, and 0 or negative value on error
  validateImage: (type, handler) ->
    `var b`

    ###*
    # Gets the image url input by the user and runs it
    # through the urlExists function. Depending on the
    # value returned, the form elements will be
    # formatted accordingly
    ###

    if type is 'main'
      a = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').val()
      aa = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image')
      aaa = $(app.objects.c + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.main_image').parent().attr('class')
      if a != ''
        b = core.urlExists(a)
        if b != 200
          if aaa is 'input_holders'
            $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html 'Image does not exist'
          else
            $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html 'Image does not exist'
        else if b is 200
          if aaa is 'input_holders'
            $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html 'Image validated'
          else
            $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html 'Image validated'
        else
          if aaa is 'input_holders'
            $(aa).next().next().attr('style', '').html 'Shopify CDN'
          else
            $(aa).next().attr('style', '').html 'Shopify CDN'
      else
        if aaa is 'input_holders'
          $(aa).next().next().css('background-color', '#eee').html 'Nothing to validate'
        else
          $(aa).next().css('background-color', '#eee').html 'Nothing to validate'
    else if type is 'alt'
      a = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').val()
      aa = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image')
      aaa = $(app.objects.ca + '[' + app.handlers.d + '="' + handler + '"]').parent().parent().parent().parent().parent().parent().parent().parent().find('.alt_image').parent().attr('class')
      if a != ''
        b = core.urlExists(a)
        if b != 200
          if aaa is 'input_holders'
            $(aa).next().next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html 'Image does not exist'
          else
            $(aa).next().css('background-color', '#ff3300').css('font-weight', 'bold').css('color', '#fff').html 'Image does not exist'
        else if b is 200
          if aaa is 'input_holders'
            $(aa).next().next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html 'Image validated'
          else
            $(aa).next().attr('style', '').css('background-color', 'rgb(82, 197, 82)').html 'Image validated'
        else
          if aaa is 'input_holders'
            $(aa).next().next().attr('style', '').html 'Shopify CDN'
          else
            $(aa).next().attr('style', '').html 'Shopify CDN'
      else
        if aaa is 'input_holders'
          $(aa).next().next().css('background-color', '#eee').html 'Nothing to validate'
        else
          $(aa).next().css('background-color', '#eee').html 'Nothing to validate'
    return
  previewFeature: (heroItem, mode, lang) ->

    ###*
    # Generates a preview of the hero banner in large
    # and small format by collection the forms
    # serialized data.
    ###

    dt = $(app.objects.e + heroItem).find('form').find('fieldset[data-role="hero"]').serializeArray()
    start = dt[0].value
    img = dt[7].value
    titleColor = dt[4].value
    if lang is app.language.e
      titleText = dt[2].value
      subTitleText = dt[5].value
      buttonLabel = dt[9].value
      endsLabel = 'Ends In'
    else if lang is app.language.f
      titleText = dt[3].value
      subTitleText = dt[6].value
      buttonLabel = dt[10].value
      endsLabel = 'Termine dans'
    buttonLink = dt[11].value
    container = app.objects.h
    target = '.render_output'
    sub = dt[16].value
    warningString = '<div class="preview_warning" title="The position and size of the background may display differently than on the live site.">Preview may differ from actual site render</div>'
    if mode is 'small'
      outputString = '<div class="five columns jose pedro homepage_content event mini-spacers animated fadeIn delay-05s"><div id="event-active-today">'
    else
      outputString = ''
    outputString += '<div data-instance="slide-0" data-str="' + img + '"'
    outputString += ' data-promote="true" id="slide-0" class="hero fwidth root-0"><div data-object-pos="false-false" class="bcg skrollable skrollable-between" data-center="background-position: 50% 0px;" data-top-bottom="background-position: 50% -200px;" data-anchor-target="#slide-0"'
    outputString += ' style="background-image: url(' + img + '); background-position: 50% -55.2631578947369px;"><div class="hsContainer"><div class="hsContent center skrollable skrollable-before" data-100-top="opacity: 1" data-25-top="opacity: 0" data-anchor-target="#slide-0 .animated" style="opacity: 1;">'
    outputString += '<div itemscope="" itemtype="http://schema.org/Event" class="animated fadeIn delay-025s hero_head"><p itemprop="startDate" content="' + start + '" class="subtitle timedown is-countdown" id="countdown0" style="opacity:0.9"><span>' + endsLabel + '  <b>11:29:39</b> </span></p>'
    outputString += '<h1 class="headline herobanner" style="color:' + titleColor + '">' + titleText + '</h1>'
    if sub is 'true'
      outputString += '<p class="subtitle herobanner">' + subTitleText + '</p>'
    outputString += '<a data-bleed="" href="' + buttonLink + '" class="action_button hero"><span class="trn" data-trn-key="">' + buttonLabel + '</span></a>'
    outputString += '</div></div></div></div></div>'
    if mode is 'small'
      outputString += '</div></div><div style="clear:both"></div>'
    else if mode is 'large'
      outputString += warningString
    $(container).show().css 'top', sPos + 50
    $(target).empty().append outputString
    if mode is 'small'
      pfHero = heroItem
      pfMode = mode
      $(target).addClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr 'data-mode', mode
    else if mode is 'large'
      pfHero = heroItem
      pfMode = mode
      $(target).removeClass('renderSmall').attr('data-hero', heroItem).attr('data-language', lang).attr 'data-mode', mode
    return
$ ->

  ###*
  # Main document ready initialized function
  ###

  core.setHeadSec()
  core.initializeTheme()
  core.initHelp()
  core.getVersion true
  setInterval 'core.getVersion(false)', 600000
  $('.date_obj').datetimepicker format: 'MM/DD/YYYY HH:mm'
  $('.btnAdd').attr 'disabled', false
  # Disable the "remove" button
  $('.btnDel').attr 'disabled', true

  ###*
  # event handlers bound to the .on expression
  # so that dynamically generated divs are
  # taken into consideration
  ###

  $(app.objects.bo).on('click', '.btnAdd', ->
    core.addItems()
    return
  ).on('click', '.overlay_close', ->
    $(this).parent().parent().hide()
    $(app.objects.r).css 'overflow', 'auto'
    $('.overlay_message').css 'display', 'none'
    return
  ).on('click', '.select_content', ->
    $this = $(app.objects.b + ' textarea')
    $this.select()
    # Work around Chrome's little problem
    $this.mouseup ->
      # Prevent further mouseup intervention
      $this.unbind 'mouseup'
      false
    return
  ).on('click', '.gotoItem', ->
    a = $(this).data('item')
    $(app.objects.r).animate { scrollTop: $(app.objects.e + a).offset().top - 60 }, app.animation.d.min
    if $(app.objects.o).css('display') is 'block'
      $(app.objects.r).css 'overflow', 'auto'
      $('#oapp.objects.output').css 'display', 'none'
    if $(app.objects.he).css('display') is 'block'
      $(app.objects.he).css 'display', 'none'
    return
  ).on('click', '.about_app,.version_number', (e) ->
    window.open '../release.html', '_blank', 'scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no'
    return
  ).on('click', '.btnAddMulti', ->
    $('#query-zone').toggle()
    $(app.objects.r).animate { scrollTop: 0 }, app.animation.d.min
    if $(app.objects.o).css('display') is 'block'
      $(app.objects.o).css 'display', 'none'
    if $(app.objects.h).css('display') is 'block'
      $(app.objects.h).css 'display', 'none'
    $('.num_select').focus()
    return
  ).on('click', app.objects.c, (e) ->
    a = $(this).data('handler')
    core.validateImage 'main', a
    e.preventDefault()
    return
  ).on('click', '.multiquery_close', ->
    $(this).parent().parent().hide()
    return
  ).on('click', '.check_alt_image', (e) ->
    a = $(this).data('handler')
    core.validateImage 'alt', a
    e.preventDefault()
    return
  ).on('click', '.overlay_validate', ->
    core.validateJSON()
    return
  ).on('click', '.previewItem.large', (e) ->
    $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css 'overflow', 'hidden'
    a = $(this).data('hero')
    core.previewFeature a, 'large', pfLang
    e.preventDefault()
    return
  ).on('click', '.previewItem.small', (e) ->
    $(app.objects.r).animate({ scrollTop: sPos }, app.animation.d.min).css 'overflow', 'hidden'
    a = $(this).data('hero')
    core.previewFeature a, 'small', pfLang
    e.preventDefault()
    return
  ).on('click', '.removeThisItem', ->
    a = $(this).data('item')
    core.deleteItems a
    return
  ).on('click', '.loadItem', ->
    a = $(this).attr(app.handlers.i)
    core.traverseJSON true, a
    return
  ).on('click', '.copy-zone', ->
    core.OpenInNewTab 'https://github.com/davidemaser/davidemaser.github.io'
    return
  ).on('click', '.showHelp', ->
    $(app.objects.he).toggle()
    if $(app.objects.he).css('display') is 'block'
      $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css 'overflow', 'hidden'
    else
      $(app.objects.r).css 'overflow', 'auto'
    if $(app.objects.o).css('display') is 'block'
      $(app.objects.o).css 'display', 'none'
    if $(app.objects.h).css('display') is 'block'
      $(app.objects.h).css 'display', 'none'
    return
  ).on('click', '.help_close', ->
    if $(app.objects.he).css('display') is 'block'
      $(this).parent().parent().hide()
      $(app.objects.r).css 'overflow', 'auto'
    return
  ).on('click', '.renderer_close', ->
    if $(app.objects.h).css('display') is 'block'
      $(this).parent().parent().hide()
      $(app.objects.r).css 'overflow', 'auto'
      $(app.objects.h).find('.render_output').empty()
    return
  ).on('click', '.btnNmode', ->
    a = $(app.dom.b).attr('data-nmode')
    if a is 'hero'
      $(app.dom.b).attr 'data-nmode', 'hello'
      $(this).attr 'data-nmode', 'hello'
      $(this).html 'Switch to Hero Banner Mode'
      core.switchModes 'hello'
    else if a is 'hello'
      $(app.dom.b).attr 'data-nmode', 'hero'
      $(this).attr 'data-nmode', 'hero'
      $(this).html 'Switch to Hello Bar Mode'
      core.switchModes 'hero'
    return
  ).on('click', '.btnDel', ->
    core.deleteItems 'last'
    return
  ).on('click', '.submit_json', ->
    a = $(this).attr('data-nmode')
    core.prepareJSON 'full', null, a
    return
  ).on('click', '.translate_json', ->
    $('.overlay_message').html ''
    $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css 'overflow', 'hidden'
    $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr 'placeholder', 'Paste you code here'
    return
  ).on('click', '.save_json', (e) ->
    if app.save is true
      core.doLocalSave()
    else
      confirm 'The save to localstorage feature is disabled. Change the save value to true in the globals file.'
    return
  ).on('click', '.import_json', (e) ->
    core.choseLocalSave()
    return
  ).on('click', '.overlay_translate', ->
    core.traverseJSON false
    return
  ).on('click', '.errors_reset', ->
    $('input,select').attr('style', '').attr 'placeholder', ''
    $('.errorList').css 'display', 'none'
    $(app.objects.r).css 'overflow', 'auto'
    $(app.objects.i).find('.input_alerts').remove()
    $(app.objects.i).contents().unwrap()
    core.panelAlert 'Errors Reset', 'good'
    return
  ).on('click', '.form_reset', (e) ->
    $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css 'overflow', 'hidden'
    $('.clonedInput:gt(0)').remove()
    $('.snapTo').find('li:gt(0)').remove()
    $('input').val ''
    $('input,select').attr('style', '').attr 'placeholder', ''
    $('.errorList').css 'display', 'none'
    $(app.objects.r).css 'overflow', 'auto'
    $(app.objects.i).find('.input_alerts').remove()
    $(app.objects.i).contents().unwrap()
    $('.reordered').remove()
    core.panelAlert 'Form Reset To Default', 'good'
    e.preventDefault()
    return
  ).on('click', '.itemize_reset', (e) ->
    core.resetItems()
    e.preventDefault()
    return
  ).on('click', '.form_local_reset', (e) ->
    core.doLocalSave 'reset'
    $(app.objects.l).hide()
    e.preventDefault()
    return
  ).on('click', 'input,select', ->
    $(this).attr('style', '').attr 'placeholder', ''
    if $(this).parent().hasClass('input_holders')
      $(this).parent().find('.input_alerts').remove()
      $(this).unwrap()
    return
  ).on('click', '.helpItem', ->
    a = $(this).data('target')
    core.jumpToHelper a
    return
  ).on('click', '.image_count', ->
    $(this).attr 'style', ''
    $(this).text 'Shopify CDN'
    return
  ).on('click', '.btnSwitch', (e) ->
    pfLang = $(this).data('language')
    $('.btnSwitch').removeClass 'view-active'
    $('.btnSwitch[data-language="' + pfLang + '"]').addClass 'view-active'
    if $(app.objects.ro).children().not('.preview_warning').length > 0
      rH = pfHero
      rL = pfLang
      rM = pfMode
      core.previewFeature rH, rM, rL
    core.panelAlert 'Preview language changed', 'good'
    e.preventDefault()
    return
  ).on('click', '.panel-body.bottom_level_bt', ->
    $(this).slideUp()
    return
  ).on('click', '.show_me_how', ->
    a = $(this).data('target') - 1
    $(app.objects.r).animate({ scrollTop: 0 },
      duration: app.animation.d.min
      complete: ->
        $(app.objects.he).show()
        core.jumpToHelper a
        return
    ).css 'overflow', 'hidden'
    return
  ).on('click', '.helpItemReset', ->
    $(app.objects.hi).animate { opacity: 1 }, app.animation.d.min
    return
  ).on('click', '.settings_toggle', (e) ->
    a = $(this).data('theme')
    $('html').attr app.handlers.t, a
    if window.localStorage
      localStorage.setItem 'pgb_Theme', a
    core.panelAlert 'Theme Settings Updated', 'good'
    e.preventDefault()
    return
  ).on('click', '.moveUpThisItem', (fn) ->
    a = $(this).data('item')
    b = a - 1
    c = $(this).parent().parent().parent().parent().parent().parent()
    d = $(c).closest(app.objects.cl).prev()
    e = $(c).data('split')
    $(c).attr app.handlers.s, e - 1
    $(c).insertBefore d
    $(app.objects.r).animate { scrollTop: $(app.objects.e + a).offset().top - 60 }, app.animation.d.min
    #$(d).closest(app.objects.cl).prev();
    $(this).parent().parent().parent().find('.reordered').remove()
    $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend '<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>'
    core.panelAlert 'Item Order Changed', 'good'
    fn.preventDefault()
    return
  ).on('click', '.moveDownThisItem', (fn) ->
    a = $(this).data('item')
    b = a - 1
    c = $(this).parent().parent().parent().parent().parent().parent()
    d = $(c).closest(app.objects.cl).next()
    e = $(c).data('split')
    f = $(d).attr('id')
    if f.indexOf('entry') > -1
      $(c).attr app.handlers.s, e + 1
      $(c).insertAfter d
      $(app.objects.r).animate { scrollTop: $(app.objects.e + a).offset().top - 60 }, app.animation.d.min
      $(this).parent().parent().parent().find('.reordered').remove()
      $(this).parent().parent().parent().find('.btn.btn-info:not(.dropdown-toggle)').prepend '<span title="This entry has been moved from it\'s original position" class="glyphicon glyphicon-fullscreen reordered" aria-hidden="true"></span>'
      core.panelAlert 'Item Order Changed', 'good'
    else
      core.panelAlert 'If I move down any further, I\'ll be off the page.', 'error'
    fn.preventDefault()
    return
  ).on('click', '.batsToggle', ->
    if $(this).attr('data-status') is 'active'
      core.killBats()
    else if $(this).attr('data-status') is 'allGone'
      core.launchBats()
      core.launchBats()
      core.launchBats()
      core.launchBats()
      core.launchBats()
      $('.batsToggle').attr('data-status', 'active').html 'Kill The Bats'
    return
  ).on('keyup', 'input', ->
    a = $(this).val().length
    if $(this).hasClass('objTitleEN') or $(this).hasClass('objTitleFR') or $(this).hasClass('objTextEN') or $(this).hasClass('objTextFR')
      compLen = 35
    else if $(this).hasClass('objButtonEN') or $(this).hasClass('objButtonFR')
      compLen = 15
    if a > compLen
      if $(this).parent().attr('class') != 'input_holders'
        $(this).wrap('<div class="input_holders"></div>').parent().append '<div class="input_alerts" title="The length of your text may be too long for the hero banner container. Make sure to check that it displays correctly."><span class="glyphicon glyphicon-exclamation-sign"></span></div>'
        $(this).focus()
    else
      if a <= compLen
        if $(this).parent().attr('class') is 'input_holders'
          $(this).parent().find('.input_alerts').remove()
          $(this).unwrap()
          $(this).focus()
    return
  ).on('keyup', '.num_select', (e) ->
    if e.keyCode is 13
      $(this).trigger 'enterKey'
      core.addMulti $(this).val()
      $(this).parent().parent().parent().parent().hide()
    return
  ).on('keyup', '.lsl_select', (e) ->
    if e.keyCode is 13
      $(this).trigger 'enterKey'
      core.prepareJSON 'save', $(this).val()
      $(this).parent().parent().parent().parent().hide()
      core.setHeadSec()
    return
  ).on('keyup', app.objects.o + '[' + app.handlers.r + '="translate"] #output_code', (e) ->
    if e.keyCode is 45
      $(this).trigger 'enterKey'
      core.traverseJSON false
      e.preventDefault()
    return
  ).on('change', '.objHeroSticky', ->
    a = $(this).val()
    if a is 'true'
      $(this).parent().parent().find('.objHeroPromote option[value="true"]').attr 'selected', false
    else if a is 'false'
      #$(this).parent().parent().find('.objHeroPromote option[value="false"]').attr('selected',true);
    else
    return
  ).on('change', '.objButtonPopup', ->
    a = $(this).val()
    if a is 'true'
      $(this).parent().parent().find('.objButtonPopupLink').attr 'style', ''
    else if a is 'false'
      $(this).parent().parent().find('.objButtonPopupLink').css 'opacity', 0.3
    return
  ).on('change', '.input_radio', ->
    a = $(this).parent().parent().parent().parent().parent().attr('id').replace('entry', '')
    if $(this).val() is 'true'
      $(this).parent().parent().css 'border-left', '6px solid #68B81F'
      $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-danger').addClass 'label-default'
      $('.gotoItem[' + app.handlers.i + '="' + a + '"]').removeClass('redout').attr 'title', ''
    else
      $(this).parent().parent().css 'border-left', '6px solid #FD0000'
      $(this).parent().parent().parent().parent().find('h2').find('span').removeClass('label-default').addClass 'label-danger'
      $('.gotoItem[' + app.handlers.i + '="' + a + '"]').addClass('redout').attr 'title', 'This Hero entry is not activated'
    return
  ).on 'change', '.lsOptions', ->
    try
      if $(this).val() != '' or $(this).val() != 'undefined' or $(this).val() != undefined or $(this).val() != 'null' or $(this).val() != null
        a = $(this).val()
        core.traverseJSON true, a
      else
        panelAlert 'Please select a valid data item from the dropdown', 'error'
    catch e
    return
  $(window).on('scroll', ->
    if $(window).scrollTop() + $(window).height() is $(document).height()
      $('.copy-zone').fadeIn app.animation.d.min
    else
      $('.copy-zone').fadeOut app.animation.d.min
    return
  ).on 'resize', ->
    core.scrollState 'a'
    return
  $(document).on('keydown', (e) ->
    if e.keyCode is 71 and e.ctrlKey
      a = $('.submit_json').attr('data-nmode')
      core.prepareJSON 'full', null, a
      e.preventDefault()
    if e.keyCode is 82 and e.ctrlKey
      core.deleteItems()
      e.preventDefault()
    if e.keyCode is 73 and e.ctrlKey and !e.altKey
      core.addItems()
      e.preventDefault()
    if e.keyCode is 73 and e.ctrlKey and e.altKey
      $('#query-zone').toggle()
      $(app.objects.r).animate { scrollTop: 0 }, app.animation.d.min
      if $(app.objects.o).css('display') is 'block'
        $(app.objects.o).css 'display', 'none'
      if $(app.objects.h).css('display') is 'block'
        $(app.objects.h).css 'display', 'none'
      $('.num_select').focus()
      e.preventDefault()
    if e.keyCode is 83 and e.ctrlKey and e.shiftKey
      core.prepareJSON 'save'
    if e.keyCode is 13 and e.ctrlKey and e.altKey
      $('.overlay_message').html ''
      $(app.objects.r).animate({ scrollTop: 0 }, app.animation.d.min).css 'overflow', 'hidden'
      $(app.objects.o).attr(app.handlers.r, 'translate').css('display', 'block').find('#output_code').val('').attr 'placeholder', 'Paste you code here'
      e.preventDefault()
    if e.keyCode is 45 and e.ctrlKey and e.altKey
      core.traverseJSON true
    if e.keyCode is 69 and e.ctrlKey and e.altKey
      if pfLang is app.language.e
        pfLang = app.language.f
      else if pfLang is app.language.f
        pfLang = app.language.e
      $('.btnSwitch').removeClass 'view-active'
      $('.btnSwitch[data-language="' + pfLang + '"]').addClass 'view-active'
      if $(app.objects.ro).children().not('.preview_warning').length > 0
        core.previewFeature pfHero, pfMode, pfLang
      core.panelAlert 'Preview language changed', 'good'
      e.preventDefault()
    if e.keyCode is 191 and e.ctrlKey
      window.open '../release.html', '_blank', 'scrollbars=no,resizable=no,height=600, width=800, status=yes, toolbar=no, menubar=no, location=no'
      e.preventDefault()
    return
  ).on 'scroll', ->
    core.scrollState 'b'
    sPos = $(window).scrollTop()
    return
  d = new Date
  dt = d.getDate()
  dm = d.getMonth() + 1
  if dm is 10 and dt > 21
    $('.main_nav').append '<li class="divider"></li><li><a href="#" class="batsToggle" data-status="active">Kill The Bats</a></li>'
    core.launchBats()
    core.launchBats()
    core.launchBats()
    core.launchBats()
    core.launchBats()
  return
