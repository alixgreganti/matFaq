// faq.ts
// contains the interface for readingdata from slice 52053
import { getData } from '../shared/datalynk.service';
var response: any


interface FAQ {
  id: number;
  title: string;
  category: string;
  description: string;
  created: Date;
}

getData().then(data => {
    let response = data.json()
})


export var faqs: FAQ[];
