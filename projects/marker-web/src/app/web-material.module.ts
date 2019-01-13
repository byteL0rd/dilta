import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatTabsModule,
  MatMenuModule,
  MatToolbarModule
  } from '@angular/material';

const modules = [
    MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatDividerModule,
  MatToolbarModule,
  MatCardModule,
  MatTabsModule,
  MatMenuModule,
   CommonModule
  ];

@NgModule({
  imports: modules,
  exports: modules,
})
export class WebMaterialModule {}