import { types, getSnapshot, flow } from 'mobx-state-tree';
import Room from './Room';
import aTypes from '../../actions/actionTypes';

const url = 'http://localhost:3002/data';
const RoomStore = types
    .model("RoomStore", {
        rooms: types.array(Room),
        fetching: false,
        saving: false,
        error: ''
    })
    .views(self => ({
        findById(id) {
            const filtered = self.rooms
                .filter(room => room.id === id);
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
        [aTypes.DEHYDRATE_STATE]: flow(function*() {
            self.saving = true;
            const state = getSnapshot(self.rooms);
            try {
                yield fetch(url, {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    body: JSON.stringify(state)
                })
            } catch (err) {
                self.error = err.message;
            } finally {
                self.saving = false;
            }
            // const enc = window.btoa(JSON.stringify(state));
            // window.location.search = `?d=${enc}`;
        }),
        [aTypes.HYDRATE_STATE]: flow(function*() {
            self.fetching = true;
            try {
            const data = yield fetch(url);
            const rooms = yield data.json();
            if (rooms.length) {
                rooms.forEach(({disabled, adultSelector, childSelector}, i) => {
                    const room = self.rooms[i];
                    room.setDisabled(disabled);
                    room.adultSelector.selectedValue = adultSelector.selectedValue;
                    room.childSelector.selectedValue = childSelector.selectedValue;
                });
            }
            } catch (err) {
                self.error = err.message;
            } finally {
                self.fetching = false;
            }
        }), 
        async [aTypes.START_FAKE_ASYNC]() {
            const p = new Promise(res => {(
                setTimeout(() => res(), 3000)
            )});
            self.fetching = true;
            await p;
            self.END_FAKE_ASYNC();
        },
        END_FAKE_ASYNC() {
            self.fetching = false;
        }
    }));
export default RoomStore;