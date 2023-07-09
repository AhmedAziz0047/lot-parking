import { Component, HostListener, OnInit  } from '@angular/core';
import { ParkingServiceService } from '../services/parking-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit{
        // ticket={
        //   vehicle: "", 
        //   slot: "", 
        //   ticketId: "",
        //   parkDuration: "",
        //   time: { type: Date, default: Date.now },
        //   endTime: { type: Date, required: true },
        //   entryPoint: { type: Number, required: true, enum: [1, 2] },
        // }
      ticketID:any
      ticket:any
      slots:any
      type=""
      hours:Number=0
      entrypoint:any
      constructor (private router:Router,private route: ActivatedRoute, private service:ParkingServiceService){}
      ngOnInit() {
              this.route.paramMap.subscribe(params => {
                this.type = params.get('type') ?? '';
                this.entrypoint = params.get('entrypoint') ?? '';
                console.log(this.type+ this.entrypoint+ this.hours)
            })
            this.service.getFreeSlotsNumber(this.type).subscribe((data:any)=>{
              this.slots=data.length
            })

            
          }
      

      getFreeslots(){}

      park() {
        this.service.park(this.type, this.entrypoint, this.hours).subscribe((data: any) => {
          this.ticketID=data.ticket._id
          console.log(this.ticketID)
          this.ticket = data;
          console.log(this.ticket.ticket._id);
          this.router.navigate(['/ticket/', this.ticketID]);
        });
      }

}
