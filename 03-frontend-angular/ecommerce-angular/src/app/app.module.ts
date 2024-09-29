import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Injector, NgModule, importProvidersFrom } from '@angular/core';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { myAppConfig } from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { AuthGuard  } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';



function sendToLoginPage(injector: Injector) {
  //? use injector o access any service (here, router) available within the application
  const router = injector.get(Router);

  //? redirect user to the custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'admin/product-management', component: ProductManagementComponent },
  { path: 'members', component: MembersPageComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent,
    SignupComponent,
    ProductManagementComponent,
    AdminPanelComponent,
    UserProfileComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  providers: [AuthService,
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
