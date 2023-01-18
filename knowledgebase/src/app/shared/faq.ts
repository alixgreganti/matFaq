// faq.ts
// contains the interface for readingdata from slice 52053
import { getData } from '../shared/datalynk.service';
export var categories: string[] = [];
export var faqs: Array<FAQ> = [];

interface FAQ { // make the interface for the row data
  id: number;
  Title: string;
  Category: string;
  Description: string;
  created: Date;
}

getData().then(data => {
  data.rows.forEach((item: FAQ) => { // iterate through the row data
      faqs.push({
        id : item.id,
        Title : item.Title,
        Category : item.Category,
        Description : item.Description,
        created : item.created       
      })
      
      if(!categories.includes(item.Category)){
        categories.push(item.Category)
      }
  });
});

console.log(faqs)
console.log(categories)