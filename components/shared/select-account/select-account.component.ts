import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ForecastFilter } from '../../shared/models';
import { DataService } from '../../../common/services';
import { AppConstants } from '../../../common/constants';

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  @Input('lAccountData')
  lAccountData: any = {};
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
    if (target == "AC") {
      this.lForecastFilter.account.key = event.node.id;
      this.lForecastFilter.account.label = event.node.desc;
    }
    this.dynamic_modal_title = '';
  }

  loadTreePopup(postData) {
    var lObj;
    this.treeSearch = "";
    this.results = [];
    this.lTempData = {};
    if (this.dynamic_modal_title != postData) {
      if (postData == "Accounts") {
        this.dynamic_modal_title = "Accounts";
        lObj = AppConstants.ACCOUNTS;
        lObj[0].data[0].node = "root";
        this.dataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lAccountData = lTreeData[0]['result'].children;
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
    this.lLevelCount=0;   
    if (this.treeSearch != null) {
      var lObj = AppConstants.TREE_SERACH;
      lObj[0].data[0].desc = this.treeSearch;
      lObj[0].data[0].dimType = "AC";
      this.dataService.postData(lObj).then(nodes => {
        this.lLevelCount = 0;
        this.doRecursiveSearch(nodes[0]['result']);
        if (this.results != null) {
          this.lTempData = {};
          this.lTempData['data'] = [];
          this.lTempData['data'] = this.results;
        }
      });
    }


  }
  clear() {
    this.treeSearch = "";
    this.results = [];
    this.LgroupedData = {};
  }
  selectAC(pval){
    this.lForecastFilter.account.key = pval.data.nodeId;
    this.lForecastFilter.account.label = pval.data.node;
    this.dynamic_modal_title = "";
  }
  setModal(item) {
    this.lForecastFilter.account.key = item.id;
    this.lForecastFilter.account.label = item.desc;
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
  ngAfterContentChecked() {

  }
  nodeExpand(event, target) {
    if (event.node) {
      // in a real application, make a call to a remote url to load
      // children of the current node and add the new nodes as children
      var lObj;
      if (target == "AC") {
        lObj = AppConstants.ACCOUNTS;
        lObj[0].data[0].node = event.node.id
        this.dataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });

      }
    }
  }

}