import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './generic/main-menu/main-menu.component';
import { UserViewComponent } from './user/user-view/user-view.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScrollSpyModule } from 'ngx-scrollspy';
import { ScrollSpyService } from 'ngx-scrollspy';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './generic/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupSliderComponent } from './generic/popup-slider/popup-slider.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HomeComponent } from './generic/home/home.component';
import { PublicViewComponent } from './generic/public-view/public-view.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { CarouselModule } from 'primeng/carousel';
import { HumanFacePopupComponent } from './human-face-popup/human-face-popup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { MenubarModule } from 'primeng/menubar';
import { UploadFilePopupComponent } from './admin/upload-file-popup/upload-file-popup.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MediaPopupComponent } from './generic/media-popup/add-media-popup.component';
import { MakeupProductsComponent } from './generic/makeup-products/makeup-products.component';
import { AddMakeupProductsPopupComponent } from './generic/add-makeup-products-popup/makeup-products-popup.component';
import { RatingModule } from 'primeng/rating';
import { SignleMakeupProductPopupComponent } from './generic/signle-makeup-product-popup/signle-makeup-product-popup.component';
import { MenuModule } from 'primeng/menu';
import { MatIconModule } from '@angular/material/icon';
import { SliderModule } from 'primeng/slider';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { GenericTableComponent } from './generic/generic-table/generic-table.component';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { TranslationPipe } from './helpers/TranslationPipe';
import { TranslationByValuePipe } from './helpers/TranslationByValuePipe';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    UserViewComponent,
    LoginComponent,
    PopupSliderComponent,
    HomeComponent,
    PublicViewComponent,
    HumanFacePopupComponent,
    DashboardComponent,
    AdminViewComponent,
    UploadFilePopupComponent,
    MediaPopupComponent,
    MakeupProductsComponent,
    AddMakeupProductsPopupComponent,
    SignleMakeupProductPopupComponent,
    GenericTableComponent,
    TranslationPipe,
    TranslationByValuePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MegaMenuModule,
    ScrollSpyModule.forRoot(),
    ButtonModule,
    CardModule,    
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    PasswordModule,
    ModalModule.forRoot(),
    SlickCarouselModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    CarouselModule,
    MenubarModule,
    FileUploadModule,
    DropdownModule,
    InputTextareaModule,
    RatingModule,
    MenuModule,
    MatIconModule,
    SliderModule,
    InputNumberModule,
    TabViewModule,
    TableModule,
    CheckboxModule
  ],
  providers: [ScrollSpyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
