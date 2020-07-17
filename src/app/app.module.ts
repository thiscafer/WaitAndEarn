import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./pages/home/home.component";
import { ModalComponent } from "./pages/modal/modal.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

var firebaseConfig = {
  apiKey: "AIzaSyAW65E3hv291LIJJXTaZehB9a-Al5pj940",
  authDomain: "waitandearn-c567b.firebaseapp.com",
  databaseURL: "https://waitandearn-c567b.firebaseio.com",
  projectId: "waitandearn-c567b",
  storageBucket: "waitandearn-c567b.appspot.com",
  messagingSenderId: "743860120748",
  appId: "1:743860120748:web:2e081f327103494195c309",
};

@NgModule({
  declarations: [AppComponent, HomeComponent, ProfileComponent, ModalComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule,
    MatInputModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
