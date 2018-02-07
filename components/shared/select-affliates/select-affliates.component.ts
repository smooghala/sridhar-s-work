


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
  selector: 'app-select-affliates',
  templateUrl: './select-affliates.component.html',
  styleUrls: ['./select-affliates.component.css']
})
export class SelectAffliatesComponent implements OnInit {

  @Input('lAffliateData')
  lAffliateData: any = {};
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
  lLevelCount: number;
  constructor(private dataService: DataService) {


  }

  ngOnInit() {
    this.treeSearch = "";
    this.lLevelCount = 0;

  }

  eraseMe(val) {

    this.lForecastFilter[val].label = "";
    this.lForecastFilter[val].key = "";

  }
  nodeSelect(event, target) {
    if (target == "AF") {
      this.lForecastFilter.affliate.key = event.node.id;
      if(this.lForecastFilter.affliate.key.split('|').length>=1){
        this.lForecastFilter.affliate.key=this.lForecastFilter.affliate.key.split("|")[0];
      }
      this.lForecastFilter.affliate.label = event.node.desc;
    }
    this.dynamic_modal_title = '';
  }
  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children && node.label == "Description") {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  loadTreePopup(postData) {
    var lObj;
    if (this.dynamic_modal_title != postData) {
      if (postData == "Affliate") {
        this.dynamic_modal_title = "Affliate";
        lObj = AppConstants.AFFLIATE_DROP_EM;
        this.dataService.postDataForEmerald(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lAffliateData = lTreeData[0]['result'].children;
            this.lAffliateData.forEach(node => {
              this.expandRecursive(node, true);
            });
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
    this.lLevelCount = 0;
    if (this.treeSearch != null) {
      this.doRecursiveSearch(this.lAffliateData[0]);
      if (this.results != null) {
        this.lTempData = {};
        this.lTempData['data'] = [];
        this.lTempData['data'] = this.results;
      }
    }

  }
  clear() {
    this.treeSearch = "";
    this.results = [];
    this.LgroupedData = {};
  }
  setModal(item) {
    this.lForecastFilter.affliate.key = item.id;
    this.lForecastFilter.affliate.label = item.desc;
    this.dynamic_modal_title = "";
  }
  doRecursiveSearch(nodes) {
    for (let i = 0; i < nodes.children.length; i++) {
      if (nodes.children[i].desc.toLowerCase().indexOf(this.treeSearch.toLowerCase()) == 0) {
        this.results.push({ level: "Level" + this.lLevelCount, node: nodes.children[i].desc, nodeId: nodes.children[i].id });
      }
      if (nodes.children[i].children != null) {
        this.doRecursiveSearch(nodes.children[i]);
        this.lLevelCount++;
      }
    }
  }


}
