import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { NgbModule, NgbModalModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";

import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';

import { AppComponent } from "./app.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";

import { DragulaService } from "ng2-dragula";
import { AuthService } from "./shared/auth/auth.service";
import { AuthGuard } from "./shared/auth/auth-guard.service";
import { TeamComponent, NgbdModalContent, viewModalContent } from './team/team.component';
import { SallerComponent, NgbdModalContentSaller, viewModalContentSaller } from './saller/saller.component';
import { CustomerComponent, NgbdModalContentCustomer, viewModalContentCustomer } from './customer/customer.component';
import { AngularWebStorageModule } from 'angular-web-storage';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, FullLayoutComponent, ContentLayoutComponent, NgbdModalContent, TeamComponent, viewModalContent, SallerComponent, CustomerComponent, NgbdModalContentSaller, viewModalContentSaller,NgbdModalContentCustomer,viewModalContentCustomer

  ],
  entryComponents: [NgbdModalContent, viewModalContent, NgbdModalContentSaller, viewModalContentSaller,NgbdModalContentCustomer,viewModalContentCustomer],
  imports: [
    BrowserAnimationsModule,
    StoreModule.forRoot({}),
    AppRoutingModule,
    SharedModule,
    NgbModalModule,
    AngularWebStorageModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "YOUR KEY"
    }),
    PerfectScrollbarModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DragulaService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
