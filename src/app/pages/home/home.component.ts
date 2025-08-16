import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [HeaderComponent]
})
export class HomeComponent {
  private router = new Router();

  irAConsultar() {
    this.router.navigate(['/adquisiciones']);
  }

  irACrear() {
    this.router.navigate(['/adquisiciones/nuevo']);
  }
}
