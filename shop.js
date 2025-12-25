window.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('mainCar');
    const colorButtons = document.querySelectorAll('.colorc');
    const savedModel = localStorage.getItem('selectedModel');

    if (savedModel) {
        viewer.setAttribute('src', savedModel);
    }

    let pendingColor = null;

    function applyColor(color) {
        if (!viewer.model) {
            pendingColor = color;
            return;
        }

        const materials = viewer.model.materials;
        if (!materials || materials.length === 0) return;

        const r = parseInt(color.slice(1,3),16)/255;
        const g = parseInt(color.slice(3,5),16)/255;
        const b = parseInt(color.slice(5,7),16)/255;

        materials.forEach(mat => {
            if (mat.pbrMetallicRoughness) {
                mat.pbrMetallicRoughness.setBaseColorFactor([r,g,b,1]);
            }
        });
    }

    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            applyColor(color);
        });
    });

    viewer.addEventListener('model-load', () => {
        if (pendingColor) {
            applyColor(pendingColor);
            pendingColor = null;
        }
    });
});
window.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.child2-wrapper');

    wrapper.addEventListener('wheel', (e) => {
        const scrollLeft = wrapper.scrollLeft;
        const maxScrollLeft = wrapper.scrollWidth - wrapper.clientWidth;

        const proposedScroll = scrollLeft + e.deltaY;

        // Only prevent default if we are within horizontal scroll range
        if (proposedScroll > 0 && proposedScroll < maxScrollLeft) {
            e.preventDefault();
            wrapper.scrollLeft = proposedScroll;
        }
        // If at edges, allow default vertical scrolling
    }, { passive: false });
});
window.addEventListener('DOMContentLoaded', () => {
    const scrollContainer = document.querySelector('.child2-wrapper');
    const indicator = document.querySelector('.dd1');
    const steps = document.querySelectorAll('.dd2').length + 1;

    scrollContainer.addEventListener('scroll', () => {
        const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;

        const progress = scrollContainer.scrollLeft / maxScroll;

        const stepWidth =
            document.querySelector('.sdiv').offsetWidth / steps;

        const currentStep = Math.round(progress * (steps - 1));

        indicator.style.transform =
            `translateX(${currentStep * stepWidth}px)`;
    });
});
