export function divideFormConfigIntoChunks<T>(array: T[], itemsPerChunk: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / itemsPerChunk) }, (_, i) =>
        array.slice(i * itemsPerChunk, i * itemsPerChunk + itemsPerChunk),
    );
}
