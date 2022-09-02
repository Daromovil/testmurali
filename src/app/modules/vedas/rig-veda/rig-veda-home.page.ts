import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { translate, RxTranslation } from '@rxweb/translate';
import { Mantra } from 'src/app/models/mantra.model';
import { Location } from '@angular/common';
import { LeftNavComponent } from 'src/app/components/left-nav/left-nav.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { Veda } from 'src/app/models/veda.model';
import { IVedaCounts, VedaCountsFactory } from '../veda-counts/veda-counts-factory.component';
import { VedaService } from 'src/app/services/veda.service';
import { DeviceDetectorService } from 'ngx-device-detector/lib/device-detector.service';

declare var handleLeftMenu;

@Component({
  selector: 'app-rig-veda-home',
  templateUrl: './rig-veda-home.page.html',
  styleUrls: ['./rig-veda-home.page.scss']

})
export class RigVedaHomePage implements OnInit, OnDestroy {

  langCode: string;
  vedaCode: string;
  vedaLabel: string;
  vedaCountSub$: Subscription;
  vedaCounts: Veda;
  vedaCountsService: IVedaCounts;

  @translate({ translationName: "veda_mantras" })
  tr: { [key: string]: any }

  constructor(private route: ActivatedRoute,
    private rxTranslation: RxTranslation,
    private location: Location,
    private vedaService: VedaService,
    private vedaCountsFactory: VedaCountsFactory) {

    this.langCode = this.rxTranslation.language;

    this.vedaCode = "rig-veda";
    this.vedaLabel = "rigVeda";
    this.vedaCountsService = this.vedaCountsFactory.getVedaCountsService(this.vedaCode);
  }

  ngOnInit() {

    this.getVedaCounts();
  }


  goto(mandal: number, sukta: number) {
    const url = "/" + this.langCode + "/vedas/" + this.vedaCode + "/" + mandal + "/" + sukta;
    //console.log('url: ' + url);
    this.location.replaceState(url);
    window.location.reload();
  }

  getMandalCount() {
    if (!this.vedaCounts) {
      return 0;
    }

    return this.vedaCounts.mandals?.length;
  }

  getSuktaCount(mandal: number) {
    if (!this.vedaCounts) {
      return 0;
    }

    return this.vedaCounts.mandals.filter(i => i.mandal.toString() === mandal.toString())[0].suktaCount;
  }

  getVedaCounts() {

    const key = 'vedCounts-' + this.vedaCode.trim().toLocaleLowerCase();

    if (sessionStorage.getItem(key)) {
      this.vedaCounts = JSON.parse(sessionStorage.getItem(key));
      console.log('from local storage: ');
      console.log(this.vedaCounts);
    }

    if (!this.vedaCounts) {
      this.vedaCountSub$ = this.vedaService.getVedaCounts(this.vedaCode)
        .subscribe((data: Veda) => {
          this.vedaCounts = data;
          //console.log(this.vedaCounts);
          sessionStorage.setItem(key, JSON.stringify(this.vedaCounts));
        });
    }
  }

  getSuktaCounter(i: number) {
    return new Array(i);
  }

  handleLeftMenuInternal() {
    handleLeftMenu();
  }


  ngOnDestroy() {
    if (this.vedaCountSub$) {
      this.vedaCountSub$.unsubscribe();
    }
  }
}


