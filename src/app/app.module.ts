import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    // { provide: WEB3, useFactory: () => window.web3 },
    // { provide: ETH, useFactory: () => window.web3.eth },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
