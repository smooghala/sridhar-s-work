import { Component, EventEmitter, OnInit, Injectable, ViewChild, ElementRef, AfterViewInit, Output, Input } from '@angular/core';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { TreeTableModule, TreeModule, TreeNode } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';
import { ContextMenuModule, ContextMenu, MenuItem, MenuModule, GrowlModule, DropdownModule, SelectItem } from 'primeng/primeng';
import { TooltipModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import { DataService } from '../../../common/services';
import { AppConstants } from '../../../common/constants';

@Component({
  selector: 'app-view-fore-cast',
  templateUrl: './view-fore-cast.component.html',
  styleUrls: ['./view-fore-cast.component.css']
})
export class ViewForeCastComponent implements OnInit {
  @Input('lMonthData')
  lMonthData: any = {};
  loadingFp:boolean;
  lTreeDataa:any={};
  totalCols: any = [];
  
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.lTreeDataa = [];
    this.totalCols=[];
      //window.scrollTo(0, 0);
      //this.document.getElementById('sidebar').scrollTop = 0;
      this.loadingFp = true;        
      var lObj = AppConstants.VIEW_FORCAST_PORTFOLIO;
      this.dataService.postData(lObj).then(lTreeDataa => {
        if (lTreeDataa != null) {         
          this.lTreeDataa = lTreeDataa[0]['result'].records;          
          this.loadingFp = false;                      
       }
      });
  }

}
