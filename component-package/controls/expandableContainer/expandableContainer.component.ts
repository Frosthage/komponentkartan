import { Component, OnInit, QueryList, ViewChildren, AfterViewInit, HostListener } from "@angular/core";
import { Observable } from "rxjs/Observable";


@Component({
    templateUrl: "component-package/controls/expandableContainer/expandableContainer.component.html",
    selector: "expandable-container",
    host: { 'class': 'expandable-container expandable-container--collapsed' }
})
export class ExpandableContainerComponent {

    @HostListener("click", ["$event"])
    toggleExpand(event: Event) {
        //Find the clicked element from the event
        let target = event.target || event.srcElement || event.currentTarget;
        let header = $(target);

        //If we click on an element INSIDE the header, get a reference to the actual header first
        if (!header.hasClass("expandable-container__header"))
            header = header.closest(".expandable-container__header");

        //Slide clicked panel up/down
        header.next(".expandable-container__content").slideToggle(400);

        //Add class to reflect new state, to enable shadows and margins
        header.closest(".expandable-container").toggleClass("expandable-container--collapsed expandable-container--expanded");

        //Slide all other panels up
        $(".expandable-container__content").not(header.next()).slideUp(400);

        //Add classes to other panels to reflect state
        $(".expandable-container__header").not(header).closest(".expandable-container").addClass("expandable-container--collapsed");
        $(".expandable-container__header").not(header).closest(".expandable-container").removeClass("expandable-container--expanded");
    }
}