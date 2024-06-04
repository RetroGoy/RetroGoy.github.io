document.addEventListener('DOMContentLoaded', () => {
    const pianoKeys = document.querySelectorAll('.piano .key');
    const bassStrings = document.querySelectorAll('.bass .string');
    const allKeys = document.querySelectorAll('.key');
    const strings = document.querySelectorAll('.bass .string');
    const tabStrings = {
        'E': document.getElementById('tab-E'),
        'A': document.getElementById('tab-A'),
        'D': document.getElementById('tab-D'),
        'G': document.getElementById('tab-G')
    };
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
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

    window.addEventListener("keydown", function (event) {
        if (event.defaultPrevented) {
          return;
        }
        switch (event.key) {
          case "ArrowDown":
            break;
          case "ArrowUp":
            break;
          case "ArrowLeft":
            break;
          case "ArrowRight":
            break;
          default:
            return;
        }
      
        // Cancel the default action to avoid it being handled twice
        event.preventDefault();
      }, true);

    function findQuinte(note) {
        const index = notes.indexOf(note.substring(0, note.length - 1));
        const quinteIndex = (index + 7) % 12;
        return notes[quinteIndex] + note.substring(note.length - 1);
    }

    function resetNoteColor(element) {
        element.style.backgroundColor = element.classList.contains('Cs') || element.classList.contains('Ds') || element.classList.contains('Fs') || element.classList.contains('Gs') || element.classList.contains('As') ? 'black' : 'white';
    }

    function activateNote(element, note) {
        element.style.backgroundColor = 'yellow';
        setTimeout(() => resetNoteColor(element), 500);
    }

    function activateNoteAndQuinte(element) {
        element.style.backgroundColor = 'yellow';
        const note = element.getAttribute('data-note');
        const quinte = findQuinte(note);
        
        bassStrings.forEach(string => {
            if (string.getAttribute('data-note') === quinte) {
                string.style.backgroundColor = 'blue';
            }
        });

        setTimeout(() => {
            resetNoteColor(element);
            bassStrings.forEach(string => {
                if (string.getAttribute('data-note') === quinte) {
                    string.style.backgroundColor = '#eee';
                }
            });
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
            activateNoteAndQuinte(key);
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
            activateNoteAndQuinte(string);
        });
    });

    strings.forEach(string => {
        string.addEventListener('click', function () {
            const stringName = this.parentNode.classList[1];
            const fretIndex = Array.from(this.parentNode.children).indexOf(this);
            updateTablature(stringName, fretIndex);
        });
    });

    function updateTablature(stringName, fretIndex) {
        const tabString = tabStrings[stringName];
        tabString.textContent += fretIndex + "-";
        alignTablature();
    }

    function alignTablature() {
        let maxLength = 0;
        Object.values(tabStrings).forEach(ts => {
            maxLength = Math.max(maxLength, ts.textContent.length);
        });
        Object.values(tabStrings).forEach(ts => {
            while (ts.textContent.length < maxLength) {
                ts.textContent += "-";
            }
        });
    }

    document.addEventListener('keydown', function (event) {
        if (keyMap[event.code]) {
            const note = keyMap[event.code];
            allKeys.forEach(key => {
                if (key.dataset.note === note) {
                    activateNote(key);
                }
            });
        }
    });

    document.addEventListener('keyup', function (event) {
        if (keyMap[event.code]) {
            const note = keyMap[event.code];
            allKeys.forEach(key => {
                if (key.dataset.note === note) {
                    resetNoteColor(key);
                }
            });
        }
    });

    allKeys.forEach(key => {
        key.addEventListener('click', function () {
            let note = key.dataset.note;
            playNoteOnBass(note);
        });
    });
});


const bassMapping = {
    'E1':  [{ string: 'E', fret: 0 }],
    'F1':  [{ string: 'E', fret: 1 }],
    'F#1': [{ string: 'E', fret: 2 }],
    'G1':  [{ string: 'E', fret: 3 }],
    'G#1': [{ string: 'E', fret: 4 }],
    'A1':  [{ string: 'E', fret: 5 },  { string: 'A', fret: 0 }],
    'A#1': [{ string: 'E', fret: 6 },  { string: 'A', fret: 1 }],
    'B1':  [{ string: 'E', fret: 7 },  { string: 'A', fret: 2 }],
    'C2':  [{ string: 'E', fret: 8 },  { string: 'A', fret: 3 }],
    'C#2': [{ string: 'E', fret: 9 },  { string: 'A', fret: 4 }],
    'D2':  [{ string: 'E', fret: 10 }, { string: 'A', fret: 5 },  { string: 'D', fret: 0 }],
    'D#2': [{ string: 'E', fret: 11 }, { string: 'A', fret: 6 },  { string: 'D', fret: 1 }],
    'E2':  [{ string: 'E', fret: 12 }, { string: 'A', fret: 7 },  { string: 'D', fret: 2 }],
    'F2':  [{ string: 'E', fret: 12 }, { string: 'A', fret: 8 },  { string: 'D', fret: 3 }],
    'F#2': [{ string: 'E', fret: 14 }, { string: 'A', fret: 9 },  { string: 'D', fret: 4 }],
    'G2':  [{ string: 'E', fret: 15 }, { string: 'A', fret: 10 },  { string: 'D', fret: 5 },  { string: 'G', fret: 0 }],
    'G#2': [{ string: 'E', fret: 16 }, { string: 'A', fret: 11 }, { string: 'D', fret: 6 },  { string: 'G', fret: 1 }],
    'A2':  [{ string: 'E', fret: 17 }, { string: 'A', fret: 12 }, { string: 'D', fret: 7 },  { string: 'G', fret: 2 }],
    'A#2': [{ string: 'E', fret: 18 }, { string: 'A', fret: 13 }, { string: 'D', fret: 8 },  { string: 'G', fret: 3 }],
    'B2':  [{ string: 'E', fret: 19 }, { string: 'A', fret: 14 }, { string: 'D', fret: 9 },  { string: 'G', fret: 4 }],
    'C3':  [{ string: 'E', fret: 20 }, { string: 'A', fret: 15 }, { string: 'D', fret: 10 }, { string: 'G', fret: 5 }],
    'C#3': [{ string: 'E', fret: 21 }, { string: 'A', fret: 16 }, { string: 'D', fret: 11 }, { string: 'G', fret: 6 }],
    'D3':  [                           { string: 'A', fret: 17 }, { string: 'D', fret: 12 }, { string: 'G', fret: 7 }],
    'D#3': [                           { string: 'A', fret: 18 }, { string: 'D', fret: 13 }, { string: 'G', fret: 8 }],
    'E3':  [                           { string: 'A', fret: 19 }, { string: 'D', fret: 14 }, { string: 'G', fret: 9 }],
    'F3':  [                           { string: 'A', fret: 20 }, { string: 'D', fret: 15 }, { string: 'G', fret: 10 }],
    'F#3': [                           { string: 'A', fret: 21 }, { string: 'D', fret: 16 }, { string: 'G', fret: 11 }],
    'G3':  [                                                      { string: 'D', fret: 17 }, { string: 'G', fret: 12 }],
    'G#3': [                                                      { string: 'D', fret: 18 }, { string: 'G', fret: 13 }],
    'A3':  [                                                      { string: 'D', fret: 19 }, { string: 'G', fret: 14 }],
    'A#3': [                                                      { string: 'D', fret: 20 }, { string: 'G', fret: 15 }],
    'B3':  [                                                      { string: 'D', fret: 21 }, { string: 'G', fret: 16 }],
    'C4':  [                                                                                 { string: 'G', fret: 17 }],
    'C#4': [                                                                                 { string: 'G', fret: 18 }],
    'D4':  [                                                                                 { string: 'G', fret: 19 }],
    'D#4': [                                                                                 { string: 'G', fret: 20 }],
    'E4':  [                                                                                 { string: 'G', fret: 21 }],
};


let lastPlayedPosition = { string: 'E', fret: 0 }; // Initialisation à la position ouverte de la corde E

function playNoteOnBass(note) {
    const positions = bassMapping[note];
    let minDistance = Infinity;
    let optimalPosition = positions[0];

    // Trouver la position la plus proche de la dernière jouée
    positions.forEach(pos => {
        let distance = calculateFretDistance(lastPlayedPosition, pos);
        if (distance < minDistance) {
            minDistance = distance;
            optimalPosition = pos;
        }
    });

    // Mettre à jour la dernière position jouée
    lastPlayedPosition = optimalPosition;

    // Mettre à jour la tablature et la visualisation sur la basse
    updateBassDisplay(optimalPosition);
}

function calculateFretDistance(pos1, pos2) {
    const stringOrder = ['E', 'A', 'D', 'G']; // Définit l'ordre des cordes
    let stringDistance = Math.abs(stringOrder.indexOf(pos1.string) - stringOrder.indexOf(pos2.string));
    let fretDistance = Math.abs(pos1.fret - pos2.fret);

    return stringDistance + fretDistance; // Combinaison simple de distances
}

function updateBassDisplay(position) {
    // Clear current color highlights
    document.querySelectorAll('.bass .string').forEach(elem => {
        elem.style.backgroundColor = '#eee'; // Reset to original background color
    });

    // Update optimal position to be highlighted in red
    const stringDiv = document.querySelector(`.bass .str.${position.string} .string:nth-child(${position.fret + 1})`);
    stringDiv.style.backgroundColor = 'red';

    // Update tablature to include the fret for the optimized position
    const tabString = tabStrings[position.string];
    alignTablature(); // Ensure alignment before adding
    tabString.textContent += position.fret + "-"; // Append the fret number
    alignTablature(); // Align again after adding
}
document.querySelectorAll('.piano .key').forEach(key => {
    key.addEventListener('click', function() {
        let note = key.dataset.note;
        playNoteOnBass(note);
    });
});


// Création d'un contexte audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const noteFrequencies = {
    'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65,
    'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91, 'A1': 55.00, 'A#1': 58.27, 'B1': 61.74,
    // Ajoute d'autres fréquences ici pour chaque note nécessaire
};
function playNote(note) {
    let oscillator = audioCtx.createOscillator();
    oscillator.type = 'sine'; // Type de son: 'sine', 'square', 'sawtooth', 'triangle'
    oscillator.frequency.value = noteFrequencies[note]; // Fréquence de la note
    oscillator.connect(audioCtx.destination); // Connecte l'oscillateur au haut-parleur
    oscillator.start(); // Démarre le son
    oscillator.stop(audioCtx.currentTime + 1); // Arrête le son après 1 seconde
}
document.querySelectorAll('.piano .key').forEach(key => {
    key.addEventListener('click', function() {
        let note = key.dataset.note;
        playNoteOnBass(note); // Joue la note sur la basse visuellement
        playNote(note); // Joue le son de la note
    });
});
document.querySelectorAll('.bass .string').forEach(string => {
    string.addEventListener('click', function() {
        let note = string.dataset.note;
        playNoteOnBass(note); // Mise à jour visuelle et tablature
        playNote(note); // Joue le son de la note
    });
});document.addEventListener('click', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
});
