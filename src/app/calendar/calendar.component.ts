import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppStatusService } from '../app-status.service';
import { DayService } from '../day.service';
import { Day } from '../day';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  days: Day[];
  constructor(
    private appStatusService: AppStatusService,
    private dayService: DayService
  ) { }

  ngOnInit() {
    this.appStatusService.workInProgress();
    this.dayService.days$.subscribe(days => {
      this.days = days;
      this.appStatusService.available();
    });
  }
  ngOnDestroy() {
    this.appStatusService.workInProgress();
  }

}
