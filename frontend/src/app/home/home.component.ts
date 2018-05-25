import { Component, OnInit } from '@angular/core';
import { TechService } from '../services/tech/tech.service';
import { Tech } from 'src/app/model/tech';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    
    public searchText;
    private techs: Array<Tech>;
    public filteredTechs: Array<Tech>;
    public selectedTech: Tech;
    
    constructor(
        private techService: TechService
    ) { }
    
    ngOnInit() {
        this.techService.getTechTree().subscribe(res => {
            this.techs = res;
            this.filteredTechs = this.techs;
        });
    }

    onSearchTextChange() {
        this.filteredTechs = [...this.techs.filter(_tech => _tech.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)];
    }

    onTechClick(tech: Tech) {
        this.selectedTech = tech;
    }
    
}
