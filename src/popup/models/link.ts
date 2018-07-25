export interface Link {
    id: number;
    name: string;
    size: string;
    link: string;
    checked: boolean;
    showable: boolean;
}

export interface Links {
    ed2k: Array<Link>;
    magnet: Array<Link>;
}