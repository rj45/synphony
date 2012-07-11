requirejs.config
  baseUrl: 'js/'

  paths:
    handlebars: 'libs/handlebars'
    backbone: 'libs/backbone'
    jquery: [
      'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min'
      'libs/jquery-1.7.2.min'
    ]
    underscore: 'libs/underscore'
    text: 'libs/text'
    i18n: 'libs/i18n'
    templates: '../templates'

  # TODO: shouldn't use shim for this, should find a require.js
  # version. The jquery CDN can mess with shims on optimization.
  shim:
    backbone:
      deps: ['underscore', 'jquery']
      exports: 'Backbone'
    underscore:
      deps: []
      exports: '_'
    handlebars:
      deps: []
      exports: 'Handlebars'

  # urlArgs: "bust=" +  (new Date).getTime()
  enforceDefine: true

define ['jquery', 'backbone', 'model/store', 'view/common/layout', 'router/admin', 'router/demo', 'router/designer'],
($, Backbone, Store, Layout, AdminRouter, DemoRouter, DesignerRouter) ->
  adminRouter = null
  demoRouter = null
  designerRouter = null
  store = null

  $ ->
    # Only put jQuery things here that are not worth the effort of
    # making a whole view for them. If you find you need state or
    # access to the model, make a view instead.
    ($ '#side-panel-toggle').click ->
      # ($ '#control-panel').toggle 'fast', 'swing'
      # ($ '#side-panel').toggle 'fast', 'swing'
      ($ '#control-panel').toggle()
      ($ '#side-panel').toggle()
      ($ '#side-panel-toggle').toggleClass 'active'

    layout = new Layout
        menu: "#main-menu"
        content: "#main-content"
        sidebar: "#toolbar-content"
    store = new Store
    console.log "Loaded, starting router"
    adminRouter = new AdminRouter { store, layout }
    demoRouter = new DemoRouter { store, layout }
    designerRouter = new DesignerRouter {store, layout }
    Backbone.history.start()
