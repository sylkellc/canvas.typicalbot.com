import express from 'express';
import { Canvas } from 'canvas-constructor';

const router = express.Router();

const bw = (hex: string) => {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const value = (r * 299 + g * 587 + b * 114) / 1000;

    return value >= 128 ? '#000000' : '#ffffff';
}

router.get('/color', (req, res) => {
    if (!req.query.hex) {
        res.status(400);
        res.json({
            message: 'Please specify a hex code.'
        });
    }

    const hex = req.query.hex as string;

    const buffer = new Canvas(200, 100)
        .setColor(`#${hex}`)
        .addRect(0, 0, 200, 100)
        .setColor(bw(hex))
        .setTextFont('20px Impact')
        .setTextAlign('left')
        .addText(`#${hex}`.toUpperCase(), 5, 95)
        .toBuffer();

    res.status(200);
    res.json({
        message: 'Success',
        image: `data:image/gif;base64,${buffer.toString('base64')}`
    });
});

export default router;
