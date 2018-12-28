export class PerformanceHelper {
    static measureTime(action) {
        const timeStart = performance.now();
        action();
        const timeEnd = performance.now();
        return timeEnd - timeStart;
    }
}