export function validar(input) {
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]) {
    validadores[tipoDeInput](input)
    }
}


const validadores = {
    nacimiento: input => validaNacimiento(input)
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