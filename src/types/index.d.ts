declare interface IRoomActions {
    handleClick(id: number);
    setChild(id: number, value: string);
    setAdult(id: number, value: string);
    fetchState();
    pushState();
    resetData();
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