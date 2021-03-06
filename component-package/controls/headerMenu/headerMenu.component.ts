import { Component, Input, ElementRef, HostListener } from '@angular/core'
import { IHeaderMenu, IHeaderMenuItem } from '../../models/headerMenu.model'

@Component({
    selector: 'vgr-header-menu',
    moduleId: module.id,
    templateUrl: './headerMenu.component.html'
})

export class HeaderMenuComponent {
    @Input() menu: IHeaderMenu;
    hidden: boolean;
    selectedItem: IHeaderMenuItem;

    constructor(private elementRef: ElementRef) {
        this.hidden = true;
    }

    toggleHeaderMenu(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);
        if (!element.is('.header-menu__submenu-header')) {
            this.hidden = !this.hidden;
        }

        if (!this.hidden) {
            event.cancelBubble = true;
        }
    }

    toggleSubMenu(item: IHeaderMenuItem) {
        item.expanded = !item.expanded;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {
        const target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.hidden = true;
        }
    }

    onMouseEnter(item: IHeaderMenuItem) {
        this.menu.menuItems.forEach(x => x.marked = false);

        item.marked = true;
    }

    onMouseLeave(item: IHeaderMenuItem) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    }


    selectItem(item: IHeaderMenuItem) {
        if (!item) {
            return;
        }

        this.menu.menuItems.forEach(x => x.selected = false);

        item.selected = true;
        item.marked = true;
        this.selectedItem = item;


    }
}


