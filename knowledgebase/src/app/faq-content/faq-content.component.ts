import { Component, OnInit } from '@angular/core';
import { getData } from '../shared/datalynk.service';

interface FAQ {
  // make the interface for the row data
  id: number;
  Title: string;
  Category: string;
  Description: string;
  created: Date;
}

@Component({
  selector: 'app-faq-content',
  template: `
    <div class="row">
      <div class="col-sm-2" id="sideNav">
        <ng-template [ngIf]="dataLoaded | async">
          <div *ngFor="let category of categories">
            <h3 (click)="filterFaq(category)" class="category">
              {{ category }}
            </h3>
          </div>
        </ng-template>
      </div>

      <div class="col-sm" id="content">
        <ng-template [ngIf]="dataLoaded | async" [ngIfElse]="loading" ]>
          <div *ngFor="let question of filteredFaqs">
            <div class="card" style="width: 100%;">
              <div class="card-body">
                <h5 class="card-title">{{ question.Title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{ question.Category }}
                </h6>
                <p class="card-text">{{ question.Description }}</p>
              </div>
            </div>
          </div>
        </ng-template>

        <ng-template #loading>
          <div>
            <h2>loading...</h2>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./faq-content.component.scss'],
})
export class FaqContentComponent implements OnInit {
  dataLoaded: Promise<Boolean> = Promise.resolve(false); //Keeps track of when the data is loaded from source
  categories: string[] = [];

  faqs: Array<FAQ> = [];
  filteredFaqs = this.faqs; //by default there is no filter applied

  constructor() {}

  ngOnInit(): void {
    this.categories.push('All'); //Adds "All" category

    getData().then((data) => {
      console.log('Getting data...');
      data.rows.forEach((item: FAQ) => {
        // iterate through the row data
        this.faqs.push({
          //adds the data taken to faqs using the FAQ interface
          id: item.id,
          Title: item.Title,
          Category: item.Category,
          Description: item.Description,
          created: item.created,
        });

        if (!this.categories.includes(item.Category)) {
          this.categories.push(item.Category);
        }
      });
      console.log('Finished getting FAQs');
      this.dataLoaded = Promise.resolve(true);
    });
  }

  filterFaq(category: string) {
    if (category == 'All') {
      //Show all
      this.filteredFaqs = this.faqs;
    } else {
      //Set filteredFaqs equal to the faq, filter the faqs by the selected category
      this.filteredFaqs = this.faqs.filter((faq) => faq.Category === category);
    }
  }
}
