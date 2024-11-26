export interface Item<T> {
    [key: string]: T;
}
export interface State<T> {
    data: Item<T>[];
}