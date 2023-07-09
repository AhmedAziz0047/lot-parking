import { Component, HostListener, OnInit  } from '@angular/core';
import { ParkingServiceService } from '../services/parking-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent {
        // ticket={
        //   vehicle: "", 
        //   slot: "", 
        //   ticketId: "",
        //   parkDuration: "",
        //   time: { type: Date, default: Date.now },
        //   endTime: { type: Date, required: true },
        //   entryPoint: { type: Number, required: true, enum: [1, 2] },
        // }
      slots:any
      type=""
      hours:Number=0
      entrypoint:any
      constructor (private route: ActivatedRoute, private service:ParkingServiceService){}
      ngOnInit() {
              this.route.paramMap.subscribe(params => {
                this.type = params.get('type') ?? '';
                this.entrypoint = params.get('entrypoint') ?? '';
                console.log(this.type+ this.entrypoint+ this.hours)
            })
            this.service.getFreeSlotsNumber(this.type).subscribe((data:any)=>{
              this.slots=data
              console.log(this.slots)
            })

            
          }
      

      getFreeslots(){}

      park(){
        this.service.park(this.type, this.entrypoint, this.hours).subscribe((data:any)=>{
              console.log(data)
        })
      }

}
