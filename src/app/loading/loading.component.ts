import { Component, OnInit } from '@angular/core';
import { AppStatusService } from '../app-status.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(public appStatus: AppStatusService) { }

  ngOnInit() {
  }

}
