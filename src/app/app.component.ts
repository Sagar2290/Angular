import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { localStorageToken } from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  // role = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Inject(localStorageToken) private localStorage: Storage,
    private initService: InitService
  ) {
    console.log(initService.config);
  }

  ngOnInit(): void {
    this.name.nativeElement.innerText = 'Hilton Hotel';
    console.log(this.name);

    this.localStorage.setItem('name', 'Hilton Hotel');
  }

  // user is a template refrence provided in tag.
  // read: ViewContainerRef is a refrence read method it'll help us to dynamically load a component.
  // vcr is a name of a method with type of ViewContainerRef.
  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // Below property loaded dynamically.
  // const componentRef = this.vcr.createComponent(RoomsComponent);
  // for any property changes
  // ngAfterViewInit() {
  //   componentRef.instance.numberOfRooms = 50;
  // }
}
