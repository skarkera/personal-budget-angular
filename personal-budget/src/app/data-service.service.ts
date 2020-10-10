import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public dataSource1 = {
   // range: [],
    data: [],
    labels: [],
   // legendData: []
    };

  constructor(private http: HttpClient) {
    if(this.dataSource1.labels.length === 0) {
      this.getData();
    }
}

   getData(): void{
     this.http.get('http://localhost:3002/budget').subscribe((res:any) => {
      console.log(res);
       for (let i = 0; i < res.myBudget.length; i++) {
         this.dataSource1.labels[i] = res.myBudget[i].title;
         this.dataSource1.data[i] = res.myBudget[i].budget;
       }
       console.log("within data service " + this.dataSource1.labels);

     });
   }
}
