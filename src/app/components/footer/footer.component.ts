import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent {

    year: number;
    constructor(private router: Router) {
        this.year = new Date().getFullYear();
    }

    public gotoTop() {

        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return false;
    }
}
