import { Component, OnInit } from '@angular/core';
import {Contact} from "../shared/models/contact/contact";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isLoading = true;
  contacts: Contact[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  load() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 5000);
  }

}
