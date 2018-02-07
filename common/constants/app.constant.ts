
export class AppConstants {

	public static API_RUBY_ENDPOINT = 'http://169.173.95.192:8080';
	public static API_SOCKET_ENDPOINT = 'http://169.173.95.192:8080';
	public static API_EMERALD_ENDPOINT = 'http://169.173.95.192:8080';
	public static SOEID_JK = "jk37383";
	public static SOEID_VN = "vn61907";
	public static AS_OF_DATE = "30-Sep-2017";
	public static SUCCESS_MSG="success";
	public static FAIL_MSG="failure";

	public static FORECAST_MODEL_OP_ADJ = [
	{ label: "Model Output", key: "1" },
	{ label: "Model w Beta Adjmt", key: "2" },
	{ label: "Manual Adjmts", key: "3" },
	{ label: "Adjusted", key: "4" },
	{ label: "Starting Positions", key: "5" },

	];
	public static FORECAST_SCALE_TYPE = [{ label: "Base Amount", key: "1" },
	{ label: "Thousand", key: "2" },
	{ label: "Millions", key: "3" },
	{ label: "Billions", key: "4" }
	];
	public static DISPLAY_TYPE = [
		{ label: 'Balance', key: 'B' },
		{ label: 'Rate', key: 'R' },
		{ label: 'Rev/Exp', key: 'RE' }

	];
	public static TREE_SERACH = [{
		"action": "hierarchyController",
		"method": "getHierarchyBy",
		"data": [{
			"asOf": "30-Sep-2017",
			"dimType": "MG",
			"lazy": false,
			"desc": "LA",
			"soeid": "vn61907",
			"enabled": false,
			"multiSelect": false,
			"selectedValues": "",
			"pearlEnabled": "",
			"datasetId": 1,
			"node": "root"
		}],
		"type": "rpc",
		"tid": 75
	}];
	public static FORECAST_CONTEXT_MENU = [{ label: "Manual Adjmts", icon: "fa-plus-square", command: function (n) { } },
	{ label: "Target Adjmts", icon: "fa-close", command: function (n) { } },
	{ label: "View Forecast Portfolios", icon: "fa-close", command: function (n) { } },
	{ label: "Incremental Adjmts", icon: "fa-close", command: function (n) { } },
	{ label: "Download", icon: "fa-download", command: function (n) { } },
	{ label: "Download Actual Positions", icon: "fa-download", command: function (n) { } },
	{ label: "Impacted Gocs", icon: "fa-signal", command: function (n) { } },
	];
	public static MANAGED_GEOGRAPHY = [{ "action": "hierarchyController", "method": "getHierarchyBy", "data": [{ "asOf": "30-Sep-2017", "dimType": "MG", "lazy": false, "desc": "", "soeid": "vn61907", "enabled": true, "multiSelect": false, "selectedValues": "", "pearlEnabled": "", "datasetId": 1, "node": "1000" }], "type": "rpc", "tid": 73 }];
	public static MANAGED_SEGMENT = [{ "action": "hierarchyController", "method": "getHierarchyBy", "data": [{ "asOf": "30-Sep-2017", "dimType": "MS", "lazy": false, "desc": "", "soeid": "vn61907", "enabled": true, "multiSelect": false, "selectedValues": "", "pearlEnabled": "", "datasetId": 1, "node": "1" }], "type": "rpc", "tid": 74 }];
	public static LEGAL_ENTITY = [{ "action": "hierarchyController", "method": "getHierarchyBy", "data": [{ "asOf": "30-Sep-2017", "dimType": "LE", "lazy": false, "desc": "", "soeid": "vn61907", "enabled": true, "multiSelect": false, "selectedValues": "", "pearlEnabled": "", "datasetId": 1, "node": "CGALL" }], "type": "rpc", "tid": 75 }];
	public static ACCOUNTS = [{ "action": "hierarchyController", "method": "getHierarchyBy", "data": [{ "asOf": "30-Sep-2017", "dimType": "AC", "lazy": false, "desc": "", "soeid": "vn61907", "enabled": true, "multiSelect": false, "selectedValues": "", "pearlEnabled": "", "datasetId": 1, "node": "root" }], "type": "rpc", "tid": 76 }];
	public static GOC_VALIDATION = [{ "action": "hierarchyController", "method": "getGocdetails", "data": [{ "asOf": "30-Sep-2017", "datasetId": 1, "page": 1, "start": 0, "limit": 25 }], "type": "rpc", "tid": 68 }];
	public static MANAGED_GEOGRAPHY_DATA = [{
		"data":
			[
				{
					"label": "Total CitiGeography",
					"data": "Node 0",
					"expandedIcon": "fa-folder-open",
					"collapsedIcon": "fa-folder",
					"leaf": false
				}

			]
	}];

	public static FORECAST_POPUP = [{
		"action": "tpController",
		"method": "findFpProductWithPaging",
		"data": [{
			"datasetId": 1,
			"asOf": "30-Sep-2017",
			"page": 1,
			"start": 0,
			"limit": 20,
			"sort": [{
				"property": "frcstProdName",
				"direction": "ASC"
			}]
		}],
		"type": "rpc",
		"tid": 76
	}];
	public static POPUP_INIT = [
		{
			"action": "hierarchyController",
			"method": "getHierarchyBy",
			"data": [{
				"asOf": "30-Sep-2017",
				"dimType": "MG",
				"lazy": false,
				"desc": "",
				"soeid": "vn61907",
				"enabled": false,
				"multiSelect": false,
				"selectedValues": "",
				"pearlEnabled": "",
				"datasetId": 1,
				"node": "root"
			}],
			"type": "rpc",
			"tid": 28
		}, {
			"action": "hierarchyController",
			"method": "getHierarchyBy",
			"data": [{
				"asOf": "30-Sep-2017",
				"dimType": "MS",
				"lazy": false,
				"desc": "",
				"soeid": "vn61907",
				"enabled": false,
				"multiSelect": false,
				"selectedValues": "",
				"pearlEnabled": "",
				"datasetId": 1,
				"node": "root"
			}],
			"type": "rpc",
			"tid": 29
		}, {
			"action": "hierarchyController",
			"method": "getHierarchyBy",
			"data": [{
				"asOf": "30-Sep-2017",
				"dimType": "LE",
				"lazy": false,
				"desc": "",
				"soeid": "vn61907",
				"enabled": false,
				"multiSelect": false,
				"selectedValues": "",
				"pearlEnabled": "",
				"datasetId": 1,
				"node": "root"
			}],
			"type": "rpc",
			"tid": 31
		}, {
			"action": "hierarchyController",
			"method": "getHierarchyBy",
			"data": [{
				"asOf": "30-Sep-2017",
				"dimType": "AC",
				"lazy": false,
				"desc": "",
				"soeid": "vn61907",
				"enabled": false,
				"multiSelect": false,
				"selectedValues": "",
				"pearlEnabled": "",
				"datasetId": 1,
				"node": "root"
			}],
			"type": "rpc",
			"tid": 33
		}];
	public static AFFLIATE_DROP_EM = [{ "action": "emeraldFrcstController", "method": "findsumFPAffilMLE", "data": [{ "asOfDate": "30-Sep-2017", "datasetId": 1, "node": "root" }], "type": "rpc", "tid": 39 }];
	public static OOS_POST = [{
		"action": "emeraldFrcstController",
		"method": "findActiveOOS",
		"data": [{
			"asOfDate": "30-Sep-2017",
			"page": 1,
			"start": 0,
			"limit": 25,
			"datasetId": 1,
			"sort": [{
				"property": "objectOfSaleName",
				"direction": "ASC"
			}]
		}],
		"type": "rpc",
		"tid": 32
	}];
	public static FORECAST_POST_DATA = [
		{ "action": "adminController",
		 "method": "getDataSetEditableFlag",
		  "data": [2, "30-Sep-2017",
		   "vn61907"], 
		   "type": "rpc", "tid": 47 }
		   
		 
		   , {
			"action": "commonController",
			"method": "findAllScenariosByUserAccess",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"soeid": "vn61907_NG",
				"datasetId": 1,
				"datasetName": "PRIMARY_COPY",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 48
		},
		{
			"action": "commonController",
			"method": "findAllCurrencies",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"datasetId": 1,
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 35
		}, {
			"action": "commonController",
			"method": "findAllCurrencies",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"datasetId": 1,
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 36
		}, {
			"action": "commonController",
			"method": "lookup",
			"data": [{
				"type": "FILTER_SIM_TYPE",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 37
		}, {
			"action": "commonController",
			"method": "lookup",
			"data": [{
				"type": "MENU",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 40
		}
		, {
			"action": "commonController",
			"method": "lookup",
			"data": [{
				"type": "ADJ_MENU",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 41
		}, {
			"action": "commonController",
			"method": "findAllAffiliates",
			"data": null,
			"type": "rpc",
			"tid": 46
		}, {
			"action": "commonController",
			"method": "findAllCurrencies",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"datasetId": 1,
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 47
		}, {
			"action": "commonController",
			"method": "findAllCurrencies",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"datasetId": 1,
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 48
		}, {
			"action": "commonController",
			"method": "lookup",
			"data": [{
				"type": "FILTER_SIM_TYPE",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 49
		},
		{
			"action": "forecastAdjmtController",
			"method": "getFrcstAdjmtColHeader",
			"data": [{
				"asOfDate": "30-Sep-2017",
				"page": 1,
				"start": 0,
				"limit": 25
			}],
			"type": "rpc",
			"tid": 49
		}

	];
	public static LE_TYPE=[{"action":"hierarchyController","method":"getLegalEntityPreLoaded","data":[{"multiSelect":false,"soeId":"jk37383","asOf":"31-Oct-2017","datasetId":2,"node":"root"}],"type":"rpc","tid":52}];
	public static MLE_TYPE=[{"action":"hierarchyController","method":"getLegalEntityPreLoaded","data":[{"multiSelect":false,"soeId":"jk37383","asOf":"31-Oct-2017","datasetId":2,"node":"root"}],"type":"rpc","tid":52}];
	public static CLE_TYPE=[{"action":"hierarchyController","method":"getCLEs","data":[{"multiSelect":false,"soeId":"jk37383","asOf":"31-Oct-2017","datasetId":2,"isReport":false,"node":"root"}],"type":"rpc","tid":54}];



	public static LOAD_PREF = [{ "action": "preferenceController", "method": "listPreferences", "data": [{ "userId": "vn61907", "reportName": "Forecast Adjustment", "asOf": "30-Sep-2017", "datasetId": 1, "page": 1, "start": 0, "limit": 25 }], "type": "rpc", "tid": 90 }];

	public static FORCAST_GRID = [{
		"action": "emeraldFrcstController",
		"method": "getBalanceSheet",
		"data": [{
			"filterData": {				
				"rb1": "on",							
				"scale": "1",
				"showTP": "on",				
			},
			"nodeState": [],
			"sort": [{
				"property": "accountId",
				"direction": "ASC"
			}],
			"node": "root"
		}],
		"type": "rpc",
		"tid": 80
	}];
	public static VIEW_MODEL_DEFINTION = [{
		"action":"forecastAdjmtController",
		"method":"getPBOMapNew",
		"data":[{"mdlAssgnObjectNew":{"mngSeg":"25371",
		"mngGeo":"1001",
		"lglEnt":"50001",
		"goc":"",
		"parntAcct":"156001",
		"ccyCode":"All",
		"sumAffilCode":"All",
		"balAcct":"",
		"tpBalAcct":"299999",
		"tpRateAcct":"422110",
		"tpTreasGoc":"18591400",
		"cmnt":"",
		"frcstProdId":19186,"reqStatus":"P",
		"status":"",
		"balMdlId":0,"balMdlDynId":1,"balMdlRunOffId":54549,"tpMdlId":194121,"rateMdlId":194076,"creUserId":"db03539",
		"mdlAsgnId":1000000021263,"mgDesc":"NAM",
		"msDesc":"Corp - Mortgages [L6]",
		"leDesc":"CITIGROUP, INC. - CONSOLIDATED",
		"tpBalAcctDesc":"299999-TP Liabilities (L2)",
		"tpRateAcctDesc":"422110-Transfer Pricing Term Expense (L6)",
		"balAcctDesc":"",
		"parentAcctDesc":"156001-Mortgage Servicing Rights (L2)",
		"frcstProductDesc":"FP_NA_REL_CORP_MortgageServicingRights_Other",
		"balMdlDesc":"",
		"rateMdlDesc":"",
		"tpMdlDesc":"TP_NA_REL_3_Month",
		"rateMdlName":"Rate_NA_REL_CORP_MortgageServicingRights_Other",
		"rateMdAcct":"417810",
		"rateMdlName1":"",
		"rateMdAcct1":"",
		"rateMdlName2":"",
		"rateMdAcct2":"",
		"rateMdlName3":"",
		"rateMdAcct3":"",
		"rateMdlName4":"",
		"rateMdAcct4":"",
		"rateMdlName5":"",
		"rateMdAcct5":"",
		"rateMdlName6":"",
		"rateMdAcct6":"",
		"rateMdlName7":"",
		"rateMdAcct7":"",
		"rateMdlName8":"",
		"rateMdAcct8":"",
		"rateMdlName9":"",
		"rateMdAcct9":"",
		"balRunOffMdlDesc":"Bal_Zero",
		"balDynamicMdlDesc":"Bal_HoldFlat"},"asofDate":"30-Sep-2017",
		"datasetId":1,"node":"root"}],"type":"rpc",
		"tid":86
	}];

public static GET_EQUATION = [{
		"action":"modelController",
		"method":"findMdlCompEquation",
		"data":[{"mdlSetupId":60579,"mdlType":"B",
		"asOfDate":"30-Sep-2017",
		"datasetId":1,"page":1,"start":0,"limit":25}],"type":"rpc",
		"tid":88}];

public static INIT_SPECIAL_TP_VECTORS = [{
	"action":"tpController",
	"method":"initDataOfTpCatSpecialVectors",
	"data":[{"tpModelHeaderId":"9284",
			"asOfDate":"31-Oct-2017",
			"datasetId":2,"page":1,"start":0,"limit":25
			}],
	"type":"rpc",
	"tid":94}];

	public static VIEW_FORCAST_PORTFOLIO = [
		{"action":"forecastAdjmtController",
		"method":"getForecastProductBalanceWithPagination",
		"data":[{"accountId":"110001",
		"filterData":
		{"scnId":"579","adjmts":"4","rb1":"on","managedGeography":"1000","managedSegment":"1",
		"legalEntity":"50001","checkboxfield-1057-inputEl":"on","affiliate":"THIRD_PARTY","display":"B,R,RE",
		"account":"ALLACT","forecastProductName":"","product":"","period":"0","transactionCurrency":"","displayCurrency":"USD",
		"simulationType":"D","scale":"1000000","showTP":"on","adjmtsDesc":"Adjusted","scenario":"ROLLING_BASE",
		"managedGeographyDesc":"Total Citi Geography","managedSegmentDesc":"Total Citi [L1]",
		"legalEntityDesc":"CITIGROUP, INC. - CONSOLIDATED","scaleDesc":"Millions",
		"mngDesc":"Total Citi Geography","msegDesc":"Total Citi [L1]","legDesc":"CITIGROUP, INC. - CONSOLIDATED",
		"acctDesc":"ALLACT - All Account","periodDesc":"AVG","simulationTypeDesc":"Dynamic","soeId":"vn61907","datasetId":1,
		"asOfDate":"30-Sep-2017","goc":"","datasetName":"PRIMARY"},"sequence":"cacheId : 110001|1516690169922",
		"page":1,"start":0,"limit":25}],
		"type":"rpc","tid":86}]

public static TP_VECTORS = [{
       "action":"tpController",
       "method":"initDataOfTpCatTermAttributes",
       "data":[{"tpModelHeaderId":"170255","type":"C",
       "datasetId":2,"asOfDate":"31-Oct-2017","page":1,"start":0,"limit":25
       }],
       "type":"rpc",
       "tid":85}];

public static TP_INITIAL_CHANGE = [{
       "action":"tpController",
       "method":"initDataOfTpCatTermVectors",
       "data":[{"tpModelHeaderId":"170255","type":"I","asofDate":"31-Oct-2017",
       "datasetId":2,"page":1,"start":0,"limit":25
       }],
       "type":"rpc",
       "tid":86}];
}
