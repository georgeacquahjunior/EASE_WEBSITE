const container = document.getElementById('container');

const overlaycon = document.getElementById('overlaycon');

const overlatBtn = document.getElementById('overlayBtn');

overlatBtn.addEventListener('click', () => {
    container.classList.toggle('right-panel-active');

    overlatBtn.addEventListener('btnScaled');
    window.requestAnimationFrame(() => {
        overlatBtn.classList.add('btnScaled');
    })
})



