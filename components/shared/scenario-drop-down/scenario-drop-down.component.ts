import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TestData } from '../models/TestData';
import { ForecastFilter } from '../models/ForecastFilter';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators/retry';
import { CacheService } from '../../../common/services';
@Component({
  selector: 'app-scenario-drop-down',
  templateUrl: './scenario-drop-down.component.html',
  styleUrls: ['./scenario-drop-down.component.css']
})
export class ScenarioDropDownComponent implements OnInit {

  @Input('lScenarioData')
  lScenarioData: any = {};
  @Input('lFilterData')
  lFilterData: ForecastFilter;
  lSearchResults: any[];
  
  constructor(private cacheService: CacheService) { }

  ngOnInit() {
    this.lSearchResults = [];
    this.lSearchResults = this.lScenarioData;            
  }
  onChange(val, targetElement) {
    if (val.query != "") {
      this.lFilterData[targetElement].label = val.query;
      
    } else {
      this.lFilterData[targetElement].label = "";
    }
  }
  ngAfterContentChecked() {


  }
  setSelected(event) {
    this.lFilterData['scenario'].label = event.desc;
    this.lFilterData['scenario'].key = event.id;
  }
  filterCountrySingle(event) {
    let query = event.query;
    this.lSearchResults = this.filterScenario(query, this.lScenarioData);
  }
  eraseMe(){
    this.lFilterData['scenario']="";
    this.lFilterData['scenario'].label="";
    this.lFilterData['scenario'].key="";
  }
  filterScenario(query, scenarios: any[]):any[] {
    let filtered : any[] = [];  
    for (let i = 0; i < scenarios.length; i++) {
      let scenario = scenarios[i];
      if (scenario.desc.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(scenario);
      }
    }
    return filtered;
  }


}
