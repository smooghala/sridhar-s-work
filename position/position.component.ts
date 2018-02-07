
import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { DataService, WebsocketService } from '../common/services';
import { TestData } from '../components/shared/models';

@Component({
	selector: 'app-position',
	templateUrl: './position.component.html',
	styleUrls: ['./position.component.css'],
	providers: [DataService, WebsocketService]
})
export class PositionComponent implements OnInit {
	title = 'app';
	lTestData: TestData[];
	lTreeData: TreeNode[];
	lCopyData: TreeNode[];
	selectedFile: TreeNode;
	lTest: any = {};
	items: any = {};
	totalCols: any = {};
	Arr = Array;
	num: number = 12;
	msgs: any = [];
	cities1: any = {};
	valSelected: string;
	postData: any = {};
	messages = [];
	tempValues = [];
	constructor(private testDataService: DataService, socketService: WebsocketService) {
		this.valSelected = "Please Select";
	}

	sendMessage(val) {
		this.testDataService.sendMessage(val);
	}
	ngOnInit() {
		if (this.tempValues.length == 0) {
			this.tempValues.push({ type: "new-message", text: "No New messages" });
		}
		// this.testDataService.getMessages().subscribe(message => {
		// 	this.messages.push(message);
		// })
	}


	ngAfterContentChecked() {
		this.tempValues = this.messages;
	}
	setSelected(val) {

		this.valSelected = (val == 'SME') ? 'Scenatio Manager Economic Variable Mapping' : 'Missing Curve Currency Mapping';

		if (val == "SME") {
			this.sendMessage("Loading SME values as per user request");
			this.postData = {
				"action": "mappingController",
				"data": [
					{
						"asOfDate": "30-Jun-2017",
						"datasetId": 1,
						"limit": 30,
						"page": 1,
						"search": {
							"country": null,
							"key": null,
							"value": null
						},
						"sort": [
							{
								"direction": "ASC",
								"property": "key"
							}
						],
						"start": 0
					}
				],
				"method": "findRcastDataWithPaging",
				"tid": 89,
				"type": "rpc"
			};


			this.testDataService.getDataForScenario(this.postData).then(lTestData => {
				if (lTestData[0] != null) {
				//	this.lTestData = lTestData[0].result.records;
				}
			});


		} else {
			this.sendMessage("Loading MCC values as per user request");
			this.postData = {
				"action": "mappingController",
				"data": [
					{
						"asOfDate": "30-Jun-2017",
						"datasetId": 1,
						"limit": 30,
						"page": 1,
						"search": {
							"comments": null,
							"dstCcy": null,
							"dstCurve": null,
							"srcCurve": null
						},
						"sort": [
							{
								"direction": "ASC",
								"property": "dstCcy"
							}
						],
						"start": 0
					}
				],
				"method": "findCurrencyCurveDataWithPaging",
				"tid": 90,
				"type": "rpc"
			};
			this.testDataService.getDataForScenario(this.postData).then(lTestData => {
				if (lTestData[0] != null) {
				//	this.lTestData = lTestData[0].result.records;
				}
			});
		}
	}





}
