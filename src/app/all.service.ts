import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
import "@codetrix-studio/capacitor-google-auth";
import { Plugins } from "@capacitor/core";
const { SplashScreen, GoogleAuth } = Plugins;
@Injectable({
  providedIn: "root",
})
export class AllService {
  //oatuhkey 675059146750-t9gu0br2087a2to38dnp87vt7d6a98h8.apps.googleusercontent.com
  user: User;
  backendurl: string = "http://localhost:5000/";
  url: string = "https://www.coinimp.com/api/v2/";
  sitekey: string =
    "0d9676b27fbbb0596c1d716eafde94dd6fe38ef311a6c232de46a78ac2230755";

  keys = {
    public: "e2466ebdd40e5539832b7f21e7e06d32d28d0a12ebfb18dbc8024bb6b0f68c6e",
    private: "73ad440989058544f18116c0b715f3e72c0c6d63ea335cacb0de9602c297de39",
  };
  constructor(
    public http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    GoogleAuth.addListener("userChange", (user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }

  async logout() {
    await GoogleAuth.signOut();
    localStorage.removeItem("user");
    this.router.navigate(["/profile"]);
  }

  public isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  public async loginWithGoogle() {
    await GoogleAuth.signIn();
    this.router.navigate(["/earn"]);
  }

  public geturl(url: string) {
    return this.http.get(url, {
      responseType: "text",
    });
  }

  public getUserBalance(user: string) {
    return this.http.post(this.backendurl + "getUserBalance", {
      user,
    });
  }
}
