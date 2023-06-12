  document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('image');
    const profileForm = document.getElementById('profile-form');
    const profileImage = document.getElementById('profile-image');
  
    // Verificar si hay una URL de imagen guardada en el almacenamiento local
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.img) {
      profileImage.src = currentUser.img;
    }
  
    profileForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const file = fileInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.addEventListener('load', (readerEvent) => {
          const base64Image = readerEvent.target.result;
          profileImage.src = base64Image;
          saveProfileImage(base64Image);
        });
        reader.readAsDataURL(file);
      }
    });
  });
  


function saveProfileImage(base64Image) {
    const userData = { img: base64Image };
  
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userId = currentUser.id;
  
    fetch(`http://localhost:3000/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al guardar los datos');
        }
        // Actualizar el campo "img" en el objeto del usuario actual
        currentUser.img = base64Image;
        // Actualizar el objeto del usuario en el almacenamiento local
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        // Aquí puedes realizar alguna acción adicional después de subir la imagen
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
