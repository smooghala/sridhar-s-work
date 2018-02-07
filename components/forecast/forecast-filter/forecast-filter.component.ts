
import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import * as _moment from 'moment';
import {
  NgModule,
  Pipe
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ForeCastFPPopup, TestData } from '../../shared/models';
import { TreeviewItem, TreeviewConfig } from '../../../common/ui/lib';
import { DataService, WebsocketService } from '../../../common/services';
declare var jquery: any;
declare var $: any;




@Component({
  selector: 'app-forecast-filter',
  templateUrl: './forecast-filter.component.html',
  styleUrls: ['./forecast-filter.component.css']
})
export class ForecastFilterComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible', 'Weather Changer'];

  hero = { name: 'Dr.', alterEgo: 'Dr. What', power: this.powers[0] };


  transform(value: string, fallback: string, forceHttps: boolean = false) {
    console.log("From pipe..." + value);
  }

  lTestData: TestData[];
  lTreeData: TreeNode[];
  public loading = false;
  lCopyData: TreeNode[];
  selectedFile: TreeNode;
  lTest: any = {};
  contextItems: any = {};
  totalCols: any = [];
  Arr = Array;
  num: number = 12;
  msgs: any = [];
  displayData: any = {};
  items: MenuItem[];
  messages = [];
  selectedFpData: ForeCastFPPopup;
  tempval = [];
  dropdownEnabled = true;
  dropDownTreeItems: TreeviewItem[];
  values: number[];
  lFpPopupData: any = {};
  tree: any = {};
  initialPostParam: any = {};
  foreCastFilter: any = {};
  affliatesData: any = {};
  currenctData: any = {};
  slimType: any = {};
  modelopAdj: any = {};
  scaleType: any = {};
  scenario: any = {};

  /*disable purpose*/

  disabledClr: string;
  disabledEop: string;
  disabledShowTP: string;
  disabledGoc: string;
  disableLov: string;

  /*Dropdown Tree With filter*/
  lGeographyData: any = {};
  lSegmentData: any = {};
  lLegalEntityData: any = {};
  lAccountData: any = {};

  pickerRender: number;
  lForecastFilter;
  customWidth: string;


  /*validation purpose*/
  myform: FormGroup;
  scenarioCtrl: FormControl;
  managedGeo: FormControl;
  managedSeg: FormControl;
  legelEntity: FormControl;
  GOC: FormControl;


  @Output() filterEvent = new EventEmitter();

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });


  constructor(private testDataService: DataService, socketService: WebsocketService) {
    this.pickerRender = 0;
    this.customWidth = "customeModelWidth";
  }


  ngOnInit() {
   
 
 


  } 

}
