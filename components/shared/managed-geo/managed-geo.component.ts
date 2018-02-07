import { Component, EventEmitter, OnInit, Injectable, Inject,Input,ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TestData } from '../models/TestData';
import { ForecastFilter } from '../models/ForecastFilter';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { DataService } from '../../../common/services';
import { AppConstants } from '../../../common/constants';

@Component({
  selector: 'app-managed-geo',
  templateUrl: './managed-geo.component.html',
  styleUrls: ['./managed-geo.component.css']
})
export class ManagedGeoComponent implements OnInit {

  @Input('lGeoData')
  lGeographyData: any = {};
  @Input('lFilterData')
  lForecastFilter: ForecastFilter;
  @Input('lDisabledColor')
  disabledClr: string;
  @Input('lDynamicTitle')
  dynamic_modal_title: string;
  treeSearch: string;
  results: any = [];
  LgroupedData: any = {};
  lTempData: any = {};
  lSelectedData:any={};
  lLevelCount: number;
  eventX:string;
  constructor(private dataService: DataService,@Inject(DOCUMENT) private document: any) {


  }

  ngOnInit() {
    this.treeSearch = "";
    this.lLevelCount = 0;
    this.eventX="";
    this.dynamic_modal_title="";
  }

  eraseMe(val) {

    this.lForecastFilter[val].label = "";
    this.lForecastFilter[val].key = "";

  }
 
  nodeSelect(event, target) {
    if (target == "GE") {
      this.lForecastFilter.managed_geo.key = event.node.id;
      this.lForecastFilter.managed_geo.label = event.node.desc;
    }
    this.dynamic_modal_title = '';
  }

  loadTreePopup(event,postData) {
    console.log(event);

    this.eventX=event.x+'px';
     
    var lObj;
    this.treeSearch = "";
    this.results = [];
    this.lTempData = {};
    if (this.dynamic_modal_title != postData) {
      if (postData == "Managed Geography") {
        this.dynamic_modal_title = "Managed Geography";
        lObj = AppConstants.MANAGED_GEOGRAPHY;
        lObj[0].data[0].node = "root";
        this.dataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lGeographyData = lTreeData[0]['result'].children;
          
          }
        });
        
      }
    } else {
      this.dynamic_modal_title = "";
    }   
  }
  doSearchTree() {
    console.log('searching...');
    this.results = [];
    this.lLevelCount = 1;
    if (this.treeSearch != null) {
      var lObj = AppConstants.TREE_SERACH;
      lObj[0].data[0].desc = this.treeSearch;
      lObj[0].data[0].dimType = "MG";
      this.dataService.postData(lObj).then(nodes => {
        this.lLevelCount = 1;
        this.doRecursiveSearch(nodes[0]['result']);
        if (this.results != null) {
          this.lTempData = {};
          this.lTempData['data'] = [];
          this.lTempData['data'] = this.results;
        }
      });
    }   
  }
  selectGeo(pVal){
    
    this.lForecastFilter.managed_geo.key = pVal.data.nodeId;
    this.lForecastFilter.managed_geo.label=pVal.data.node;
    this.dynamic_modal_title = "";
  } 
  clear() {
    this.treeSearch = "";
    this.results = [];
    this.LgroupedData = {};
  }
  setModal(item) {
    this.lForecastFilter.managed_geo.key = item.id;
    this.lForecastFilter.managed_geo.label = item.desc;
    this.dynamic_modal_title = "";
  }
  doRecursiveSearch(nodes) {
    for (let i = 0; i < nodes.children.length; i++) {
      if (nodes.children[i].desc.toLowerCase().indexOf(this.treeSearch.toLowerCase()) == 0) {
        this.results.push({ level: "Level" + this.lLevelCount++, node: nodes.children[i].desc, nodeId: nodes.children[i].id });
      }
      if (nodes.children[i].children != null) {
        this.doRecursiveSearch(nodes.children[i]);
        this.lLevelCount++;
      }
    }
  }
  ngAfterContentChecked() {
     
  }
  nodeExpand(event, target) {
    if (event.node) {
      // in a real application, make a call to a remote url to load
      // children of the current node and add the new nodes as children
      var lObj;
      if (target == "GE") {
        lObj = AppConstants.MANAGED_GEOGRAPHY;
        lObj[0].data[0].node = event.node.id
        this.dataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });

      }
    }


  }
}
