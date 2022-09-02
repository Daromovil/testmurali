import { Component } from "@angular/core";
import { RxTranslation } from "@rxweb/translate";

declare var handleLeftMenu;

@Component({
    selector: 'app-left-nav',
    templateUrl: './left-nav.component.html'
})
export class LeftNavComponent {
    languageCode = "";

    constructor(
        private rxTranslation: RxTranslation) {
        this.languageCode = this.rxTranslation.language;
    }

    handleLeftMenuInternal() {
        handleLeftMenu();
    }


}