import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { TreeModule, TreeNode } from 'primeng/primeng';

import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import * as io from 'socket.io-client';
import { AppConstants } from '../constants';
import { TestData } from '../../components/shared/models';
import { TreeviewItem } from '../ui/lib';

@Injectable()
export class DataService {
	private socket;
	//messages: Subject<any>;
	apiSocketUrl: string;
	apiUrl: String;
	apiEmeraldUrl: String;
	constructor(private http: Http, wsService: WebsocketService) {
		this.apiSocketUrl = AppConstants.API_SOCKET_ENDPOINT;
		this.apiUrl = AppConstants.API_RUBY_ENDPOINT;
		this.apiEmeraldUrl = AppConstants.API_EMERALD_ENDPOINT;
		// this.messages = <Subject<any>>wsService
		// 	.connect()
		// 	.map((response: any): any => {
		// 		return response;
		// 	})
	}
	getMessages() {
		let observable = new Observable(observer => {
			this.socket = io(this.apiSocketUrl);
			this.socket.on('message', (data) => {
				observer.next(data);
			});
			return () => {
				this.socket.disconnect();
			};
		})
		return observable;
	}
	sendMessage(msg) {
		// this.messages.next(msg);
	}
	getStaticData() {

		return this.http.get('assets/data/testData.json')
			.toPromise()
			.then(res => <TestData[]>res.json().data)
			.then(data => { return data });

	}
	

	getFpPopupData(req) {
		return this.http.get(this.apiUrl + '/ruby/services/common/findAllResoScenariosByUserAccess?asOfDate=31-Dec-2016&soeid=aa80019&datasetId=2&datasetName=SECONDARY', req)
			.toPromise()
			.then(res => <TestData[]>res.json())
			.then(data => { return data });
	}

	getTreeData() {

		return this.http.get('assets/data/actualData.json')
			.toPromise()
			.then(res => <TreeNode[]>res.json().data)
			.then(data => { return data });


	}
	getDropDownTreeData() {
		return this.http.get('assets/data/actualData.json')
			.toPromise()
			.then(res => <TreeviewItem[]>res.json().data)
			.then(data => { return data });
	}
	getDataForScenario(req) {


		return this.http.get(this.apiUrl + '/ruby/services/common/findAllResoScenariosByUserAccess?asOfDate=31-Dec-2016&soeid=aa80019&datasetId=2&datasetName=SECONDARY',req)
			.toPromise()
			.then(res => <TestData[]>res.json())
			.then(data => { return data });
	}
	postData(req) {
		return this.http.get(this.apiUrl + '/ruby/services/common/findAllResoScenariosByUserAccess?asOfDate=31-Dec-2016&soeid=aa80019&datasetId=2&datasetName=SECONDARY', req)
			.toPromise()
			.then(res => <TestData[]>res.json())
			.then(data => { return data });
	}
	postDataForEmerald(req) {
		return this.http.get(this.apiEmeraldUrl + '/ruby/services/common/findAllResoScenariosByUserAccess?asOfDate=31-Dec-2016&soeid=aa80019&datasetId=2&datasetName=SECONDARY', req)
			.toPromise()
			.then(res => <TestData[]>res.json())
			.then(data => { return data });
	}

}


