document.addEventListener('DOMContentLoaded', () => {
    const pianoKeys = document.querySelectorAll('.piano .key');
    const bassStrings = document.querySelectorAll('.bass .string');

    function activateNoteAndQuinte(element) {
        element.style.backgroundColor = 'yellow';
        
        // Trouver la quinte de la note
        const note = element.getAttribute('data-note');
        const quinte = findQuinte(note);
        
        // Recherche de l'élément correspondant à la quinte dans les cordes de basse
        bassStrings.forEach(string => {
            if (string.getAttribute('data-note') === quinte) {
                string.style.backgroundColor = 'red'; // Mettre en rouge la quinte
            }
        });
        
        setTimeout(() => {
            if (element.classList.contains('key')) {
                element.style.backgroundColor = element.classList.contains('Cs') || element.classList.contains('Ds') || element.classList.contains('Fs') || element.classList.contains('Gs') || element.classList.contains('As') ? 'black' : 'white';
            } else {
                element.style.backgroundColor = 'white'; 
            }
            
            // Réinitialiser la couleur de la quinte après un court délai
            bassStrings.forEach(string => {
                if (string.getAttribute('data-note') === quinte) {
                    string.style.backgroundColor = '#eee'; // Retour à la couleur d'origine
                }
            });
        }, 500);
    }

    pianoKeys.forEach(key => {
        key.addEventListener('click', () => {
            activateNoteAndQuinte(key);
        });
    });
    
    bassStrings.forEach(string => {
        string.addEventListener('click', () => {
            activateNoteAndQuinte(string);
        });
    });

    // Fonction pour trouver la quinte d'une note
    function findQuinte(note) {
        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const index = notes.indexOf(note.substring(0, note.length - 1));
        const quinteIndex = (index + 7) % 12; // Ajoute 7 pour trouver la quinte
        return notes[quinteIndex] + note.substring(note.length - 1);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const pianoKeys = document.querySelectorAll('.piano .key');
    const bassStrings = document.querySelectorAll('.bass .string');

    function activateNote(element) {
        element.style.backgroundColor = 'yellow';
        setTimeout(() => {
            if (element.classList.contains('key')) {
                element.style.backgroundColor = element.classList.contains('Cs') || element.classList.contains('Ds') || element.classList.contains('Fs') || element.classList.contains('Gs') || element.classList.contains('As') ? 'black' : 'white';
            } else {
                element.style.backgroundColor = 'white'; 
            }
        }, 500);
    }

    pianoKeys.forEach(key => {
        key.addEventListener('click', () => {
            const note = key.getAttribute('data-note');
            bassStrings.forEach(string => {
                if (string.getAttribute('data-note') === note) {
                    activateNote(string);
                }
            });
            activateNote(key);
        });
    });
    bassStrings.forEach(string => {
        string.addEventListener('click', () => {
            const note = string.getAttribute('data-note');
            pianoKeys.forEach(key => {
                if (key.getAttribute('data-note').includes(note)) {
                    activateNote(key);
                }
            });
            activateNote(string);
        });
    });
});

document.addEventListener('keydown', function(event) {
    const keyMap = {
        'KeyA': 'C1',
        'KeyW': 'C#1',
        'KeyS': 'D1',
        'KeyE': 'D#1',
        'KeyD': 'E1',
        'KeyF': 'F1',
        'KeyT': 'F#1',
        'KeyG': 'G1',
        'KeyY': 'G#1',
        'KeyH': 'A1',
        'KeyU': 'A#1',
        'KeyJ': 'B1'
    };
    if (keyMap[event.code]) {
        const note = keyMap[event.code];
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.dataset.note === note) {
                activateNote(key);
            }
        });
    }
});

// Ajouter également un écouteur pour 'keyup' pour désactiver la note
document.addEventListener('keyup', function(event) {
    const keyMap = {
        'KeyA': 'C1',
        'KeyW': 'C#1',
        'KeyS': 'D1',
        'KeyE': 'D#1',
        'KeyD': 'E1',
        'KeyF': 'F1',
        'KeyT': 'F#1',
        'KeyG': 'G1',
        'KeyY': 'G#1',
        'KeyH': 'A1',
        'KeyU': 'A#1',
        'KeyJ': 'B1'
    };
    if (keyMap[event.code]) {
        const note = keyMap[event.code];
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.dataset.note === note) {
                // Retour à la couleur originale
                key.style.backgroundColor = key.classList.contains('Cs') || key.classList.contains('Ds') || key.classList.contains('Fs') || key.classList.contains('Gs') || key.classList.contains('As') ? 'black' : 'white';
            }
        });
    }
});
