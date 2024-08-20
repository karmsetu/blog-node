export type ApiData = {
    title: string;
    createdAt: string;
    description: string;
    markdown: string;
    _id: string;
};

export type ApiResponse = { body: ApiData[] };
