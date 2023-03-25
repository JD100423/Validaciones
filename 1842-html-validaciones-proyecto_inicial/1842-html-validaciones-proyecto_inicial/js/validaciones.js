export function validar(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    } else{
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
}

const tipoDeErrores =[
    "valueMissing", 
    "typeMismatch",
    "patternMismatch",
    "customError"
]

const mensajeDeError = {
    nombre: {
        valueMissing: "Este campo no puede estar vacio"
    },
    email: {
        valueMissing: "Este campo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres maximo 12, debe contener una letra minuscula, una letra mayuscula, un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo no puede estar vacio",
        customError: "Debes tener al menos 18 años de edad"
    }
}


const validadores = {
    nacimiento: input => validaNacimiento(input)
}


function mostrarMensajeDeError(tipoDeInput, input){
    let  mensaje = ""
tipoDeErrores.forEach(error => {
    if(input.validity[error]){
        mensaje = mensajeDeError[tipoDeInput][error]
    }
})
    return mensaje
}

function validaNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
   if (mayorEdad(fechaCliente))(
        mensaje = "Debes tener al menos 18 años de edad"
   )

   input.setCustomValidity(mensaje)
}

function mayorEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(
        fecha.getUTCFullYear() + 18, 
        fecha.getUTCMonth(), 
        fecha.getUTCDate()
        )
    return(fechaActual <= diferenciaFecha);
}