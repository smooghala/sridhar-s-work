


import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ForecastFilter } from '../components/shared/models';
import { DataService, UrlUtilService, CacheService } from '../common/services';
import { AppConstants } from '../common/constants';
@Component({
  selector: 'app-model-assignment',
  templateUrl: './model-assignment.component.html',
  styleUrls: ['./model-assignment.component.css']
})
export class ModelAssignmentComponent implements OnInit {

  @Input('lFilterData')
  lForecastFilter: ForecastFilter;
  lPostDataWrapper: any = {};
  lModelData: any = {};
  totalRecords:number;
  constructor(private dataService: DataService, private urlUtilService: UrlUtilService, private cacheService: CacheService) {


  }

  ngOnInit() {
    this.lModelData = [];
    this.totalRecords=0;
    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "prepareDateForGetModelAssignmentData");
    this.lPostDataWrapper.data = [];
    var data = {};
    if (this.cacheService.has('asOf')) {
      data['asOfDate'] = this.cacheService.get('asOf')['value'];
    } else {
      data['asOfDate'] = AppConstants.AS_OF_DATE;
    }

    data['limit'] = 25;
    data['scnId'] = this.lForecastFilter.scenario.key;
    data['adjmts'] = this.lForecastFilter.modelop.key;
    data['adjmtsDesc'] = this.lForecastFilter.modelop.label;
    data['managedGeography'] = this.lForecastFilter.managed_geo.label;
    data['managedSegment'] = this.lForecastFilter.managed_geo.key;
    data['legalEntity'] = this.lForecastFilter.legal_entity.key;
    data['checkboxfield-1057-inputEl'] = "on";
    data['affiliate'] = this.lForecastFilter.affliate.key;

    if (this.lForecastFilter.display != null) {
      for (let i = 0; i < this.lForecastFilter.display.key.length; i++) {
        data['display'] = this.lForecastFilter.display.key[i].key;
        if (i != this.lForecastFilter.display.key.length - 1) {
          data['display'] += ",";
        }
      }
    }
    data['account'] = this.lForecastFilter.account.key;
    data['affiliate'] = "THIRD_PARTY";
    data['datasetName'] = "PRIMARY";
    data['product'] = "";
    data['period'] = this.lForecastFilter.eop;


    if (this.lForecastFilter.txn != null) {
      for (let i = 0; i < this.lForecastFilter.txn.length; i++) {
        data['transactionCurrency'] = this.lForecastFilter.txn[i]['id'];
        if (i != this.lForecastFilter.txn.length - 1) {
          data['transactionCurrency'] += ",";
        }
      }

    }
    data['displayCurrency'] = this.lForecastFilter.displayccy;
    data['forecastProductName'] = this.lForecastFilter.fp.key;
    data['simulationType'] = this.lForecastFilter.scenario.key;

    data['scale'] = this.lForecastFilter.scale.key;
    data['showTP'] = this.lForecastFilter.showTp;
    data['adjmtsDesc'] = this.lForecastFilter.modelop.label;
    data['scenario'] = this.lForecastFilter.scenario.label;
    data['managedGeographyDesc'] = this.lForecastFilter.managed_geo.label;
    data['managedSegmentDesc'] = this.lForecastFilter.managed_seg.label;
    data['legalEntityDesc'] = this.lForecastFilter.legal_entity.label;
    data['scaleDesc'] = this.lForecastFilter.scale.label;
    data['mngDesc'] = this.lForecastFilter.managed_geo.label;
    data['msegDesc'] = this.lForecastFilter.managed_seg.label;
    data['legDesc'] = this.lForecastFilter.legal_entity.label;


    data['acctDesc'] = this.lForecastFilter.account.label;
    data['account'] =this.lForecastFilter.selectedAccount;
    data['periodDesc'] = this.lForecastFilter.eop;
    data['simulationTypeDesc'] = this.lForecastFilter.simtype.label;




    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    data['soeId'] = this.cacheService.get('soeId')['value'];

    this.lPostDataWrapper.data.push(data);
    var data_goc = {};
    if (this.lForecastFilter.goc_id != null) {
      data_goc['goc'] = this.lForecastFilter.goc_id
      data_goc['account'] = this.lForecastFilter.account.key;
      data_goc['affiliate'] = this.lForecastFilter.affliate.key;
      data_goc['currencyCode'] = this.lForecastFilter.displayccy;
      data_goc['forecastProdId'] = this.lForecastFilter.fp.key;
    }


    var data_account = this.lForecastFilter.account.key;
    this.lPostDataWrapper.data.push(data_account);
    this.lPostDataWrapper.data.push(data_goc);
    this.dataService.postDataForEmerald(this.lPostDataWrapper).then(lModelData => {

      if (lModelData[0] != null && lModelData[0]['result'] != null && lModelData[0]['result'] == AppConstants.SUCCESS_MSG) {
        this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "getModelAssignmentData");
        this.lPostDataWrapper.data = [];
        var data = {};        
        data['limit'] = 25;
        data['page'] = 1;
        data['start'] = 0;
        data['accountId'] = this.lForecastFilter.selectedAccount;
        data['sort'] =[]; 
        data['sort'].push({direction:"ASC",property:"sequence"})               
        this.lPostDataWrapper.data.push(data);
      
        this.dataService.postDataForEmerald(this.lPostDataWrapper).then(lAssignData => {
          if (lAssignData[0] != null && lAssignData[0]['result'] != null) {
            this.lModelData = lAssignData[0]['result'].records;
            this.totalRecords = lAssignData[0]['result'].total;
          }
        });
      }

    });

  }

}















