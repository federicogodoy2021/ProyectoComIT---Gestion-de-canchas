// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'CanchaAPP Rosario',
  // App id
  id: 'com.myapp.test',
  // Enable swipe panel
  panel: {
    swipe: 'left',
  },
  // Add default routes
  routes: [
    { path: '/index/', url: 'index.html', options: { transition: 'f7-cover' } },
    { path: '/opReg1/', url: 'opReg1.html', options: { transition: 'f7-cover' } },
    { path: '/opReg2/', url: 'opReg2.html', options: { transition: 'f7-cover' } },
    { path: '/opReg3/', url: 'opReg3.html', options: { transition: 'f7-cover' } },
    { path: '/opReg4/', url: 'opReg4.html', options: { transition: 'f7-cover' } },
    { path: '/loggedIn/', url: 'loggedIn.html', options: { transition: 'f7-cover' } },
    { path: '/loggedOut/', url: 'loggedOut.html', options: { transition: 'f7-cover' } },
    { path: '/reserva/', url: 'reserva.html', options: { transition: 'f7-cover' } },
    { path: '/turnos/', url: 'turnos.html', options: { transition: 'f7-cover' } },
    { path: '/confirmacionTurno/', url: 'confirmacionTurno.html', options: { transition: 'f7-cover' } },
    { path: '/seccionComplejos/', url: 'seccionComplejos.html', options: { transition: 'f7-cover' } },
    { path: '/turnosC/', url: 'turnosC.html', options: { transition: 'f7-cover' } },
    { path: '/modoDev/', url: 'modoDev.html', options: { transition: 'f7-cover' } },
    { path: '/dataUsers/', url: 'dataUsers.html', options: { transition: 'f7-cover' } },
    { path: '/dataComplejos/', url: 'dataComplejos.html', options: { transition: 'f7-cover' } }
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
  //Función idioma (Proximamente)
$$("#indexIdioma").on("click", function () { app.dialog.alert("Sección a implementar proximamente") })
//Función idioma (Proximamente)
$$("#indexOlviPass").on("click", function () { app.dialog.alert("Sección a implementar proximamente") })
$$("#btnPrueba").on("click", bankOfUsers)
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
  $$("#userLoggedIn").text(emailSession)
})
$$(document).on('page:init', '.page[data-name="reserva"]', function (e) {
  $$("#btnBuscar").on('click', buscarCancha)
  volverModoDev()
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
  volverModoDev()
})
$$(document).on('page:init', '.page[data-name="turnosC"]', function (e) {
  $$("#gestionAgregarTurno").on("click", agregarTurnos)
})
$$(document).on('page:init', '.page[data-name="loggedOut"]', function (e) {
  cierreSesión()
})
$$(document).on('page:init', '.page[data-name="modoDev"]', function (e) {
})
$$(document).on('page:init', '.page[data-name="dataUsers"]', function (e) {
  $$("#btnDataUsers").on("click", bankOfUsers)
})
$$(document).on('page:init', '.page[data-name="dataComplejos"]', function (e) {
  $$("#btnDataComplejos").on("click", bankOfComplejos)
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
var resComplejo, resDeporte, resTipoCancha, resFecha, resHora, resFechaGestion, actualizarTurnos, horaTurno


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
  if (roleSession == "")
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
        emailSession = emailReg
        mainView.router.navigate('/loggedIn/');

        setTimeout(()=>{
          mainView.router.navigate('/reserva/');
        },3000)

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

              $$("#userLoggedIn").text(emailSession)
              //Ingreso dependiendo del role de usuario
              if (roleSession == "normal user") {
                mainView.router.navigate('/loggedIn/');
                setTimeout(() => {
                  mainView.router.navigate("/reserva/")
                }, 3000)
                registerVisit()
              } else if (roleSession == "complejo") {
                mainView.router.navigate('/loggedIn/');
                setTimeout(() => {
                  mainView.router.navigate("/seccionComplejos/")
                }, 3000)
              } else if (roleSession == "dev") {
                mainView.router.navigate('/loggedIn/');
                setTimeout(() => {
                  mainView.router.navigate('/modoDev/')
                }, 3000)
              }
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

        //Aumento cantidad de visistas y actualizo
        colUsers.doc(sessionId).update({ cantVisitas: quantVisits + 1 })
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

  if (resComplejo !== "---" && resDeporte !== "---" && resTipoCancha !== "---" && resFecha !== "") {
    mainView.router.navigate('/turnos/');
    //Se filtran los turnos disponibles en base al complejo seleccionado y la fecha seleccionada
    colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").where("estado", "==", "libre").get()
      .then(function (result) {
        //Se retornan los turnos disponibles
        var turnos = []
        result.forEach(function (doc) {
          id = doc.id;
            id = parseInt(id);
            turnos.push(id)
            turnos.sort(function(a, b){return a - b})
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
            boton = $$(`
                        <li>
                          <input type="button" id="turno" value="${turno}HS" class="button button-small button-outline color-green"></input><br>
                        </li>
                        `)
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
  }, 6000)
}

//Función para tomar un turno
function tomarTurno() {
  //Se filtran los turnos disponibles en base al complejo seleccionado y la fecha seleccionada
  colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").where("estado", "==", "libre").get()
    .then(function (query) {

      turnoSeleccionado = colTurnos.doc(resComplejo).collection("fechas").doc(resFecha).collection("horas").doc(horaTurno)
      //Actualización de campos del turno
      turnoSeleccionado.update({ estado: "ocupado" })
      turnoSeleccionado.update({ reservadoPor: `${emailSession}` })

      console.log("Turnos disponibles actualizados")
      //Se guardan los datos de la reserva con el turno tomado
      guardarReserva()
      //Loader reserva turno
      loaderReservaTurno()
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

  if (resFechaGestion !== "") {
    mainView.router.navigate('/turnosC/');
    //Se filtran los turnos disponibles en base a la fecha seleccionada
    colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").where("estado", "==", "libre").get()
      .then(function (result) {
        actualizarTurnos = function desplegarTurnos() {
          //Se retornan los turnos disponibles
          var turnos = []
          result.forEach(function (doc) {
            id = doc.id;
            id = parseInt(id);
            turnos.push(id)
            turnos.sort(function(a, b){return a - b})
            query = doc.data()
          })

          if (turnos.length == 0) {
            cajaFechaTurnos = $$("#gestionCajaFechaTurnos")
            cajaFechaTurnos.text("No hay turnos disponibles para la fecha seleccionada")
            $$("#gestionTurnosEliminar").html("<div></div>")
          } else {
            $$("#gestionFechaTurno").text(`Turnos disponibles ${resFechaGestion}`)
            $$("#gestionTurnosEliminar").append("<h2>Seleccione el turno que desea eliminar</h2>")
            //Se despliegan los turnos disponibles en formato de botones para ser seleccionados
            for (i = 0; i < turnos.length; i++) {
              divTurnos = $$("#gestionTurnosDisponibles")
              var turno = turnos[i];
              boton = $$(`
                          <li>
                            <input type="button" id="turnoGestion" value="${turno}HS" class="button button-small button-outline color-green"></input><br>                            
                          </li>
                          `)
              divTurnos.append(boton)
              boton.data("valor", `${turno}`)
              boton.on("click", function () {
                var valor = $$(this).data("valor");
                //Se guarda el valor del turno en una variable global
                horaTurno = valor
                confirmacionEliminarTurno()
              })
            }
          }
        }
        actualizarTurnos()
        console.log("Promesa cumplida!")
      }
      
      )
      .catch(function (error) {
        console.log("Error: " + error)
      })
  } else {
    $$("#gestionCajaValidacionForm").html("<h3>Por favor complete todos los campos del formulario</h3>")
  }
}

//Funcion para cierre de sesión y vuelta al index
function cierreSesión() {
  setTimeout(() => {
    mainView.router.navigate("/index/")
  }, 3000)
}
//Función carga de turnos
function loaderReservaTurno() {
  app.dialog.preloader('Reservando turno...');
  setTimeout(function () {
    app.dialog.close();
    //Se pasa a la pantalla de confirmación del turno
    mainView.router.navigate('/confirmacionTurno/')
  }, 8000);
}
//Función carga de turnos
function loaderAddTurno() {
  app.dialog.preloader('Agregando turno...');
  setTimeout(function () {
    app.dialog.close();
    //Se pasa a la pantalla de confirmación del turno
    mainView.router.navigate('/seccionComplejos/')
  }, 3000);
}
//Función para eliminar turno en sección complejos
function confirmacionEliminarTurno() {
  texto = `¿Está seguro que desea eliminar el turno de las ${horaTurno} hs?`
  titulo = "Eliminación de turno"

  function confirmDeleteTurno() {
    //Se filtran los turnos disponibles en base al complejo seleccionado y la fecha seleccionada
    colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").where("estado", "==", "libre").get()
      .then(function (query) {
        //Se cambia a estado "ocupado" el turno seleccionado
        turnoSeleccionado = colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").doc(horaTurno)

        turnoSeleccionado.update({ estado: "turno anulado" })

      })
      .catch(function (error) {
        console.log("Error: " + error)
      })

    function cerrarAlert() {
      mainView.router.navigate('/seccionComplejos/')
    }
    app.dialog.alert('El turno se eliminó correctamente!', titulo, cerrarAlert);
  }
  app.dialog.confirm(texto, titulo, confirmDeleteTurno)
}
//Función para agregar turnos en sección Complejos
function agregarTurnos() {
  texto1 = "Ingrese el horario que desea agregar"
  texto2 = "Nuevo Turno"
  
  app.dialog.prompt(texto1, texto2, addHourToDb)
  

  function addHourToDb(valor){

    console.log(userSession, resFechaGestion, valor);
    //Se filtran los turnos disponibles en base todos los estados no disponibles
    colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").where("estado", "==", "ocupado").where("estado", "==","turno anulado").get()
      .then(function (query) {
        //Se cambia a estado "libre" el turno seleccionado
        turnoSeleccionado = colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").doc(valor).get()
          .then(function(data) {
            estadoTurno = data._delegate._document.data.value.mapValue.fields.estado.stringValue
            if(estadoTurno == "libre"){
              $$("#gestionTurnosEliminar").html(
                `
                  <h2>Seleccione el turno que desea eliminar</h2>
                  <p>El turno de las ${valor} hs ya se encuentra disponible. Por favor ingrese un horario NO DISPONIBLE</p>
                `
              )
            }else{
            creandoTurno()
            loaderAddTurno()}
          })
          .catch(function (error) {
            console.log("Error: " + error)
          })
      })
      .catch(function (error) {
        console.log("Error: " + error)
      })

      function creandoTurno() {

        colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").where("estado", "==", "libre").get()
            .then(function (query) {
              //Se cambia a estado "ocupado" el turno seleccionado
              turnoSeleccionado = colTurnos.doc(userSession).collection("fechas").doc(resFechaGestion).collection("horas").doc(valor)
      
              turnoSeleccionado.update({ estado: "libre" })
              turnoSeleccionado.update({ reservadoPor: "" })
      
            })
            .catch(function (error) {
              console.log("Error: " + error)
            })
        
      }
  }
}
//Función para colocar alerta en modo Dev
function alertaFuturaSeccion (){
  app.dialog.alert('Sección a implementar proximamente')
}
//Función para traer la lista de usuarios y sus datos
function bankOfUsers (){


  colUsers.where("role","==","normal user").get()
  .then(function(doc){
    usuarios = []
    console.log(usuarios);
    doc.forEach(function(users){
      info = users.data()
      usuarios.push(info)
    })

            //Se despliegan los usuarios registrados en formato de botones para ser seleccionados
            for (i = 0; i < usuarios.length; i++) {
              divUsers = $$("#subDataUsers")
              var usuario = usuarios[i];
              boton = $$(`
                          <li>
                            <input type="button" id="boton${i}" value="${usuario.email}" class="button button-small button-outline color-green botonUsers"></input><br>                            
                          </li>
                          `)
              divUsers.append(boton)
              boton.data("valor", `${i}`)
              boton.on("click", function () {
                var valor = $$(this).data("valor");
                $$("#dataUsers").html(`
                          <h3 class="subTituloSeccion">Datos del usuario</h3>
                          <p class="dato">Ciudad: ${usuarios[valor].ciudad}</p>
                          <p class="dato">Fecha de nacimiento: ${usuarios[valor].fechaN}</p>
                          <p class="dato">Usuario: ${usuarios[valor].usuario}</p>
                          <p class="dato">Contraseña: ${usuarios[valor].contraseña}</p>
                          <p class="dato">Cantidad de visitas: ${usuarios[valor].cantVisitas}</p>
                          <p class="dato">Rol: ${usuarios[valor].role}</p>
        `)
      })}

      $$("#cajaBotonUsersModoDev").html(`<a id="volverAModoDev" class="button button-fill color-blue" href="/modoDev/">Volver</a>`)
    
  })
  .catch(function(error){
    console.log(error.message);
  })

}
//Función para traer la lista de usuarios y sus datos
function bankOfComplejos (){

  colUsers.where("role","==","complejo").get()
  .then(function(doc){
    complejos = []
    doc.forEach(function(comp){
      infoComplejo = comp.data()
      complejos.push(infoComplejo)
    })

            //Se despliegan los usuarios registrados en formato de botones para ser seleccionados
            for (i = 0; i < complejos.length; i++) {
              divComplejos = $$("#subDataComplejos")
              var complejo = complejos[i];
              boton = $$(`
                          <li>
                            <input type="button" id="boton${i}" value="${complejo.email}" class="button button-small button-outline color-green botonUsers"></input><br>                            
                          </li>
                          `)
              divComplejos.append(boton)
              boton.data("valor", `${i}`)
              boton.on("click", function () {
                var valor = $$(this).data("valor");
                $$("#dataComplejos").html(`
                          <h3 class="subTituloSeccion">Datos del complejo</h3>
                          <p class="dato">Ciudad: ${complejos[valor].ciudad}</p>
                          <p class="dato">Fecha de nacimiento: ${complejos[valor].fechaN}</p>
                          <p class="dato">Usuario: ${complejos[valor].usuario}</p>
                          <p class="dato">Contraseña: ${complejos[valor].contraseña}</p>
                          <p class="dato">Cantidad de visitas: ${complejos[valor].cantVisitas}</p>
                          <p class="dato">Rol: ${complejos[valor].role}</p>
        `)
      })}

      $$("#cajaBotonComplejossModoDev").html(`<a id="volverAModoDev" class="button button-fill color-blue" href="/modoDev/">Volver</a>`)
    
  })
  .catch(function(error){
    console.log(error.message);
  })
}
//Función volver a modoDev
function volverModoDev(){
  if(roleSession == "dev"){
    $$("#cajaBtnBuscarComplejos").append(`<a id="volverAModoDev" class="button button-fill color-blue" href="/modoDev/">Volver</a>`)
    $$("#cajaBtnBuscarReserva").append(`<a id="volverAModoDev" class="button button-fill color-blue" href="/modoDev/">Volver</a>`)
    
  }
}