declare interface IRoomActions {
    handleClick(id: number): void;
    setChild(id: number, value: string): void;
    setAdult(id: number, value: string): void;
    fetchState(): void;
    pushState(): void;
    resetData(): void;
}
declare interface IRoomSelector {
    values: number[];
    selectedValue: number;
}
declare interface IRoom {
    id: number;
    disabled: boolean;
    adultSelector: IRoomSelector;
    childSelector: IRoomSelector;
}
declare interface IRoomStore {
    rooms: IRoom[];
    fetching: boolean;
    saving: boolean;
    error: string;
    actions: IRoomActions;
}