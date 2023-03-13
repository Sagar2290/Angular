import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, AfterContentInit {
  // whatever is inside <ng-content> can be excess through ngAfterContentInit
  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;

  constructor() {}

  ngOnInit(): void {}

  // You can change some values of ContentChild in ngAfterContentInit.
  ngAfterContentInit(): void {
    console.log(this.employee);
    this.employee.empName = 'Rick';
  }
}
