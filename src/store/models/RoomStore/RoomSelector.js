import { types } from 'mobx-state-tree';

const RoomSelector = types
    .model("RoomSelector", {
        values: types.array(types.number),
        selectedValue: 0
    })
    .actions(self => ({
        afterCreate() {
            self.resetValues();
        },
        resetValues() {
            self.selectedValue = self.values[0];
        }
    }));
export default RoomSelector;