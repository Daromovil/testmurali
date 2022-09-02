import { Component, OnInit } from '@angular/core';
import { translate, RxTranslation } from '@rxweb/translate';

declare var handleLeftMenu;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  @translate({ translationName: "veda_mantras" })
  tr: { [key: string]: any }
  languageCode = "";

  constructor(
    private rxTranslation: RxTranslation) {
    this.languageCode = this.rxTranslation.language;
  }

  ngOnInit(): void {
  }

  handleLeftMenuInternal() {
    handleLeftMenu();
  }

}
