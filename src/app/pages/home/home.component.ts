import { Component, OnInit, ElementRef } from "@angular/core";
import { AllService } from "src/app/all.service";
import { Subscription, Observable } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
declare var Client: any;
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  sitekey: string =
    "459679678a2778cba1b2f3913be67e33dec7b7a5605d131ba8009d8f7335a089";
  running: boolean = false;
  bufferValue: number = 100;
  miner: any;
  miningReady: boolean = false;
  errorMessage: string;
  loading: boolean = true;
  Client: any;
  url: Subscription;
  userLang: string;
  urlStatus: boolean = false;
  counter: number = 0;
  rate: number = 20;

  balance: number;
  auth$: Subscription;

  balance$: Subscription;
  constructor(
    public allService: AllService,
    public elementRef: ElementRef,
    public afAuth: AngularFireAuth
  ) {}

  ngOnDestroy(): void {
    if (this.balance$) {
      this.balance$.unsubscribe();
    }
    if (this.url) {
      this.url.unsubscribe();
    }
    if (this.auth$) {
      this.auth$.unsubscribe();
    }

    if (this.miner) {
      this.miner.stop();
    }
    if (this.running) {
      this.running = false;
    }
    if (this.bufferValue) {
      this.bufferValue = 100;
    }
  }
  ngOnInit() {
    this.userLang = navigator.language;
    this.counter++;

    if (JSON.parse(localStorage.getItem("user"))) {
      this.loading = false;
      let user = JSON.parse(localStorage.getItem("user"));

      this.miner = new Client.User(
        "459679678a2778cba1b2f3913be67e33dec7b7a5605d131ba8009d8f7335a089",
        this.slugify(user["givenName"]) + "-" + user["id"],
        {
          throttle: 1 - this.rate / 100,
          c: "w",
          ads: 0,
        }
      );
      this.balance$ = this.allService
        .getUserBalance(this.slugify(user["givenName"]) + "-" + user["id"])
        .subscribe((data) => {
          this.balance = (data["message"]["hashes"] / 1000000) * 0.75;
        });
      setInterval(() => {
        this.balance$ = this.allService
          .getUserBalance(this.slugify(user["givenName"]) + "-" + user["id"])
          .subscribe((data) => {
            this.balance = (data["message"]["hashes"] / 1000000) * 0.75;
          });
      }, 10000);
    } else {
      this.loading = false;
      this.miner = new Client.Anonymous(
        "459679678a2778cba1b2f3913be67e33dec7b7a5605d131ba8009d8f7335a089",
        {
          throttle: 1 - this.rate / 100,
          c: "w",
          ads: 0,
        }
      );
      this.errorMessage =
        this.userLang == "tr" || this.userLang == "tr-TR"
          ? "Kazanmadan önce giriş yapmalısınız"
          : "Log in before you start earning.";
      this.stop();
      this.bufferValue = 100;
      // this.router.navigate(['/profile'])
    }
  }

  changeRate() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.miningReady = true;
    this.miner = new Client.User(
      "459679678a2778cba1b2f3913be67e33dec7b7a5605d131ba8009d8f7335a089",
      this.slugify(user["givenName"]) + "-" + user["id"],
      {
        throttle: 1 - this.rate / 100,
        c: "w",
        ads: 0,
      }
    );
    this.stop();
    this.start();
  }

  slugify(text) {
    var trMap = {
      çÇ: "c",
      ğĞ: "g",
      şŞ: "s",
      üÜ: "u",
      ıİ: "i",
      öÖ: "o",
    };
    for (var key in trMap) {
      text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
    }
    return text
      .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
      .replace(/\s/gi, "-") // convert spaces to dashes
      .replace(/[-]+/gi, "-") // trim repeated dashes
      .toLowerCase();
  }

  start() {
    this.miner.start();
    this.running = true;
    this.bufferValue = 0;
  }

  stop() {
    this.miner.stop();
    this.running = false;
    this.bufferValue = 100;
  }
}
