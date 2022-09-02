import { Injectable } from "@angular/core";
import { ListItem } from "src/app/models/shared.models";
import { Veda } from "src/app/models/veda.model";
//import { AtharvaVedaCounts } from "./atharva-veda-counts";
import { RigVedaCounts } from "./rig-veda-counts";
//import { SamaVedaCounts } from "./sama-veda-counts";
//import { YajurVedaCounts } from "./yajur-veda-counts";

export interface IVedaCounts {
    populateFilterOne(vedaCounts: Veda): [string, Array<ListItem>];
    populateFilterTwo(vedaCounts: Veda, parentFilter: number): [string, Array<ListItem>];
    populateFilterThree(vedaCounts: Veda, parentFilterFrom: number, parentFilterTo: number): [string, Array<ListItem>];
    getFilterTwoRangeForGivenValue(vedaCounts: Veda, topFilter: number, value: number): [string, boolean];
}

@Injectable({
    providedIn: 'root'
})
export class VedaCountsFactory {

    getVedaCountsService(vedaCode: string) {
        //console.log('veda code: ' + vedaCode);
        switch (vedaCode?.trim().toLowerCase()) {
            case "rig-veda":
                return new RigVedaCounts();
                break;
            case "yajur-veda":
                // return new YajurVedaCounts();
                return null;
                break;
            case "sama-veda":
                //return new SamaVedaCounts();
                return null;
                break;
            case "atharva-veda":
                //return new AtharvaVedaCounts();
                return null;
                break;
            default:
                return null;
        }
    }
}