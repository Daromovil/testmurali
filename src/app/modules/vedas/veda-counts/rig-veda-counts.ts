import { trimTrailingNulls } from "@angular/compiler/src/render3/view/util";
import { translate } from "@rxweb/translate";
import { ListItem } from "src/app/models/shared.models";
import { Veda } from "src/app/models/veda.model";
import { Utilities } from "src/app/shared/utils";
import { IVedaCounts } from "./veda-counts-factory.component";

export class RigVedaCounts implements IVedaCounts {

    @translate({ translationName: "veda_mantras" })
    tr: { [key: string]: any }

    private rangeMax = 20;

    populateFilterOne(vedaCounts: Veda): [string, Array<ListItem>] {
        const filterOneLabel = this.tr.headers["rigVeda"] + " " + this.tr.labels?.mandal;
        const filterOne = Array<ListItem>();

        if (vedaCounts.mandals) {

            for (var i = 0; i < vedaCounts.mandals.length; i++) {
                var item = new ListItem();
                //TODO: translate
                item.text = this.tr.labels?.mandal + " " + vedaCounts.mandals[i].mandal;
                item.value = vedaCounts.mandals[i].mandal.toString();
                filterOne.push(item);
            }
        }

        return [filterOneLabel, filterOne];
    }

    populateFilterTwo(vedaCounts: Veda, parentFilter: number): [string, Array<ListItem>] {
        const filterTwoLabel = this.tr.labels?.sukta;
        const filterTwo = Array<ListItem>();

        if (vedaCounts.mandals) {

            // console.log('veda mandal count:' + vedaCounts.mandals);
            //console.log('parent filter: ' + parentFilter);

            var suktaCount = vedaCounts.mandals
                .filter(i => i.mandal.toString() === parentFilter.toString())[0].suktaCount;

            //console.log('filer 2 sukta count: ' + suktaCount);

            if (suktaCount > 0) {
                for (var i = 0; i < (suktaCount / this.rangeMax); i++) {
                    var from = i * this.rangeMax + 1;
                    var to = (i + 1) * this.rangeMax;
                    if (suktaCount < to) {
                        to = suktaCount;
                    }
                    if (from > suktaCount) {
                        break;
                    }
                    var item = new ListItem();
                    //TODO: translate
                    item.text = this.tr.labels?.sukta + " " + from + " - " + to;
                    item.value = from + " - " + to;
                    filterTwo.push(item);
                }
            }
        }

        return [filterTwoLabel, filterTwo];
    }

    populateFilterThree(vedaCounts: Veda, parentFilterFrom: number, parentFilterTo: number): [string, Array<ListItem>] {
        const filterThreeLabel = this.tr.labels?.select;
        const filterThree = Array<ListItem>();

        if (vedaCounts.mandals) {

            var from = parentFilterFrom;
            var to = parentFilterTo;

            if (from > 0 && to > 0) {
                for (var i = from; i <= to; i++) {
                    var item = new ListItem();
                    //TODO: translate
                    item.text = i.toString();
                    item.value = i.toString();
                    filterThree.push(item);
                }
            }
        }

        return [filterThreeLabel, filterThree];
    }

    getFilterTwoRangeForGivenValue(vedaCounts: Veda, topFilter: number, value: number): [string, boolean] {
        var filter2 = '';
        var valid = false;

        var suktaCount = vedaCounts.mandals
            .filter(i => i.mandal.toString() === topFilter.toString())[0].suktaCount;

        //console.log('filer 2 sukta count: ' + suktaCount);

        if (suktaCount > 0 && value > 0) {
            if (value > suktaCount) {
                filter2 = "1 - " + this.rangeMax.toString();
                return [filter2, valid];
            }

            for (var i = 0; i < (suktaCount / this.rangeMax); i++) {
                var from = i * this.rangeMax + 1;
                var to = (i + 1) * this.rangeMax;
                if (suktaCount < to) {
                    to = suktaCount;
                }
                if (from > suktaCount) {
                    break;
                }
                if (value >= from && value <= to) {
                    filter2 = from + " - " + to;
                    valid = true;
                    break;
                }
            }
        }

        return [filter2, valid];
    }
}