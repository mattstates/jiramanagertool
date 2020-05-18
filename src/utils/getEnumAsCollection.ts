export default function getEnumValuesAsCollection<T>(enumeration: T): Array<T[keyof T]> {
    const collection = [];
    for (const value in enumeration) {
        if (!Number(value)) {
            collection.push(value);
        }
    }

    return collection.map(value => {
        try {
            return enumeration[value.replace(/\s/gi, '') as keyof typeof enumeration];
        } catch (error) {
            throw new Error(`${error.message}, Does your enum have values that match its keys?`);
        }
    });
}
