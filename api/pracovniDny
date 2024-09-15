export default async function handler(req, res) {
    if (req.method === 'POST') {
        // Zpracování POST požadavku - uloží pracovní den
        const { date, status } = req.body;
        
        // Příklad: Data uložíme do jednoduché paměti na serverless funkci
        const savedData = { date, status }; // Toto si můžeš vylepšit pro trvalé ukládání
        
        res.status(200).json({ message: "Záznam uložen", data: savedData });
    } else if (req.method === 'GET') {
        // Zpracování GET požadavku - vrátí pracovní dny
        const mockData = [
            { date: '01-01-2024', status: 'Byl' },
