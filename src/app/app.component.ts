import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Proyecto-Cine';
  showHomeButton = false;

  constructor(private router: Router) {
    // Evaluate initial URL
    this.setButtonVisibility(this.router.url);

    // Update visibility on navigation end
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((event: any) => {
      this.setButtonVisibility(event.urlAfterRedirects || event.url);
    });
  }

  private setButtonVisibility(url: string) {
    // Show the button only on the CompraSnacks / snacks route
    this.showHomeButton = url === '/snacks' || url.startsWith('/snacks');
  }
}
