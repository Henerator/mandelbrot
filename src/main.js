import { ComplexNumber } from './models/complex-number.model';
import { PerformanceHelper } from './helpers/perfomance.helper';
import { ColorHelper } from './helpers/color.helper';

(function() {
    const canvasElement = document.getElementById('canvas');
    const context = canvasElement.getContext('2d');
    const width = 500;
    const height = 500;

    const MAX_ITERATIONS_COUNT = 60;

    const rangeReal = {
        min: -2.0,
        max: 0.5,
    };

    const rangeImaginary = {
        min: -1.25,
        max: 1.25,
    };

    canvasElement.width = width;
    canvasElement.height = height;

    const time = PerformanceHelper.measureTime(draw);
    console.log(time);

    /// FUNCTIONS

    function draw() {
        const dx = (rangeReal.max - rangeReal.min) / width;
        const dy = (rangeImaginary.max - rangeImaginary.min) / height;

        const imageData = context.createImageData(width, height);
        const pixels = imageData.data;

        for (let y = 0; y < width; y++) {
            const ci = rangeImaginary.min + y * dy;
            for (let x = 0; x < height; x++) {

                const cr = rangeReal.min + x * dx;
                const c = new ComplexNumber(cr, ci);
                const iterationsCount = getIterationsCount(c);
                const bright = ColorHelper.mapColor(iterationsCount, MAX_ITERATIONS_COUNT);

                const pixelIndex = 4 * (y * width + x);
                pixels[pixelIndex + 0] = bright;
                pixels[pixelIndex + 1] = bright;
                pixels[pixelIndex + 2] = bright;
                pixels[pixelIndex + 3] = 255;
            }
        }

        context.putImageData(imageData, 0, 0);
    }

    function getIterationsCount(c) {
        let z = new ComplexNumber(0, 0);
        let i = 0;

        for (i = 0; i < MAX_ITERATIONS_COUNT; i++) {
            const nzr = (z.real * z.real) - (z.im * z.im) + c.real;
            const nzi = (2 * z.real * z.im) + c.im;

            if ((z.real * z.real) + (z.im * z.im) > 4) {
                return i;
            }
            z = new ComplexNumber(nzr, nzi);
        }

        return i;
    }
})()
