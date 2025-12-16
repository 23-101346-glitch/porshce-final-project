
window.addEventListener('DOMContentLoaded', () => {
    const carContainer = document.querySelector('.carssd');

    carContainer.addEventListener('wheel', (e) => {
        e.preventDefault(); // prevent vertical scroll
        carContainer.scrollLeft += e.deltaY; // scroll horizontally
    });
});

