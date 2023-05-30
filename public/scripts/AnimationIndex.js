function animateTitle() {
    var titleElement = document.getElementById("titleLBG");
    titleElement.classList.toggle("title");
      
    setTimeout(function() {
        titleElement.classList.toggle("title");
        setTimeout(animateTitle, 8000); // Llama a la función nuevamente después de 8 segundos
    }, 4500);
}

animateTitle();