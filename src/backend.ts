const data = {};

data.labels = [
    // { x: 0, y: 20, text: `Chiasso VG \n ${new Date() } \n test@ivorycode.com`, type: 'smallLabel' },
    { x: 130, y: 50, text: `Chiasso Viaggiatori`, type: 'bigLabel' },
    { x: 20, y: 100, text: `Bivio Rosales`, type: 'smallLabel' },
    { x: 65, y: 180, text: `Como`, type: 'smallLabel' },
];

data.tracks = [
    { start: { x: 110, y: 100 }, end: { x: 170, y: 100 }, name: '460' },
    { start: { x: 110, y: 120 }, end: { x: 170, y: 120 }, name: '461' },
    { start: { x: 110, y: 180 }, end: { x: 170, y: 180 }, name: '402' },
    { start: { x: 110, y: 200 }, end: { x: 170, y: 200 }, name: '401' },
    { start: { x: 170, y: 100 }, end: { x: 185, y: 160 } },
    { start: { x: 170, y: 120 }, end: { x: 175, y: 120 } },
    { start: { x: 180, y: 140 }, end: { x: 185, y: 140 } },
    { start: { x: 180, y: 160 }, end: { x: 185, y: 160 } },
    { start: { x: 170, y: 180 }, end: { x: 175, y: 180 } },
    { start: { x: 170, y: 200 }, end: { x: 185, y: 140 } },
    { start: { x: 185, y: 140 }, end: { x: 245, y: 140 }, name: '10' },
    { start: { x: 185, y: 160 }, end: { x: 245, y: 160 }, name: '1' },
    { start: { x: 185, y: 160 }, end: { x: 245, y: 160 } },
    { start: { x: 245, y: 140 }, end: { x: 255, y: 140 } },
    { start: { x: 245, y: 140 }, end: { x: 250, y: 160 } },
    { start: { x: 245, y: 160 }, end: { x: 255, y: 160 } },
    { start: { x: 250, y: 160 }, end: { x: 255, y: 140 } },
    { start: { x: 255, y: 140 }, end: { x: 315, y: 140 }, name: '209' },
    { start: { x: 255, y: 160 }, end: { x: 315, y: 160 }, name: '109' },
];

data.trains = [
    { name: '14452', color: 'orange', path: [460, 1, 209] },
    { name: '855', color: 'red', path: [401, 10, 109] },
]

console.log(JSON.stringify(data));


function Backend() {
    return {
        getData() {
            return fetch('data/data.json')
                .then(response => response.json());
        }
    }
}

export default Backend;