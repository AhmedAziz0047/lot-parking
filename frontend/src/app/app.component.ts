import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lot-parking';
  vehicles=[
          {
              type:"car",
              image:"../assets/car.jpg"
          },{
            type:"truck",
            image:"../assets/truck.jpg"
        },{
          type:"bike",
          image:"../assets/bike.jpg"
      }
        ]
}
