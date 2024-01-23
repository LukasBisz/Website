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
  session: any;
  constructor(private authservice: AuthService) {
    authservice.sessionSubject.subscribe({
      next: (u) => (this.session = u),
    });
  }
  ngOnInit(): void {
    this.authservice.setSession();
  }

  logout() {
    this.authservice.logout();
  }
}
