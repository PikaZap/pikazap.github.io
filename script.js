// Firebase konfigurace (tohle musíš mít ze své Firebase Console)
const firebaseConfig = {
    apiKey: "TVŮJ_API_KEY",
    authDomain: "TVŮJ_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://TVŮJ_PROJECT_ID.firebaseio.com",
    projectId: "TVŮJ_PROJECT_ID",
    storageBucket: "TVŮJ_PROJECT_ID.appspot.com",
    messagingSenderId: "TVŮJ_MESSAGING_SENDER_ID",
    appId: "TVŮJ_APP_ID"
};

// Inicializace Firebase
firebase.initializeApp(firebaseConfig);

// Připojení k databázi
const database = firebase.database();

const dbRef = database.ref("pracovni-dny");

// Příklad zápisu dat
document.getElementById('btnByl').addEventListener('click', function() {
    const today = new Date().toLocaleDateString();
    dbRef.child(today).set({
        status: "Byl"
    }).then(() => {
        alert("Zápis úspěšný");
    }).catch((error) => {
        console.error("Chyba při zápisu: ", error);
    });
});

// Zápis: byl
document.getElementById('btnByl').addEventListener('click', function() {
    saveToFirebase('Byl');
});

// Funkce pro formátování času na 24hodinový formát
function formatTo24Hour(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

// Zápis: byl od-do
document.getElementById('btnBylOdDo').addEventListener('click', function() {
    const from = formatTo24Hour(document.getElementById('fromTime').value);
    const to = formatTo24Hour(document.getElementById('toTime').value);
    saveToFirebase(`Byl od ${from} do ${to}`);
});

// Zápis: nebyl
document.getElementById('btnNebyl').addEventListener('click', function() {
    saveToFirebase('Nebyl');
});

// Funkce pro načtení dat z Firebase
document.getElementById('toggleCalendar').addEventListener('click', function() {
    loadFromFirebase();  // Zavolání funkce pro načtení dat
});

// Funkce pro zobrazení úprav
document.getElementById('editBtn').addEventListener('click', function() {
    const ref = database.ref('pracovni-dny');
    ref.once('value', (snapshot) => {
        const data = snapshot.val();
        const editSection = document.getElementById('editSection');
        editSection.innerHTML = '';  // Vyprázdnění sekce
        for (const [key, value] of Object.entries(data)) {
            const entry = document.createElement('p');
            entry.innerHTML = `${key}: ${value.status}`;
            
            const btnByl = document.createElement('button');
            btnByl.textContent = 'Byl';
            btnByl.addEventListener('click', function() {
                saveToFirebase('Byl', key);
                alert(`Záznam pro ${key} byl změněn na "Byl".`);
            });

            const btnBylOdDo = document.createElement('button');
            btnBylOdDo.textContent = 'Byl od-do';
            btnBylOdDo.addEventListener('click', function() {
                const from = prompt('Zadej čas od (ve formátu HH:MM):', '08:00');
                const to = prompt('Zadej čas do (ve formátu HH:MM):', '16:00');
                const formattedFrom = formatTo24Hour(from);
                const formattedTo = formatTo24Hour(to);
                saveToFirebase(`Byl od ${formattedFrom} do ${formattedTo}`, key);
                alert(`Záznam pro ${key} byl změněn.`);
            });

            const btnNebyl = document.createElement('button');
            btnNebyl.textContent = 'Nebyl';
            btnNebyl.addEventListener('click', function() {
                saveToFirebase('Nebyl', key);
                alert(`Záznam pro ${key} byl změněn na "Nebyl".`);
            });

            entry.appendChild(btnByl);
            entry.appendChild(btnBylOdDo);
            entry.appendChild(btnNebyl);
            editSection.appendChild(entry);
        }
        editSection.style.display = 'block';
    }).catch(error => {
        console.error("Chyba při načítání dat:", error);
    });
});
