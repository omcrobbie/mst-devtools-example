import { types, getSnapshot } from 'mobx-state-tree';
import Room from './Room';
import aTypes from '../../actions/actionTypes';

const RoomStore = types
    .model("RoomStore", {
        rooms: types.array(Room)
    })
    .views(self => ({
        findById(id) {
            const filtered = self.rooms.filter(room => room.id === id);
            return filtered[0];
        }
    }))
    .actions(self => ({
        afterCreate() {
            self.rooms = [
                Room.create({
                    id: 1,
                    disabled: false
                }),
                Room.create({
                    id: 2
                }),
                Room.create({
                    id: 3
                }),
                Room.create({
                    id: 4
                })
            ];
        },
        [aTypes.HANDLE_CLICK]({ id }) {
            const room = self.findById(id);
            room.setDisabled(!room.disabled);
            let start = !room.disabled ? 1 : room.id;
            const end = !room.disabled ? room.id : 4;
            while (start++ < end) {
                self.rooms[start - 1].setDisabled(room.disabled);
            }
        },
        [aTypes.SET_ADULT]({ id, value }) {
            const room = self.findById(id);
            room.adultSelector.selectedValue = parseInt(value);
        },
        [aTypes.SET_CHILD]({ id, value }) {
            const room = self.findById(id);
            room.childSelector.selectedValue = parseInt(value);
        },
        [aTypes.DEHYDRATE_STATE]() {
            const state = getSnapshot(self.rooms);
            const enc = window.btoa(JSON.stringify(state));
            window.location.search = `?d=${enc}`;
        },
        [aTypes.HYDRATE_STATE]() {
            const state = JSON.parse(window.atob(window.location.search.substr(3)));
            state.forEach(({disabled, adultSelector, childSelector}, i) => {
                const room = self.rooms[i];
                room.setDisabled(disabled);
                room.adultSelector.selectedValue = adultSelector.selectedValue;
                room.childSelector.selectedValue = childSelector.selectedValue;
            });
        }

    }));
export default RoomStore;