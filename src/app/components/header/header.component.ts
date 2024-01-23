import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  session: any;
  constructor(private authservice: AuthService) {
    authservice.sessionSubject.subscribe({
      next: (u) => (this.session = u),
    });
  }

  logout() {
    this.authservice.logout();
  }
}
