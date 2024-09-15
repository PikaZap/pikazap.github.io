import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'pracovniDny.json');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { date, status } = req.body;

        if (!date || !status) {
            return res.status(400).json({ message: 'Chybí datum nebo stav' });
        }

        try {
            let data = [];
            if (fs.existsSync(dataFilePath)) {
                data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
            }

            data.push({ date, status });

            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

            res.status(200).json({ message: 'Data uložena úspěšně' });
        } catch (error) {
            console.error("Chyba při ukládání dat:", error);
            res.status(500).json({ message: 'Interní chyba serveru' });
        }
    } else if (req.method === 'GET') {
        try {
            let data = [];
            if (fs.existsSync(dataFilePath)) {
                data = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
            }

            res.status(200).json({ data });
        } catch (error) {
            console.error("Chyba při načítání dat:", error);
            res.status(500).json({ message: 'Interní chyba serveru' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Metoda ${req.method} není povolena`);
    }
}
