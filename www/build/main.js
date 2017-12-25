webpackJsonp([2],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__reg_reg__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__trans_trans__ = __webpack_require__(78);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(fireAuth, navCtrl, db, alertCtrl) {
        this.fireAuth = fireAuth;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.order = [];
        this.countOrders = 0;
        this.drinks = [{
                id: 0,
                name: "ماء",
                price: "1",
            },
            {
                id: 1,
                name: "عصير",
                price: "1.10",
            },
            {
                id: 2,
                name: "بيبسي",
                price: "1.20",
            },
            {
                id: 3,
                name: "كابتشينو",
                price: "1.30",
            },
            {
                id: 4,
                name: "شاي",
                price: "1.90",
            },
            {
                id: 5,
                name: "هوت شوكلت",
                price: "2.10",
            },
            {
                id: 6,
                name: "كاكاو",
                price: "2.00",
            },
            {
                id: 7,
                name: "أفوكادو",
                price: "1.90",
            }];
        this.foods = [{
                id: 8,
                name: "كيك",
                price: "1.50",
            },
            {
                id: 9,
                name: "بسبوسة",
                price: "1.30",
            },
            {
                id: 10,
                name: "تشيز كيك",
                price: "1.70",
            },
            {
                id: 11,
                name: "بيتزا",
                price: "2.70",
            },
            {
                id: 12,
                name: "دونات",
                price: "1.90",
            },
            {
                id: 13,
                name: "سكالوب",
                price: "1.20",
            },
            {
                id: 14,
                name: "برجر",
                price: "1.20",
            },
            {
                id: 15,
                name: "سمك",
                price: "2.50",
            }
        ];
        this.itemsRef = db.list('/trans/', function (ref) { return ref.limitToLast(50); });
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
        fireAuth.auth.onAuthStateChanged(function (user) {
            if (!user) {
                navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__reg_reg__["a" /* RegPage */]);
            }
        });
    }
    HomePage.prototype.addToOrderList = function (item, qty) {
        var flag = 0;
        if (this.order.length > 0) {
            for (var i = 0; i < this.order.length; i++) {
                if (item.id === this.order[i].id) {
                    item.qty += qty;
                    flag = 1;
                    break;
                }
            }
            if (flag === 0) {
                item.qty = 1;
            }
            if (item.qty < 2) {
                this.order.push(item);
            }
        }
        else {
            item.qty = qty;
            this.order.push(item);
        }
    };
    HomePage.prototype.removeSingleItem = function (item) {
        for (var i = 0; i < this.order.length; i++) {
            if (item.id === this.order[i].id) {
                item.qty -= 1;
                if (item.qty === 0) {
                    this.order.splice(i, 1);
                }
            }
        }
    };
    HomePage.prototype.removeItem = function (item) {
        for (var i = 0; i < this.order.length; i++) {
            if (item.id === this.order[i].id) {
                this.order.splice(i, 1);
            }
        }
    };
    HomePage.prototype.getTotal = function () {
        var tot = 0;
        for (var i = 0; i < this.order.length; i++) {
            tot += (this.order[i].price * this.order[i].qty);
        }
        return tot;
    };
    HomePage.prototype.clearOrderList = function () {
        this.order = [];
    };
    HomePage.prototype.checkout = function () {
        this.countOrders += 1;
        var alert = this.alertCtrl.create({ title: "Order Number: " + this.countOrders.toString(),
            subTitle: "Amount: " + this.getTotal().toFixed(2).toString() + " Payment received. Thanks",
            buttons: ['OK'] });
        alert.present();
        this.itemsRef.push({ orderNum: this.countOrders, total: this.getTotal().toFixed(2), Date: Date() });
        //this.itemsRef.push(this.order);
        this.order = [];
    };
    HomePage.prototype.getLastTrans = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__trans_trans__["a" /* TransPage */]);
    };
    HomePage.prototype.signOut = function () {
        this.fireAuth.auth.signOut();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/hossam/POS/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar dir="rtl" color="primary">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>قائمة المنتجات - الرئيسية</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding dir="rtl">\n\n\n  <ion-grid>\n\n    <ion-row>\n\n      <ion-col col-6>\n      <ion-list>\n          <ion-list-header>\n            المشروبات\n          </ion-list-header>\n    <button ion-item  *ngFor="let item of drinks" (click)="addToOrderList(item,1)">{{item.name}}</button>\n  </ion-list>\n</ion-col>\n\n<ion-col col-6>\n  <ion-list>\n      <ion-list-header>\n          المأكولات\n        </ion-list-header>\n\n    <button ion-item *ngFor="let item of foods" (click)="addToOrderList(item,1)">{{item.name}}</button>\n  \n  </ion-list>\n</ion-col>\n\n</ion-row>\n\n</ion-grid>\n\n\n  <ion-card style="background:#34495e;" class="listOfitems" *ngFor=" let item of order">\n\n      <ion-card-content style="color:white;">\n      <div>\n         <h1 style="color:aliceblue"> {{item.name}} </h1>\n          <button ion-button (click)="addToOrderList(item,1)">\n              <span>+</span>\n          </button>\n    \n          <button ion-button (click)="removeSingleItem(item)">\n              <span>-</span>\n          </button>\n    \n          <button ion-button (click)="removeItem(item)">\n              <span>حذف</span>\n          </button>\n      </div>\n\n      الكمية: <span>{{item.qty}}</span>\n      السعر: <span>{{item.price * item.qty | currency:0}}</span>\n        </ion-card-content>\n  </ion-card>\n\n\n  <button ion-button (click)="clearOrderList()" [disabled]="!order.length">مسح الكل</button>\n\n  <button ion-button (click)="checkout()" [disabled]="!order.length">موافق</button>\n\n  <button ion-button (click)="getLastTrans()">عرض آخر الحركات</button>\n\n  <button ion-button (click)="signOut()">\n      تسجيل الخروج\n</button>\n\n<br><br>\n  <div [hidden]="!order.length">\n      <h3><span>المجموع: {{getTotal() | currency:"$":0}}</span></h3>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/hossam/POS/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 148:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 148;

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/reg/reg.module": [
		449,
		1
	],
	"../pages/trans/trans.module": [
		450,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 191;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(306);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 306:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(440);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_trans_trans__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_reg_reg__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var firebaseConfig = {
    apiKey: "AIzaSyDijEX8Lm_QHqurs_Swmo4QZV84wGukI60",
    authDomain: "pos-system-1a492.firebaseapp.com",
    databaseURL: "https://pos-system-1a492.firebaseio.com",
    projectId: "pos-system-1a492",
    storageBucket: "",
    messagingSenderId: "509102260470"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_trans_trans__["a" /* TransPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_reg_reg__["a" /* RegPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/reg/reg.module#RegPageModule', name: 'RegPage', segment: 'reg', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trans/trans.module#TransPageModule', name: 'TransPage', segment: 'trans', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_trans_trans__["a" /* TransPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_reg_reg__["a" /* RegPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["a" /* AngularFireDatabase */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 440:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_trans_trans__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_reg_reg__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, fireAuth) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.fireAuth = fireAuth;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'نقطة البيع (المنتجات)', component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */] },
            { title: 'الحركات', component: __WEBPACK_IMPORTED_MODULE_5__pages_trans_trans__["a" /* TransPage */] },
            { title: 'تسجيل الدخول', component: __WEBPACK_IMPORTED_MODULE_6__pages_reg_reg__["a" /* RegPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.signOut = function () {
        this.fireAuth.auth.signOut();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/hossam/POS/src/app/app.html"*/'<ion-menu [content]="content" dir="rtl">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>نقطة بيع (POS)</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n      <button ion-button (click)="signOut()">\n          تسجيل الخروج\n        </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/hossam/POS/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the RegPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegPage = (function () {
    function RegPage(navCtrl, navParams, ofAuth, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.ofAuth = ofAuth;
        this.toastCtrl = toastCtrl;
    }
    RegPage.prototype.login = function () {
        var _this = this;
        this.ofAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function (user) { return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]); });
        var toast = this.toastCtrl.create({
            message: 'You are Signed In Successfully!',
            duration: 5000
        });
        toast.present();
    };
    RegPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegPage');
    };
    RegPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-reg',template:/*ion-inline-start:"/home/hossam/POS/src/pages/reg/reg.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar dir="rtl" color="danger">\n      <ion-title>تسجيل الدخول</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content padding dir="rtl">\n  <h3 style="color:red;">*يجب تسجيل الدخول</h3>\n  <ion-item>\n  <ion-label>البريد اﻹلكتروني</ion-label>\n  <ion-input type="text" [(ngModel)]="email"></ion-input>\n  </ion-item>\n  \n  <ion-item>\n  <ion-label>كلمة المرور</ion-label>\n  <ion-input type="password" [(ngModel)]="password"></ion-input>\n  </ion-item>\n  \n  <button ion-button (click)="login()">دخول</button>\n  \n  </ion-content>'/*ion-inline-end:"/home/hossam/POS/src/pages/reg/reg.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], RegPage);
    return RegPage;
}());

//# sourceMappingURL=reg.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(106);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the TransPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransPage = (function () {
    function TransPage(navCtrl, db, toastCtrl, alertCtrl) {
        /*fireAuth.auth.onAuthStateChanged(function(user) {
          if (!user) {
            navCtrl.setRoot(RegisterPage);
          }
      
      
        }); */
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.itemsRef = db.list('/trans/', function (ref) { return ref.limitToLast(100); });
        // Use snapshotChanges().map() to store the key
        this.items = this.itemsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    }
    TransPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransPage');
    };
    TransPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-trans',template:/*ion-inline-start:"/home/hossam/POS/src/pages/trans/trans.html"*/'<!--\n  Generated template for the TransPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar dir="rtl" color="dark">\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>الحركات</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding dir="rtl">\n\n<h4><u># آخر 100 حركة:</u></h4>\n<br>\n  <ion-card *ngFor="let item of items | async" style="background:#34495e; direction:rtl;     border-radius: 10px 35px 10px 35px;">\n    \n        <ion-card-content style="color:white;">\n          \n          رقم الطلب {{item.orderNum}}\n          المبلغ {{item.total | currency:"$":0}}\n\n        <p style="color:grey; font-size:12px;">{{item.Date | date}}</p>\n\n        </ion-card-content>\n    \n      </ion-card>\n\n    </ion-content>'/*ion-inline-end:"/home/hossam/POS/src/pages/trans/trans.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TransPage);
    return TransPage;
}());

//# sourceMappingURL=trans.js.map

/***/ })

},[285]);
//# sourceMappingURL=main.js.map