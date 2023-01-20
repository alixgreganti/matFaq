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
        <ng-template [ngIf]="filter == category" [ngIfElse]="inactive"]>

        </ng-template>
        
        <ng-component #inactive>
          <h3 (onclick)="filterFaq(category)" class="category">{{category}}</h3>
        </ng-component>

      </div>
      </ng-template>

      </div>

      <div class="col-sm" id="content">
        <ng-template [ngIf]="dataLoaded | async" [ngIfElse]="loading" ]>
          <div *ngFor="let question of faqs">
            <div class="card" style="width: 80%;">
              <div class="card-body">
                <h5 class="card-title">{{ question.Title }}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                  {{ question.Category }}
                </h6>
                <p class="card-text">{{ question.Description }}</p>
                <a href="#" class="card-link">Card link</a>
                <a href="#" class="card-link">Another link</a>
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
  categories: string[] = [];

  faqs: Array<FAQ> = [];
  filteredFaqs: Array<FAQ> = [];

  dataLoaded: Promise<Boolean> = Promise.resolve(false);

  filter: string = "none"

  constructor() {}

  ngOnInit(): void {
    this.categories.push("All")

    getData().then((data) => {
      console.log('Getting data...');
      data.rows.forEach((item: FAQ) => {
        // iterate through the row data
        this.faqs.push({
          id: item.id,
          Title: item.Title,
          Category: item.Category,
          Description: item.Description,
          created: item.created,
        });

        if(!this.categories.includes(item.Category)){
          this.categories.push(item.Category)
        }
      });
      console.log('Finished getting FAQs');
      this.dataLoaded = Promise.resolve(true);
    });
  }

  filterFaq(category: string){
    if(category=="All"){
      this.filter = "none"
    } else {
      this.filter = category
    }
  }
}
