export interface Link {
    id: number;
    name: string;
    size: string;
    link: string;
    selected: boolean;
}

export interface Links {
    ed2k: Array<Link>;
    magnet: Array<Link>;
}