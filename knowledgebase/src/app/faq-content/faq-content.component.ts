import { Component, OnInit } from '@angular/core';
import { categories, faqs } from '../shared/faq';

@Component({
  selector: 'app-faq-content',
  templateUrl: './faq-content.component.html',
  styleUrls: ['./faq-content.component.scss']
})
export class FaqContentComponent implements OnInit {

  uniqueCat = categories;
  questions = faqs;

  constructor() {}

  ngOnInit(): void {
    this.uniqueCat.push("ALL")
  }
}
