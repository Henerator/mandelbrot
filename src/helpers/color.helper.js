export class ColorHelper {
    static mapColor(iterationsCount, maxIterationsCount) {
        const maxBright = 255;
        return iterationsCount * maxBright / maxIterationsCount;
    }
}