import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field';
import { FloatingInputComponent } from '../floating-input/floating-input.component';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';

const material=[
      MatButtonModule,
      MatIconModule,
      MatSelectModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatTabsModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSidenavModule,
      MatDividerModule,
      MatToolbarModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatSlideToggleModule,
      MatDialogModule
  ];
@NgModule({
  declarations:[
    FloatingInputComponent
  ],
   imports:[material,

    ],
   exports: [material,FloatingInputComponent]
})
export class MaterialModule { }
