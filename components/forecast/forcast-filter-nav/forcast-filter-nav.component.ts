import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';

import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ForecastFilter } from '../../shared/models';

@Component({
  selector: 'app-forcast-filter-nav',
  templateUrl: './forcast-filter-nav.component.html',
  styleUrls: ['./forcast-filter-nav.component.css']
})
export class ForcastFilterNavComponent implements OnInit {

  @Input('lFilterData')
  lFilterData: ForecastFilter;
  showLiMenus: boolean;
  showMorebtn: boolean;
  showLessbtn: boolean;
  ulOverflow: string;
  constructor() { }

  ngOnInit() {
    this.ulOverflow = "ulOverflow_ordinary";
    this.showLiMenus = false;
    this.showMorebtn = true;
    this.showLessbtn = false;
    console.log(this.lFilterData);
  }
  getData(obj) {
    console.log(obj);
  }
  ngAfterContentChanged() {
    console.log(this.lFilterData);
  }
  showless() {
    this.showLiMenus = false;
    this.showMorebtn = true;
    this.ulOverflow = "ulOverflow_ordinary";
    this.showLessbtn = false;
    window.scrollTo(0, 0);
  }
  showMore() {
    this.showLiMenus = true;
    this.showMorebtn = false;
    this.ulOverflow = "ulOverflow";
    this.showLessbtn = true;
    window.scrollTo(0, 0);
  }

}
