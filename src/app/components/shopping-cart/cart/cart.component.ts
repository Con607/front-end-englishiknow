import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavbarService } from '../../../services/navbar.service';
import { CartService } from '../../../services/cart.service';
import { Course } from '../../../models/course.model';

declare let paypal :any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterViewChecked, OnDestroy {

  addScript :string = 'false';
  paypalLoad :boolean = true;
  finalAmount :number = 1;
  cartItems :Course[] = [];
  paymentConfirmed :boolean = false;

  constructor( private router:Router,
                private _navbarService:NavbarService,
                private authService:AuthService,
                private cartService:CartService ) { }

  ngOnInit() {
    this._navbarService.show();

    if ( localStorage.getItem('addScript') ) {
      this.addScript = localStorage.getItem('addScript');
    }

    this.loadCartItems();
    this.getCartTotal();
  }

  ngOnDestroy(): void {
    this.addScript = 'false';
    localStorage.setItem('addScript', 'false');
  }

  loadCartItems() {
    this.cartService.getCartItems()
          .subscribe( res => {
            this.cartItems = res;
          })
  }

  getCartTotal() {
    this.finalAmount = 0;
    for ( let course of this.cartItems ) {
      this.finalAmount += course.price;
    }
  }

  deleteItem( index :number ) {
    this.cartItems.splice( index, 1 );
    localStorage.setItem('cartItems', JSON.stringify( this.cartItems ) );
    this.getCartTotal();
  }



  // Paypal integration starts here
  paypalCongig = {
    env: 'sandbox',
    client: {
      sandbox: 'AauzFRSvF0wOxfB_muQ_07yF2FucXGoxEoL_46Poq0n38ydITQ_i9twbJBgmmUOB-VOnQkBYXpluI9mS',
      production: '<production key here>'
    },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'responsive',
        color: 'silver',
        shape: 'pill',
        label: 'checkout',
        tagline: 'true'
      },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
        // Send data to backend API server
        this.sendPaymentConfirmed( payment, data, this.cartItems );
        // Delete items from localStorage
        this.clearCartItems();
        // Change class value
        this.setPaymentConfirmed( true );
      })
    }
  }

  ngAfterViewChecked(): void {
    if (( this.addScript === 'false' ) && ( this.authService.isLoggedIn() )) {
        this.addScript = 'true';
        localStorage.setItem('addScript', 'true');
        this.addPaypalScript().then(() => {
          paypal.Button.render(this.paypalCongig, 'paypal-button-container');
        })
    }
  }

  addPaypalScript() {
    this.addScript = 'true';
    return new Promise((resolve, reject) => {
      let scriptTagElement = document.createElement('script'); // Insert <script> in the page
      scriptTagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scriptTagElement.onload = resolve;
      document.body.appendChild(scriptTagElement);
    })
  }
  // Paypal integration ends here



  setPaymentConfirmed( value :boolean ) {
    this.paymentConfirmed = value;
  }

  clearCartItems() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

  sendPaymentConfirmed( payment :any, data :any, cartItems :Course[] ) {
    this.cartService.sendPaymentConfirmed( payment, data, this.cartItems )
          .subscribe( res => {
            console.log(res);
          })
  }


}
