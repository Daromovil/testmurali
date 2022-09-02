
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { NgxPaginationModule } from 'ngx-pagination';
import { MantraListDisplayComponent } from './mantra-list/mantra-list-display.component/mantra-list-display.component';
import { MantraListSelectComponent } from './mantra-list/mantra-list-select.component/mantra-list-select.component';
import { MantraQuickDisplayComponent } from './mantra-list/mantra-quick-view.component/mantra-quick-view.component';
//import { MantraListPage } from './mantra-list/mantra-list-page/mantra-list.page';
//import { MantraEditPage } from './mantra-edit/mantra-edit.page.ts2';
import { VedasModuleRouting } from './vedas.routing';
import { MantraViewPage } from './mantra-view/mantra-view.page';
import { MaterialCommon } from 'src/app/shared/material.module';
import { LeadingComment } from '@angular/compiler';
import { RigVedaMantraListPage } from './rig-veda/rig-veda-mantra-list.page';
import { RigVedaHomePage } from './rig-veda/rig-veda-home.page';
import { BrowserModule } from '@angular/platform-browser';
import { MantraSearchPage } from './mantra-search/mantra-search.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgxPaginationModule,
    VedasModuleRouting,
    MaterialCommon,
  ],

  declarations: [
    //MantraListPage,
    //MantraEditPage,
    MantraListDisplayComponent,
    MantraListSelectComponent,
    MantraQuickDisplayComponent,
    MantraViewPage,
    RigVedaHomePage,
    RigVedaMantraListPage,
    MantraSearchPage],
  exports: [MantraQuickDisplayComponent]
})
export class VedasModule { }
