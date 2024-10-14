// Supposons que ce code soit ajouté à ton fichier script.js

// Création d'un objet pour stocker les sons
let sounds = {};

// Fonction pour précharger les sons
function preloadSounds() {
    const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    noteNames.forEach(note => {
        for (let octave = 1; octave <= 4; octave++) {
            const soundFileName = note + (octave - 1) + '.mp3';
            const noteId = note + octave;
            sounds[noteId] = new p5.SoundFile('sound/' + soundFileName);
        }
    });
}

// Assure-toi que p5 est déjà chargé
document.getElementById('sketch-js').onload = function() {
    new p5(() => {
        preloadSounds();
    });
};

// Modifier la fonction de jeu de note pour inclure la lecture du son
function playNoteOnBass(note) {
    const positions = bassMapping[note];
    let minDistance = Infinity;
    let optimalPosition = positions[0];

    positions.forEach(pos => {
        let distance = calculateFretDistance(lastPlayedPosition, pos);
        if (distance < minDistance) {
            minDistance = distance;
            optimalPosition = pos;
        }
    });

    lastPlayedPosition = optimalPosition;
    updateBassDisplay(optimalPosition);
    sounds[note].play();
}
