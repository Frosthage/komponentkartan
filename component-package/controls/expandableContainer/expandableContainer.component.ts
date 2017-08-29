import { Component, HostListener, HostBinding, Input } from '@angular/core';
import { NotificationType } from '../../models/notificationType.model';


@Component({
    templateUrl: './expandableContainer.component.html',
    selector: 'vgr-expandable-container',
    moduleId: module.id
})
export class ExpandableContainerComponent {
    public NotificationTypes = NotificationType;
    @Input() notificationType: NotificationType;
    @HostBinding('class.expandable-container')
    @HostBinding('class.expandable-container--collapsed') hasClass = true;
    @HostBinding('class.expandable-container--notification-exists') notificationExists = false;
    private _notificationMessage: string;
    @Input() set notificationMessage(value: string) {
        this._notificationMessage = value;
        this.notificationExists = value && value.length > 0;
    }
    get notificationMessage(): string {

        return this._notificationMessage;
    }


    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
        const header = this.getHeader(event);
        if (header) {
            this.toggleHeader(header);
        }
    }

    private getHeader(event: Event): JQuery {
        const target = event.target || event.srcElement || event.currentTarget;
        const clickedElement = $(target);

        if (clickedElement.hasClass('expandable-container__header')) {
            return clickedElement;
        }
        if (clickedElement.hasClass('expandable-container__notification')) {
            return clickedElement.siblings('.expandable-container__header');
        }
        if (clickedElement.parents('.expandable-container__header').length > 0) {
            return clickedElement.parents('.expandable-container__header');
        }
        if (clickedElement.parents('.expandable-container__notification').length > 0) {
            return clickedElement.parents('.expandable-container__notification').siblings('.expandable-container__header');
        }
        return null;
    }


    private toggleHeader(header: JQuery) {
        // Slide clicked panel up/down
        header.siblings('.expandable-container__content').slideToggle(400);

        // Add class to reflect new state, to enable shadows and margins
        header.closest('.expandable-container').toggleClass('expandable-container--collapsed expandable-container--expanded');

        // Slide all other panels up
        $('.expandable-container__content').not(header.siblings()).slideUp(400);

        // Add classes to other panels to reflect state
        $('.expandable-container__header').not(header).closest('.expandable-container').addClass('expandable-container--collapsed');
        $('.expandable-container__header').not(header).closest('.expandable-container').removeClass('expandable-container--expanded');
    }
}
