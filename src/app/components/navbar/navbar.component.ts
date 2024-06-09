import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userType: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    console.log('Navbar userType:', this.userType);
  }

  logout(): void {
    this.authService.logout();
  }
}
