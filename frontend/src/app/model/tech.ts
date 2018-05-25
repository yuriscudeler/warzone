export interface Tech {
    id: number;
    name: string;
    parents: Array<Tech>;
    children: Array<Tech>;
}