import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { MantraEditPage } from './mantra-edit/mantra-edit.page.ts2';
//import { MantraListPage } from './mantra-list/mantra-list-page/mantra-list.page';
import { MantraSearchPage } from './mantra-search/mantra-search.page';
import { MantraViewPage } from './mantra-view/mantra-view.page';
import { RigVedaHomePage } from './rig-veda/rig-veda-home.page';
import { RigVedaMantraListPage } from './rig-veda/rig-veda-mantra-list.page';
import { VedasHomePage } from './vedas-home.page';


const routes: Routes = [
  { path: '', component: VedasHomePage },
  { path: 'rig-veda', component: RigVedaHomePage },
  { path: 'rig-veda/:mandal/:sukta', component: RigVedaMantraListPage },
  { path: 'search', component: MantraSearchPage }
  //{ path: ':veda-code/mantras', component: MantraListPage },
  //{ path: ':veda-code/mantras/:mantra-code', component: MantraViewPage },
  //{ path: ':veda-code/mantras/edit/:mantra-code', component: MantraEditPage },
  //{ path: ':veda-code/mantras/new', component: MantraEditPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VedasModuleRouting { }
