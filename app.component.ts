import { Component, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataTableModule, SharedModule, TreeNode } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { DataService, WebsocketService } from './common/services/index';
import { TestData } from './components/shared/models';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService, WebsocketService]
})

export class AppComponent implements OnInit {
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


  showInRubyApp: true;
  constructor(private testDataService: DataService, socketService: WebsocketService) {
  }
  ngOnInit() {
    this.showInRubyApp = true;
    // this.initEvent.emit(this.showInRubyApp);	  	  
  }
}
