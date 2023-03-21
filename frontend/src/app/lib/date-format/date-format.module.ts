import { NgModule } from '@angular/core';
import { DateFormatPipe } from 'src/app/lib/date-format/date-format.pipe';

@NgModule({
  exports: [DateFormatPipe],
  declarations: [DateFormatPipe],
})
export class DateFormatModule {}
