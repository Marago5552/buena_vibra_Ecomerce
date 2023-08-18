function mostrarSeccion(seccion) {
  var secciones = document.getElementsByClassName('hoja_menu_' + seccion);
  
  var todasLasSecciones = document.querySelectorAll('[class^="hoja_menu_"]');
  for (var i = 0; i < todasLasSecciones.length; i++) {
    todasLasSecciones[i].style.display = 'none';
  }
  
  for (var j = 0; j < secciones.length; j++) {
    secciones[j].style.display = 'flex';
  }
}

function modalGracias() {
  const element = document.querySelector('.modalGracias');
  element.style.display = 'flex';

  setTimeout(function() {
    element.style.display = 'none';
  }, 6000);
}