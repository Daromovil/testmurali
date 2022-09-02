import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MantraService } from '../../../services/mantra.service';
import { Mantra, Metadata } from '../../../models/mantra.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-mantra-view',
  templateUrl: './mantra-view.page.html',
  styleUrls: ['./mantra-view.page.scss']
})
export class MantraViewPage implements OnInit, OnDestroy {
  mantraViewSub$: Subscription;
  loading = false;
  mantraCode: string;
  mantra: Mantra;

  constructor(
    private route: ActivatedRoute,
    private mantraService: MantraService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.mantraCode = routeParams["mantra-code"]?.trim().toLowerCase();
      console.log('mantra code: ' + this.mantraCode);
      if (this.mantraCode) {
        this.getMantra(this.mantraCode);
      }
    });
  }

  getMantra(mantraCode: string) {

    if (mantraCode) {
      this.mantraViewSub$ = this.mantraService.getMantra(mantraCode)
        .subscribe((data: Mantra) => {
          this.mantra = data;
          console.log(this.mantra);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.mantraViewSub$) {
      this.mantraViewSub$.unsubscribe();
    }
  }
}
