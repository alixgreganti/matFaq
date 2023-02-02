import { Component, OnInit } from '@angular/core';
import { getData } from '../shared/datalynk.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface FAQ {
  // make the interface for the row data
  id: number;
  title: string;
  category: string;
  description: any;
  steps: any;
  created: Date;
}

interface step {
  // make the interface for the row data
  id: number;
  step: string;
  faq: string;
  faqID: number;
  created: Date;
}

@Component({
  selector: 'app-faq-content',
  template: `
    <div class="row">
      <div class="col-sm-2" id="sideNav">
        <ng-template [ngIf]="faqLoaded | async">
          <div *ngFor="let category of categories">
            <h3 (click)="filterFaq(category)" class="category">
              {{ category }}
            </h3>
          </div>
        </ng-template>
      </div>

      <div class="col-sm" id="content">
        <ng-template [ngIf]="(faqLoaded | async) && (stepsLoaded | async)" [ngIfElse]="loading" ]>
          <div *ngFor="let question of filteredFaqs">
            <div class="card" style="width: 100%;">
              <div class="card-body">
                <h5 class="card-title">{{ question.title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{ question.category }}
                </h6>
                <div class="card-text">
                  {{ question.description }}

                  <ul>
                    <div *ngFor="let step of question.steps">
                      <li>{{ step.step }}</li>
                    </div>
                  </ul>

                </div>
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
  faqLoaded: Promise<Boolean> = Promise.resolve(false); //Keeps track of when the data is loaded from source
  stepsLoaded: Promise<Boolean> = Promise.resolve(false); //Keeps track of when the data is loaded from source

  categories: string[] = [];

  faqs: Array<FAQ> = [];
  steps: Array<step> = [];
  filteredFaqs = this.faqs; //by default there is no filter applied

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnInit(): Promise<void> {
    this.categories.push('All'); //Adds "All" category

    await this.getSteps();
    await this.getFaqs();
  }
  
  private async getSteps(): Promise<void> {
    console.log('Getting steps...');
    const data = await getData(52095);
    data.rows.forEach((item: step) => {
      console.log(item);
      this.steps.push({
        //adds the data taken to faqs using the FAQ interface
        id: item.id,
        step: item.step,
        faq: item.faq,
        faqID: item.faqID,
        created: item.created,
      });
    });
    this.stepsLoaded = Promise.resolve(true);
  }
  
  private async getFaqs(): Promise<void> {
    console.log('Getting data...');
    const data = await getData();
    data.rows.forEach((item: FAQ) => {
      // iterate through the row data
      this.faqs.push({
        //adds the data taken to faqs using the FAQ interface
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        steps: this.steps.filter((step) => step.faqID === item.id),
        created: item.created,
      });
  
      if (!this.categories.includes(item.category)) {
        this.categories.push(item.category);
      }
    });
    console.log('Finished getting FAQs');
    this.faqLoaded = Promise.resolve(true);
  }

  filterFaq(category: string) {
    if (category == 'All') {
      //Show all
      this.filteredFaqs = this.faqs;
    } else {
      //Set filteredFaqs equal to the faq, filter the faqs by the selected category
      this.filteredFaqs = this.faqs.filter((faq) => faq.category === category);
    }
  }
}
