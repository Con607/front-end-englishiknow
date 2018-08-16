import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-translate-eng-to-spas',
  templateUrl: './translate-eng-to-spas.component.html',
  styleUrls: ['./translate-eng-to-spas.component.css']
})
export class TranslateEngToSpasComponent implements OnInit {

  constructor( private _navbarService:NavbarService ) { }

  ngOnInit() {
    this._navbarService.show();
  }

}
