// Funkce pro uložení dat do localStorage
function saveToCalendar(status, date = new Date().toLocaleDateString()) {
    localStorage.setItem(date, status);
    alert("Zapsáno: " + status);
}

// Zápis: byl
document.getElementById('btnByl').addEventListener('click', function() {
    saveToCalendar('Byl');
});

// Funkce pro formátování času na 24hodinový formát
function formatTo24Hour(timeStr) {
    const [hours, minutes] = timeStr.split(':');
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}

// Zápis: byl od-do
document.getElementById('btnBylOdDo').addEventListener('click', function() {
    const from = formatTo24Hour(document.getElementById('fromTime').value); // Hodnota ve formátu 24 hodin
    const to = formatTo24Hour(document.getElementById('toTime').value);     // Hodnota ve formátu 24 hodin
    saveToCalendar(`Byl od ${from} do ${to}`);
});

// Zápis: nebyl
document.getElementById('btnNebyl').addEventListener('click', function() {
    saveToCalendar('Nebyl');
});

// Funkce pro zobrazení kalendáře
document.getElementById('toggleCalendar').addEventListener('click', function() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';  // Vyprázdnění kalendáře
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // Přidání záznamů do kalendáře
        const entry = document.createElement('p');
        entry.innerHTML = `${key}: ${value}`;
        calendar.appendChild(entry);
    }
    calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
});

// Funkce pro zobrazení úprav
document.getElementById('editBtn').addEventListener('click', function() {
    const editSection = document.getElementById('editSection');
    editSection.innerHTML = '';  // Vyprázdnění editovací sekce
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // Vytvoření prvku pro každý záznam
        const entry = document.createElement('p');
        entry.innerHTML = `${key}: ${value}`;

        // Tlačítko pro změnu na "Byl"
        const btnByl = document.createElement('button');
        btnByl.textContent = 'Byl';
        btnByl.addEventListener('click', function() {
            saveToCalendar('Byl', key);
            alert(`Záznam pro ${key} byl změněn na "Byl".`);
        });

        // Tlačítko pro změnu na "Byl od-do"
        const btnBylOdDo = document.createElement('button');
        btnBylOdDo.textContent = 'Byl od-do';
        btnBylOdDo.addEventListener('click', function() {
            const from = prompt('Zadej čas od (ve formátu HH:MM):', '08:00');
            const to = prompt('Zadej čas do (ve formátu HH:MM):', '16:00');
            const formattedFrom = formatTo24Hour(from);
            const formattedTo = formatTo24Hour(to);
            saveToCalendar(`Byl od ${formattedFrom} do ${formattedTo}`, key);
            alert(`Záznam pro ${key} byl změněn.`);
        });

        // Tlačítko pro změnu na "Nebyl"
        const btnNebyl = document.createElement('button');
        btnNebyl.textContent = 'Nebyl';
        btnNebyl.addEventListener('click', function() {
            saveToCalendar('Nebyl', key);
            alert(`Záznam pro ${key} byl změněn na "Nebyl".`);
        });

        // Přidání tlačítek k záznamu
        entry.appendChild(btnByl);
        entry.appendChild(btnBylOdDo);
        entry.appendChild(btnNebyl);
        editSection.appendChild(entry);
    }
    editSection.style.display = 'block';
});

// Kontrola zapomenutého zápisu
window.addEventListener('load', function() {
    const currentDate = new Date().toLocaleDateString();
    if (!localStorage.getItem(currentDate)) {
        saveToCalendar('Neznámé');
        // Notifikace (není přímo podporováno pro telefon, ale prohlížeč na desktopu ano)
        if (Notification.permission === 'granted') {
            new Notification("Zapomněl jsi zapsat pracovní den!");
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification("Zapomněl jsi zapsat pracovní den!");
                }
            });
        }
    }
});
