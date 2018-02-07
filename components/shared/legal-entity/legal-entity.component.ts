
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
  selector: 'app-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.css']
})
export class LegalEntityComponent implements OnInit {

  @Input('lLegalData')
  lLegalEntityData: any = {};
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
  leType: string;  
  constructor(private dataService: DataService) {


  }

  ngOnInit() {
    this.treeSearch = "";
    this.leType = "le";
    var lObj;
    lObj = AppConstants.LE_TYPE;
    this.dataService.postData(lObj).then(lTreeData => {
      if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
        this.lLegalEntityData = lTreeData[0]['result'].children;
      }
    });
  }

  eraseMe(val) {

    this.lForecastFilter[val].label = "";
    this.lForecastFilter[val].key = "";

  }
  selectLe(pVal){
    this.lForecastFilter.legal_entity.key = pVal.data.nodeId;
    this.lForecastFilter.legal_entity.label = pVal.data.node;
    this.dynamic_modal_title = "";
  }
  onSelectionChange(val) {
    var lObj;
    if (val == "le") {
      lObj = AppConstants.LE_TYPE;
    } else if (val == "mle") {
      lObj = AppConstants.MLE_TYPE;
    } else if (val == "cle") {
      lObj = AppConstants.CLE_TYPE;
    }
    this.dataService.postData(lObj).then(lTreeData => {
      if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
        this.lLegalEntityData = lTreeData[0]['result'].children;
      }
    });
  }
  nodeSelect(event, target) {
    if (target == "LE") {
      this.lForecastFilter.legal_entity.key = event.node.id;
      this.lForecastFilter.legal_entity.label = event.node.desc;
    }
    this.dynamic_modal_title = '';
  }

  loadTreePopup(postData) {
    var lObj;
    this.treeSearch = "";
    this.results = [];
    this.lTempData = {};
    if (this.dynamic_modal_title != postData) {
      if (postData == "Legal Entity") {
        this.dynamic_modal_title = "Legal Entity";
        lObj = AppConstants.LEGAL_ENTITY;
        lObj[0].data[0].node = "root";
        this.dataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lLegalEntityData = lTreeData[0]['result'].children;
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
      var lObj = AppConstants.TREE_SERACH;
      lObj[0].data[0].desc = this.treeSearch;
      lObj[0].data[0].dimType = "LE";
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
  setModal(item) {
    this.lForecastFilter.legal_entity.key = item.id;
    this.lForecastFilter.legal_entity.label = item.desc;
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
  nodeExpand(event, target) {
    if (event.node) {
      // in a real application, make a call to a remote url to load
      // children of the current node and add the new nodes as children
      var lObj;
      if (target == "LE") {
        // lObj = AppConstants.LEGAL_ENTITY;
        // lObj[0].data[0].node = event.node.id
        // this.dataService.postData(lObj).then(nodes => {
        //   event.node.children = nodes[0]['result'].children;
        // });

      }
    }


  }
}

