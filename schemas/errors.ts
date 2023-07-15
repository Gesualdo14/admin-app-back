// Tiene que ser una clase para que podamos evaluar el "instanceof"
// Al extender de Error, nos va a pedir el "message" al instanciar
// y luego tenemos la posibilidad de pasarle un código distinto a 400
export class MyError extends Error {
  code = 400 // nos evitamos tener que llamar al constructor
  details?: any

  constructor(message: string, code?: number, details?: any) {
    super(message)
    if (code) {
      this.code = code
      this.details = details
    }
  }
}
