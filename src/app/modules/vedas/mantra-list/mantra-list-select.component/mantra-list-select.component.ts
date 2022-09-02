import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { RxTranslation, translate } from '@rxweb/translate';
import { Router, ActivatedRoute, UrlTree, UrlSegment, PRIMARY_OUTLET, UrlSegmentGroup } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { ListItem } from 'src/app/models/shared.models';
import { Veda } from 'src/app/models/veda.model';
import { VedaService } from 'src/app/services/veda.service';
import { Utilities } from 'src/app/shared/utils';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ThisReceiver } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { SELECTION_MODEL_FACTORY } from '@ng-select/ng-select';
import { IVedaCounts, VedaCountsFactory } from '../../veda-counts/veda-counts-factory.component';


declare var handleLeftMenu;

@Component({
    selector: 'app-mantra-list-select',
    templateUrl: './mantra-list-select.component.html',
    styleUrls: ['./mantra-list-select.component.scss']
})
export class MantraListSelectComponent implements OnInit, OnDestroy {
    @translate({ translationName: "veda_mantras" })
    tr: { [key: string]: any }

    @Input()
    set vedaCode(vedaCode: string) {
        this._vedaCode = vedaCode;
        this.vedaCountsService = this.vedaCountsFactory.getVedaCountsService(this._vedaCode);
    }
    _vedaCode: string;

    @Input()
    set mandalCode(mandal: string) {
        //this.selectMandal(Number(mandal));
        this._mandalSelected = Number(mandal);
    }
    _mandalSelected: number;
    @Output() mandalSelected = new EventEmitter();

    @Input()
    set suktaCode(sukta: string) {
        //this.selectSukta(Number(sukta));
        this._suktaSelected = Number(sukta);
        this.getVedaCounts(this._vedaCode);
    }
    _suktaSelected: number;
    @Output() suktaSelected = new EventEmitter();

    _adhyayaSelected: number;
    @Output() adhyayaSelected = new EventEmitter();

    vedaCountSub$: Subscription;
    vedaCounts: Veda;

    filter1: Array<ListItem> = [];
    filter2: Array<ListItem> = [];
    filter3: Array<ListItem> = [];

    filter1Val: number;
    filter2Val: string;
    filter3Val: number;

    vedaCountsService: IVedaCounts;

    filterOneLabel = "Rig-Veda Mandala";
    filterTwoLabel = "Sukta";
    filterThreeLabel = "Select...";
    filterThreeSelected = "";

    constructor(@Inject(DOCUMENT) private document: Document,
        private route: ActivatedRoute,
        private router: Router,
        private vedaService: VedaService,
        private vedaCountsFactory: VedaCountsFactory,
        private deviceService: DeviceDetectorService,
        private rxTranslation: RxTranslation,
        private location: Location) {

    }

    ngOnInit() {

    }

    getVedaCounts(vedaCode: string) {
        if (vedaCode !== "") {
            const key = 'vedCounts-' + vedaCode.trim().toLocaleLowerCase();

            if (sessionStorage.getItem(key)) {
                this.vedaCounts = JSON.parse(sessionStorage.getItem(key));
                //console.log('from local storage: ');
                //console.log(this.vedaCounts);
            }

            if (this.vedaCounts) {
                this.selectFromFilters();
            }
            else {
                this.vedaCountSub$ = this.vedaService.getVedaCounts(vedaCode)
                    .subscribe((data: Veda) => {
                        this.vedaCounts = data;
                        //console.log(this.vedaCounts);
                        sessionStorage.setItem(key, JSON.stringify(this.vedaCounts));
                        this.selectFromFilters();
                    });
            }
        }
    }

    selectFromFilters() {

        var results = this.vedaCountsService.populateFilterOne(this.vedaCounts);

        this.filterOneLabel = results[0];
        this.filter1 = results[1];

        if (this.filter1.length > 0) {
            /*
            var filter1SelVal = Number(sessionStorage.getItem('filter1'));
            if (filter1SelVal > 0) {
                filter1SelVal = Number(this.filter1[0].value);
            }
            */

            if (this._mandalSelected <= 0 || !this._mandalSelected) {
                this._mandalSelected = 1;
                //console.log('manal reset');
                this.goto(this._mandalSelected, 1);
            }

            this.filter1Val = this._mandalSelected;

            this.triggerFilterTwo(this.filter1Val);

            if (this.filter2.length > 0) {
                /*
                var filter2SelVal = sessionStorage.getItem('filter2');
                if (!filter2SelVal) {
                    filter2SelVal = this.filter2[0].value;
                }
                this.filter2Val = filter2SelVal;
                */

                if (this._suktaSelected <= 0) {
                    this.filter2Val = this.filter2[0].value;
                    this.goto(this._mandalSelected, 1);
                }
                else {
                    var isValid = false;
                    [this.filter2Val, isValid] = this.vedaCountsService.getFilterTwoRangeForGivenValue(this.vedaCounts, this.filter1Val, this._suktaSelected);
                    if (isValid == false) {
                        this.goto(this._mandalSelected, 1);
                    }
                }

                this.triggerFilterThree(this.filter2Val);

                /*
                var filter3SelVal = Number(sessionStorage.getItem('filter3'));
                if (filter3SelVal > 0) {
                    filter3SelVal = Number(this.filter3[0].value);
                }*/

                if (this._suktaSelected <= 0) {
                    this._suktaSelected = 1;
                    this.goto(this._mandalSelected, 1);
                }

                this.filter3Val = this._suktaSelected;
            }

            this.selectMandal(this.filter1Val);
        }
    }

    changeFilterOne(event) {
        this.selectMandal(Number(event.target.value));
        this.triggerFilterTwo(Number(event.target.value));
        sessionStorage.setItem('filter2', '');
        this.filter2Val = '';
        this.filter3 = [];
    }

    triggerFilterTwo(parentFilter: number) {
        sessionStorage.setItem('fitler1: ', parentFilter.toString());
        //console.log('filter1 :' + parentFilter);
        var results = this.vedaCountsService.populateFilterTwo(this.vedaCounts, parentFilter);
        this.filterTwoLabel = results[0];
        this.filter2 = results[1];
    }

    changeFilterTwo(event) {
        this.triggerFilterThree(event.target.value);
        sessionStorage.setItem('filter3', '');
        this.filter3Val = 0;
    }

    triggerFilterThree(parentFilter: string) {
        sessionStorage.setItem('filter2', parentFilter.toString());
        //console.log('filter2', parentFilter);

        if (parentFilter && parentFilter.trim() != '') {
            var split = parentFilter.split(" - ");
            var from = Number(split[0]);
            var to = Number(split[1]);

            //console.log('from: ' + from);
            //console.log('to: ' + to);

            var results = this.vedaCountsService.populateFilterThree(this.vedaCounts, from, to);
            this.filterThreeLabel = results[0];
            this.filter3 = results[1];
            sessionStorage.setItem('filter3', '');
        }

    }

    clickSukta(event) {

        this.filter3Val = event.target.value;
        this.goto(this.filter1Val, this.filter3Val);
    }

    selectMandal(mandal: number) {
        this._mandalSelected = mandal;

        sessionStorage.setItem('mandal', this._mandalSelected.toString());
        this.mandalSelected.emit(this._mandalSelected.toString());
    }

    selectSukta(sukta: number) {
        this._suktaSelected = sukta;
        //console.log('selectSukta sukta selected: ' + this._suktaSelected);
        sessionStorage.setItem('sukta', this._suktaSelected.toString());
        sessionStorage.setItem('fiter3', sukta.toString());
        this.suktaSelected.emit(this._suktaSelected.toString());

        if (this.deviceService.isMobile()) {
            handleLeftMenu();
        }
    }

    handleLeftMenuInternal() {
        handleLeftMenu();
    }

    selectAdhyaya(adhyaya: string) {
        this._adhyayaSelected = Number(adhyaya);
        sessionStorage.setItem('adhyaya', this._adhyayaSelected.toString());
        sessionStorage.setItem('fiter3', adhyaya);
        this.adhyayaSelected.emit(this._adhyayaSelected);
    }

    pad(text, count) {
        return Utilities.pad(text, 2);
    }

    goto(mandal: number, sukta: number) {
        const langCode = localStorage.getItem("locale");
        var changedLangUrl = "/" + langCode + "/vedas/rig-veda/" + mandal + "/" + sukta;
        this.location.replaceState(changedLangUrl);
        //window.location.reload();
        this.selectSukta(sukta);
    }

    ngOnDestroy(): void {
        if (this.vedaCountSub$) {
            this.vedaCountSub$.unsubscribe();
        }
    }
}


