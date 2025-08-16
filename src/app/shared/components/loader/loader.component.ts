import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/state/app.state';
import { selectLoading } from '../../../core/state/ui/ui.selectors'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [CommonModule]
})
export class LoaderComponent implements OnInit {
  private store = inject(Store<AppState>);
  loading$ = this.store.select(selectLoading);

  ngOnInit(): void {}
}
