import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss'],
})
export class RoomsBookingComponent implements OnInit {
  id: number = 0;

  // for avoid subscribing to a streams we can use pipe and map operator
  // with paramMap you can access some methods loke get, getAll, has, keys then specify key you want to access.
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomid')));

  constructor(private router: ActivatedRoute) {}

  ngOnInit(): void {
    // Snapshot will not get new data incase it is already in the component.
    // this.id = this.router.snapshot.params['roomid'];
    
    // We should avoid using subscription as we learn in a RxJs topic.
    // this.router.params.subscribe((params) => { this.id = params['roomid'] });
  }
}
