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
    { path: '/index/', url: 'index.html', },
    { path: '/opReg1/', url: 'opReg1.html', },
    { path: '/opReg2/', url: 'opReg2.html', },
    { path: '/opReg3/', url: 'opReg3.html', },
    { path: '/opReg4/', url: 'opReg4.html', },
    { path: '/opReg5/', url: 'opReg5.html', },
    { path: '/loggedIn/', url: 'loggedIn.html', },
  ]
  // ... other parameters
});

var mainView = app.views.create('.view-main');

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function () {
  console.log("Device is ready!");
});

// Option 1. Using one 'page:init' handler for all pages
$$(document).on('page:init', function (e) {
  // Do something here when page loaded and initialized
})

// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  $$("#indexNuevaCuenta").on('click', aP1Registro)
  $$("#indexBtnIni").on('click', inicioSesion)

})
// Option 2. Using live 'page:init' event handlers for each page
$$(document).on('page:init', '.page[data-name="opReg1"]', function (e) {
  $$("#op1RegBtnSig").on('click', aP2Registro)

})
$$(document).on('page:init', '.page[data-name="opReg2"]', function (e) {
  $$("#op2RegBtnSig").on('click', aP3Registro)

})
$$(document).on('page:init', '.page[data-name="opReg3"]', function (e) {
  $$("#op3RegBtnSig").on('click', aP4Registro)

})
$$(document).on('page:init', '.page[data-name="opReg4"]', function (e) {
  $$("#op4RegBtnSig").on('click', aP5Registro)

})
$$(document).on('page:init', '.page[data-name="opReg5"]', function (e) {
  $$("#op5RegBtnFin").on('click', nuevoRegistro)

})
$$(document).on('page:init', '.page[data-name="loggedIn"]', function (e) {
  $$("#userLoggedIn").text(emailSession)
  $$("#userLoggedIn").text(`${emailReg}. Gracias por registrarte`)
})

//Variables
var name, emailReg, emailSession, passwordReg, passwordSession, guardado, fechaNac, localidad, deporte, frecuenciaJuego, username

//Funciones
//Pasar de pantalla donde comienza el paso 1 para registro de usuario
function aP1Registro() {
  mainView.router.navigate("/opReg1/")
}
//Pasar de pantalla 2 en el registro de usuario
function aP2Registro() {
  mainView.router.navigate("/opReg2/")
  emailReg = $$("#op1RegInputMail").val()
  name = $$("#op1RegInputNombre").val()
}
//Pasar de pantalla 3 en el registro de usuario
function aP3Registro() {
  mainView.router.navigate("/opReg3/")
  passwordReg = $$("#op2RegInputPass").val()
  console.log(passwordReg);
}
//Pasar de pantalla 4 en el registro de usuario
function aP4Registro() {
  mainView.router.navigate("/opReg4/")
}
//Pasar de pantalla 5 en el registro de usuario
function aP5Registro() {
  mainView.router.navigate("/opReg5/")
}

//Registro de nueva cuenta
function nuevoRegistro() {

  if (emailReg != "" && passwordReg != "") {
    firebase.auth().createUserWithEmailAndPassword(emailReg, passwordReg)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + emailReg);

        username = $$("#op5RegInputUser").val()
        fechaNac = $$("#op4RegInputFecha").val()
        localidad = $$("#op4RegInputLoca").val()
        deporte = $$("#op4RegInputDeporte").val()
        frecuenciaJuego = $$("#op4RegInputFrecuencia").val()

        console.log(`Se acaba de registrar el usuario ${username} nacido el ${fechaNac} en la localidad de ${localidad}. Su deporte favorito es ${deporte} y lo practiva ${frecuenciaJuego} veces por semana`);

        mainView.router.navigate('/loggedIn/');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          console.error(`El email: ${emailReg} ya se encuentra registrado. Utilice un nuevo email`);
        }
      });
  }
}

//Inicio de sesión con una cuenta existente
function inicioSesion() {
  emailSession = $$("#indexInputUser").val()
  passwordSession = $$("#indexInputPass").val()

  firebase.auth().signInWithEmailAndPassword(emailSession, passwordSession)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(`Bienvenidx ${emailSession}`);
      mainView.router.navigate('/loggedIn/');

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      console.log(error);
      console.log(errorCode);
    });
}