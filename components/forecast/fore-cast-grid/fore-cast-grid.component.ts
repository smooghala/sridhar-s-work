import { Component, EventEmitter, OnInit, Injectable, Inject, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
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
import { BrowserModule, DOCUMENT } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DataService, WebsocketService, CacheService, UrlUtilService } from '../../../common/services';
import { TestData, ForeCastFPPopup, TpCatSpecialVectors, ForecastFilter, PostDataWrapper } from '../../shared/models';
import { TreeviewItem, TreeviewConfig } from '../../../common/ui/lib';
import { AppConstants } from '../../../common/constants';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-fore-cast-grid',
  templateUrl: './fore-cast-grid.component.html',
  styleUrls: ['./fore-cast-grid.component.css'],
  providers: [DataService, WebsocketService, CacheService, UrlUtilService]
})
export class ForeCastGridComponent implements OnInit {
  lTestData: TestData[];
  lTreeData: TreeNode[];
  public loadingFp = false;
  public loading = false;
  toggleActive: string;
  asOfDateDisp: string;
  toggleArrow: string;
  lModelOp: string;
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
  totalRecords: number;
  dropdownEnabled = true;
  showGrid = false;
  showViewAdj = false;
  dropDownTreeItems: TreeviewItem[];
  values: number[];
  lFpPopupData: any = {};
  lLoadPref: any = {};
  lSelectedPref: any = {};
  tree: any = {};
  initialPostParam: any = {};
  foreCastFilter: any = {};
  affliatesData: any = {};
  currenctData: any = {};
  lOosData: any = {};
  slimType: any = {};
  modelopAdj: any = {};
  scaleType: any = {};
  scenario: any = {};
  lPrefModal: string;
  lSavePref: any = {};
  dynamic_modal_title: string;
  /* disable purpose */

  disabledClr: string;
  disabledEop: string;
  disabledShowTP: string;
  disabledGoc: string;
  disableLov: string;
  disabledOOS: string;

  /* Search Result with Typeahead */
  lSearchResultsModelOp: any[];
  lSearchResultsDispCCY: any[];
  lSearchResultsScale: any[];
  lSearchResultsSimType: any[];
  lSearchResultsOOS: any[];


  /* Dropdown Tree With filter */
  lGeographyData: any = {};
  lSegmentData: any = {};
  lLegalEntityData: any = {};
  lAccountData: any = {};
  lSelectedFPDATA: TreeNode;
  pickerRender: number;
  lForecastFilter;
  lPostDataWrapper;
  customWidth: string;
  pushedTabs: any = {};

  /* validation purpose */
  myform: FormGroup;
  scenarioCtrl: FormControl;
  managedGeo: FormControl;
  managedSeg: FormControl;
  legelEntity: FormControl;
  GOC: FormControl;
  viewModelTreeData: TreeNode[];
  showModelDefinition = false;
  modelAssumptionView = false;
  tpModelDefinition = false;
  equationData: any = {};
  headerData: any = {};
  specialVectors: any = {};
  tpCatSpecialVectors: TpCatSpecialVectors[];

  @Output() filterEvent = new EventEmitter();

  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });


  constructor(private testDataService: DataService, private urlUtilService: UrlUtilService, private cacheService: CacheService, socketService: WebsocketService, @Inject(DOCUMENT) private document: any) {
    this.pickerRender = 0;
    this.customWidth = "customeModelWidth";
    this.cacheService.set('soeId', 'jk37383');
    this.cacheService.set('asOf', '30-Sep-2017');
    this.asOfDateDisp = "B/S Forecast - As of " + this.cacheService.get('asOf')['value'];
    this.cacheService.set('dataSetId', 1);
  }


  ngOnInit() {
    this.lFpPopupData = [];
    this.lLoadPref = [];
    this.lSelectedPref = [];
    this.pushedTabs = [];
    console.log('init');

    this.toggleActive = "";
    this.toggleArrow = "fa fa-chevron-circle-left iclass";
    this.lForecastFilter = new ForecastFilter();
    this.lForecastFilter.dsmtGocOosRadioBtn = "MG/MS/LE";
    this.lPostDataWrapper = new PostDataWrapper();
    this.lForecastFilter.restrictSideBar = false;
    this.lForecastFilter.mg_ms_le = true;
    this.lForecastFilter.common_radio = "ms";
    this.lForecastFilter.showTopNav = false;
    this.testDataService.getStaticData().then(lTestData => this.lTestData = lTestData);

    this.displayData = AppConstants.DISPLAY_TYPE;

    this.testDataService.getTreeData().then(lTreeData => {


      this.lTreeData = lTreeData;



    });

    this.testDataService.getDropDownTreeData().then(dropDownTreeItems => {
      this.dropDownTreeItems = dropDownTreeItems;
    });

    this.items = [{ label: "Manual Adjmts", icon: "fa-plus-square", command: (event) => this.createManual(this.lSelectedFPDATA) },

    { label: "Target Adjmts", icon: "fa-close", command: (event) => this.createTarget(this.lSelectedFPDATA) },
    { label: "View Forecast Portfolios", icon: "fa-close", command: (event) => this.createFP(this.lSelectedFPDATA) },
    { label: "View Model Adjmts", icon: "fa-close", command: (event) => this.createIncrementAdj(this.lSelectedFPDATA) },
    { label: "Download", icon: "fa-download", command: function (n) { } },
    { label: "Download Actual Positions", icon: "fa-download", command: (event) => this.createIncrementAdj(this.lSelectedFPDATA) },
    { label: "Impacted Gocs", icon: "fa-signal", command: (event) => this.impactedGoc(this.lSelectedFPDATA) },
    { label: "Model Assignments", icon: "fa-location-arrow", command: (event) => this.modelAssignment(this.lSelectedFPDATA) },
    ];


    this.modelopAdj = AppConstants.FORECAST_MODEL_OP_ADJ;
    this.lSearchResultsModelOp = this.modelopAdj;
    this.scaleType = AppConstants.FORECAST_SCALE_TYPE;




    this.initialPostParam = [];




    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllScenariosByUserAccess");
    this.lPostDataWrapper.data = [];
    var data = {};

    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['datasetName'] = "PRIMARY";
    data['soeid'] = "vn61907_NG";
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);




    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllCurrencies");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);



    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllCurrencies");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);


    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "lookup");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['type'] = "FILTER_SIM_TYPE";
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);

    this.initialPostParam.push(this.lPostDataWrapper);




    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "lookup");
    this.lPostDataWrapper.data = [];
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['type'] = "MENU";
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);




    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "lookup");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['type'] = "ADJ_MENU";
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);

    this.initialPostParam.push(this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllAffiliates"));



    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllCurrencies");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['page'] = 1;
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);



    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("commonController", "findAllCurrencies");
    this.lPostDataWrapper.data = [];
    var data = {};
    data['asOfDate'] = this.cacheService.get('asOf')['value'];
    data['limit'] = 25;
    data['page'] = 1;
    data['type'] = 'FILTER_SIM_TYPE';
    data['start'] = 0;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    this.lPostDataWrapper.data.push(data);
    this.initialPostParam.push(this.lPostDataWrapper);





    this.testDataService.postData(this.initialPostParam).then(responseData => {

      this.foreCastFilter = responseData;
      this.scenario = responseData[0];
      this.cacheService.set('scenarioData', this.scenario);
      this.affliatesData = responseData[6];
      this.currenctData = responseData[7];
      this.slimType = responseData[3];



      this.lForecastFilter.simtype.key = "D";

      this.lForecastFilter.modelop = {};
      this.lForecastFilter.modelop['label'] = "Adjusted";
      this.lForecastFilter.modelop['key'] = "4";

    });



    this.testDataService.postDataForEmerald(AppConstants.OOS_POST).then(responseData => {
      this.lOosData = responseData[0];
      this.lSearchResultsOOS = this.lOosData;
    });
    this.testDataService.postData(AppConstants.POPUP_INIT).then(responseData => {
      this.lGeographyData = responseData[0]['result'].children;
      this.lForecastFilter.managed_geo.key = responseData[0]['result'].children[0].id;
      this.lForecastFilter.managed_geo.label = responseData[0]['result'].children[0].desc;

      this.lSegmentData = responseData[1]['result'].children;
      this.lForecastFilter.managed_seg.key = responseData[1]['result'].children[0].id;
      this.lForecastFilter.managed_seg.label = responseData[1]['result'].children[0].desc;

      this.lLegalEntityData = responseData[2]['result'].children;
      this.lForecastFilter.legal_entity.key = responseData[2]['result'].children[0].id;
      this.lForecastFilter.legal_entity.label = responseData[2]['result'].children[0].desc;

      this.lAccountData = responseData[3]['result'].children;
      this.lForecastFilter.account.key = responseData[3]['result'].children[0].id;
      this.lForecastFilter.account.label = responseData[3]['result'].children[0].desc;
    });


    // this.testDataService.getMessages().subscribe(message => {
    //   this.messages.push(message);
    //   this.msgs = [];
    //   this.msgs.push({ severity: 'success', summary: 'Adjustments will be processed and notified once completed', detail: '' });
    // });

    /*
      * this.createFormControls(); this.createForm();
      */



  }


  /* start- validation purpose */



  /* end- validation purpose */

  calMe(val) {
    console.log(val);
  }


  createManual(val) {
    this.pushedTabs.push({ id: val.accountId, type: 'MAN', title: 'Manual Adjustement  - ' + val.accountId });
  }

  createTarget(val) {
    this.pushedTabs.push({ id: val.accountId, type: 'TAR', title: 'Target Adjustement  - ' + val.accountId });
  }
  createFP(val) {
    this.pushedTabs.push({ id: val.accountId, type: 'FP', title: 'Forecast PortFolio -' + val.accountId });
  }
  createIncrementAdj(val) {
    this.pushedTabs.push({ id: val.accountId, type: 'INC', title: 'View Model Definition - ' + val.accountId });
    window.scrollTo(0, 0);
    this.document.getElementById('sidebar').scrollTop = 0;

  }
  modelAssignment(val) {
    this.lForecastFilter.selectedAccount = val.accountId;
    this.pushedTabs.push({ id: val.accountId, type: 'MA', title: 'Model Assignments - ' + val.accountId });

  }
  impactedGoc(val) {
    this.pushedTabs.push({ id: val.accountId, type: 'IMGOC', title: 'Impacted Goc - ' + val.accountId });
  }

  ngAfterContentChecked() {
    this.filterEvent.emit(this.lForecastFilter);
    if (this.lForecastFilter != null) {

      if (this.lForecastFilter.modelop.key == "modalBeta" || this.lForecastFilter.modelop.key == "manualAdj") {
        this.disabledShowTP = "disabledColor";
      } else {
        this.disabledShowTP = "";
      }
      if (this.lForecastFilter.modelop.key == "startingPos") {
        this.disabledEop = "disabledColor";
      } else {
        this.disabledEop = "";
      }
      if (this.lForecastFilter.mg_ms_le == true) {
        this.disabledOOS = "disabledColor";
      } else {
        this.disabledOOS = "";
      }
      if (this.lForecastFilter.mg_ms_le == false) {
        this.disabledClr = "disabledColor";
        this.disabledGoc = "";
        this.disableLov = "unclickable";
      } else {
        this.disabledClr = "";
        this.disabledGoc = "disabledColor";
        this.disableLov = "";
      }


    }


  }
  commonRadio(val) {
    /*this.lForecastFilter.goc=false;
    this.lForecastFilter.mg_ms_le=false;
    this.lForecastFilter.oos_radio=false;
    this.lForecastFilter.oos_mle_radio=false;
    this.lForecastFilter[val]=true;*/
  }
  selectAndClose(data, type) {
    if (type == "fp") {
      this.lForecastFilter.fp.label = data.data.frcstProdName;
      this.lForecastFilter.fp.key = data.data.frcstProdId;
      $('#forecastModal').modal('hide');
    } else {
      this.lSelectedPref = data.data;
      var lParsedData = JSON.parse(this.lSelectedPref.preferences);
      var lParsedDesc = JSON.parse(this.lSelectedPref.preferencesDesc);
      this.lForecastFilter.scenario.key = lParsedData.scnId;
      this.lForecastFilter.scenario.label = lParsedDesc.scnId;

      this.lForecastFilter.modelop.key = lParsedData.adjmts;
      this.lForecastFilter.modelop.label = lParsedDesc.adjmts;


      this.lForecastFilter.managed_geo.key = lParsedData.managedSegment;
      this.lForecastFilter.managed_geo.label = lParsedDesc.managedGeography;

      this.lForecastFilter.managed_seg.key = lParsedData.managedGeography;
      this.lForecastFilter.managed_seg.label = lParsedDesc.managedSegment;

      this.lForecastFilter.legal_entity.key = lParsedData.legalEntity;
      this.lForecastFilter.legal_entity.label = lParsedDesc.legalEntity;

      this.lForecastFilter.affliate.key = lParsedData.affiliate;
      this.lForecastFilter.display.key = [];
      for (let i = 0; i < lParsedData.display.split(',').length; i++) {
        this.lForecastFilter.display.key.push(lParsedData.display.split(',')[i]);
      }
      this.lForecastFilter.txn = lParsedData.transactionCurrency;

      this.lForecastFilter.account.key = lParsedData.account;
      this.lForecastFilter.account.label = lParsedDesc.account
      this.lForecastFilter.fp.label = lParsedDesc.forecastProductName;
      this.lForecastFilter.displayccy = lParsedData.displayCurrency;
      this.lForecastFilter.eop = this.lSelectedPref.eopAvg;
      this.lForecastFilter.simtype.key = lParsedData.simulationType;
      this.lForecastFilter.scale.key = this.lSelectedPref.scale;
      this.lForecastFilter.showTp = this.lSelectedPref.showTp;
      $('#prefModal').modal('hide');
    }
  }

  loadFpData() {

    this.testDataService.getFpPopupData(AppConstants.FORECAST_POPUP).then(lFpPopupData => {
      if (lFpPopupData[0] != null && lFpPopupData[0]['result'] != null) {
        this.lFpPopupData = lFpPopupData[0]['result'].records;
        this.totalRecords = lFpPopupData[0]['result'].total;
      }
    });

  }
  PrefModal(val) {
    if (val == "show") {
      this.lPrefModal = "show";
      this.testDataService.getFpPopupData(AppConstants.LOAD_PREF).then(lLoadPref => {
        if (lLoadPref[0] != null && lLoadPref[0]['result'] != null) {
          this.lLoadPref = lLoadPref[0]['result'];
        }
      });

    } else {
      this.lPrefModal = "load";
    }
  }

  loadLazyFpData(val) {
    console.log(val);
    console.log('UrrlUtiServuice........' + this.urlUtilService.get());



    this.lPostDataWrapper = this.urlUtilService.formRouterUrl("tpController",
      "findFpProductWithPaging", this.cacheService.get('asOf'), null, null, null, null, this.cacheService.get('soeId'), null,
      null, null, null, null,
      true, 1, null, this.cacheService.get('dataSetId'), null, 0, true,
      "frcstProdName", "ASC");

    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("tpController", "findFpProductWithPaging");
    this.lPostDataWrapper.data = [];
    var data = {};
    if (this.cacheService.has('asOf')) {
      data['asOf'] = this.cacheService.get('asOf')['value'];
    } else {
      data['asOf'] = AppConstants.AS_OF_DATE;
    }
    var pageNumber;
    if (val.first != 0) {
      pageNumber = (val.first / val.rows) + 1;
    } else {
      pageNumber = 1;
    }
    data['page'] = pageNumber
    data['start'] = val.first;
    data['limit'] = 20;
    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
    data['sort'] = [];
    data['sort'].push({ direction: "ASC", property: "frcstProdName" });


    data['filter'] = [];

    if (val.filters != null) {

      if (val.filters['frcstProdId'] != undefined) {
        data['filter'].push({ property: 'frcstProdId', value: val.filters['frcstProdId'].value });
      }
      if (val.filters['frcstProdName'] != undefined) {
        data['filter'].push({ property: 'frcstProdName', value: val.filters['frcstProdName'].value });
      }
      if (val.filters['frcstProdNotes'] != undefined) {
        data['filter'].push({ property: 'frcstProdNotes', value: val.filters['frcstProdNotes'].value });
      }
      if (val.filters['mainProductCode'] != undefined) {
        data['filter'].push({ property: 'mainProductCode', value: val.filters['mainProductCode'].value });
      }
      if (val.filters['maturityType'] != undefined) {
        data['filter'].push({ property: 'maturityType', value: val.filters['maturityType'].value });
      }
      if (val.filters['updatedBy'] != undefined) {
        data['filter'].push({ property: 'updatedBy', value: val.filters['updatedBy'].value });
      }
      if (val.filters['updateTs'] != undefined) {
        data['filter'].push({ property: 'updateTs', value: val.filters['updateTs'].value });
      }

    }
    this.lPostDataWrapper.data.push(data);

    this.testDataService.getFpPopupData(this.lPostDataWrapper).then(lFpPopupData => {

      if (lFpPopupData[0] != null && lFpPopupData[0]['result'] != null) {
        this.lFpPopupData = lFpPopupData[0]['result'].records;
        this.loading = false;
      }
    });
  }

  loadTreePopup(postData) {
    var lObj;
    if (this.dynamic_modal_title != postData) {
      if (postData == "Managed Geography") {
        this.dynamic_modal_title = "Managed Geography";
        lObj = AppConstants.MANAGED_GEOGRAPHY;
        lObj[0].data[0].node = "1000";
        this.testDataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lGeographyData = lTreeData[0]['result'].children;
          }
        });
      }

      else if (postData == "Managed Segment") {
        this.dynamic_modal_title = "Managed Segment";
        lObj = AppConstants.MANAGED_SEGMENT;
        lObj[0].data[0].node = "1";
        this.testDataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lSegmentData = lTreeData[0]['result'].children;

          }
        });
      } else if (postData == "Legal Entity") {
        this.dynamic_modal_title = "Legal Entity";
        lObj = AppConstants.LEGAL_ENTITY;
        lObj[0].data[0].node = "CGALL";
        this.testDataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {
            this.lLegalEntityData = lTreeData[0]['result'].children;

          }
        });

      } else if (postData == "Accounts") {
        this.dynamic_modal_title = "Accounts";
        lObj = AppConstants.ACCOUNTS;
        lObj[0].data[0].node = "ALLACT";
        this.testDataService.postData(lObj).then(lTreeData => {
          if (lTreeData[0] != null && lTreeData[0]['result'] != null) {

            this.lAccountData = lTreeData[0]['result'].children;

          }
        });


      }
    } else {
      this.dynamic_modal_title = "";
    }




  }
  downloadAction() {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Email will send along with Forecast adjustment report', detail: '' });
  }
  saveAdj() {

    this.sendMessage("Balance sheet Info updated");
    this.msgs = [];

  }
  sendMessage(val) {

    this.testDataService.sendMessage(val);
  }



  private expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children && node.label == "Description") {
      node.children.forEach(childNode => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  nodeSelect(event, target) {
    if (target == "GE") {
      this.lForecastFilter.managed_geo.key = event.node.id;
      this.lForecastFilter.managed_geo.label = event.node.desc;
    } else if (target == "MS") {
      this.lForecastFilter.managed_seg.key = event.node.id;
      this.lForecastFilter.managed_seg.label = event.node.desc;
    }
    else if (target == "LE") {
      this.lForecastFilter.legal_entity.key = event.node.id;
      this.lForecastFilter.legal_entity.label = event.node.desc;
    }
    else if (target == "AC") {
      this.lForecastFilter.account.key = event.node.id;
      this.lForecastFilter.account.label = event.node.desc;
    }
    // this.msgs.push({severity: 'info', summary: 'Node Selected',
    // detail: event.node.label});
    this.dynamic_modal_title = '';
  }

  nodeUnselect(event) {
    this.msgs = [];
    // this.msgs.push({severity: 'info', summary: 'Node Unselected',
    // detail: event.node.data.name});
  }

  onSelectionChange(val) {
    this.lForecastFilter.common_radio = val;
    if (val == "ms") {
      this.lForecastFilter.dsmtGocOosRadioBtn = "MG/MS/LE";
    } else if (val == "goc") {
      this.lForecastFilter.dsmtGocOosRadioBtn = "GOC";
    }
    else if (val == "oos") {
      this.lForecastFilter.dsmtGocOosRadioBtn = "OOS";
    }
    else if (val == "oos_le") {
      this.lForecastFilter.dsmtGocOosRadioBtn = "OOS/MLE/CLE";
    }


  }

  nodeExpand(event, target) {
    if (event.node) {
      // in a real application, make a call to a remote url to load
      // children of the current node and add the new nodes as children
      var lObj;
      if (target == "GE") {
        lObj = AppConstants.MANAGED_GEOGRAPHY;
        lObj[0].data[0].node = event.node.id
        this.testDataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });
      } else if (target == "MS") {
        lObj = AppConstants.MANAGED_SEGMENT;
        lObj[0].data[0].node = event.node.id
        this.testDataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });
      }
      else if (target == "LE") {
        lObj = AppConstants.LEGAL_ENTITY;
        lObj[0].data[0].node = event.node.id
        this.testDataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });
      }
      else if (target == "AC") {
        lObj = AppConstants.ACCOUNTS;
        lObj[0].data[0].node = event.node.id
        this.testDataService.postData(lObj).then(nodes => {
          event.node.children = nodes[0]['result'].children;
        });
      }

    }
  }

  prepareMonthCols(timeVals) {
    this.totalCols = [];
    for (let i = 0; i < timeVals.result.length; i++) {

      //--INTEGRATION--Commenting for Emerald Grid Headed changes
      // if (timeVals.result[i].id.indexOf('m') == 0) {
      this.totalCols.push({ label: timeVals.result[i].desc, index: timeVals.result[i].id });
      // }
    }

  }

  viewNode(node: TreeNode) {
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Selected', detail: node.data.desc });
  }

  eraseMe(val) {

    this.lForecastFilter[val].label = "";
    this.lForecastFilter[val].key = "";

  }
  setToModal(modelVal, e) {
    console.log(modelVal);
    // this.lForecastFilter[modelVal].label=item.label;
  }
  onChange(val, targetElement) {
    if (val.target.selectedOptions[0].text != "Please select") {
      if (targetElement == "display") {
        if (this.lForecastFilter[targetElement].label != undefined) {
          this.lForecastFilter[targetElement].label += " " + val.target.selectedOptions[0].text;
        } else {
          this.lForecastFilter[targetElement].label = val.target.selectedOptions[0].text;
        }
      }
      else {
        this.lForecastFilter[targetElement].label = val.target.selectedOptions[0].text;
      }
    } else {
      this.lForecastFilter[targetElement].label = "";
    }
  }
  validateGOC() {
    var req = AppConstants.GOC_VALIDATION;
    req[0].data[0]['gocId'] = this.lForecastFilter.goc_id;
    this.testDataService.postData(req).then(res => {
      if (res[0]['result'].length == 0) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: 'Alert', detail: 'Enter a valid GOC' });
        this.lForecastFilter.goc_id = '';
      }
    });
  }
  reset() {
    this.lForecastFilter = new ForecastFilter();

  }
  changeToAbs(val) {
    if (val.indexOf('-') == 0) {
      return val.replace('-', '');
    } else {
      return val;
    }
  }
  formatBalRow(val) {

    if (val != 0) {
      let lFormattedValue;
      if ((val.split(".").length >= 1)) {
        lFormattedValue = val.split(".")[0];
      } else {
        lFormattedValue = val;
      }

      return this.changeToAbs(lFormattedValue);

    }
  }
  format_Rev_RE_Row(index, val, accountId) {
    let lFormattedValue = 0;
    if (index == 0 && accountId != 400001 && accountId != 400010 && accountId != 940031) {
      lFormattedValue = 0
    }
    if (val != 0) {
      let lFormattedValue;
      if ((val.split(".").length >= 1)) {
        lFormattedValue = val.split(".")[0];
      } else {
        lFormattedValue = val;
      }
      return this.changeToAbs(lFormattedValue);
    }
  }


  doForecast() {
    window.scrollTo(0, 0);
    this.document.getElementById('sidebar').scrollTop = 0;





    if (this.lForecastFilter.scenario.key != null && this.lForecastFilter.managed_geo.key != null && this.lForecastFilter.managed_seg.key != null && this.lForecastFilter.legal_entity.key != null) {
      var lObj = AppConstants.FORCAST_GRID;
      this.loadingFp = true;

      lObj[0].data[0]['filterData']['scnId'] = this.lForecastFilter.scenario.key;
      lObj[0].data[0]['filterData']['scnName'] = this.lForecastFilter.scenario.label;
      //--INTEGRATION-- Col header by Day wise -- Emerald

      this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("emeraldFrcstController", "getEmeraldFrcstAdjmtColHeader");
      this.lPostDataWrapper.data = [];
      var data = {};
      if (this.cacheService.has('asOf')) {
        data['asOfDate'] = this.cacheService.get('asOf')['value'];
      } else {
        data['asOfDate'] = AppConstants.AS_OF_DATE;
      }

      data['limit'] = 25;
      data['scnId'] = this.lForecastFilter.scenario.key;
      data['page'] = 1;
      data['start'] = 0;
      data['datasetId'] = this.cacheService.get('dataSetId')['value'];


      this.lPostDataWrapper.data.push(data);


      this.testDataService.postDataForEmerald(this.lPostDataWrapper).then(responseData => {
        this.prepareMonthCols(responseData[0]);
      });

      //--INTEGRATION-- End Col header by Day wise -- Emerald

      if (this.lForecastFilter.modelop.key != null) {
        lObj[0].data[0]['filterData']['adjmts'] = this.lForecastFilter.modelop.key;
        lObj[0].data[0]['filterData']['adjmtsDesc'] = this.lForecastFilter.modelop.label;
        this.lModelOp = this.lForecastFilter.modelop.label;
      }


      lObj[0].data[0]['filterData'].rb1 = "on";
      if (this.lForecastFilter.managed_geo.key != null) {
        lObj[0].data[0]['filterData']['managedGeography'] = this.lForecastFilter.managed_geo.key;
        lObj[0].data[0]['filterData']['mgDesc'] = this.lForecastFilter.managed_geo.label;
        lObj[0].data[0]['filterData']['mgId'] = this.lForecastFilter.managed_geo.key;

      }
      if (this.lForecastFilter.managed_seg.key != null) {
        lObj[0].data[0]['filterData']['managedSegment'] = this.lForecastFilter.managed_seg.key;
        lObj[0].data[0]['filterData']['msDesc'] = this.lForecastFilter.managed_seg.label;
        lObj[0].data[0]['filterData']['msId'] = this.lForecastFilter.managed_seg.key;

      }
      if (this.lForecastFilter.legal_entity.key != null) {
        lObj[0].data[0]['filterData']['legalEntity'] = this.lForecastFilter.legal_entity.key;
        lObj[0].data[0]['filterData']['leId'] = this.lForecastFilter.legal_entity.key;
        lObj[0].data[0]['filterData']['leDesc'] = this.lForecastFilter.legal_entity.label;
        lObj[0].data[0]['filterData']['leType'] = "LE";
      }
      if (this.lForecastFilter.affliate.key != null) {
        lObj[0].data[0]['filterData']['affiliate'] = this.lForecastFilter.affliate.key;
      }
      if (this.lForecastFilter.display != null && this.lForecastFilter.display.length != undefined) {
        for (let i = 0; i < this.lForecastFilter.display.key.length; i++) {
          lObj[0].data[0]['filterData']['display'] = this.lForecastFilter.display.key[i].key;
          if (i != this.lForecastFilter.display.key.length - 1) {
            lObj[0].data[0]['filterData']['display'] += ",";
          }
        }
      }
      if (this.lForecastFilter.account.key != null) {
        lObj[0].data[0]['filterData']['account'] = this.lForecastFilter.account.key;
      }
      if (this.lForecastFilter.account.label != null) {
        lObj[0].data[0]['filterData']['acctDesc'] = this.lForecastFilter.account.label;
      }
      if (this.lForecastFilter.fp.label != undefined) {
        lObj[0].data[0]['filterData']['forecastProductName'] = this.lForecastFilter.fp.label;
      } else {
        lObj[0].data[0]['filterData']['forecastProductName'] = "";
      }

      lObj[0].data[0]['filterData']['product'] = "";

      lObj[0].data[0]['filterData']['period'] = this.lForecastFilter.eop;

      if (this.lForecastFilter.eop == 0) {
        lObj[0].data[0]['filterData']['periodDesc'] = "AVG";
      } else {
        lObj[0].data[0]['filterData']['periodDesc'] = "EOP";
      }

      if (this.lForecastFilter.txn != null && this.lForecastFilter.txn.length != undefined) {
        for (let i = 0; i < this.lForecastFilter.txn.length; i++) {
          lObj[0].data[0]['filterData']['transactionCurrency'] = this.lForecastFilter.txn[i].id;
          if (i != this.lForecastFilter.txn.length - 1) {
            lObj[0].data[0]['filterData']['transactionCurrency'] += ",";
          }
        }
        if (lObj[0].data[0]['filterData']['transactionCurrency'] != null) {
          lObj[0].data[0]['filterData']['txnCcy'] = lObj[0].data[0]['filterData']['transactionCurrency'];
        }
      }
      if (this.lForecastFilter.displayccy != null) {
        lObj[0].data[0]['filterData']['displayCurrency'] = this.lForecastFilter.displayccy;
        lObj[0].data[0]['filterData']['dispCcy'] = this.lForecastFilter.displayccy;
      }
      if (this.lForecastFilter.simtype.key != null) {
        lObj[0].data[0]['filterData']['simulationType'] = this.lForecastFilter.simtype.key;
        lObj[0].data[0]['filterData']['simType'] = this.lForecastFilter.simtype.key;

      }
      if (this.lForecastFilter.simtype.label != null) {
        lObj[0].data[0]['filterData']['simulationTypeDesc'] = this.lForecastFilter.simtype.label;
        lObj[0].data[0]['filterData']['simTypeDesc'] = this.lForecastFilter.simtype.label;
      }
      if (this.lForecastFilter.scale.key != null) {
        lObj[0].data[0]['filterData'].scale = this.lForecastFilter.scale.key;
        lObj[0].data[0]['filterData']['scaleDesc'] = this.lForecastFilter.scale.label;
      }
      if (this.lForecastFilter.showTp != null) {
        lObj[0].data[0]['filterData'].showTP = this.lForecastFilter.showTp == true ? 'on' : '';
      }
      if (this.lForecastFilter.dsmtGocOosRadioBtn != null) {
        lObj[0].data[0]['filterData']['dsmtGocOosRadioBtn'] = this.lForecastFilter.dsmtGocOosRadioBtn;
      }
      lObj[0].data[0]['filterData']['soeId'] = this.cacheService.get('soeId')['value'];
      lObj[0].data[0]['filterData']['datasetId'] = this.cacheService.get('dataSetId')['value'];
      lObj[0].data[0]['filterData']['asOfDate'] = this.cacheService.get('asOf')['value'];

      this.testDataService.postDataForEmerald(lObj).then(lTreeData => {
        if (lTreeData != null) {
          /* console.log(JSON.stringify(lTreeData)); */
          this.loadingFp = false;
          this.sideToggle();
          this.showGrid = true;
          this.lForecastFilter.showTopNav = true;
          var lTempData = {};
          lTempData['data'] = [];
          lTempData['data'].push((lTreeData[0]['result'].children[0]));
          this.lTreeData = lTempData['data'];
          this.pushedTabs = [];

          this.lTreeData.forEach(node => {
            this.expandRecursive(node, true);
          });


        }
      });
    }



  }

  onChange_Type(val, targetElement) {
    if (val.query != "") {
      this.lForecastFilter[targetElement] = {};
      this.lForecastFilter[targetElement]['label'] = val.query;
    }
  }

  setSelected_Type(event, target) {

    this.lForecastFilter[target]['label'] = event.label;
    this.lForecastFilter[target]['key'] = event.key;
  }
  filterSingle_Type(event, type) {
    let query = event.query;
    let lObj;
    if (type == "modelop") {
      lObj = this.modelopAdj;
      this.lSearchResultsModelOp = this.filter_Type(query, lObj, type);
    } else if (type == "dispCcy") {
      lObj = this.modelopAdj;
      this.lSearchResultsDispCCY = this.filter_Type(query, lObj, type);
    } else if (type == "simtype") {
      lObj = this.modelopAdj;
      this.lSearchResultsSimType = this.filter_Type(query, lObj, type);
    } else if (type == "oos") {
      lObj = this.lOosData;
      this.lSearchResultsOOS = this.filter_Type(query, lObj.result, type);
    }

  }
  eraseMe_Type(target) {

    this.lForecastFilter[target]['label'] = "";
    this.lForecastFilter[target]['key'] = "";
    this.lForecastFilter[target] = "";
  }
  filter_Type(query, scenarios: any[], type): any[] {
    let filtered: any[] = [];
    for (let i = 0; i < scenarios.length; i++) {
      let lTempObj = scenarios[i];
      let lAccessObj;
      if (type == "modelop") {
        lAccessObj = "label";
      } else if (type == "dispCcy") {
        lAccessObj = "id";
      } else if (type == "simtype") {
        lAccessObj = "desc";
      } else if (type == "oos") {
        lAccessObj = "objectOfSaleName";
      }
      if (lTempObj[lAccessObj].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(lTempObj);
      }
    }
    return filtered;
  }


  sideToggle() {
    if (this.document.activeElement.placeholder != "Search") {


      if (this.toggleActive == "active") {
        this.toggleActive = "";
        this.toggleArrow = "fa fa-chevron-circle-left iclass";
      } else {
        this.toggleActive = "active";
        this.toggleArrow = "fa fa-chevron-circle-right iclass";
      }
    }


  }






  /*
   * rerender(){ $('.custompicker').selectpicker({ style: 'btn-default', size:
   * 4 }); }
   */

}
