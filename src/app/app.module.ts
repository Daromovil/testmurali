import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialCommon } from './shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header-component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { HomePage } from './modules/home/home.page';
import { HttpConfigInterceptor } from './interceptors/http.interceptor';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './providers/url-serializer';
import { RxTranslateModule } from '@rxweb/translate';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LeftNavComponent } from './components/left-nav/left-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    HeaderComponent,
    //YajnaNavComponent,  
    FooterComponent,
    LeftNavComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialCommon,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoggerModule.forRoot({
      //serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.ERROR,
      disableConsoleLogging: false
    })],
  //exports: [LeftNavComponent],
  //exports: [LeftNavComponent],
  providers: [Title,
    //RxTranslateModule,
    { provide: UrlSerializer, useClass: LowerCaseUrlSerializer },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    //{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
