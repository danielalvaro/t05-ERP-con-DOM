//Store house
function StoreHouse(){
    
    if(!(this instanceof StoreHouse)) throw new InvalidAccessConstructorException();
    
    var name=null;
    var productos=[];
    var categorias=[];
    var tiendas=[];
    
    //No estoy seguro de que sea la forma más adecuada de dejar creada la categoría default, en verdad
    categorias[0]=new Category("Default");
    
    Object.defineProperty(this,"name",{
		get:function(){
			return name;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
			name=value;
		}		
	});
    
    //Implementación personal: Parece adecuado que haya también una función que devuelva todos los productos.
    Object.defineProperty(this,"productos",{
		get:function(){
			var nextIndex=0;
                return{
                    next:function(){
                    return nextIndex<productos.length ?
               {value:productos[nextIndex++],done:false} :
               {done: true};
                    }
                }
		}		
	});
    
    Object.defineProperty(this,"categorias",{
		get:function(){
			var nextIndex=0;
                return{
                    next:function(){
                    return nextIndex<categorias.length ?
               {value:categorias[nextIndex++],done:false} :
               {done: true};
                    }
                }
        }
	});
    
    Object.defineProperty(this,"tiendas",{
		get:function(){
			var nextIndex=0;
                return{
                    next:function(){
                    return nextIndex<tiendas.length ?
               {value:tiendas[nextIndex++],done:false} :
               {done: true};
                    }
                }
        }
	});
    
    this.addCategory=function(valorCategory){
        
        if(valorCategory===undefined||valorCategory==="") throw new EmptyValueException("valorCategory");
        
        var disponible=true;
        for(var i=0;i<categorias.length;i++){
            if(valorCategory===categorias[i]){
                disponible=false;
            }
        }
        if(disponible){
            categorias.push(valorCategory);
        }else{
            throw new CategoriaExistenteException(valorCategory);
        }
        return categorias.length;
    }
    
    this.removeCategory=function(valorCategory){
        var disponible=false;
        var i=0;
        for(i;i<categorias.length;i++){
            if(valorCategory===categorias[i]){
                disponible=true;
                categorias.splice(i,1);
            }
        }
        if(!disponible){
            throw new CategoriaNoRegistradaException(valorCategory);
        }
        return categorias.length;
    }
    
    this.addProduct=function(valorProduct,valorCategory){
        if(valorProduct===undefined||valorProduct===null) throw new EmptyValueException("valorProduct");
        
        var disponible=false;
        for(var i=0;i<categorias.length;i++){
            if(valorCategory===categorias[i]){
                categorias[i].products.push(valorProduct);
                disponible=true;
            }
        }
        
        //Esto quiere decir que si no encuentra la categoría recibida introduce el producto en la categoría 'default'.
        if(!disponible){
            categorias[0].products.push(valorProduct);
        }
        
        productos.push(valorProduct);
        return productos.length;
    }
    
    this.removeProduct=function(valorProduct){
        var disponible=false;
        var i=0;
        for(i;i<productos.length;i++){
            if(valorProduct===productos[i]){
                disponible=true;
                productos.splice(i,1);
             }
        }
        if(!disponible){
            throw new ProductoNoRegistradoException(valorProduct);
        }
        
        for(var i=0;i<categorias.length;i++){
            for(var j=0;j<categorias[i].products[j];j++){
                if(valorProduct===categorias[i].products[j]){
                    categorias[i].products[j].splice(j,1);
                }
            }
        }

        return categorias.length;
    }
    
    this.addProductInShop=function(valorProduct,valorShop,valorStock){
         if(valorProduct===undefined||valorProduct===null) throw new EmptyValueException("valorProduct");
        
         if(valorShop===undefined||valorShop===null) throw new EmptyValueException("valorShop");
        
        for(var i=0;i<tiendas.length;i++){
            if(tiendas[i]===valorShop){
                tiendas[i].products.push(valorProduct);  
                tiendas[i].products[0].stock=valorStock;
            }
        }
        
        return tiendas.length;
    }
    
    this.addQuantityProductInShop=function(valorProduct,valorShop,valorStock){
        var disponible=false;
        var disponible2=false;
        for(var i;i<tiendas.length;i++){
            if(valorShop===tiendas[i]){
                disponible=true;
                    for(var j;j<tiendas[i].length;j++){
                        if(valorProdut===tiendas[i].products[j]){
                        disponible2=true;
                            tiendas[i].products[j].stock=tiendas[i].products[j].stock+valorStock;
                            if(tiendas[i].products[j].stock<0){
                                throw new StockNegativoException();
                            }
                        }
                        
                        if(!disponible2){
                            throw new ProductoNoRegistradoException(valorProduct);
                        }
        }
             }
        }
        if(!disponible){
            throw new TiendaNoRegistradaException(valorShop);
        }
    }
    
    this.getCategoryProducts=function(valorCategory,tipoProduct){
        if(valorCategory===undefined||valorCategory==="") throw new EmptyValueException("valorCategory");
        
        if(tipoProduct==null){
            for(var i=0;i<categorias.length;i++){
                if(valorCategory===categorias[i]){
                    for(var j=0;j<categorias[i].products.length;j++){
                        console.log("Producto ->");
                        console.log(valorCategory.products[j].name);
                        console.log(valorCategory.products[j].price);
                        console.log(valorCategory.products[j].stock);
                    }
                }
            }
        }else{
            for(var i=0;i<categorias.length;i++){
                if(valorCategory===categorias[i]){
                    for(var j=0;j<categorias[i].products.length;j++){
                        if(tipoProduct==valorCategory.products[j].name){
                            console.log("Producto ->");
                            console.log(valorCategory.products[j].name);
                            console.log(valorCategory.products[j].price);
                            console.log(valorCategory.products[j].stock);
                        }
                    }
                }
            }
        }
    }
    
    this.addShop=function(valorShop){
        if(valorShop===undefined||valorShop==="") throw new EmptyValueException("valorShop");
        
        var disponible=true;
        for(var i=0;i<tiendas.length;i++){
            if(valorShop===tiendas[i]){
                disponible=false;
            }
        }

        if(disponible){
            tiendas.push(valorShop);
        }else{
            throw new TiendaExistenteException(valorShop);
        }
        return tiendas.length;
    }
    
    this.removeShop=function(valorShop){
        var disponible=false;
        var i=0;
        for(i;i<tiendas.length;i++){
            if(valorShop===tiendas[i]){
                disponible=true;
                tiendas.splice(i,1);
            }
        }
        if(!disponible){
            throw new TiendaNoRegistradaException(valorShop);
        }
        return tiendas.length;
    }
    
    this.getShopProducts=function(valorShop,tipoProduct){
        if(valorShop===undefined||valorShop==="") throw new EmptyValueException("valorShop");
        
        if(tipoProduct==""){
            for(var i=0;i<tiendas.length;i++){
                if(valorShop===tiendas[i]){
                    for(var j=0;j<tiendas[i].products.length;j++){
                        console.log("Producto ->");
                        console.log(valorShop.products[j].name);
                        console.log(valorShop.products[j].price);
                        console.log(valorShop.products[j].stock);
                    }
                }
            }
        }else{
            for(var i=0;i<tiendas.length;i++){
                if(valorShop===tiendas[i]){
                    for(var j=0;j<tiendas[i].products.length;j++){
                        if(tipoProduct==valorShop.products[j].name){
                            console.log("Producto ->");
                            console.log(valorShop.products[j].name);
                            console.log(valorShop.products[j].price);
                            console.log(valorShop.products[j].stock);
                        }
                    }
                }
            }
        }
    }
}















 


//Función de creación de categorías
function Category(valorTitle){	
    
    if (!(this instanceof Category)) throw new InvalidAccessConstructorException();
    
    if (valorTitle===undefined||valorTitle==="") throw new EmptyValueException("valorTitle");
    
    var title=valorTitle.trim();
    var description=null;
    var products=[];
    
    Object.defineProperty(this,"title",{
		get:function(){
			return title;
		},
		set:function(value){
			title=value.trim();
		}		
	});
    
    Object.defineProperty(this,"description",{
		get:function(){
			return description;
		},
		set:function(value){
			description=value.trim();
		}		
	});

    Object.defineProperty(this,"products",{
		get:function(){
			return products;
		},
		set:function(value){
			products=value;
		}		
	});  
}
Category.prototype={};
Category.prototype.constructor=Category;
Category.prototype.toString=function(){	
	return "Categoría: Título -> "+this.title+"; Descripción -> "+this.description; 
};



















//Función de creación de productos
function Product(valorSerialNumber,valorName,valorPrice){
    
    if (!(this instanceof Product)) throw new InvalidAccessConstructorException();
    
    if(valorSerialNumber===undefined||valorSerialNumber==="") throw new EmptyValueException("valorSerialNumber");
    
    if(valorName===undefined||valorName==="") throw new EmptyValueException("valorName");
    
    if(valorPrice===undefined||valorPrice==="") throw new EmptyValueException("valorPrice");
    
    if (typeof valorSerialNumber!=="number") throw new InvalidValueException("serialNumber",valorSerialNumber); 
    
    if (typeof valorPrice!=="number") throw new InvalidValueException("price",valorPrice); 
    
    var serialNumber=valorSerialNumber;
    var name=valorName;
    var description=null;
    var price=valorPrice;
    var tax=null;
    var images=[];
    var stock=null;
    
    Object.defineProperty(this,"serialNumber",{
		get:function(){
			return serialNumber;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("serialNumber",value); 
			serialNumber=value;
		}
	});
    
    Object.defineProperty(this,"name",{
		get:function(){
			return name;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
			name=value;
		}		
	});
    
    Object.defineProperty(this,"description",{
		get:function(){
			return description;
		},
		set:function(value){
            if(value===undefined||valorName==="") throw new EmptyValueException("valorName");
			description=value;
		}		
	});
    
    Object.defineProperty(this,"price",{
		get:function(){
			return price;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("price",value); 
			price=value;
		}		
	});
    
    Object.defineProperty(this,"tax",{
		get:function(){
			return tax;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("tax",value); 
			tax=value;
		}		
	});
    
    Object.defineProperty(this,"images",{
		get:function(){
			return images;
		},
		set:function(value){
			images=value;
		}		
	});  
    
    Object.defineProperty(this,"stock",{
		get:function(){
			return stock;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("stock",value); 
			stock=value;
		}		
	});
}
Product.prototype={};
Product.prototype.constructor=Product;
Product.prototype.toString=function(){	
	return "Producto: SerialNumber -> "+this.serialNumber+" Nombre -> "+this.name+" Precio -> "+this.price+"€ Descripción -> "+this.description; 
};



















//Obejtos heredados
function Camiseta(serialNumber,name,price,valorTalla){
    
    if(!(this instanceof Camiseta)) throw new InvalidAccessConstructorException();
    
    if (valorTalla===undefined||valorTalla==="") throw new EmptyValueException("valorTalla");
    
    var talla=valorTalla;
    Product.call(this,serialNumber,name,price);
    
    Object.defineProperty(this,"talla",{
		get:function(){
			return talla;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
		}		
	});
}
Camiseta.prototype=Object.create(Product.prototype);
Camiseta.prototype.constructor=Camiseta;
Camiseta.prototype.toString=function(){	
    return "SerialNumber-> "+this.serialNumber+" Producto-> "+this.name+" Precio-> "+this.price+"€ Talla-> "+this.talla; 
}



















function Zapatillas(serialNumber,name,price,valorTalla){
    
if(!(this instanceof Zapatillas)) throw new InvalidAccessConstructorException();
    
    if (valorTalla===undefined||valorTalla==="") throw new EmptyValueException("valorTalla");
    
    if (typeof valorTalla!=="number") throw new InvalidValueException("talla",valorTalla); 
    
    var talla=valorTalla;
    Product.call(this,serialNumber,name,price);
    
    Object.defineProperty(this,"talla",{
		get:function(){
			return talla;
		},
		set:function(value){
            if (value===undefined||value==="") throw new EmptyValueException("value");
    
            if (typeof value!=="number") throw new InvalidValueException("talla",value); 
            
            talla=value;
		}		
	});
}
Zapatillas.prototype=Object.create(Product.prototype);
Zapatillas.prototype.constructor=Zapatillas;
Zapatillas.prototype.toString=function(){	
    return "SerialNumber-> "+this.serialNumber+" Producto-> "+this.name+" Precio-> "+this.price+"€ Talla-> "+this.talla; 
}



















function Gorro(serialNumber,name,price,valorTalla){
    if(!(this instanceof Gorro)) throw new InvalidAccessConstructorException();
    
    if (valorTalla===undefined||valorTalla==="") throw new EmptyValueException("valorTalla");
    
    var talla=valorTalla;
    Product.call(this,serialNumber,name,price);
    
    Object.defineProperty(this,"talla",{
		get:function(){
			return talla;
		},
		set:function(value){
            if(value===undefined||value==="") throw new EmptyValueException("value");
		}		
	});
}
Gorro.prototype=Object.create(Product.prototype);
Gorro.prototype.constructor=Gorro;
Gorro.prototype.toString=function(){	
    return "SerialNumber-> "+this.serialNumber+" Producto-> "+this.name+" Precio-> "+this.price+"€ Talla-> "+this.talla; 
}



















//Función de creación de  objetos 'coordenadas'
function Coords(valorLatitude,valorLongitude){
    
    if(valorLatitude===undefined||valorLatitude==="") throw new EmptyValueException("valorLatitude");
    
    if(typeof valorLatitude!=="number") throw new InvalidValueException("latitude",valorLatitude); 
    
    if(valorLongitude===undefined||valorLongitude==="") throw new EmptyValueException("valorLongitude");
    
    if(typeof valorLongitude!=="number") throw new InvalidValueException("longitude",valorLongitude); 
    
    if(valorLatitude<-90||valorLatitude>90) throw new InvalidValueException("latitude",valorLatitude);
	
	if(valorLongitude<-180||valorLongitude>180)throw new InvalidValueException("longitude",valorLongitude);
    
    
    var latitude=valorLatitude;
    var longitude=valorLongitude;
    
    Object.defineProperty(this,"latitude",{
        get:function(){
            return latitude;
        },
        set:function(){
            if(valorLatitude<-90||valorLatitude>90) throw new InvalidValueException("latitude",valorLatitude);
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("latitude",value); 
			latitude=value;
        }
    });
    
    Object.defineProperty(this,"longitude",{
        get:function(){
            return longitude;
        },
        set:function(){
            if(valorLatitude<-90||valorLatitude>90) throw new InvalidValueException("latitude",valorLatitude);
            if(value===undefined||value==="") throw new EmptyValueException("value");
            if(typeof value!=="number") throw new InvalidValueException("longitude",value); 
			longitude=value;
        }
    });
}

Coords.prototype={};
Coords.prototype.constructor=Coords;
Coords.prototype.toString=function(){	
	return "Coords: Latitude -> "+this.latitude+" Longitude -> "+this.longitude; 
};



















//Función de creación de tiendas
function Shop(valorName,valorCoordenadas){
    
    if (!(this instanceof Shop)) throw new InvalidAccessConstructorException();
    
    if(valorName===undefined||valorName==="") throw new EmptyValueException("valorName");
    
    var cif=null;
    var name=valorName;
    var direccion=null;
    var telefono=null;
    var coordenadas=valorCoordenadas;
    //Implementación personal. Para controlar todos los productos en una tienda tanto por su id como por su categoría, creamos un array en 'Shop' con los que se encuentren dicha tienda, y aparte, otro array en 'Category' para clasificarlos de ambas formas.
    var products=[];
    
    Object.defineProperty(this,"name",{
		get:function(){
			return name;
		},
		set:function(value){
			name=value.trim();
		}		
	});
    
    Object.defineProperty(this,"cif",{
		get:function(){
			return cif;
		},
		set:function(value){
			cif=value.trim();
		}		
	});
    
    Object.defineProperty(this,"direccion",{
		get:function(){
			return direccion;
		},
		set:function(value){
			direccion=value.trim();
		}		
	});
    
    Object.defineProperty(this,"telefono",{
		get:function(){
			return telefono;
		},
		set:function(value){
			telefono=value.trim();
		}		
	});   
    
    Object.defineProperty(this,"coordenadas",{
		get:function(){
			return coordenadas;
		},
		set:function(value){
			coordenadas=value.trim();
		}		
	}); 
    
    Object.defineProperty(this,"products",{
		get:function(){
			return products;
		},
		set:function(value){
			products=value;
		}		
	}); 
}

Shop.prototype={};
Shop.prototype.constructor=Shop;
Shop.prototype.toString=function(){	
	return "Shop: Name -> "+this.name; 
};



















//Función de testeo
function pruebas(){
    console.log("Pruebas ERP:");
    console.log("------------");
    console.log("");
    console.log("Nueva categoría:");
    var c1=new Category("Categoría 1");
    c1.description="Esta es la categoría 1.";
    console.log(c1.toString());
    console.log("Otra categoría:");
    var c2=new Category("Categoría 2");
    c2.description="Esta es la categoría 2.";
    console.log(c1.toString());
    console.log("Nuevo producto:");
    var p1=new Product(1,"Zapas",50);
    p1.description="Este es el producto 1.";
    console.log(p1.toString());
    console.log("Nueva tienda:");
    var co1=new Coords(90, 68);
    var t1=new Shop("Ollie",co1);
    console.log(t1.toString()+" Coordenadas -> "+t1.coordenadas.latitude+" || "+t1.coordenadas.longitude);
    console.log("------------");
    console.log("------------");
    console.log("Creando un objeto heredado (camiseta):");
    var camiseta1=new Camiseta(1,"Etnies",30,"XXL");
    console.log(camiseta1.toString());
    console.log("Creando un objeto heredado (zapatillas):");
    var zapatillas1=new Zapatillas(2,"DC",50,42);
    console.log(zapatillas1.toString());
    console.log("Creando un objeto heredado (gorro):");
    var gorro1=new Gorro(3,"Lion",20,"XL");
    console.log(gorro1.toString());
    zapatillas1.stock=2;
    console.log("------------");
    console.log("------------");
    console.log("Estas son las categorías almacenadas ->");
    var sh1=new StoreHouse();
    sh1.addCategory(c1);
    sh1.addCategory(c2);
    var categorias=sh1.categorias;
    var categoria=categorias.next();
    while (categoria.done!==true){
		console.log ("Categoria-> "+categoria.value.title);
		categoria=categorias.next();
    }
    console.log("Probamos a borrar la categoría 1.");
    sh1.removeCategory(c1);
    console.log("Y mostramos de nuevo las categorías ->");
    var categorias=sh1.categorias;
    var categoria=categorias.next();
    while (categoria.done!==true){
		console.log ("Categoria-> "+categoria.value.title);
		categoria=categorias.next();
    }
    console.log("Introducimos un producto 'zapatillas' con una categoría asociada (en este caso la 2) ->");
    sh1.addProduct(zapatillas1,c2);
    console.log("Y comprobamos que se ha añadido correctamente ->")
    console.log(c2.products[0]);
    console.log("Probamos a borrar el producto 'zapatillas' añadido anteriormente ->");
    sh1.removeProduct(zapatillas1);
    console.log("Comprobamos que se ha borrado correctamente ->")
    console.log(sh1.productos[0]);
    sh1.addCategory(c1);
    sh1.addProduct(gorro1,c1);
    
    console.log("Probamos a añadir una tienda ->");
    sh1.addShop(t1);
    console.log("Controlamos que se añade ->");
    var tiendas=sh1.tiendas;
    var tienda=tiendas.next();
    while (tienda.done!==true){
		console.log ("Tienda-> "+tienda.value.name);
		tienda=tiendas.next();
    }
    console.log("Ahora probamos a eliminarla ->");
    sh1.removeShop(t1);
    var tiendas=sh1.tiendas;
    var tienda=tiendas.next();
    while (tienda.done!==true){
		console.log ("Tienda-> "+tienda.value.name);
		tienda=tiendas.next();
    }
    console.log("(No muestra nada el iterador.)");
    sh1.addShop(t1);
    console.log("Vemos qué categorías hay disponibles ->");
    var categorias=sh1.categorias;
    var categoria=categorias.next();
    while (categoria.done!==true){
		console.log ("Categoria-> "+categoria.value.title);
		categoria=categorias.next();
    }
    console.log("Añadimos varios productos a una categoría antes de probar el getCategoryProducts -> ");
    var gorro2=new Gorro(3,"Ekko",30,"XL");
    gorro2.stock=4;
    sh1.addProduct(gorro2,c2);
    console.log("getCategoryProducts de la categoría 2 (por ejemplo) -> ");
    sh1.getCategoryProducts(c2);
    sh1.addProduct(gorro2,c2);
    console.log("Probamos el addProductinShop.")
    sh1.addProductInShop(gorro2,t1,5);
    console.log("Y por último getShopProducts de la tienda 1 -> ");
    sh1.getShopProducts(t1,"");
    
    
}
window.onload=pruebas;