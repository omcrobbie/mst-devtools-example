import { observable, decorate, action, computed } from "mobx";

class Room {
  id;
  _disabled = observable.box(false);
  _selectedChild = observable.box(0);
  _selectedAdult = observable.box(0);
  childValues = [0, 1, 2];
  adultValues = [1, 2];

  constructor(id, isDisabled = false) {
    this.id = id;
    this._disabled.set(isDisabled);
  }
  setDisabled(isDisabled) {
    this._disabled.set(isDisabled);
    if (isDisabled) {
      this.resetValues();
    }
  }
  resetValues() {
    this._selectedAdult.set(0);
    this._selectedChild.set(0);
  }
  get disabled() {
    return this._disabled.get();
  }
  get selectedChild() {
    return this.childValues[this._selectedChild.get()];
  }
  get selectedAdult() {
    return this.adultValues[this._selectedAdult.get()];
  }
  setSelectedAdult = val => {
    this._selectedAdult.set(this.adultValues.indexOf(parseInt(val)));
  };
  setSelectedChild = val => {
    this._selectedChild.set(this.childValues.indexOf(parseInt(val)));
  };
  logThis() {
    return {
      adults: this.selectedAdult,
      children: this.selectedChild
    };
  }
}

export default decorate(Room, {
  setDisabled: action,
  disabled: computed,
  selectedChild: computed,
  selectedAdult: computed,
  resetValues: action,
  setSelectedAdult: action,
  setSelectedChild: action
});
