import { Component } from '@angular/core';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
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
