import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { auth } from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "firebase";
@Injectable({
  providedIn: "root",
})
export class AllService {
  user: User;
  url: string = "https://www.coinimp.com/api/v2/";
  constructor(
    private http: HttpClient,
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem("user", JSON.stringify(this.user));
      } else {
        localStorage.setItem("user", null);
      }
    });
  }
  async logout() {
    await this.afAuth.signOut();
    localStorage.removeItem("user");
    this.router.navigate(["/profile"]);
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem("user"));
    return user !== null;
  }

  async loginWithGoogle() {
    await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(["/earn"]);
  }

  geturl(url : string) {
    return this.http.get(url, {
      responseType: "text",
    });
  }


}
