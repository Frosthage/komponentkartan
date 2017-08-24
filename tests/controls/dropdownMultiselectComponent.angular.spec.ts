﻿
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"

import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";


import { DropdownMultiselectComponent } from "../../component-package/controls/dropdown-multiselect/dropdown-multiselect.component";
import { FilterTextboxComponent } from "../../component-package/controls/filterTextbox/filterTextbox.component";
import { CheckboxComponent } from "../../component-package/controls/checkbox/checkbox.component";
import { TruncatePipe } from "../../component-package/pipes/truncatePipe";
import { FilterPipe } from "../../component-package/pipes/filterPipe";
import { DropdownItemToSelectedTextPipe } from "../../component-package/pipes/dropdownItemToSelectedTextPipe";
import { IDropdownItem } from "../../component-package/models/dropdownItem.model";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

describe("[DropdownMultiSelectComponent]", () => {
    let component: DropdownMultiselectComponent;
    let fixture: ComponentFixture<DropdownMultiselectComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [DropdownMultiselectComponent, FilterTextboxComponent, TruncatePipe, FilterPipe, DropdownItemToSelectedTextPipe, CheckboxComponent],
            imports: [CommonModule, FormsModule, PerfectScrollbarModule]
        });

        TestBed.overrideComponent(DropdownMultiselectComponent,
            {
                set: {
                    templateUrl: "dropdown-multiselect.component.html"
                }
            });

        TestBed.overrideComponent(FilterTextboxComponent,
            {
                set: {
                    templateUrl: "../filterTextbox/filterTextbox.component.html"
                }
            });

        TestBed.overrideComponent(CheckboxComponent,
            {
                set: {
                    templateUrl: "../checkbox/checkbox.component.html"
                }
            });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(DropdownMultiselectComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            component.selectAllItemText = "Select all";
            component.items = [{ displayName: "Option 1" } as IDropdownItem,
            { displayName: "Option 2" } as IDropdownItem,
            { displayName: "Option 3" } as IDropdownItem] as IDropdownItem[];
            component.ngOnChanges();

            done();
        });
    });
    describe("When component is initialized", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));

        });
        it("dropdown is not expanded", () => {
            expect(dropdownElement.classes["dropdown--open"]).toBe(false);
        });
        it("text in dropdown is 'Välj'", () => {
            expect(component.dropdownText).toBe("Välj");
        });
        it("select all is not selected", () => {
            expect(component.selectAllItem.selected).toBe(false);
        });
        it("there are 3 items in the list", () => {
            expect(component.items.length).toBe(3);
        });
        it("no item is selected", () => {
            expect(component.items.filter(x => x.selected).length).toBe(0);
        });
    });

    describe("when dropdown is clicked", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));
            dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
            fixture.detectChanges();
        });
        it("dropdown is expanded", () => {
            expect(dropdownElement.classes["dropdown--open"]).toBe(true);
        });

        describe("and dropdown is clicked again", () => {
            it("dropdown is collapsed", () => {
                dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
                fixture.detectChanges();
                expect(dropdownElement.classes["dropdown--open"]).toBe(false);
            });
        });
    });

    describe("when one item is selected", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));
            component.expanded = true;
            component.selectItem(component.items[0]);
            fixture.detectChanges();
        });

        it("dropdown text is '1 vald'", () => {
            expect(component.dropdownText).toBe("1 vald");
        });
    });

    describe("when select all is clicked", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));
            component.expanded = true;
            component.selectAllItems();
            fixture.detectChanges();
        });

        it("select all item is checked", () => {
            expect(component.selectAllItem.selected).toBeTruthy();
        });
        it("all items are checked", () => {
            expect(component.items.filter(x => !x.selected).length).toBe(0);
        });
        it("dropdown text is 'Alla'", () => {
            expect(component.dropdownText).toBe("Alla");
        });

        describe("and one item is deselected", () => {
            beforeEach(() => {
                component.deselectItem(component.items[0]);
                fixture.detectChanges();
            });
            it("deselected item is not checked", () => {
                expect(component.items[0].selected).toBe(false);
            });
            it("select all item is not checked", () => {
                expect(component.selectAllItem.selected).toBe(false);
            });
            it("dropdown text is '2 valda'", () => {
                expect(component.dropdownText).toBe("2 valda");
            });
        });


    });

    describe("when one item is not selected", () => {
        beforeEach(() => {
            component.items.forEach(x => x.selected = true);
            component.items[0].selected = false;
        });
        describe("and the item is reselected", () => {
            beforeEach(() => {
                component.selectItem(component.items[0]);
            });
            it("reselected item is checked", () => {
                expect(component.items[0].selected).toBe(true);
            });
            it("select all item is checked", () => {
                expect(component.selectAllItem.selected).toBe(true);
            });
            it("dropdown text is 'Alla'", () => {
                expect(component.dropdownText).toBe("Alla");
            });
        });

        describe("and select all is clicked", () => {
            beforeEach(() => {
                component.selectAllItems();
            });
            it("all items are checked", () => {
                expect(component.items.filter(x => !x.selected).length).toBe(0);
            });
            it("select all item is checked", () => {
                expect(component.selectAllItem.selected).toBe(true);
            });
            it("dropdown text is 'Alla'", () => {
                expect(component.dropdownText).toBe("Alla");
            });
        });
    });

    describe("when dropdown is open", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));
            component.expanded = true;
            fixture.detectChanges();
        });
        describe("and select all is checked", () => {
            beforeEach(() => {
                component.selectAllItem.selected = true;
            });
            describe("and select all is clicked", () => {
                beforeEach(() => {
                    let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
                    let selectAllCheckbox = selectAllItem.query(By.css('.checkbox--inline')).query(By.css('.checkbox'));
                    let selectAllLink = selectAllItem.query(By.css('a'));
                    selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement } as MouseEvent);
                    dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
                    fixture.detectChanges();
                });
                it("dropdown is not collapsed", () => {
                    expect(dropdownElement.classes["dropdown--open"]).toBe(true);
                });
            });
        });
        describe("and select all is not checked", () => {
            beforeEach(() => {
                component.selectAllItem.selected = false;
            });
            describe("and select all is clicked", () => {
                beforeEach(() => {
                    let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
                    let selectAllCheckbox = selectAllItem.query(By.css('.checkbox--inline')).query(By.css('.checkbox'));
                    let selectAllLink = selectAllItem.query(By.css('a'));
                    selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement } as MouseEvent);
                    dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
                    fixture.detectChanges();
                });
                it("dropdown is collapsed", () => {
                    expect(dropdownElement.classes["dropdown--open"]).toBe(false);
                });
            });
        });
    });

    describe("when there are more than 20 items in the dropdown", () => {
        beforeEach(() => {
            let dropdownItems = [] as IDropdownItem[];
            for (let i = 0; i <= 20; i++) {
                dropdownItems.push({ displayName: `Name${i}` } as IDropdownItem);
            }
            component.items = dropdownItems;
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("the filter textbox is visible", () => {
            let dropdownElement = rootElement.query(By.css(".dropdown"));
            expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(true);
        });

        describe("when the list has been filtered", () => {
            beforeEach(() => {
                component.filterTextboxComponent.filterValue = "2";
                fixture.detectChanges();
            });
            it("the select all item text is 'Visa alla'", () => {
                let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
                let selectAllLink = selectAllItem.query(By.css("a"));
                expect(selectAllLink.nativeElement.title).toBe("Visa alla");
            });
            it("the select all item has no checkbox", () => {
                let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
                let selectAllCheckbox = selectAllItem.query(By.css("vgr-checkbox"));
                expect(selectAllCheckbox).toBeNull();
            });
        });

        describe("when all items are selected and the list is filtered", () => {
            beforeEach(() => {
                component.selectAllItems();
                component.filterTextboxComponent.filterValue = "2";
                fixture.detectChanges();
            });
            describe("and filter is cleared", () => {
                beforeEach(() => {
                    component.clearFilter();
                });
                it("the select all item remains checked", () => {
                    expect(component.selectAllItem.selected).toBe(true);
                });

                it("and select all item checkbox is visible", () => {
                    let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
                    let selectAllCheckbox = selectAllItem.query(By.css("vgr-checkbox"));
                    expect(selectAllCheckbox).toBeDefined();
                });
            });
            describe("and an item is deselected and the filter is cleared", () => {
                beforeEach(() => {
                    component.deselectItem(component.items.filter(x => x.displayName === "Name2")[0]);
                    component.clearFilter();
                });
                it("the select all item is not checked", () => {
                    expect(component.selectAllItem.selected).toBe(false);
                });
            });
        });
    });

    describe("when there are less than 20 items", () => {
        beforeEach(() => {
            let dropdownItems = [] as IDropdownItem[];
            for (let i = 0; i <= 19; i++) {
                dropdownItems.push({ displayName: `Name${i}` } as IDropdownItem);
            }
            component.items = dropdownItems;
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("the filter textbox is not visible", () => {
            let dropdownElement = rootElement.query(By.css(".dropdown"));
            expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(false);
        });
    });
});

