//Excepción base
function BaseException() {
}
BaseException.prototype = new Error();
BaseException.prototype.constructor = BaseException;
BaseException.prototype.toString = function(){
	return this.name + ": " + this.message;
};



//Acceso inválido a constructor
function InvalidAccessConstructorException() {
	this.name = "InvalidAccessConstructorException";
	this.message = "Constructor can’t be called as a function.";
}
InvalidAccessConstructorException.prototype = new BaseException(); 
InvalidAccessConstructorException.prototype.constructor = InvalidAccessConstructorException;



//Valores vacios
function EmptyValueException(param) {
	this.name = "EmptyValueException";
	this.message = "Error: The parameter " + param + " can't be empty.";
}
EmptyValueException.prototype = new ParameterValidationException();
EmptyValueException.prototype.constructor = EmptyValueException;



//Validación de parámetros
function ParameterValidationException() {
	this.name = "ParameterValidationException";
	this.message = "Error: Parameter Validation Exception.";
}
ParameterValidationException.prototype = new BaseException();
ParameterValidationException.prototype.constructor = ParameterValidationException;



//Para controlar el valor de los parámetros
function InvalidValueException(param, value) {
	this.name = "InvalidValueException";
	this.message = "Error: The paramenter " + param + " has an invalid value. (" + param + ": " + value + ")";
}
InvalidValueException.prototype = new BaseException(); 
InvalidValueException.prototype.constructor = InvalidValueException;



//Stock negativo
function StockNegativoException() {
	this.name = "StockNegativoException";
	this.message = "El stock no puede ser negativo.";
}
StockNegativoException.prototype = new BaseException(); 
StockNegativoException.prototype.constructor = StockNegativoException;


// Cuando se intenta agregar una categoría que ya existe
function CategoriaExistenteException(value) {
	this.name = "CategoriaExistenteException";
	this.message = "Error: La categoría " + value + " ya existe.";
}
CategoriaExistenteException.prototype = new BaseException(); 
CategoriaExistenteException.prototype.constructor = CategoriaExistenteException;




// Cuando se intenta agregar una tienda que ya existe
function TiendaExistenteException(value) {
	this.name = "TiendaExistenteException";
	this.message = "Error: La tienda " + value + " ya existe.";
}
TiendaExistenteException.prototype = new BaseException(); 
TiendaExistenteException.prototype.constructor = TiendaExistenteException;



// Cuando se intenta agregar una categoría que ya existe
function CategoriaNoRegistradaException(value) {
	this.name = "CategoriaNoRegistradaException";
	this.message = "Error: La categoría " + value + " no está registrada.";
}
CategoriaNoRegistradaException.prototype = new BaseException(); 
CategoriaNoRegistradaException.prototype.constructor = CategoriaNoRegistradaException;



// Cuando se intenta borrar un producto que no existe
function ProductoNoRegistradoException(value) {
	this.name = "ProductoNoRegistradoException";
	this.message = "Error: El producto " + value + " no está registrado.";
}
ProductoNoRegistradoException.prototype = new BaseException(); 
ProductoNoRegistradoException.prototype.constructor = ProductoNoRegistradoException;



// Comprobar si existe una tienda
function TiendaNoRegistradaException(value) {
	this.name = "TiendaNoRegistradaException";
	this.message = "Error: El producto " + value + " no está registrado.";
}
TiendaNoRegistradaException.prototype = new BaseException(); 
TiendaNoRegistradaException.prototype.constructor = TiendaNoRegistradaException;