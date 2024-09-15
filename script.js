document.addEventListener('DOMContentLoaded', function() {
    // Funkce pro uložení dat na serverless funkci
    async function saveToServer(date, status) {
        try {
            const response = await fetch('/api/pracovniDny', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date, status }),
            });

            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                const errorText = await response.text();
                console.error(`Chyba při ukládání: ${errorText}`);
                alert(`Chyba při ukládání: ${errorText}`);
                return;
            }

            const data = await response.json();
            alert(data.message);  // Zobrazí hlášku o úspěšném uložení
        } catch (error) {
            console.error("Chyba při ukládání: ", error);
            alert("Chyba při ukládání dat.");
        }
    }

    // Testovací funkce pro kliknutí na tlačítko
    function showAlert(message) {
        alert(message);
    }

    // Zápis: byl
    document.getElementById('btnByl').addEventListener('click', function() {
        showAlert('Tlačítko "Byl" bylo kliknuto');
        const today = new Date().toLocaleDateString();
        saveToServer(today, 'Byl');
    });

    // Zápis: nebyl
    document.getElementById('btnNebyl').addEventListener('click', function() {
        showAlert('Tlačítko "Nebyl" bylo kliknuto');
        const today = new Date().toLocaleDateString();
        saveToServer(today, 'Nebyl');
    });

    // Zápis: byl od-do
    document.getElementById('btnBylOdDo').addEventListener('click', function() {
        showAlert('Tlačítko "Byl od-do" bylo kliknuto');
        const from = document.getElementById('fromTime').value;
        const to = document.getElementById('toTime').value;
        const today = new Date().toLocaleDateString();
        saveToServer(today, `Byl od ${from} do ${to}`);
    });

    // Zobrazení kalendáře
    document.getElementById('toggleCalendar').addEventListener('click', async function() {
        try {
            const response = await fetch('/api/pracovniDny');
            
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                const errorText = await response.text();
                console.error(`Chyba při načítání dat: ${errorText}`);
                alert(`Chyba při načítání dat: ${errorText}`);
                return;
            }
            
            const data = await response.json();
            const calendar = document.getElementById('calendar');
            calendar.innerHTML = '';  // Vyprázdnění kalendáře
            
            // Přidání záznamů do kalendáře
            data.data.forEach(record => {
                const entry = document.createElement('p');
                entry.innerHTML = `${record.date}: ${record.status}`;
                calendar.appendChild(entry);
            });
            calendar.style.display = calendar.style.display === 'none' ? 'block' : 'none';
        } catch (error) {
            console.error("Chyba při načítání dat:", error);
            alert("Chyba při načítání dat.");
        }
    });

    // Zobrazení úprav
    document.getElementById('editBtn').addEventListener('click', async function() {
        try {
            const response = await fetch('/api/pracovniDny');
            
            if (!response.ok) {
                console.error(`HTTP error! Status: ${response.status}`);
                const errorText = await response.text();
                console.error(`Chyba při načítání dat: ${errorText}`);
                alert(`Chyba při načítání dat: ${errorText}`);
                return;
            }
            
            const data = await response.json();
            const editSection = document.getElementById('editSection');
            editSection.innerHTML = '';  // Vyprázdnění sekce
            
            data.data.forEach(record => {
                const entry = document.createElement('p');
                entry.innerHTML = `${record.date}: ${record.status}`;
                
                const btnByl = document.createElement('button');
                btnByl.textContent = 'Byl';
                btnByl.addEventListener('click', function() {
                    saveToServer(record.date, 'Byl');
                    alert(`Záznam pro ${record.date} byl změněn na "Byl".`);
                });

                const btnBylOdDo = document.createElement('button');
                btnBylOdDo.textContent = 'Byl od-do';
                btnBylOdDo.addEventListener('click', function() {
                    const from = prompt('Zadej čas od (ve formátu HH:MM):', '08:00');
                    const to = prompt('Zadej čas do (ve formátu HH:MM):', '16:00');
                    saveToServer(record.date, `Byl od ${formatTo24Hour(from)} do ${formatTo24Hour(to)}`);
                    alert(`Záznam pro ${record.date} byl změněn.`);
                });

                const btnNebyl = document.createElement('button');
                btnNebyl.textContent = 'Nebyl';
                btnNebyl.addEventListener('click', function() {
                    saveToServer(record.date, 'Nebyl');
                    alert(`Záznam pro ${record.date} byl změněn na "Nebyl".`);
                });

                entry.appendChild(btnByl);
                entry.appendChild(btnBylOdDo);
                entry.appendChild(btnNebyl);
                editSection.appendChild(entry);
            });
            editSection.style.display = 'block';
        } catch (error) {
            console.error("Chyba při načítání dat:", error);
            alert("Chyba při načítání dat.");
        }
    });

    // Funkce pro formátování času na 24hodinový formát
    function formatTo24Hour(timeStr) {
        const [hours, minutes] = timeStr.split(':');
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    }
});
