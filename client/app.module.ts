import './polyfills';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app/app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {AccountListComponent} from './account-list/account-list.component';

import {enableProdMode} from '@angular/core';
import { TestComponent } from './app/test/test.component';
import { UserComponent } from './app/user/user.component';
import { UserListComponent } from './app/user-list/user-list.component';
import { UserInsertComponent } from './app/user-insert/user-insert.component';
import { FunctionTestComponent } from './app/function-test/function-test.component';
import { ArrowfunctionComponent } from './app/arrowfunction/arrowfunction.component';
import { PromiseTestComponent } from './app/promise-test/promise-test.component';
import { UserHisComponent } from './app/user-his/user-his.component';
import { NotFoundComponent } from "./app/not-found/not-found.component";
enableProdMode();

//{ path: '**', component: NotFoundComponent }로 안한 이유 => 속도 차이때문에
const routing = RouterModule.forRoot([
    { path: '',      		component: WelcomeComponent },
    { path: 'accountlist', 	component: AccountListComponent },
    { path: 'test', 		component: TestComponent },
    { path: 'userlist', 	component: UserComponent },
    { path: 'functiontest', component: FunctionTestComponent },
    { path: 'arrowfunctest',component: ArrowfunctionComponent },
	{ path: 'promisetest', 	component: PromiseTestComponent },
	{ path: '404', 			component: NotFoundComponent },
	{ path: '**', 			redirectTo: '404'}
]);

@NgModule({
    imports: [BrowserModule,
    		  routing,
    		  HttpModule,
    		  FormsModule,
    		  ReactiveFormsModule],
    declarations: [AppComponent,
    			   WelcomeComponent,
    			   AccountListComponent,
    			   TestComponent,
    			   UserComponent,
    			   UserListComponent,
    			   UserInsertComponent,
    			   FunctionTestComponent,
    			   ArrowfunctionComponent,
    			   PromiseTestComponent,
				   UserHisComponent,
				   NotFoundComponent
             ],
    //providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}