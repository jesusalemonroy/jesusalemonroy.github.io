// --- FLAG (hidden in localStorage) ---
    // Cambia la bandera si quieres. Está aquí para propósitos del CTF local.
    localStorage.setItem('flag', 'PHCT{RaiosMeHackearon}');

    // NOTA: TODO lo siguiente está implementado de forma insegura intencionalmente.

    function renderComments(){
      const list = document.getElementById('commentsList');
      const raw = JSON.parse(localStorage.getItem('comments') || '[]');
      // vulnerable: usando innerHTML directamente con datos del usuario
      if(raw.length === 0){
        list.innerHTML = '<em>Aún no hay comentarios</em>';
        return;
      }
      list.innerHTML = raw.map(c => `<div class="comment">${c}</div>`).join('\n');
    }

    document.getElementById('save').addEventListener('click', ()=>{
      const txt = document.getElementById('comment').value || '';
      const arr = JSON.parse(localStorage.getItem('comments') || '[]');
      arr.push(txt);
      localStorage.setItem('comments', JSON.stringify(arr));
      document.getElementById('comment').value = '';
      renderComments();
    })

    // Reflected XSS demo
    document.getElementById('greet').addEventListener('click', ()=>{
      const name = document.getElementById('name').value || 'invitado';
      // vulnerable: inyecta directamente como HTML
      document.getElementById('output').innerHTML = `<strong>Hola, ${name}!</strong>`;
    });

    // Carga inicial de comentarios
    renderComments();

    // Muestra en consola una pista (pero la bandera sigue oculta en localStorage):
    console.log('Demo vulnerable a XSS cargado. Bandera en localStorage bajo la clave "flag".');