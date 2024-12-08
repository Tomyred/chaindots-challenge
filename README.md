# Notas sobre el Challenge
## Aclaración
En los requisitos del challenge se especificaba que para el manejo de las rutas se utilice la librería **react-router-dom**.  
Sin embargo, dicha librería está obsoleta y, hoy en día, es solo un export de la librería **react-router**, por lo que directamente se avanzará instalando esta última.

![](image.png)


Tambien, eleccion de javascript como lenguaje y no typescript fue unicamente por cuestiones de agilidad y velocidad al momento de escribir el codigo.

## Pasos

### 1. Seleccionar una API
Para este proyecto se utilizó la API **Weatherbit**.

### 2. Configurar la API en RapidAPI
1. Iniciar sesión en [RapidAPI](https://rapidapi.com/).  
2. Suscribirse a la API elegida.  
3. Elegir un plan.  
   - Para este proyecto se eligió el **plan gratuito**.

### 3. Obtener y configurar la API Key
- Una vez suscrito, en el dashboard para pruebas debería estar la **API Key**.  
- La API Key debe enviarse en los **headers** de las peticiones con las siguientes claves:
  - **`x-rapidapi-key`**: La API Key obtenida.
  - **`x-rapidapi-host`**: El valor debe ser `'x-rapidapi-host'`.

