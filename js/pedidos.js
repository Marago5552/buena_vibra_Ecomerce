    const modalNuevoContenedor = document.querySelector('.contmodal');

    const agregarAlModal = document.querySelectorAll('.pedido_boton');
    agregarAlModal.forEach(agregarPedido => {
        agregarPedido.addEventListener('click', agregarPedidoClicked);
    });

    const platillosAgregados = new Set();

    function agregarPedidoClicked(event) {
        const button = event.target;
        const producto = button.closest('.producto');
        
        const nombreProduct = producto.querySelector('.nombre').textContent;

        if (platillosAgregados.has(nombreProduct)) {
            alert("Este platillo ya ha sido agregado al pedido.");
            return;
        }
        
        const precioProduct = producto.querySelector('.precio').textContent;
        const imgProduct = producto.querySelector('.foto_menu').src;

        platillosAgregados.add(nombreProduct);
        
        agregarPlatilloAlPedido(nombreProduct, precioProduct, imgProduct);
    
    function agregarPlatilloAlPedido(nombreProduct, precioProduct, imgProduct){
    const modalNuevo = document.createElement('div');
            
    const modalNuevoCont =`
            <div class="contmodal">
            <div class="detallesmodal">
                <div>
                    <img class="fotomodal" src="${imgProduct}" alt="">
                </div>
                <div class="descripmodal">
                    <p class="productomodal">${nombreProduct}</p>
                    <p class="preciomodal">${precioProduct}</p>
                </div>
                <div>
                    <img class="botoncancel" src="img/cancel.png" alt="">
                </div>
            </div>
            <div class="cantidadespedido">
                <img class="modalbotonmenos" src="img/menos_.png" alt="">
                <input id="cantidades" value="1" type="number" class="modalCantidad" disabled>
                <img class="modalbotonmas" src="img/mas_.png" alt="">
            </div>
            </div>
            `;

       modalNuevo.innerHTML = modalNuevoCont;     
       modalNuevoContenedor.append(modalNuevo);
    
        modalNuevo.querySelector('.botoncancel').addEventListener('click',cancelarPedido);

        modalNuevo.querySelector('.modalbotonmenos').addEventListener('click',restarPlatillos);

        modalNuevo.querySelector('.modalbotonmas').addEventListener('click',sumarPlatillos);
      
     actualizarTotal();
     
    };
}

function actualizarTotal() {
    let total = 0;
    const modalTotal = document.querySelector('.totalmodal');
    
    const detallesPlatillos = document.querySelectorAll('.detallesmodal');
    
    detallesPlatillos.forEach((detallesmodal) => {
        const precioPlatillo = detallesmodal.querySelector('.preciomodal');
        const precioUnicoPlatillo = Number(precioPlatillo.textContent.replace('$',''));

        const cantidadespedido = detallesmodal.nextElementSibling.querySelector('.modalCantidad');
        
        if (cantidadespedido) {
            const cantidadesPedido = Number(cantidadespedido.value);
            total += precioUnicoPlatillo * cantidadesPedido;
        }
    });

    modalTotal.textContent = `$${total.toFixed(2)}`;
}
   
    function restarPlatillos(event){
        const buttonClicked = event.target;
        const selector = buttonClicked.parentElement;
        console.log(selector.querySelector('.modalCantidad').value);
        var restarPlatos = selector.querySelector('.modalCantidad').value;
        restarPlatos--;
        
        if(restarPlatos >= 1){
            selector.querySelector('.modalCantidad').value = Number(restarPlatos);
        }
        actualizarTotal();
    }

    function sumarPlatillos(event){
        const buttonClicked = event.target;
        const selector = buttonClicked.parentElement;
        console.log(selector.querySelector('.modalCantidad').value);
        var agregarPlato = selector.querySelector('.modalCantidad').value;
        agregarPlato++;
        selector.querySelector('.modalCantidad').value = Number(agregarPlato);
        
        actualizarTotal();
    }

    function cancelarPedido(event) {
        const buttonClicked = event.target;
        buttonClicked.closest('.contmodal').remove();
        platillosAgregados.clear();
        actualizarTotal();
        
            const cerosTotal = document.querySelector('.totalmodal');
            const cerosTotalCheck = Number(cerosTotal.textContent.replace('$',''));

            if (cerosTotalCheck == '0') {
                const element = document.querySelector('.notificacompra');
                 element.style.display ='none';
            }
    
            if (cerosTotalCheck == '0') {
                const element = document.querySelector('.hazTuPedido');
                 element.style.display ='block';
            }   
          
            if (cerosTotalCheck != '0') {
                const element = document.querySelector('.hazTuPedido');
                 element.style.display ='none';
            }   
          
            if (cerosTotalCheck == '0') {
                const element = document.querySelector('.pagacantidad');
                 element.style.display ='none';
            }  
     }

     function pedidoNot(){
      const element = document.querySelector('.notificacompra');
        element.style.display ='block';

        const elemen = document.querySelector('.hazTuPedido');
              elemen.style.display ='none';

        const elements = document.querySelector('.pagacantidad');
              elements.style.display ='flex';      
     }
            
    function cerrarModal(){
        const element = document.querySelector('.todomodal');
        element.style.display ='none';
      }
                  
      function pedidoMostrar(){
        const element = document.querySelector('.todomodal');
        element.style.display ='block';
      }

/*
      const pedidoBoton = document.querySelector('.compra');
      pedidoBoton.addEventListener('click', pedidoBotonClicked);

function pedidoBotonClicked () {

    const productomodalElements = document.querySelectorAll('.productomodal');
    const modalCantidadElements = document.querySelectorAll('.modalCantidad');

    let pedidoW = "Pedido: \n \n";

    let total = 0;

    for (let i = 0; i < productomodalElements.length; i++) {
        const nombreProducto = productomodalElements[i].textContent;
        const cantidadProducto = modalCantidadElements[i].value;

        const detallesmodal = productomodalElements[i].closest('.detallesmodal');
        const precioPlatillo = detallesmodal.querySelector('.preciomodal');
        const precioUnicoPlatillo = parseFloat(precioPlatillo.textContent.replace('$', ''));

        const subtotal = precioUnicoPlatillo * parseFloat(cantidadProducto);
        total += subtotal;

        pedidoW += `_${cantidadProducto}_ - *${nombreProducto}*\nSub-Total: $${subtotal.toFixed(2)}\n \n`;
    }

    pedidoW += `Total: *$${total.toFixed(2)}* \n \n`;

    const today = new Date();
    const now = today.toLocaleString();

    if (isMobile() && !isIPhone()) {
        var urlMobile = `https://wa.me/${telefono}?text=${encodeURIComponent(pedidoW)}`;
        window.open(urlMobile, '_blank');
    } else {
        sendEmailPedido(pedidoW);
    }

    function isMobile() {
        if (sessionStorage.desktop)
            return false;
        else if (localStorage.mobile)
            return true;
        var mobile = ['iphone', 'ipad', 'android', 'blackberry', 'nokia', 'opera mini', 'windows mobile', 'windows phone', 'iemobile'];
        for (var i in mobile)
            if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) !== -1) return true;
        return false;
    }

    function isIPhone() {
        return /iPhone/i.test(navigator.userAgent);
    }

    function sendEmailPedido(pedido) {
        var email = 'saul.alvarado.corona@gmail.com';
        var asunto = `Pedido realizado`;
        var cuerpo = '¡Hola! Aquí está el pedido:\n\n' + pedido + '\n' + now + '';
    
        var mailtoURL = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        window.location.href = mailtoURL;
    }

    const urlDesktop = 'https://api.whatsapp.com/';
    const telefono = '529581178091';

    setTimeout(() => {
        let mensaje = '*Buena Vibra* \n' + '' + pedidoW + '' + now + '';

        if (isMobile()) {
            var urlMobile = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(urlMobile, '_blank');
        } else {
            var urlDesktop = `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(mensaje)}`;
            window.open(urlDesktop, '_blank');
        }
  
    }, 3000);
   
    modalNuevoContenedor.innerHTML = '';
    platillosAgregados.clear();
    actualizarTotal();
    cerrarModal();
    modalGracias();

    const cerosTotal = document.querySelector('.totalmodal');
    const cerosTotalCheck = Number(cerosTotal.textContent.replace('$',''));

    if (cerosTotalCheck == '0') {
        const element = document.querySelector('.notificacompra');
         element.style.display ='none';
    }
    if (cerosTotalCheck == '0') {
        const element = document.querySelector('.hazTuPedido');
         element.style.display ='block';
    }   
      if (cerosTotalCheck != '0') {
        const element = document.querySelector('.hazTuPedido');
         element.style.display ='none';
    }   
      if (cerosTotalCheck == '0') {
        const element = document.querySelector('.pagacantidad');
         element.style.display ='none';
    }
}

*/

const pedidoBoton = document.querySelector('.compra');
pedidoBoton.addEventListener('click', pedidoBotonClicked);

function pedidoBotonClicked() {
    const productomodalElements = document.querySelectorAll('.productomodal');
    const modalCantidadElements = document.querySelectorAll('.modalCantidad');

   let total = 0;

   let pedidoW = "Pedido: \n \n";

    for (let i = 0; i < productomodalElements.length; i++) {
        const nombreProducto = productomodalElements[i].textContent;
        const cantidadProducto = modalCantidadElements[i].value;

        const detallesmodal = productomodalElements[i].closest('.detallesmodal');
        const precioPlatillo = detallesmodal.querySelector('.preciomodal');
        const precioUnicoPlatillo = parseFloat(precioPlatillo.textContent.replace('$', ''));

        const subtotal = precioUnicoPlatillo * parseFloat(cantidadProducto);
        total += subtotal;

        pedidoW += `${cantidadProducto} - ${nombreProducto}\nSub-Total: $${subtotal.toFixed(2)}\n \n`;
    }

    pedidoW += `Total: $${total.toFixed(2)} \n \n`;

    const today = new Date();
    const now = today.toLocaleString();
   
  
    function sendEmailPedido(pedido) {
        var email = 'saul.alvarado.corona@gmail.com';
        var asunto = `Pedido realizado ${now}`;
        var cuerpo = '¡Hola! Aquí está el pedido:\n\n' + pedido + '\n' + now + '';
    
        var mailtoURL = `mailto:${email}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
        window.location.href = mailtoURL;
    }

    setTimeout(() => { 
        sendEmailPedido(pedidoW);
    }, 3000);

    modalNuevoContenedor.innerHTML = '';
    platillosAgregados.clear();
    actualizarTotal();
    cerrarModal();
    modalGracias();

    const cerosTotal = document.querySelector('.totalmodal');
    const cerosTotalCheck = Number(cerosTotal.textContent.replace('$',''));

    if (cerosTotalCheck == '0') {
        const element = document.querySelector('.notificacompra');
         element.style.display ='none';
    }
    if (cerosTotalCheck == '0') {
        const element = document.querySelector('.hazTuPedido');
         element.style.display ='block';
    }   
      if (cerosTotalCheck != '0') {
        const element = document.querySelector('.hazTuPedido');
         element.style.display ='none';
    }   
      if (cerosTotalCheck == '0') {
        const element = document.querySelector('.pagacantidad');
         element.style.display ='none';
    }
}
