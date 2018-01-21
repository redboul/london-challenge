import { Output, Component, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.toggleMenu.next();
  }
}
