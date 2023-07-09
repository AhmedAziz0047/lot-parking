import { Component } from '@angular/core';
import { ParkingServiceService } from '../services/parking-service.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent {
  constructor (private service:ParkingServiceService){}
  ticketid:any
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

  unpark(){
    this.service.unpark(this.ticketid).subscribe(()=>{
          
    })
  }
}
