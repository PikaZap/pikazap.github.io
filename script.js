// Uložení aktuálního dne
const currentDate = new Date().toLocaleDateString();
const calendar = document.getElementById('calendar');

// Funkce pro uložení dat
function saveToCalendar(status, date = currentDate) {
    localStorage.setItem(date, status);
    alert("Zapsáno: " + status);
}

// Zápis: byl
document.getElementById('btnByl').addEventListener('click', function() {
    saveToCalendar('Byl');
});

// Zápis: byl od-do
document.getElementById('btnBylOdDo').addEventListener('click', function() {
    const from = document.getElementById('fromTime').value;
    const to = document.getElementById('toTime').value;
    saveToCalendar(`Byl od ${from} do ${to}`);
});

// Zabraň kliknutí na vstupy spouštět tlačítko
document.getElementById('fromTime').addEventListener('click', function(event) {
    event.stopPropagation();
});

document.getElementById('toTime').addEventListener('click', function(event) {
    event.stopPropagation();
});

// Zápis: nebyl
document.getElementById('btnNebyl').addEventListener('click', function() {
    saveToCalendar('Nebyl');
});

// Zobrazení kalendáře s tlačítkem "upravit"
document.getElementById('toggleCalendar').addEventListener('click', function() {
    calendar.innerHTML = '';
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        calendar.innerHTML += `<p>${key}: ${value} <button class="edit-btn" onclick="editEntry('${key}')">Upravit</button></p>`;
    }
    calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
});

// Funkce pro úpravu záznamu
function editEntry(date) {
    const newStatus = prompt(`Uprav záznam pro ${date}:`, localStorage.getItem(date));
    if (newStatus !== null) {
        saveToCalendar(newStatus, date);
        alert(`Záznam pro ${date} byl upraven.`);
        location.reload(); // Znovu načte stránku, aby se aktualizoval kalendář
    }
}

// Kontrola zapomenutého zápisu
window.addEventListener('load', function() {
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
