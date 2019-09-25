type PredictionData = {
    x: number;
    y: number;
    product: number;
    squareX: number;
    len: number;
};

// https://travishorn.com/d3-line-chart-with-forecast-90507cb27ef2
export const predictY = (data: Array<number[]>, newX: number): number => {
    const round = (n: number): number => Math.round(n * 100) / 100;
    const sum: PredictionData = data.reduce(
        (acc: PredictionData, pair: number[]): PredictionData => {
            const x = pair[0];
            const y = pair[1];
            if (y !== null) {
                acc.x += x;
                acc.y += y;
                acc.squareX += x * x;
                acc.product += x * y;
                acc.len += 1;
            }
            return acc;
        },
        { x: 0, y: 0, squareX: 0, product: 0, len: 0 }
    );

    const run = sum.len * sum.squareX - sum.x * sum.x;
    const rise = sum.len * sum.product - sum.x * sum.y;
    const gradient: number = run === 0 ? 0 : round(rise / run);
    const intercept = round(sum.y / sum.len - (gradient * sum.x) / sum.len);

    return round(gradient * newX + intercept);
};
