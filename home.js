window.addEventListener('DOMContentLoaded', () => {
    const carContainer = document.querySelector('.carssd');

    carContainer.addEventListener('wheel', (e) => {
        const scrollLeft = carContainer.scrollLeft;
        const maxScrollLeft = carContainer.scrollWidth - carContainer.clientWidth;

        const proposedScroll = scrollLeft + e.deltaY;

        if (proposedScroll >= 0 && proposedScroll <= maxScrollLeft) {
          
            e.preventDefault();
            carContainer.scrollLeft = proposedScroll;
        }
    
    }, { passive: false });
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
document.querySelectorAll('.cd').forEach(card => {
    card.addEventListener('click', () => {
        const modelSrc = card.dataset.model;

        localStorage.setItem('selectedModel', modelSrc);
        window.location.href = 'shop.html';
    });
});