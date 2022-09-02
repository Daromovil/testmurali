import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mantra } from 'src/app/models/mantra.model';
import { MantraService } from 'src/app/services/mantra.service';
import { translate, RxTranslation } from '@rxweb/translate';

@Component({
    selector: 'app-mantra-quick-view',
    templateUrl: './mantra-quick-view.component.html',
    styleUrls: ['./mantra-quick-view.component.scss']
})
export class MantraQuickDisplayComponent implements OnInit, OnDestroy {
    @translate({ translationName: "veda_mantras" })
    tr: { [key: string]: any }

    /*
    @Input()
    set setMantraCode(mantraCode: string) {
        this.mantraCode = mantraCode;
        this.getMantra(this.mantraCode);
    }
    mantraCode: string;
    */

    @Input()
    set setMantra(mantra: Mantra) {
        this.mantra = mantra;
        //var mantraStr = this.mantra?.mantra.replace("।", "।<br>");
        //if (mantraStr) {
        //    this.mantra.mantra = mantraStr.toString();
        //}
    }

    //mantraSub$: Subscription;
    mantra: Mantra;

    constructor(private mantraService: MantraService) {
    }

    ngOnInit() {

    }

    /*
    getMantra(mantraCode: string) {

        if (mantraCode) {
            this.mantraSub$ = this.mantraService.getMantra(mantraCode)
                .subscribe((data: Mantra) => {
                    this.mantra = data;
                    console.log(this.mantra);
                });
        }
    }
    */

    ngOnDestroy(): void {
        /*
        if (this.mantraSub$) {
            this.mantraSub$.unsubscribe();
        }
        */
    }
}


