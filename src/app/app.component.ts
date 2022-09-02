import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { TranslateService } from '@rxweb/ngx-translate-extension';
import { translate, RxTranslation } from '@rxweb/translate';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @translate({ translationName: "veda_mantras" })
  tr: { [key: string]: any }
  activeLanguage: string;
  //@translate() global: any;
  //title = 'vedaswikiweb';
  langCss = "";
  constructor(
    private rxTranslation: RxTranslation,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    /*    
        activatedRoute.params.subscribe(t => {
            this.activeLanguage = t["languageCode"];
            this.rxTranslation.change(this.activeLanguage);
            localStorage.setItem("locale", this.activeLanguage);
            console.log('from router lang: ' + this.activeLanguage);
        });
        */

    /*
    if (localStorage.getItem('locale')) {
        this.activeLanguage = localStorage.getItem('locale');
        console.log('from local storage lang: ' + this.activeLanguage)
        this.rxTranslation.change(this.activeLanguage);
        //this.changeLocale(this.activeLanguage);
    }
    */

    const url = window.location.pathname;
    if (url != '/') {
      const parts = url.split("/");
      if (parts.length > 1) {
        if (this.isValidLanguage(parts[1])) {
          this.activeLanguage = parts[1].trim().toLowerCase();
        }
        else {
          this.activeLanguage = environment.DEFAULT_LANG_CODE;
        }
        //console.log('active lang from url: ' + this.activeLanguage);
      }
    }

    if (this.activeLanguage != this.rxTranslation.language) {
      this.rxTranslation.change(this.activeLanguage);
      localStorage.setItem("locale", this.activeLanguage);
    }

    this.langCss = "lang-" + this.rxTranslation.language;

  }

  isValidLanguage(languageCode): boolean {

    if (languageCode) {
      languageCode = languageCode.trim().toLowerCase();
      if (languageCode == "en" || languageCode == "san" || languageCode == "hi" || languageCode == "te") {
        return true;
      }
    }

    return false;

  }
}




