import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  /*
   * Logs the user out
   */
  onLogout(): void {
    this.authService.logout();
  }

}
