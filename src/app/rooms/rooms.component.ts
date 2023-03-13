import { HttpEventType } from '@angular/common/http';
import {
  Component,
  DoCheck,
  OnInit,
  ViewChild,
  AfterViewInit,
  ViewChildren,
  QueryList,
  OnDestroy,
  SkipSelf,
} from '@angular/core';
import { catchError, map, Observable, of, Subject, Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { Room, RoomList } from './rooms';
import { RoomsService } from './services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = true;

  //  This variale made for receive data from child component and store for display.
  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5,
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  // In Observables there is an observer internally who observes data and looks for cahnge/update data to push.
  stream = new Observable((observer) => {
    // next method is for whoever is subscribing to this stream will get this data.
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    // complete() is used of go ahead and complete this stream cause any stream that starts completes at some time.
    observer.complete();
    observer.error('error');
  });

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  // QueryList returns you an array as a response and you can you some of it properties for manupulation of a components.
  @ViewChildren(HeaderComponent)
  headerChildrenComponent!: QueryList<HeaderComponent>;

  totalBytes = 0;

  subscription!: Subscription;

  error$ = new Subject<string>();

  // By this approach your change detection trigger every time which is not idle for a performace.
  // Thats why you should avoid this.
  getError$ = this.error$.asObservable();

  rooms$ = this.roomsService.getRooms$.pipe(
    catchError((err) => {
      // console.log(err);
      this.error$.next(err.message);
      return of([]);
    })
  );

  roomsCount$ = this.roomsService.getRooms$.pipe(map((rooms) => rooms.length));

  // constructor is used for inject data into the component and also it will be called first from anyone.
  // Your excess modifier should be private for security and safeGuarding reasons.
  constructor(@SkipSelf() private roomsService: RoomsService) {}

  // This Lifecycle hooks used to for logic when component is called.
  ngOnInit(): void {
    // When static property is true in ViewChild only then below property can be excessed by ngOnInit.
    // console.log(this.headerComponent);

    this.roomsService.getPhotos().subscribe((event) => {
      switch (event.type) {
        case HttpEventType.Sent: {
          console.log('Request has been made!');
          break;
        }
        case HttpEventType.ResponseHeader: {
          console.log('Request success!');
          break;
        }
        case HttpEventType.DownloadProgress: {
          this.totalBytes += event.loaded;
          break;
        }
        case HttpEventType.Response: {
          console.log(event.body);
        }
      }
    });

    // Below is shown that you can get another 3 values in subscribe() method. This 3 methods are next, complete, error.
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    });
    // This is to only undersatnd and use streams.
    this.stream.subscribe((data) => console.log(data));
    // this.roomsService.getRooms$.subscribe((rooms) => {
    //   this.roomList = rooms;
    // });
  }

  // This hooks listens all the changed occured in the app and perform logic written in it.
  ngDoCheck(): void {
    console.log('on changes is called');
  }

  ngAfterViewInit(): void {
    this.headerComponent.title = 'Rooms View';

    this.headerChildrenComponent.last.title = 'Last Title';
    // this.headerChildrenComponent.get(0).title = 'First Title';
  }

  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = 'Rooms List';
  }

  // this function receive object from the argument and update that into the selecetRoom variable.
  selectRoom(room: RoomList) {
    // console.log(room);
    this.selectedRoom = room;
  }

  // Below Function is pass the data in the existing array named as roomList.
  addRoom() {
    const room: RoomList = {
      // roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioned, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('12-Nov-2022'),
      rating: 4.5,
    };

    //  .push is doing that it modified data so basically it mutated the variable.
    // Thats why it is not valid for OnPush Change Detection Strategy
    // this.roomList.push(room);
    // Below is making sure the existing data is in the array and new data will be added on top of that.
    // this.roomList = [...this.roomList, room];

    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  editRoom() {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioned, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos:
        'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      checkinTime: new Date('11-Nov-2022'),
      checkoutTime: new Date('12-Nov-2022'),
      rating: 4.5,
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    });
  }

  deleteRoom() {
    this.roomsService.delete('3').subscribe((data) => {
      this.roomList = data;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

// Below mentioned details are describing pull/push based http architecture.
// Pull architecture
// getData -> addData -> getData

// Push architecture
// getData ->  continous stream of data -> addData
