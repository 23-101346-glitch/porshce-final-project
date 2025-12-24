
window.addEventListener('DOMContentLoaded', () => {
    const carContainer = document.querySelector('.carssd');

    carContainer.addEventListener('wheel', (e) => {
        e.preventDefault(); // prevent vertical scroll
        carContainer.scrollLeft += e.deltaY; // scroll horizontally
    });
});

const modelViewer = document.querySelector('#carModel');
const colorButtons = document.querySelectorAll('.colorbt');

modelViewer.addEventListener('load', () => {
    const materials = modelViewer.model.materials;

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;

            materials.forEach(material => {
                material.pbrMetallicRoughness.setBaseColorFactor([
                    parseInt(color.substr(1,2), 16) / 255,
                    parseInt(color.substr(3,2), 16) / 255,
                    parseInt(color.substr(5,2), 16) / 255,
                    1
                ]);
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {

    const hotspots = document.querySelectorAll('.Hotspot');
    const infoBox = document.getElementById('hotspotInfo');
    const titleEl = document.getElementById('hotspotTitle');
    const descEl = document.getElementById('hotspotDesc');

    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', (e) => {
            e.stopPropagation();

            titleEl.textContent = hotspot.dataset.title;
            descEl.textContent = hotspot.dataset.description;

            const rect = hotspot.getBoundingClientRect();

            infoBox.style.left = rect.right + 10 + 'px';
            infoBox.style.top = rect.top + window.scrollY + 'px';

            infoBox.classList.add('show');
        });
    });

    document.addEventListener('click', () => {
        infoBox.classList.remove('show');
    });

});