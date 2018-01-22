import { Output, Component, OnInit, EventEmitter } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() toggleMenu = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.toggleMenu.next();
  }
}
