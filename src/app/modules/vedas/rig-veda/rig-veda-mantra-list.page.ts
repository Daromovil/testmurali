import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { translate, RxTranslation } from '@rxweb/translate';
import { Mantra } from 'src/app/models/mantra.model';
import { Location } from '@angular/common';



@Component({
  selector: 'app-rig-veda-mantra-list',
  templateUrl: './rig-veda-mantra-list.page.html',
  styleUrls: ['./rig-veda-mantra-list.page.scss']

})
export class RigVedaMantraListPage implements OnInit, OnDestroy {

  vedaCode: string;
  vedaLabel: string;
  selectedMandal: number;
  selectedSukta: number;
  selectedMantraCode: number;
  selectedMantra: Mantra;

  @translate({ translationName: "veda_mantras" })
  tr: { [key: string]: any }

  constructor(private route: ActivatedRoute,
    private rxTranslation: RxTranslation,
    private location: Location) {

  }

  ngOnInit() {

    this.route.params.subscribe(routeParams => {
      this.vedaCode = "rig-veda";
      this.vedaLabel = "rigVeda";
      //this.vedaCode = routeParams["veda-code"]?.trim().toLowerCase();
      var mandal = Number(routeParams["mandal"]);
      var sukta = Number(routeParams["sukta"]);

      //console.log('from mantra list mandal: ' + this.selectedMandal);
      //console.log('from mantra list sukta: ' + this.selectedSukta);

      if (mandal <= 0 || !mandal) {
        this.goto(1, 1);
        return;
      }

      if (sukta <= 0 || !sukta) {
        this.goto(1, 1);
        return;
      }

      this.selectedMandal = mandal;
      this.selectedSukta = sukta;
      this.selectedMantraCode = 1;

      //console.log('rigveda selected mandal: ' + this.selectedMandal);
      //console.log('rigveda selected sukta: ' + this.selectedSukta);

      /*

      if (this.vedaCode && this.selectedMandal > 0 && this.selectedSukta > 0) {
        var savedFilters = localStorage.getItem(this.vedaCode + "-filters");
        if (savedFilters) {
          console.log('saved filter from local storage: ' + savedFilters);
          var savedFiltersJson = JSON.parse(savedFilters);
          this.selectedMandal = savedFiltersJson["mandal"];
          this.selectedSukta = savedFiltersJson["sukta"];
        }
      }
      */
    });
  }

  triggerMandalSelected(mandal: string) {
    this.selectedMandal = Number(mandal);
  }

  triggerSuktaSelected(sukta: string) {
    this.selectedSukta = Number(sukta);
    //console.log('selected sukta from page: ' + sukta);

    var filters = {
      mandal: this.selectedMandal,
      sukta: this.selectedSukta
    };
    //localStorage.setItem(this.vedaCode + "-filters", JSON.stringify(filters));
    //console.log('saved filters to local storage: ' + JSON.stringify(filters));
  }

  triggerMantraSelected(mantraCode: string) {
    this.selectedMantraCode = Number(mantraCode);
  }

  goto(mandal: number, sukta: number) {
    const langCode = localStorage.getItem("locale");
    var changedLangUrl = "/" + langCode + "/vedas/rig-veda/" + mandal + "/" + sukta;
    this.location.replaceState(changedLangUrl);
    window.location.reload();
  }

  ngOnDestroy() {

  }
}


