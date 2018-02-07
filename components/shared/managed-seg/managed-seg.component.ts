import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TestData } from '../models/TestData';
import { ForecastFilter } from '../models/ForecastFilter';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { DataService } from '../../../common/services';
import { AppConstants } from '../../../common/constants';

@Component({
  selector: 'app-managed-seg',
  templateUrl: './managed-seg.component.html',
  styleUrls: ['./managed-seg.component.css']
})
export class ManagedSegComponent implements OnInit {


  @Input('lSegData')
  lSegmentData: any = {};
  @Input('lFilterData')
  lForecastFilter: ForecastFilter;
  @Input('lDisabledColor')
  disabledClr: string;
  @Input('lDynamicTitle')
  dynamic_modal_title: string;
  treeSearch: string;
  results: any = [];
  LgroupedData:any={};
  lTempData:any={};
  lLevelCount:number;
  lSelectedData:any={};
  constructor(private dataService: DataService) { }


  ngOnInit() {
    this.treeSearch = "";     
    this.lLevelCount=0;
    this.results = [];

  }
  eraseMe(val) {

    this.lForecastFilter[val].label = "";
    this.lForecastFilter[val].key = "";

  }
  
  selectSeg(pVal){
    
    this.lForecastFilter.managed_seg.key = pVal.data.nodeId;
    this.lForecastFilter.managed_seg.label=pVal.data.node;
    this.dynamic_modal_title = "";
  } 
  nodeSelect(event, target) {
    if (target == "MS") {
      this.lForecastFilter.managed_seg.key = event.node.id;
      this.lForecastFilter.managed_seg.label = event.node.desc;
    }

    // this.msgs.push({severity: 'info', summary: 'Node Selected',
    // detail: event.node.label});
    this.dynamic_modal_title = '';
  }
  nodeExpand(event, target) {
    if (event.node) {
      // in a real application, make a call to a remote url to load
      // children of the current node and add the new nodes as children
      var lObj;
      if (target == "MS") {
        lObj = AppConstants.MANAGED_SEGMENT;
        lObj[0].data[0].node = event.node.id;

        this.dataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });
      }


    }
  }

  doSearchTree() {
    this.results = [];
    this.lLevelCount=0; 
    if (this.treeSearch != null) {
      var lObj = AppConstants.TREE_SERACH;
      lObj[0].data[0].desc = this.treeSearch;
      lObj[0].data[0].dimType = "MS";
      this.dataService.postData(lObj).then(nodes => {
        this.lLevelCount=0;
        this.doRecursiveSearch(nodes[0]['result']);
        if(this.results!=null){            
          this.lTempData = {};
          this.lTempData['data'] = [];
          this.lTempData['data']=this.results;            
        }        
      });
    }


  }
  clear() {
    this.treeSearch = "";
    this.results = [];
    this.LgroupedData={};
  }
  setModal(item) {
    this.lForecastFilter.managed_geo.key = item.id;
    this.lForecastFilter.managed_geo.label = item.desc;
    this.dynamic_modal_title = "";
  }
  doRecursiveSearch(nodes) {
    for (let i = 0; i < nodes.children.length; i++) {     
      if (nodes.children[i].desc.toLowerCase().indexOf(this.treeSearch.toLowerCase()) == 0) {
        this.results.push({level:"Level"+this.lLevelCount,node:nodes.children[i].desc,nodeId:nodes.children[i].id});       
      }
      if (nodes.children[i].children != null) {
        this.doRecursiveSearch(nodes.children[i]);
        this.lLevelCount++;
      }
    } 
  }
  loadTreePopup(postData) {
    var lObj;
    this.treeSearch = "";
    this.results = [];
    this.lTempData = {};
    if (this.dynamic_modal_title != postData) {
      if (postData == "Managed Segment") {
        this.dynamic_modal_title = "Managed Segment";
        lObj = AppConstants.MANAGED_SEGMENT;
        lObj[0].data[0].node = "root";
        this.dataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lSegmentData = lTreeData[0]['result'].children;

          }
        });
      }
    } else {
      this.dynamic_modal_title = "";
    }




  }


}
