import { types } from 'mobx-state-tree';
import RoomSelector from './RoomSelector';

const Room = types
    .model("Room", {
        id: types.number,
        disabled: types.optional(types.boolean, true),
        adultSelector: types.maybe(RoomSelector),
        childSelector: types.maybe(RoomSelector)
    })
    .actions(self => ({
        setDisabled(isDisabled) {
            self.disabled = isDisabled;
            if (isDisabled) {
                self.resetValues();
            }
        },
        resetValues() {
            self.adultSelector.resetValues();
            self.childSelector.resetValues();
        },
        afterCreate() {
            self.adultSelector = RoomSelector.create({
                values: [1, 2]
            });
            self.childSelector = RoomSelector.create({
                values: [0, 1, 2]
            });
        }
    }));
export default Room;