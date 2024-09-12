// Uložení aktuálního dne
const currentDate = new Date().toLocaleDateString();
const calendar = document.getElementById('calendar');
const editSection = document.getElementById('editSection');

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

// Funkce pro zobrazení kalendáře
document.getElementById('toggleCalendar').addEventListener('click', function() {
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
            const from = prompt('Zadej čas od:', '08:00');
            const to = prompt('Zadej čas do:', '16:00');
            saveToCalendar(`Byl od ${from} do ${to}`, key);
            alert(`Záznam pro ${key} byl změněn.`);
        });

        // Tlačítko pro změnu na "Nebyl"
        const
