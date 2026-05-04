import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  user: any;
  constructor(private authservice: AuthService) {
    authservice.userSubject.subscribe({
      next: (u) => (this.user = u),
    });
  }
  ngOnInit(): void {
    this.authservice.setUser();
  }

  logout() {
    this.authservice.logout();
  }
}
