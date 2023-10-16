// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
      path: '/index/',
      url: 'index.html',
      },
      {
      path: '/opReg1/',
      url: 'opReg1.html',
      },
      {
        path: '/opReg2/',
        url: 'opReg2.html',
      },
      {
        path: '/opReg3/',
        url: 'opReg3.html',
      },
      {
        path: '/opReg4/',
        url: 'opReg4.html',
      },
      {
        path: '/opReg5/',
        url: 'opReg5.html',
      },
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
    // Do something here when page loaded and initialized
    console.log(e);
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="opReg1"]', function (e) {
    
})
$$(document).on('page:init', '.page[data-name="opReg2"]', function (e) {
    
})
$$(document).on('page:init', '.page[data-name="opReg3"]', function (e) {

})
$$(document).on('page:init', '.page[data-name="opReg4"]', function (e) {
    
})
$$(document).on('page:init', '.page[data-name="opReg5"]', function (e) {

})