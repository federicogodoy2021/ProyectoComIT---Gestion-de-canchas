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
    { path: '/index/', url: 'index.html' },
    { path: '/opReg1/', url: 'opReg1.html' },
    { path: '/opReg2/', url: 'opReg2.html' },
    { path: '/opReg3/', url: 'opReg3.html' },
    { path: '/opReg4/', url: 'opReg4.html' },
    { path: '/loggedIn/', url: 'loggedIn.html' },
    { path: '/reserva/', url: 'reserva.html' },
    { path: '/turnos/', url: 'turnos.html' },
    { path: '/confirmacionTurno/', url: 'confirmacionTurno.html' },
    { path: '/seccionComplejos/', url: 'seccionComplejos.html' },
    { path: '/turnosC/', url: 'turnosC.html' }
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
  getPositionGPS()
  $$("#op4RegBtnFin").on('click', nuevoRegistroUser)

})
$$(document).on('page:init', '.page[data-name="loggedIn"]', function (e) {
  $$("#userLoggedIn").text(`${emailReg}. Gracias por registrarte`)
  $$("#userLoggedIn").text(emailSession)
  aPantReserva()
})
$$(document).on('page:init', '.page[data-name="reserva"]', function (e) {
  $$("#btnBuscar").on('click', buscarCancha)
})
$$(document).on('page:init', '.page[data-name="turnos"]', function (e) {
})
$$(document).on('page:init', '.page[data-name="confirmacionTurno"]', function (e) {
  $$("#confirmacionTurno").text(`El turno fue seleccionado para jugar al ${resDeporte} el día ${resFecha} en el complejo ${resComplejo} a las ${horaTurno} Hs.`)
  $$("#confirmacionMailTurno").text(`Le enviamos un email a ${emailSession} con los datos de la reserva`)
  nuevaBusqueda()
})
$$(document).on('page:init', '.page[data-name="seccionComplejos"]', function (e) {
  $$("#gestionbtnBuscar").on('click', buscarturnosComp)
})
$$(document).on('page:init', '.page[data-name="turnosC"]', function (e) {
})

/* ----------------------- -------------------------- ----------------------- */

//Variables globales Datos
//Usuarios
var nombre, emailReg, emailSession, passwordReg, roleSession, userSession, passwordSession, guardado, fechaNac, localidad, deporte, frecuenciaJuego, username, latitud, longitud

//Variables globales Colecciones
db = firebase.firestore()
var colUsers = db.collection("USERS")
var colComplejos = db.collection("COMPLEJOS")
var colReservas = db.collection("RESERVAS")
var colTurnos = db.collection("TURNOS")

//Variables globales Reservas
var resComplejo, resDeporte, resTipoCancha, resFecha, resHora, horaTurno

/* ----------------------- -------------------------- ----------------------- */

//Funciones
//Pasar de pantalla donde comienza el paso 1 para registro de usuario
function aP1Registro() {
  mainView.router.navigate("/opReg1/")
}
//Pasar de pantalla 2 en el registro de usuario
function aP2Registro() {
  mainView.router.navigate("/opReg2/")
  emailReg = $$("#op1RegInputMail").val()
  nombre = $$("#op1RegInputNombre").val()
}
//Pasar de pantalla 3 en el registro de usuario
function aP3Registro() {
  mainView.router.navigate("/opReg3/")
  passwordReg = $$("#op2RegInputPass").val()
}
//Pasar de pantalla 4 en el registro de usuario
function aP4Registro() {
  mainView.router.navigate("/opReg4/")
}
//Pasar a pantalla de reserva
function aPantReserva() {
  setTimeout(() => {
    mainView.router.navigate("/reserva/")

  }, 3000)
}

//Registro de nueva cuenta de usuario
function nuevoRegistroUser() {

  if (emailReg != "" && passwordReg != "") {
    firebase.auth().createUserWithEmailAndPassword(emailReg, passwordReg)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("Bienvenid@!!! " + emailReg);

        //Guadadado de datos en variables
        username = $$("#op4RegInputUser").val()
        fechaNac = $$("#op3RegInputFecha").val()
        localidad = $$("#op3RegInputLoca").val()
        deporte = $$("#op3RegInputDeporte").val()
        frecuenciaJuego = $$("#op3RegInputFrecuencia").val()

        addUserToDB()

        console.log(`Se acaba de registrar el usuario ${username} nacido el ${fechaNac} en la localidad de ${localidad}. Su deporte favorito es ${deporte} y lo practiva ${frecuenciaJuego} veces por semana`);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
        if (errorCode == "auth/email-already-in-use") {
          console.error(`El email: ${emailReg} ya se encuentra registrado. Utilice un nuevo email`);
        }
      })

  }
}

//Inicio de sesión con una cuenta existente
function inicioSesion() {

  if (emailSession != "" && passwordSession != "") {
    emailSession = $$("#indexInputUser").val()
    passwordSession = $$("#indexInputPass").val()

    firebase.auth().signInWithEmailAndPassword(emailSession, passwordSession)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(`Bienvenidx ${emailSession}`);

        //Validando Role
        var sessionId = emailSession
        colUsers.where("email", "==", sessionId).get()
          .then(function (res) {
            res.forEach(function (doc) {
              roleSession = doc.data().role
              userSession = doc.data().usuario

              //Ingreso dependiendo del role de usuario
              if (roleSession == "normal user") {
                mainView.router.navigate('/loggedIn/');
                registerVisit()
              } else if (roleSession == "complejo")
                console.log("ingreso como complejo");
              mainView.router.navigate('/seccionComplejos/');
            })
          })
          .catch(function (error) {
            console.log("Error: " + error)
          })
      })
      .catch((error) => {
        if (error.message == "The email address is badly formatted.") {
          $$("#cajaValidacion").html(`<h3>El email ingresado posee un formato incorrecto</h3>`)
        } else {
          errorJson = JSON.parse(error.message);
          var errorCode = errorJson.error.code;
          var errorMessage = errorJson.error.message;

          if (errorMessage == `INVALID_LOGIN_CREDENTIALS`) {
            $$("#cajaValidacion").html("<h3>El email o la contraseña son incorrectos</h3>")
          } else {
            console.log(errorCode);
          }
        }
      })
      ;
  }
}

//Función de agregar usuario
function addUserToDB() {
  var datos = {
    usuario: username,
    nombre: nombre,
    email: emailReg,
    contraseña: passwordReg,
    fechaN: fechaNac,
    ciudad: localidad,
    posicion: { latitud, longitud },
    deporteF: deporte,
    frecuenciaDeJuego: frecuenciaJuego,
    role: "normal user",
    cantVisitas: 1
  }

  var myId = emailReg

  colUsers.doc(myId).set(datos)
    .then(function (docRef) {
      console.log("Doc ref con el id = " + myId)
      mainView.router.navigate('/loggedIn/');
    })
    .catch(function (error) {
      console.log("Error: " + error)
    })
}

//Funcion Registrar visita en Base de datos
function registerVisit() {
  var sessionId = emailSession

  colUsers.where("email", "==", sessionId).get()

    .then(function (query) {
      query.forEach(function (doc) {
        quantVisits = doc.data().cantVisitas
        console.log(quantVisits);

        //Aumento cantidad de visistas y actualizo
        colUsers.doc(sessionId).update({ cantVisitas: quantVisits + 1 })

        console.log("Documento actualizado")
      })
    })
    .catch(function (error) {
      console.log("Error: " + error)
    })
}

//Función Obtener posición GPS
function getPositionGPS() {
  navigator.geolocation.getCurrentPosition(posicionGPS, errorGPS);
}
//Función GPS
function posicionGPS(position) {
  lat = position.coords.latitude
  long = position.coords.longitude

  //Guardado en variables globales
  latitud = lat
  longitud = long

  //console.log("La latitud es: " + lat);
  //console.log("La longitud es: " + long);
  //console.log(`Ubicación: https://www.google.com/maps/@${lat},${long},12z?entry=ttu`);
};

//Manejo de errores GPS
function errorGPS(error) {
  console.log
    ('code: ' + error.code + '\n' +
      'message: ' + error.message + '\n');
}

/* ------ ------------------------------------------------------------- ----- */

//Funcion realizar consulta de turno
function buscarCancha() {

  resComplejo = $$("#reservaComplejo").val()
  resDeporte = $$("#reservaDeporte").val()
  resTipoCancha = $$("#reservaTipoCancha").val()
  resFecha = $$("#reservaFecha").val()
  console.log(resFecha);


  if (resComplejo !== "---" && resDeporte !== "---" && resTipoCancha !== "---" && resFecha !== "") {
    mainView.router.navigate('/turnos/');
    //Se filtran los turnos disponibles en base al complejo seleccionado y la fecha seleccionada
    colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").where("estado", "==", "libre").get()
      .then(function (result) {
        //Se retornan los turnos disponibles
        var turnos = []
        result.forEach(function (doc) {
          id = doc.id;
          turnos.push(doc.id)
          query = doc.data()
        })

        if (turnos.length == 0) {
          cajaFechaTurnos = $$("#cajaFechaTurnos")
          cajaFechaTurnos.text("No hay turnos disponibles para la fecha seleccionada")
        } else {
          $$("#fechaTurno").text(`Turnos disponibles ${resFecha}`)
          //Se despliegan los turnos disponibles en formato de botones para ser seleccionados
          for (i = 0; i < turnos.length; i++) {
            divTurnos = $$("#turnosDisponibles")
            var turno = turnos[i];
            boton = $$(`<input type="button" id="turno" value="${turno}HS" class="button button-fill color-green"></input><br>`)
            divTurnos.append(boton)
            boton.data("valor", `${turno}`)
            boton.on("click", function () {
              var valor = $$(this).data("valor");
              //Se guarda el valor del turno en una variable global
              horaTurno = valor
              //Se toma el turno elegido
              tomarTurno()
            })
          }
        }

        console.log("promesa cumplida")
      })
      .catch(function (error) {
        console.log("Error: " + error)
      })
  } else {
    $$("#cajaValidacionForm").html("<h3>Por favor complete todos los campos del formulario</h3>")
  }


}

//Función para volver a pantalla de reservas
function nuevaBusqueda() {
  setTimeout(() => {
    mainView.router.navigate("/reserva/")
  }, 4000)
}

//Función para tomar un turno
function tomarTurno() {
  //Se filtran los turnos disponibles en base al complejo seleccionado y la fecha seleccionada
  colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").where("estado", "==", "libre").get()
    .then(function (query) {

      //Se retornan los turnos disponibles
      query.forEach(function (documento) {
        var queryTurnos = documento.data()
        console.log(queryTurnos);
        id = documento.id
        console.log(id);
        console.log(queryTurnos);

      })
      colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").doc(horaTurno).update({ estado: "ocupado" })
      console.log("Turnos disponibles actualizados")
      //Se guardan los datos de la reserva con el turno tomado
      guardarReserva()
      //Se pasa a la pantalla de confirmación del turno
      mainView.router.navigate('/confirmacionTurno/')
    })
    .catch(function (error) {
      console.log("Error: " + error)
    })
}

//Guardado de datos de la reserva
function guardarReserva() {
  //Esquema de datos
  var datosReserva = {
    cliente: emailSession,
    fechaElegida: resFecha,
    deporteElegido: resDeporte,
    horaElegida: horaTurno,
    tipoDeCanchaElegida: resTipoCancha
  }
  //Id doc en DB
  var idRes = emailSession
  //Sembrado de datos de reserva en DB
  colReservas.doc(idRes).set(datosReserva)
    .then(function (docRef) {
      console.log("Reserva creada con exito por " + idRes)
    })
    .catch(function (error) {
      console.log("Error: " + error)
    })
}

//Función para busqueda de turnos a modificar por el complejo

//Funcion realizar consulta de turno
function buscarturnosComp() {
  resFechaGestion = $$("#gestionTurnosFecha").val()
  console.log(resFechaGestion);


  if (resFechaGestion !== "") {
    mainView.router.navigate('/turnosC/');
    console.log("entro al if2");
    //Se filtran los turnos disponibles en base a la fecha seleccionada
    colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").where("estado", "==", "libre").get()
      .then(function (result) {
        //Se retornan los turnos disponibles
        var turnos = []
        result.forEach(function (doc) {
          id = doc.id;
          turnos.push(doc.id)
          query = doc.data()
        })

        if (turnos.length == 0) {
          cajaFechaTurnos = $$("#gestionCajaFechaTurnos")
          cajaFechaTurnos.text("No hay turnos disponibles para la fecha seleccionada")
        } else {
          $$("#gestionFechaTurno").text(`Turnos disponibles ${resFechaGestion}`)
          //Se despliegan los turnos disponibles en formato de botones para ser seleccionados
          for (i = 0; i < turnos.length; i++) {
            divTurnos = $$("#gestionTurnosDisponibles")
            var turno = turnos[i];
            boton = $$(`<input type="button" id="turnoGestion" value="${turno}HS" class="button button-fill color-green"></input><br>`)
            divTurnos.append(boton)
            boton.data("valor", `${turno}`)
            boton.on("click", function () {
              var valor = $$(this).data("valor");
              //Se guarda el valor del turno en una variable global
              horaTurno = valor
              $$("#gestionTurnosEliminar").html(`
              <h2>Se va a eliminar el turno de las ${horaTurno}hs.</h2>
              <a id="gestionBtnEliminar" class="button button-fill color-blue">Eliminar turno seleccionado</a>
              `)

              //Se toma el turno elegido
              //tomarTurno()
            })
          }

          $$("#gestionTurnosDisponibles").append("<h2>Seleccione el turno que desea eliminar</h2>")
        }

        console.log("promesa cumplida")
      })
      .catch(function (error) {
        console.log("Error: " + error)
      })
  } else {
    $$("#gestionCajaValidacionForm").html("<h3>Por favor complete todos los campos del formulario</h3>")
  }


}