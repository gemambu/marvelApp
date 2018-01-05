# Práctica Práctica React-Native. KC Bootcamp V 

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

Descargar el proyecto:

`git clone https://github.com/gemambu/marvelApp.git`

e instalarlo:

`cd marvelApp`

`npm install`

## Cómo arrancar la aplicación

Si no se ha hecho una release de la aplicación, podemos seguir los siguientes pasos:

Ejecutar: `npm start`

Ejecutar en otro terminal: `react-native run-ios` en caso de querer arrancar el simulador de iOS o `react-native run-android` en caso de querer arrancar el simulador de Android.

### Opcional: instalar release <Revisar!>

## Extras

Se ha añadido una barra de búsqueda en el listado de personajes. Para ello, he uitlizado la librería [react-native-search-box](https://github.com/agiletechvn/react-native-search-box). 

En cuanto el usuario escribe tres o más caracteres, se hace una consulta a la API de marvel buscando coincidencias de nombres que empiecen por el texto de búsqueda. Al pulsar sobre Cancelar, se borra el texto y se vuelve a mostrar el listado completo de personajes sin filtro.


## Demo iOS

## Demo Android
