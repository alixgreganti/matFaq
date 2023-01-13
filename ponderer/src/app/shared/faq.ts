// faq.ts
// contains the interface for readingdata from slice 52053
import { getData } from '../shared/datalynk.service';

interface FAQ {
  id: number;
  title: string;
  category: string;
  description: string;
  created: Date;
}

const data: any = getData()
console.log(data)

export var faqs: FAQ[];
