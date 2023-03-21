import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isNotLoading$ = this.appService.isLoading$.pipe(
    map((isLoading) => isLoading === false)
  );

  constructor(private appService: AppService) {}
}
