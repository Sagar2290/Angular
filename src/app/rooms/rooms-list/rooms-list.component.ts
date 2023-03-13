import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { RoomList } from '../rooms';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.scss'],
  // For OnPush you need to make sure that no data modification happing internally.
  // For no internal data modification you can use Input and Output methods for comminication.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomslistComponent implements OnInit, OnChanges, OnDestroy {
  //This makes rooms a valid HTML property for our <app-rooms-list> element.
  @Input() rooms: RoomList[] | null = [];

  @Input() title: string = '';

  // This makes new path to communicate the changes of event happend on this component to the parent component.
  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor() {}

  // It can only be used when your component/directives has the Input property.
  // It listens a component and perform a change and can give some value stored within it.
  // It stores values like currentvalue, firstchange, previousvalue, isfirstchange
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes['title']) {
      this.title = changes['title'].currentValue.toUpperCase();
    }
  }

  ngOnInit(): void {}

  // This method is passing a data in selectedRoom and emit to the parent component.
  selectRoom(room: RoomList) {
    this.selectedRoom.emit(room);
  }

  ngOnDestroy(): void {
    console.log('On destroy is called')
  }
}
