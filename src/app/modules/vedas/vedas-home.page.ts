import { Component, OnDestroy, OnInit } from "@angular/core";
import { RxTranslation } from "@rxweb/translate";

@Component({
    selector: 'app-vedas-home',
    templateUrl: './vedas-home.page.html',
    styleUrls: ['./vedas-home.page.scss']
})
export class VedasHomePage implements OnInit, OnDestroy {

    languageCode = "";

    constructor(
        private rxTranslation: RxTranslation) {
        this.languageCode = this.rxTranslation.language;
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {

    }
}