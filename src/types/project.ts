export interface project {
    id: number;
    title: string;
    location: string;
    status: string;
    image?: string;
    description?: string | null;
    created_at?: string;
}
