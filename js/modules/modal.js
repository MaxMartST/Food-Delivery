"use strict";
function modal() {
    //Modal and timeout modal
    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');
    
    const modalTimerId = setTimeout(openModel, 50000);

    function openModel() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModel);
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

    //отработка нажатия на серую зону для закрытия мод. окна и крестик
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    //Metrics: modalByScroll
    window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;