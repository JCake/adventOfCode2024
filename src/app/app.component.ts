import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SolutionsPipe } from './solutions.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, SolutionsPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public input = '';
  public day = 1;
}
