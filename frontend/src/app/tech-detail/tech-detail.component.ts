import { Component, Input } from '@angular/core';
import { Tech } from 'src/app/model/tech';

@Component({
    selector: 'app-tech-detail',
    templateUrl: './tech-detail.component.html',
    styleUrls: ['./tech-detail.component.css']
})
export class TechDetailComponent {

    @Input() public tech: Tech;

}
