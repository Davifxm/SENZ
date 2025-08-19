    // Navegação de cada item
    document.querySelectorAll('.history-item').forEach(item=>{
      item.addEventListener('click',()=>{
        const d=item.dataset.date;
        window.location.href=`historico-detalhe.html?d=${d}`;
      });
    });

    // Busca por texto (data visível)
    const inputBusca=document.getElementById('busca');
    inputBusca.addEventListener('input',()=>{
      const termo=inputBusca.value.trim().toLowerCase();
      document.querySelectorAll('.history-item .date').forEach(el=>{
        const box=el.closest('.history-item');
        box.style.display=el.textContent.toLowerCase().includes(termo)?'flex':'none';
      });
    });

    // Active visual + rotas do dock
    function setActive(el){
      document.querySelectorAll('.dock-icon').forEach(i=>i.classList.remove('active'));
      el.classList.add('active');
    }
    const dockIcons=document.querySelectorAll('.dock-icon');
    if(dockIcons.length>=5){
      dockIcons[0].addEventListener('click',()=>{window.location.href='telainicial.html';});
      dockIcons[1].addEventListener('click',()=>{window.location.href='intervencoes.html';});
      dockIcons[2].addEventListener('click',()=>{window.location.href='historico.html';});
      dockIcons[3].addEventListener('click',()=>{window.location.href='dados.html';});
      dockIcons[4].addEventListener('click',()=>{window.location.href='perfil.html';});
    }