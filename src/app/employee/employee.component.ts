import { Component, OnInit, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService],
})
export class EmployeeComponent implements OnInit {
  empName: string = 'john';

  // Incase of @Self() you need to have a service in a providers above.
  constructor(@Self() private roomsService: RoomsService) {}

  ngOnInit(): void {}
}
