window.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('mainCar');
    const colorButtons = document.querySelectorAll('.colorc');
    const savedModel = localStorage.getItem('selectedModel');

    // Set the selected model
    if (savedModel) {
        viewer.setAttribute('src', savedModel);
    }

    // Store the last clicked color
    let pendingColor = null;

    // Function to apply color safely
    function applyColor(color) {
        if (!viewer.model) {
            // Model not loaded yet, store color
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

    // Listen to clicks on color buttons
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const color = btn.dataset.color;
            applyColor(color);
        });
    });

    // When model is loaded, apply pending color if any
    viewer.addEventListener('model-load', () => {
        if (pendingColor) {
            applyColor(pendingColor);
            pendingColor = null;
        }
    });
});
