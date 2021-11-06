import seedrandom from 'seedrandom';

export default (id: string) => {
    const seed = seedrandom(id);

    const treshHold = (256 * 3) / 2;

    const x = Math.floor(seed.quick() * 256);
    const y = Math.floor(seed.quick() * Math.min(treshHold - x, 256));
    const z = Math.floor(seed.quick() * Math.min(treshHold - x - y, 256));

    const [r, g, b] = [x, y, z]
        .map((val) => ({ val, seed: seed.quick() }))
        .sort((a, b) => a.seed - b.seed)
        .map(({ val }) => val);

    const bgColor = `rgb(${r}, ${g}, ${b})`;

    return bgColor;
};
