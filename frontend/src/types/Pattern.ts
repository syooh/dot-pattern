export interface ColorInfo {
    id: number;
    hex: string;
    name: string;
}

export interface PatternData {
    width: number;
    height: number;

    palette: ColorInfo[];

    pixels: number[][];
}