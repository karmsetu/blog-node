import { DataType } from '..';

export type ClientDataType = Omit<DataType, 'createdAt'>;

export function validateDataType(data: any): data is ClientDataType {
    const allowedKeys: (keyof ClientDataType)[] = [
        'id',
        'title',
        'description',
        'markdown',
    ];
    const dataKeys = Object.keys(data) as (keyof ClientDataType)[];

    // Check if every key in data is one of the allowed keys
    return dataKeys.every((key) => allowedKeys.includes(key));
}

export function removeExtraFields(data: any): ClientDataType {
    const allowedKeys: (keyof ClientDataType)[] = [
        'id',
        'title',
        'description',
    ];

    // Create a new object with only allowed keys
    const filteredData: Partial<ClientDataType> = {};
    allowedKeys.forEach((key) => {
        if (key in data) {
            filteredData[key] = data[key];
        }
    });

    return filteredData;
}
