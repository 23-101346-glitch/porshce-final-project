
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

    const map = {
        'hotspot-hood': '.hood',
        'hotspot-interior': '.interior',
        'hotspot-logo': '.logoo',
        'hotspot-wheel': '.wheel'
    };

    Object.keys(map).forEach(hotspotClass => {
        const hotspot = document.querySelector(`.${hotspotClass}`);
        const photo = document.querySelector(map[hotspotClass]);

        if (!hotspot || !photo) return;

        hotspot.addEventListener('click', () => {
            document.querySelectorAll('.photo')
                .forEach(p => p.classList.remove('active'));

            photo.classList.add('active');
        });
    });

});
