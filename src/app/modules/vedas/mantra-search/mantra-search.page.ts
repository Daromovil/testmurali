import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { translate, RxTranslation } from '@rxweb/translate';
import { Mantra } from 'src/app/models/mantra.model';
import { Location } from '@angular/common';
import { SearchInVedasInput } from 'src/app/models/search.models';
import { Subscription } from 'rxjs/internal/Subscription';
import { PagedResult } from 'src/app/models/shared.models';

import { MantraService } from 'src/app/services/mantra.service';
import { resourceUsage } from 'process';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mantra-search',
  templateUrl: './mantra-search.page.html',
  styleUrls: ['./mantra-search.page.scss']

})
export class MantraSearchPage implements OnInit, OnDestroy {

  @translate({ translationName: "veda_mantras" })
  tr: { [key: string]: any }

  resultsSub$: Subscription;
  results: PagedResult<Mantra>;

  searchInput: SearchInVedasInput;
  errorMsg: string;
  searchResultsLabel: string;

  constructor(private route: ActivatedRoute,
    private rxTranslation: RxTranslation,
    private location: Location,
    private mantraService: MantraService) {

    this.errorMsg = '';

    this.searchInput = new SearchInVedasInput();
    this.searchInput.keyword = '';
    this.searchInput.filters = {
      devatha: true, rishi: true, chandas: true, swara: true, mantra: true, artha: true
    };
    this.searchInput.vedaCodes = { rigVeda: true, yajurVeda: true, athurvaVeda: true, samaVeda: true };
    this.searchInput.page = 1;
    this.searchInput.perPage = 50;

  }

  ngOnInit() {


  }

  updateKeyword(event) {
    this.searchInput['keyword'] = event.target.value.trim();

    this.errorMsg = '';
    if (this.searchInput.keyword.trim() == '') {
      this.errorMsg = "Please enter one or more keywords to continue...";
    }
  }

  updateRigVedaFilter(event) {
    this.searchInput['vedaCodes']['rigVeda'] = event.target.checked;
  }

  updateYajurVedaFilter(event) {
    this.searchInput['vedaCodes']['yajurVeda'] = event.target.checked;
  }

  updateAthuraVedaFilter(event) {
    this.searchInput['vedaCodes']['athurvaVeda'] = event.target.checked;
  }

  updateSamaVedaFilter(event) {
    this.searchInput['vedaCodes']['samaVeda'] = event.target.checked;
  }

  updateDevathaFilter(event) {
    this.searchInput['filters']['devatha'] = event.target.checked;
  }

  updateRishiFilter(event) {
    this.searchInput['filters']['rishi'] = event.target.checked;
  }

  updateChandasFilter(event) {
    this.searchInput['filters']['chandas'] = event.target.checked;
  }

  updateSwaraFilter(event) {
    this.searchInput['filters']['swara'] = event.target.checked;
  }

  updateMantraFilter(event) {
    this.searchInput['filters']['mantra'] = event.target.checked;
  }

  updateArthaFilter(event) {
    this.searchInput['filters']['artha'] = event.target.checked;
  }

  searchVedas(event) {

    this.errorMsg = '';
    if (this.searchInput.keyword.trim() == '') {

      this.errorMsg = "Please enter one or more keywords to continue...";
      return;
    }

    if (this.searchInput.vedaCodes.rigVeda == false &&
      this.searchInput.vedaCodes.yajurVeda == false &&
      this.searchInput.vedaCodes.athurvaVeda == false &&
      this.searchInput.vedaCodes.samaVeda == false) {

      this.errorMsg = "Please select at least one of the vedas to continue...";
      return;
    }

    if (this.searchInput.filters.devatha == false &&
      this.searchInput.filters.rishi == false &&
      this.searchInput.filters.chandas == false &&
      this.searchInput.filters.swara == false &&
      this.searchInput.filters.mantra == false &&
      this.searchInput.filters.artha == false) {

      this.errorMsg = "Please select at least one of the vedas to continue...";
      return;
    }

    this.searchInput.locale = localStorage.getItem("locale");
    this.searchInput.page = 1;
    this.searchInput.perPage = environment.ROWS_PER_PAGE;

    console.log(this.searchInput);

    this.resultsSub$ = this.mantraService.searchVedaMantras(this.searchInput)
      .subscribe((data: PagedResult<Mantra>) => {
        this.results = data;
        console.log(this.results);
      });

  }

  getMantraMetadata(mantra: Mantra) {
    if (!mantra) {
      return "";
    }

    if (mantra.vedaCode == "rig-veda") {
      return this.tr.headers.rigVeda + " " + mantra.metadata.mandal + "." + mantra.metadata.sukta;
    }

    return "";

  }

  ngOnDestroy() {
    if (this && this.resultsSub$) {
      this.resultsSub$.unsubscribe();
    }
  }
}


