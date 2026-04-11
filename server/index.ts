import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import cors from 'cors';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = [
    __dirname,
    path.resolve(__dirname, '..', '..', 'server'),
].find((candidate) => fs.existsSync(path.join(candidate, 'data'))) ?? __dirname;

const app = express();
const PORT = Number(process.env.PORT) || 5001;

app.use(express.json());

app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://liang-alan.github.io'
    ]
}));

// serve images from data/images at /api/images
app.use('/api/images', express.static(path.join(serverRoot, 'data', 'images')));

app.get('/api/profile', (req: express.Request, res: express.Response) => {
    const profilePath = path.join(serverRoot, 'data', 'profile.json');
    fs.readFile(profilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read profile data' });
        }
        res.json(JSON.parse(data));
    });
});

app.get('/api/blog/:slug', (req: express.Request, res: express.Response) => {
    const slug = req.params.slug;
    const blogPath = path.join(serverRoot, 'data', 'blogs', `${slug}.md`);
    fs.readFile(blogPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.type('text/markdown').send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
