import { Component, OnInit } from '@angular/core';
import { faqs} from '../shared/faq';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(faqs)
  }

}
