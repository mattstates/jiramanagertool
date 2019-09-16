export const getYMaxThreshold = ({
    dataMax,
    yThreshold,
    yPadding = 1
}: {
    dataMax: number;
    yThreshold: number;
    yPadding?: number;
}): number => {
    return dataMax >= yThreshold ? dataMax + yPadding : yThreshold;
};
