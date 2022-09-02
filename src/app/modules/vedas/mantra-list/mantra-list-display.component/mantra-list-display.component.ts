import { RouterModule } from '@angular/router';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mantra } from 'src/app/models/mantra.model';
import { PagedResult } from 'src/app/models/shared.models';
import { VedaSearchInput } from 'src/app/models/veda.model';
import { MantraService } from 'src/app/services/mantra.service';
import { translate, RxTranslation } from '@rxweb/translate';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

declare var handleLeftMenu;

@Component({
    selector: 'app-mantra-list-display',
    templateUrl: './mantra-list-display.component.html',
    styleUrls: ['./mantra-list-display.component.scss']
})
export class MantraListDisplayComponent implements OnInit, OnDestroy {
    @translate({ translationName: "veda_mantras" })
    tr: { [key: string]: any }

    @Input()
    set vedaCode(vedaCode: string) {
        this._vedaCode = vedaCode;
    }
    _vedaCode: string;

    @Input()
    set vedaLabel(vedaLabel: string) {
        this._vedaLabel = vedaLabel;
    }
    _vedaLabel: string;

    @Input()
    set mandal(mandal: string) {
        this._selectedMandal = parseInt(mandal);
    }
    _selectedMandal = 0;

    @Input()
    set sukta(sukta: string) {
        this._selectedSukta = parseInt(sukta);
        this.getMantras();
    }
    _selectedSukta = 0;

    _mantraSelected: string;
    @Output() mantraSelected = new EventEmitter();

    mantraListSub$: Subscription;
    results: PagedResult<Mantra>;
    mantra: Mantra;
    mantraNo = 0;
    mantraDisplayOrder = 0;
    showPrevious = false;
    labelPrevious = "";
    showNext = false;
    labelNext = "";
    listDisplay = false;

    constructor(@Inject(DOCUMENT) private document: Document,
        private mantraService: MantraService) {
    }

    ngOnInit() {

    }


    getMantras() {
        const input = new VedaSearchInput();
        input.query.vedaCode = this._vedaCode;

        input.query.locale = localStorage.getItem("locale");
        input.query.metadata__mandal = Number(this._selectedMandal);
        input.query.metadata__sukta = Number(this._selectedSukta);
        input.page = 1;
        input.perPage = environment.ROWS_PER_PAGE;
        input.fields = ["code", "mantra", "vedaCode", "displayOrder", "metadata.mandal", "metadata.sukta",
            "metadata.rishi", "metadata.devatha", "metadata.chandas", "metadata.swar", "padaArtha"];
        input.orderBy = ["displayOrder"];

        //console.log(input);

        this.mantraListSub$ = this.mantraService.getVedaMantras(input)
            .subscribe((data: PagedResult<Mantra>) => {
                this.results = data;
                //console.log(this.results);
                if (this.results && this.results.results?.length > 0) {
                    this.mantra = this.results.results[0];
                    this.mantraNo = this.mantra.displayOrder;
                    this.showPrevious = false;
                    if (this.results.results?.length > this.mantra?.displayOrder) {
                        this.showNext = true;
                        //this.labelNext = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder + 1);
                        this.labelNext = (this.mantra?.displayOrder + 1).toString();
                    }
                }
            });
    }

    selectMantraRow(mantraSelcted: string) {

        this._mantraSelected = mantraSelcted.split('.').join('_');
        //console.log('mantra selected: ' + this._mantraSelected);
        this.mantraSelected.emit(this._mantraSelected);
    }

    selectMantra(event) {

        this._mantraSelected = event.target.value;
        //console.log('mantra selected: ' + this._mantraSelected);
        this.mantraSelected.emit(this._mantraSelected);
    }

    goToPrevious() {
        var filter = this.results?.results?.filter(x => x.displayOrder == this.mantra?.displayOrder - 1);
        if (filter.length > 0) {
            this.mantra = filter[0];
            this.mantraNo = this.mantra.displayOrder;
            if (this.mantra?.displayOrder > 1) {
                this.showPrevious = true;
                //this.labelPrevious = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder - 1);
                this.labelPrevious = (this.mantra?.displayOrder - 1).toString();
            }
            else {
                this.showPrevious = false;
                this.labelPrevious = "";
            }
            if (this.mantra?.displayOrder < this.results?.results?.length) {
                this.showNext = true;
                //this.labelNext = "Mantra " + (this.mantra?.displayOrder + 1);
                this.labelNext = (this.mantra?.displayOrder + 1).toString();
            }
            else {
                this.showNext = false;
                this.labelNext = "";
            }
        }
    }

    goToNext() {
        var filter = this.results?.results?.filter(x => x.displayOrder == this.mantra?.displayOrder + 1);

        if (filter.length > 0) {
            this.mantra = filter[0];
            this.mantraNo = this.mantra.displayOrder;
            if (this.mantra?.displayOrder < this.results?.results?.length) {
                this.showNext = true;
                //this.labelNext = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder + 1);
                this.labelNext = (this.mantra?.displayOrder + 1).toString();
            }
            else {
                this.showNext = false;
                this.labelNext = "";
            }
            if (this.mantra?.displayOrder > 1) {
                this.showPrevious = true;
                //this.labelPrevious = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder - 1);
                this.labelPrevious = (this.mantra?.displayOrder - 1).toString();
            }
            else {
                this.showPrevious = false;
                this.labelPrevious = "";
            }
        }
    }

    goToMantra(event) {
        var mantraNo = parseInt(event.target.value);

        if (mantraNo <= 0) { mantraNo = 1; }
        if (mantraNo > this.results?.results.length) {
            mantraNo = this.results?.results.length;
        }

        var filter = this.results?.results?.filter(x => x.displayOrder === mantraNo);
        if (filter.length > 0) {
            this.mantra = filter[0];
            this.mantraNo = this.mantra.displayOrder;
            if (this.mantra?.displayOrder < this.results?.results?.length) {
                this.showNext = true;
                //this.labelNext = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder + 1);
                this.labelNext = (this.mantra?.displayOrder + 1).toString();
            }
            else {
                this.showNext = false;
                this.labelNext = "";
            }
            if (this.mantra?.displayOrder > 1) {
                this.showPrevious = true;
                //this.labelPrevious = this.tr.labels?.mantra + " " + (this.mantra?.displayOrder - 1);
                this.labelPrevious = (this.mantra?.displayOrder - 1).toString();
            }
            else {
                this.showPrevious = false;
                this.labelPrevious = "";
            }
        }
        else if (this.results?.results.length > 0) {
            this.mantra = this.results?.results[0];
            this.mantraNo = this.mantra.displayOrder;
        }
    }

    bookmark(event) {

    }

    audio(event) {


    }

    toggleList(event) {
        this.listDisplay = !this.listDisplay;
    }

    handleLeftMenuInternal() {
        handleLeftMenu();
    }

    ngOnDestroy(): void {
        if (this && this.mantraListSub$) {
            this.mantraListSub$.unsubscribe();
        }
    }
}


