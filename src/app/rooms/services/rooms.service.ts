import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { RoomList } from '../rooms';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  roomList: RoomList[] = [];

  // Insteaad of mentioning headers everywhere you can use HTTP_INTERCEPTORS.
  // headers = new HttpHeaders({ token: '12213ugsd' });

  // Stream cannot be modified after it's subscribed, Stream only can be modified in function which is pipe().
  // shareReplay is used for caching your data.
  // getRooms is a property and $ is to know that is a stream.
  getRooms$ = this.http.get<RoomList[]>('/api/rooms').pipe(shareReplay(1));

  // roomList: RoomList[] = [
  //   {
  //     roomNumber: 1,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioned, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 500,
  //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     checkinTime: new Date('11-Nov-2022'),
  //     checkoutTime: new Date('12-Nov-2022'),
  //     rating: 4.5,
  //   },
  //   {
  //     roomNumber: 2,
  //     roomType: 'Deluxe Room',
  //     amenities: 'Air Conditioned, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 1000,
  //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     checkinTime: new Date('11-Nov-2022'),
  //     checkoutTime: new Date('12-Nov-2022'),
  //     rating: 3.4,
  //   },
  //   {
  //     roomNumber: 3,
  //     roomType: 'Private Suite',
  //     amenities: 'Air Conditioned, Free Wi-Fi, TV, Bathroom, Kitchen',
  //     price: 15000,
  //     photos: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  //     checkinTime: new Date('11-Nov-2022'),
  //     checkoutTime: new Date('12-Nov-2022'),
  //     rating: 2.6,
  //   },
  // ];

  // below provider used is a value provider and you need to use @Inject for value provider.
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
    console.log('Rooms service Initialized...');
  }

  getRooms() {
    return this.http.get<RoomList[]>('/api/rooms');
  }

  addRoom(room: RoomList) {
    return this.http.post<RoomList[]>('/api/rooms', room);
  }

  editRoom(room: RoomList) {
    return this.http.put<RoomList[]>(`/api/rooms/${room.roomNumber}`, room);
  }

  delete(id: string) {
    return this.http.delete<RoomList[]>(`/api/rooms/${id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request(request);
  }
}
