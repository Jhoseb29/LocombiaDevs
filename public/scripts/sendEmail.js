const btn = document.getElementById('button_footer');

document.getElementById('form_footer')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   const serviceID = 'default_service';
   const templateID = 'template_o1kr0ft';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      alert('Sent!');
    }, (err) => {
      alert(JSON.stringify(err));
    });
});