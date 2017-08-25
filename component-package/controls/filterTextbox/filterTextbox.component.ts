import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-filter-textbox',
    moduleId: module.id,
    templateUrl: './filterTextbox.component.html'
})
export class FilterTextboxComponent {
    private value: string;
    @Output() inputChange = new EventEmitter<string>();
    @Input() get filterValue() {
        return this.value;
    }
    set filterValue(newValue: string) {
        this.value = newValue;
        this.inputChange.emit(newValue);

    }
    clear() {
        this.value = '';
        this.inputChange.emit('');
    }
}
