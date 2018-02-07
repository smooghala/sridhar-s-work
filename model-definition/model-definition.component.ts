import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';

import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ForecastFilter } from '../components/shared/models/ForecastFilter';
import {PanelModule} from 'primeng/primeng';
import { DataService, UrlUtilService, CacheService } from '../common/services';
import { PostDataWrapper } from '../components/shared/models';
import { AppConstants } from '../common/constants';

@Component({
  selector: 'app-model-definition',
  templateUrl: './model-definition.component.html',
  styleUrls: ['./model-definition.component.css']
})
export class ModelDefinitionComponent implements OnInit {
  @Input('lFilterData')
  lForecastFilter: ForecastFilter;
  public loadingFp = false;
  viewModelTreeData: TreeNode[];
  showModelDefinition=false;
  modelAssumptionView= false;
  fpView=false;
  tpModelDefinition=false;
  rangeView=false;
  rvView=false;
  equationData:any={};
  headerData: any={};
  specialVectors: any={};
  tpMdlType:string;
  tpCatSpecialVectorsArr: any=[];
  tpColsForNTAP: any=[];
  tpVectorFieldSet: any={};
  tpInitialFieldset: any={};
  tpChangeFiledset: any={};
  caterpillarView=false;
  matchedFlowView=false;
  spreadView=false;
  tpBasisSpread=false;
  tpInitialFieldsetArr: any=[];
  tpChangeFiledsetArr: any=[];
  dataElmtArr: any=[];
  rwaMappingArr: any=[];
  fixed: boolean;
  float: boolean;
  bullet: boolean;
  monthly: boolean;
  baseIndex: any={};
  tpRule: any={};
  rePriceFreq: any={};
  dayCountUnit: any={};
  tenorDetlArr: any=[];
  lPostDataWrapper;
  loadingModelDef= false;
  rvDataArr: any={};
  rvEquation: any={};
  rangeViewData: any={};
  rangeViewArr: any=[];
  tpColsForRVBZero: any=[];
  tpColsForRVAZero: any=[];    
  dvDataArr: any=[];  
  dvrvDetailPanel=false;
  matchedFundAttr: any={};
  matchedFundVectorArr: any=[];
  cols60:any=[];
  tenorShowLabel: any={};
  transferShowLabel: any={};
  specialVectorSpan: any={};
  nonTermVectorWidth: any={};
  constructor(private dataService: DataService, private urlUtilService: UrlUtilService, private cacheService: CacheService) { }

  ngOnInit() {
    this.lPostDataWrapper = new PostDataWrapper();
    var lObj = AppConstants.VIEW_MODEL_DEFINTION;
    this.loadingFp = true;
    this.dataService.postData(lObj).then(viewModelTreeData => {
      if (viewModelTreeData != null) {
        var lTempData = {};
        lTempData['data'] = [];
        lTempData['data'].push((viewModelTreeData[0]['result']));
        this.viewModelTreeData = lTempData['data'];
        this.loadingFp = false;
        this.viewModelTreeData.forEach(node => {
          this.expandRecursiveView(node, true);
        });
        this.showModelDefinition = true;
      }
    });
  }
  onRowDblclick(event) {
    this.headerData = event.node;
    if (null != event.node) {
      if ('Balance Models' == event.node.parent.mdlName || 'Rate Models' == event.node.parent.mdlName) {
        this.fpView=false;
        this.tpModelDefinition = false;
        this.rangeView = false;
        this.rvView = false;        
        this.modelAssumptionView = true;
        this.dvrvDetailPanel = false;
        this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("modelController", "findMdlCompEquation");
		this.lPostDataWrapper.data = [];
		var data = {};
		data['mdlSetupId'] = event.node.mdlSetupID;
		data['mdlType'] = event.node.mdlType;
		data['asOfDate'] = this.cacheService.get('asOf')['value'];
		data['limit'] = 25;
		data['page'] = 1;		    
		data['start'] = 0;
		data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		this.lPostDataWrapper.data.push(data);
		this.equationData='';
        this.dataService.postData(this.lPostDataWrapper).then(equationData => {
          if (equationData != null) {          	
            var equ = (equationData[0]['result'])[0];
            if (null != equ) {
              if (null != equ.equation1Str) {
                this.equationData = equ.equation1Str;
              } else if (null != equ.equation2Str) {
                this.equationData = equ.equation2Str;
              } else if (null != equ.equation3Str) {
                this.equationData = equ.equation3Str;
              }
            }
          }
        });
      } else if('DV' == event.node.entityType) { 
	      	this.fpView=false;
       		this.tpModelDefinition = false;
       		this.modelAssumptionView = true;
       		this.rangeView = false;
       		this.rvView = false;       		
       		this.dvrvDetailPanel = true;
       		this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("modelController", "findMdlCompEquation");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['mdlSetupId'] = event.node.mdlSetupID;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.equationData='';
         	this.dataService.postData(this.lPostDataWrapper).then(equationDVData => {
	          if (equationDVData != null) {          	
	            var equ = (equationDVData[0]['result'])[0];
	            if (null != equ) {
	              if (null != equ.equation1Str) {
	                this.equationData = equ.equation1Str;
	              } else if (null != equ.equation2Str) {
	                this.equationData = equ.equation2Str;
	              } else if (null != equ.equation3Str) {
	                this.equationData = equ.equation3Str;
	              }
	            }
	          }
	        });
       		this.prepareColsforRVBZero();
		    this.prepareColsforRVAZero();
		    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "getDerivedDataDetl");
		    this.lPostDataWrapper.data = [];
		    var data = {};		    
		    data['dvName'] = event.node.mdlName;
		    data['scnName'] = this.lForecastFilter.scenario.label;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    data['mdlType'] = 'DV';
		    data['ccyCode'] = 'All';
		    data['simulationType'] = this.lForecastFilter.simtype.key;		    
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    this.lPostDataWrapper.data.push(data);
		    this.dvDataArr=[];
         	this.dataService.postData(this.lPostDataWrapper).then(dvData => {
         		this.dvDataArr=[];
         	 	if(null != dvData) {
         	 		this.dvDataArr = dvData[0]['result'];
         	 	}
         	});
      } else if ('TP Models' == event.node.parent.mdlName) {
        	this.modelAssumptionView = false;
	        this.fpView = false;
	        this.tpModelDefinition = true;
	        this.rangeView = false;
        	this.rvView = false;
	        var object_tp = AppConstants.INIT_SPECIAL_TP_VECTORS;
	        var tp_initialChange = AppConstants.TP_INITIAL_CHANGE;
	        var tp_vectors = AppConstants.TP_VECTORS;
	        if ('TPC' == event.node.mdlType) {
	          this.caterpillarView=true;
	          this.matchedFlowView=false;
	          this.spreadView=false;
	          this.tpMdlType = 'Caterpillar';
	          this.prepareColsforNTAP();
	          this.transferShowLabel='Hide Details';
	          this.nonTermVectorWidth = 'nonTermVectorWidth';
	          object_tp[0].data[0].tpModelHeaderId = (event.node.mdlSetupID).toString();
	          this.dataService.postData(object_tp).then(specialVectors => {
	            if (specialVectors != null) {
					this.tpCatSpecialVectorsArr = specialVectors[0]["result"].records;
	            }
	          });
	          tp_vectors[0].data[0].tpModelHeaderId = (event.node.mdlSetupID).toString();
	          this.dataService.postData(tp_vectors).then(tpVector => {
	            if (tpVector != null) { 
	            	if(tpVector[0]["result"].records.length >0) {                                         
		                this.tpVectorFieldSet = tpVector[0]["result"].records[0];                                                
		                console.log(this.tpVectorFieldSet);
	                } else {
	                	this.tpVectorFieldSet = {};
	                }
	            }
	          });
	          tp_initialChange[0].data[0].tpModelHeaderId = (event.node.mdlSetupID).toString();
	          tp_initialChange[0].data[0].type = 'I';
	          this.dataService.postData(tp_initialChange).then(tpInitials => {
	            if (tpInitials != null) {
	            	this.tpInitialFieldsetArr = [];
	            	if(tpInitials[0]["result"].records.length >0) {
		            	this.tpInitialFieldset = tpInitials[0]["result"].records[0];                                                  
		                tpInitials[0]["result"].records.forEach(childRecord => {
		                	this.tpInitialFieldsetArr.push({vector:childRecord.vectorsInMonths,percent:childRecord.percent})
		                });
	                } else {
	                	this.tpInitialFieldset={};
	                }
	            }
	          });
	          tp_initialChange[0].data[0].tpModelHeaderId = (event.node.mdlSetupID).toString();
	          tp_initialChange[0].data[0].type = 'C';
	          this.dataService.postData(tp_initialChange).then(tpChange => {
	            if (tpChange != null) {
	                this.tpChangeFiledsetArr = [];
	                if(tpChange[0]["result"].records.length >0){
		            	this.tpChangeFiledset = tpChange[0]["result"].records[0];                                                  
		                tpChange[0]["result"].records.forEach(childCRecord => {
		                	this.tpChangeFiledsetArr.push({vector:childCRecord.vectorsInMonths,percent:childCRecord.percent})
		                });
		            } else {
		            	this.tpChangeFiledset={};
		            }
	            }
	          });
	          this.tpBasisSpread=true;
        }
        if ('TPM' == event.node.mdlType) {
           this.caterpillarView=false;
           this.matchedFlowView=true;
	       this.spreadView=false;
           this.tpMdlType = 'Matched Cashflow';
           this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("tpController", "initDataOfMatchedFundAttributes");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['modelHeaderId'] = (event.node.mdlSetupID).toString();
		    data['asofDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.matchedFundAttr={};
		    this.dataService.postData(this.lPostDataWrapper).then(responseData1 => {
		    	if(null != responseData1) {
		    		this.matchedFundAttr = responseData1[0]["result"].records[0];
		    	}
		    });
		    
		    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("tpController", "findTpMatchedFundVectorsByTpModelHeaderId");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['tpModelHeaderId'] = event.node.mdlSetupID;
		    data['asofDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.matchedFundVectorArr=[];
		    this.cols60=[];
		    this.cols60.push({header:'Month1'});
		    this.tenorShowLabel = 'Show Details';
		    this.dataService.postData(this.lPostDataWrapper).then(responseData2 => {
		    	if(null != responseData2) {
		    		this.matchedFundVectorArr =  responseData2[0]["result"];
		    	}
		    });
          this.tpBasisSpread=true;
        }
        if ('TPS' == event.node.mdlType) {
          this.caterpillarView=false;
          this.matchedFlowView=false;
	      this.spreadView=true;
          this.tpMdlType = 'Spread to 3rd Party';
          this.tpBasisSpread=false;
        }


      } else if('RV' == event.node.entityType) {
      	 this.modelAssumptionView = false;
      	 this.fpView = false;
         this.tpModelDefinition = false;
         if((null != event.node.subMdltype && '' != event.node.subMdltype) &&  'RVR' == event.node.subMdltype){
         	this.rangeView = true;
         	this.rvView = false;
         	this.rangeViewData = {};
         	this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("modelController", "findRuntimeVariableCompDetails");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['mdlSetupId'] = event.node.mdlSetupID;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.dataService.postData(this.lPostDataWrapper).then(responseData => {
		    	if(null != responseData) {		    		
		    		if(responseData[0]['result'].length >0) {
		    			if(null != responseData[0]['result'][0].runTimeComponents.driverEquation) {
		    				this.rangeViewData['equation1'] = responseData[0]['result'][0].runTimeComponents.driverEquation;
		    			}
		    			if(null != responseData[0]['result'][0].runTimeComponents.trendEquation) {
		    				this.rangeViewData['equation2'] = responseData[0]['result'][0].runTimeComponents.trendEquation;
		    			}
		    			if(null != responseData[0]['result'][0].runTimeComponents.driverType) {
		    				this.rangeViewData['driver'] = responseData[0]['result'][0].runTimeComponents.driverType;
		    			}
		    			if(null != responseData[0]['result'][0].runTimeComponents.trendType) {
		    				this.rangeViewData['trend'] = responseData[0]['result'][0].runTimeComponents.trendType;
		    			}
		    			if(null != responseData[0]['result'][0].runTimeComponents.driverNames) {
		    				if('MD' == responseData[0]['result'][0].runTimeComponents.driverType || 'Market Data' == responseData[0]['result'][0].runTimeComponents.driverType) {
		    					this.rangeViewData['fieldLabel'] = 'Market Data';
		    					this.rangeViewData['fieldValue'] = responseData[0]['result'][0].runTimeComponents.driverNames;
		    				} else if('ED' == responseData[0]['result'][0].runTimeComponents.driverType || 'Economic Data' == responseData[0]['result'][0].runTimeComponents.driverType) {
		    					this.rangeViewData['fieldLabel'] = 'Economic Data';
		    					this.rangeViewData['fieldValue'] = responseData[0]['result'][0].runTimeComponents.driverNames;
		    				} else if('DV' == responseData[0]['result'][0].runTimeComponents.driverType || 'Derived Variable' == responseData[0]['result'][0].runTimeComponents.driverType) {
		    					this.rangeViewData['fieldLabel'] = 'Derived Variable';
		    					this.rangeViewData['fieldValue'] = responseData[0]['result'][0].runTimeComponents.driverNames;
		    				}
		    			}
		    			if(null != responseData[0]['result'][0].runTimeComponents.trendNames) {
		    				this.rangeViewData['dv'] = responseData[0]['result'][0].runTimeComponents.trendNames;
		    			}
		    			this.rangeViewArr = [];
		    			if(responseData[0]['result'][0].runTimeCompData.length > 0) {
		    				this.rangeViewArr = responseData[0]['result'][0].runTimeCompData;
		    			}		    			
		    		}
		    	}
		    });
         	
         } else {
         	this.rangeView = false;
         	this.rvView = true;
		    this.rvEquation = '';
         	this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("modelController", "findMdlCompEquation");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['mdlSetupId'] = event.node.mdlSetupID;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
         	this.dataService.postData(this.lPostDataWrapper).then(equationRvData => {
		        if (equationRvData != null) {
		            var equ = (equationRvData[0]['result'])[0];
		            if (null != equ) {
		              if (null != equ.equation1Str) {
		                this.rvEquation = equ.equation1Str;
		              } else if (null != equ.equation2Str) {
		                this.rvEquation = equ.equation2Str;
		              } else if (null != equ.equation3Str) {
		                this.rvEquation = equ.equation3Str;
		              }
		            }
		          }
		     });
		    this.prepareColsforRVBZero();
		    this.prepareColsforRVAZero();
		    this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "getDerivedDataDetl");
		    this.lPostDataWrapper.data = [];
		    var data = {};		    
		    data['dvName'] = event.node.mdlName;
		    data['scnName'] = this.lForecastFilter.scenario.label;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    data['mdlType'] = 'RV';
		    data['ccyCode'] = 'All';
		    data['simulationType'] = this.lForecastFilter.simtype.key;		    
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    this.lPostDataWrapper.data.push(data);
		    this.rvDataArr=[];
         	this.dataService.postData(this.lPostDataWrapper).then(rvData => {
         		this.rvDataArr=[];
         	 	if(null != rvData) {
         	 		this.rvDataArr = rvData[0]['result'];
         	 	}
         	});
         }
         
      } else if(event.node.parent.mdlName=="Forecast Portfolios"){
        this.fpView = true;
        this.tpModelDefinition = false;
        this.modelAssumptionView = false;
        this.rangeView = false;
        this.rvView = false;
        if(null != event.node.dataElmtFilterStr && '' != event.node.dataElmtFilterStr) {
        	this.dataElmtArr =[];
        	var dataElmt = event.node.dataElmtFilterStr.split('|');        	
        	for(var i=0; i< dataElmt.length; i++) {
        		this.dataElmtArr.push({dataElement: dataElmt[i]});
        	}
        }
        if(null != event.node.rwaMappingStr && '' != event.node.rwaMappingStr) {
        	this.rwaMappingArr =[];
        	var rwaMapping = event.node.rwaMappingStr.split('|');        	
        	for(var i=0; i< rwaMapping.length; i++) {
        		this.rwaMappingArr.push({rwaMappings: rwaMapping[i]});
        	}
        }
        this.tenorDetlArr = [];
         if('Non-Defined (Indefinite Life)' == event.node.maturityType){
         	this.fixed = true;
         	this.float = false;
         	this.bullet = true;
         	this.monthly = false;
         	this.baseIndex = '';
  			this.tpRule = '';
  			this.rePriceFreq = '';
  			this.dayCountUnit = '';
	      } else {
	     	 if('Fixed' == event.node.fixedOrFloat){
				this.fixed = true;
         		this.float = false;
			 } else if('Float' == event.node.fixedOrFloat){
				this.fixed = false;
         		this.float = true;
			}
			if('Bullet' == event.node.amortization){
				this.bullet = true;
         		this.monthly = false;
			}else {
				this.bullet = false;
         		this.monthly = true;
			}
	      	this.baseIndex = event.node.baseIndx;
  			this.tpRule = event.node.tpRule;
  			this.rePriceFreq = event.node.repriceFreq;
  			this.dayCountUnit = event.node.dayCount;
  			this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "getforecastProductTenorDetail");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['frsctProdId'] = event.node.forecastid;
		    data['asOfDate'] = this.cacheService.get('asOf')['value'];
		    data['limit'] = 25;
		    data['page'] = 1;		    
		    data['start'] = 0;
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.dataService.postData(this.lPostDataWrapper).then(responseData => {
		    	if(null != responseData) {
		    		this.tenorDetlArr = responseData[0]["result"];
		    	}
		    });
		    
	    }
      }
    }
  }
  expandRecursiveView(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children != null && (null != node['mdlName'] && '' != node['mdlName'] && node['mdlName'] != 'root')) {
      node.children.forEach(childNode => {
        this.expandRecursiveView(childNode, isExpand);
      });
    }
  }
  onNodeExpand(event) {
  	var mdlType = event.node['entityType'];
  	var mdlSetupId = event.node['mdlID'];
    if(null != mdlType && ('DV' == mdlType || 'RV' == mdlType)) {
    	event.node.children = [];
    	if(mdlSetupId) {
    		this.lPostDataWrapper = this.urlUtilService.formRouterUrlEmptyData("forecastAdjmtController", "getLeafModels");
		    this.lPostDataWrapper.data = [];
		    var data = {};
		    data['mdlSetupID'] = mdlSetupId;
		    data['mdlType'] = mdlType;
		    data['asofDate'] = this.cacheService.get('asOf')['value'];
		    data['datasetId'] = this.cacheService.get('dataSetId')['value'];
		    this.lPostDataWrapper.data.push(data);
		    this.loadingModelDef=true;
		     this.dataService.postData(this.lPostDataWrapper).then(responseData => {
		    	if(null != responseData) {
		    		console.log(responseData);
		    		this.loadingModelDef=false;
		    		if(responseData[0]['result'].length > 0) {
		    			event.node.children = responseData[0]['result'];
		    		} 
		    	}
		    });
    	}
    	
    }
  }
  prepareColsforNTAP() {
     this.tpColsForNTAP = [];
     this.specialVectorSpan = {};
     for(var i = 1; i<=60; i++) {
          this.tpColsForNTAP.push({field : 'month'+i, header: 'Month'+i});
     }
     this.specialVectorSpan = 60;
  }
  
  prepareColsforRVBZero() {
     this.tpColsForRVBZero = [];
     for(var i = 24; i>=1; i--) {
          this.tpColsForRVBZero.push({field : 'mon'+i+'_1', header: 'm-'+i});
     }
  }
  
  prepareColsforRVAZero() {
     this.tpColsForRVAZero = [];
     for(var i = 0; i<=24; i++) {
          this.tpColsForRVAZero.push({field : 'mon'+i, header: 'm'+i});
     }
  }
  
  showAll(event) {
  	if('Show Details' == event.target.outerText) {
	  	this.tenorShowLabel = 'Hide Details';
	  	this.cols60=[];
	    for(let i=1; i<=60;i++) {
			this.cols60.push({header:'Month'+i});  	
		}
	} else {
		this.tenorShowLabel = 'Show Details';
		this.cols60=[];
		this.cols60.push({header:'Month1'});  	
	}
  }
  
  showAllTransfer(event) {
  	if('Hide Details' == event.target.outerText) {
  		this.transferShowLabel = 'Show Details';
  		this.nonTermVectorWidth = '';
  		this.specialVectorSpan = {};
  		this.tpColsForNTAP=[];
  		this.tpColsForNTAP.push({field : 'month1', header: 'Month1'});
  		this.specialVectorSpan = 1;
  		this.nonTermVectorWidth = 'nonTermVectorWidth-100';
  	} else {
  		this.transferShowLabel = 'Hide Details';
  		this.nonTermVectorWidth = '';
  		this.prepareColsforNTAP();
  		this.nonTermVectorWidth = 'nonTermVectorWidth';
  	}
  }
}
