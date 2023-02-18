import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';

@NgModule({
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule],
})
export class LayoutModule {}
