// Affiche la fenêtre popup avec l'URL spécifiée
function showPopup(url) {
    const iframe = document.querySelector("#popup-window iframe");
    iframe.src = url;
    document.getElementById("popup-window").classList.remove("hidden");
}
// Ferme la fenêtre popup
function closePopup() {
    document.getElementById("popup-window").classList.add("hidden");
    const iframe = document.querySelector("#popup-window iframe");
    iframe.src = ""; // Réinitialise l'iframe pour éviter de charger l'URL en arrière-plan
}

// Ajouter un écouteur de clic pour les icônes
document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        e.preventDefault();
        const url = icon.getAttribute("data-url"); // Récupère l'URL de l'icône cliquée
        showPopup(url); // Ouvre le popup avec l'URL spécifique
    });
});


// Rendre la fenêtre déplaçable
let popupWindow = document.getElementById("popup-window");
let isDragging = false;
let offsetX, offsetY;

document.querySelector('.popup-header').addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - popupWindow.offsetLeft;
    offsetY = e.clientY - popupWindow.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        popupWindow.style.left = `${e.clientX - offsetX}px`;
        popupWindow.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});
