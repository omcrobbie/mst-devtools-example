import { types } from "mobx-state-tree";
const aTypes = {
  HANDLE_CLICK: 'HANDLE_CLICK',
  SET_ADULT: 'SET_ADULT',
  SET_CHILD: 'SET_CHILD'
}
export const actions = {
  handleClick: (id) => ({type: aTypes.HANDLE_CLICK, id }),
  setChild: (id, value) => ({type: aTypes.SET_CHILD, id, value}),
  setAdult: (id, value) => ({ type: aTypes.SET_ADULT, id, value })

}
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

const RoomStore = types
  .model("RoomStore", {
    rooms: types.array(Room)
  })
  .views( self => ({
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
    [aTypes.HANDLE_CLICK]({id}) {
      const room = self.findById(id);
      room.setDisabled(!room.disabled);
      let start = !room.disabled ? 1 : room.id;
      const end = !room.disabled ? room.id : 4;
      while (start++ < end) {
        self.rooms[start - 1].setDisabled(room.disabled);
      }
    },
    [aTypes.SET_ADULT]({id, value}) {
      const room = self.findById(id);
      room.adultSelector.selectedValue = parseInt(value);
    },
    [aTypes.SET_CHILD]({id, value}) {
      const room = self.findById(id);
      room.childSelector.selectedValue = parseInt(value);
    }

}));
export default RoomStore;