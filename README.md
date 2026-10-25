# Daniel Acosta · Sitio independiente

Rediseño completo para GitHub Pages, con páginas locales de inicio, biografía, vídeos, repertorio, conciertos, galería, blog y contacto. Dos artículos completos con sus versiones originales en inglés y español. Versiones completas en español e inglés, con selector de idioma en todas las páginas. La raíz contiene español y la carpeta en contiene inglés. El selector conserva la página actual.

## Publicar

1. Descomprime el paquete y crea un repositorio en GitHub.
2. Sube todo el contenido de esta carpeta a la raíz de la rama main, incluyendo .github y .nojekyll. No subas solamente el ZIP. Puedes usar GitHub Desktop.
3. En Settings → Pages → Source selecciona GitHub Actions.
4. En Actions ejecuta Publish to GitHub Pages → Run workflow.
5. GitHub mostrará la URL del sitio al terminar. Los siguientes cambios enviados a main se publicarán automáticamente.

No necesitas dominio propio ni modificar DNS. Las rutas relativas funcionan en un subdirectorio de GitHub Pages. Todavía no se ha conectado ni publicado ningún repositorio.

## Contenido

Biografía íntegra y testimonios; repertorio completo con buscador; doce conciertos históricos; 35 fotografías (conservando repeticiones de la selección original); cuatro interpretaciones de YouTube; Cancioncilla como vídeo MP4 local; dos artículos completos y sus imágenes; representación, correo y redes.

Dos kits de prensa descargables, con PDF en español o inglés y fotografías. Se retiraron los enlaces y el texto del dominio anterior de los PDF. Las fotos del kit se optimizaron a un máximo de 2400 píxeles.

Páginas, imágenes, descargas, vídeo local, estilos y scripts se sirven desde este repositorio. No hay vínculos ni recursos del alojamiento anterior. YouTube, las redes y la web del representante siguen siendo servicios externos. YouTube solo carga al pulsar reproducir.

El antiguo formulario y la newsletter se sustituyeron por contacto mediante correo. GitHub Pages no almacena suscriptores ni ejecuta un servidor de correo. No se han migrado datos privados, comentarios o suscriptores.

La biografía, los textos de interfaz, las categorías del repertorio y el archivo de conciertos están disponibles en ambos idiomas. Cada artículo muestra únicamente su versión original en el idioma seleccionado. Los títulos de obras se conservan en su idioma publicado. Biografía y conciertos son contenido de archivo.

## Editar

Cada archivo HTML se puede editar directamente. Actualiza tanto la página en español como su equivalente de la carpeta en al modificar contenido. styles.css define el diseño y app.js controla menú, buscador, fotografías y reproductores. assets contiene los medios y kits de prensa. Para añadir artículos, duplica uno existente y añade su enlace en blog.html.

No hay dependencias ni compilación. Para comprobar YouTube usa un servidor HTTP local o la URL publicada de GitHub Pages; abrir el HTML como archivo no proporciona la referencia HTTP que exige el reproductor.

## Comprobaciones

Sintaxis JavaScript, destinos internos, archivos y ausencia del dominio anterior en las páginas y PDF. Portada móvil inspeccionada; menú, búsqueda de repertorio y ampliación de galería probados en navegador. Las diez páginas de los PDF se renderizaron para revisión visual.

No se ha verificado todavía el despliegue real en GitHub. La reproducción de YouTube se comprueba desde un servidor HTTP local, no abriendo el archivo HTML directamente; YouTube requiere identificar el sitio que lo integra. No se han probado dispositivos físicos. Los datos biográficos de archivo pueden necesitar actualización editorial.

El contenido y las fotografías conservan los derechos y créditos de sus autores; se mantiene el crédito fotográfico del artículo.


## Reproductores de YouTube

Se verificó la reproducción real de las cuatro interpretaciones en un navegador desde un servidor HTTP local: Ponce, Lauro, Dowland y Musgrave. Al iniciar una interpretación, se pausa la anterior. El enlace directo a YouTube permanece visible después de cargar el reproductor. La política de referencia y el origen se configuran para el sitio que sirve la página; el reproductor respeta el idioma seleccionado. Si falla la carga, muestra un mensaje y permite reintentar.

El documental del primer artículo devolvió vídeo no disponible en el reproductor integrado. En ambas versiones del artículo se dejó como enlace directo, sin reproductor incrustado. La ficha de YouTube sigue accesible; no se garantiza que YouTube permita reproducirlo en todos los países o cuentas.

La validación bilingüe cubre 22 páginas y 478 enlaces o recursos internos, incluyendo selector de idioma, alternancias, archivos y anclas. La reproducción debe volver a revisarse tras el primer despliegue público en GitHub.
