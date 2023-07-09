import { Component, OnInit } from '@angular/core';
import { ParkingServiceService } from '../services/parking-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  id: any;
  ticket: any;
  time:any
  constructor(
    private service: ParkingServiceService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      console.log(this.id);
    });
    this.service.getOneTicket(this.id).subscribe((data: any) => {
      this.ticket = data;

      // Convert time to hours and minutes
      const time = new Date(this.ticket.time);
      const hours = time.getHours();
      const minutes = time.getMinutes();
      this.time = `${hours}:${minutes}`;
    });
  }
}
