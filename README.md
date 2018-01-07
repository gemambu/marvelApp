# Práctica React-Native. KC Bootcamp V 

## Enunciado

La práctica consiste en crear una aplicación con los siguientes requisitos:

**Obligatorios**

- Pantalla con un listado FlatList y datos cargados desde el web services sobre la temática elegida.
- Pantalla de vista detalle al pulsar una celda del listado.
- Hacer uso de la librería Redux
- La app deberá usar uno de los componentes de navegación mostrados en las diapositivas del curso (Recomendado react-native-router-flux )

**Opcionales**

- El uso de este spinner en los tiempos de carga, que tendremos que enlazar MANUALMENTE con nuestros proyectos nativos.
[Spinkit](https://github.com/maxs15/react-native-spinkit)
- Un formulario de añadir personaje (aunque no esté conectado contra un webservice)
- En caso de usar una API distinta o de añadir alguna funcionalidad extra, especificar en el Read.me del repositorio.


## Instalación

### Requisitos previos

Es necesario tener instalado:

- Node: `brew install node`
- Watchman: `brew install watchman`
- React-Native: `npm install -g react-native-cli`

### Instalación

Descargar el proyecto:

`git clone https://github.com/gemambu/marvelApp.git`

e instalarlo:

`cd marvelApp`

`npm install`

## Cómo arrancar la aplicación

Ejecutar en un terminal: `npm start`

Ejecutar en un segundo terminal: 

- `react-native run-ios` en caso de querer arrancar el simulador de iOS 
- `react-native run-android` en caso de querer arrancar el simulador de Android.

## Información del proyecto

Se han utilizado las siguientes librerías de terceros para el desarrollo de la aplicación:

- [react-native-image-picker](https://github.com/react-community/react-native-image-picker)
- [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)
- [react-native-search-box](https://github.com/agiletechvn/react-native-search-box)
- [react-native-spinkit](https://github.com/maxs15/react-native-spinkit)

## Extras

### Listado de personajes

Se ha añadido una barra de búsqueda en el listado de personajes. Para ello, he uitlizado la librería [react-native-search-box](https://github.com/agiletechvn/react-native-search-box). 

En cuanto el usuario escribe tres o más caracteres, se hace una consulta a la API de marvel buscando coincidencias de nombres que empiecen por el texto de búsqueda. Al pulsar sobre Cancelar, se borra el texto y se vuelve a mostrar el listado completo de personajes sin filtro.

### Creación de personaje

Los datos al crear un personaje son:

- Nombre (**obligatorio**)
- Descripción (**obligatorio**)
- Imagen (_opcional_)

Además se ha añadido una longitud máxima de caracteres para el nombre (20, longitud por defecto) y la descripción (100).

Para los Input se ha utilizado el widget creado en clase, con algún cambio para hacerlo más personalizable (longitud máxima con 20 caracteres por defecto, opción de multilínea a false por defecto y número de líneas, con 1 línea por defecto)

**Nota**

Esta funcionalidad no es completa, ya que el API de Marvel no ofrece la posibilidad de salvar nuevos personajes.

## Demo iOS

![](https://thumbs.gfycat.com/BriskTallBetafish-size_restricted.gif)

## Demo Android

![](https://thumbs.gfycat.com/FaintImpeccableBedbug-size_restricted.gif)

## Posibles mejoras

- [ ]  Añadir más información en la navegación de detalle de Personaje
- [ ]  Añadir más endpoints en la aplicación, ya que el API de Marvel ofrece esta posibilidad.
- [ ]  Si se añaden más endpoints, utilizar una arquitectura donde se puedan generalizar componentes para que el código sea reducido y reutilizable.
- [ ]  Añadir la gestión de idiomas. Por defecto, todos los mensajes se han completado en Inglés pero todos los textos están incluidos en un único fichero para su manejo.
- [ ]  Iconos de aplicación.