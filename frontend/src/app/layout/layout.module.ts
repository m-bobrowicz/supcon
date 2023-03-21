import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/layout/layout.component';
import { SidebarModule } from 'src/app/layout/sidebar/sidebar.module';
import { IconsModule } from 'src/app/lib/icon/icon.module';

@NgModule({
  exports: [LayoutComponent],
  declarations: [LayoutComponent],
  imports: [CommonModule, RouterModule, SidebarModule, IconsModule],
})
export class LayoutModule {}
