import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToDoListComponent } from './todolist.component';
import { BehaviorSubject } from 'rxjs';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve())
    }),
  }),
};

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebase)],
      declarations: [ ToDoListComponent ],
      providers: [AuthService, {provide: AngularFireAuth, useValue: FirestoreStub}, AngularFireDatabase]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display input field to add a new task', () => {
    const input = fixture.debugElement.nativeElement.querySelector('input');
    expect(input.classList.contains('visible')).toBeTruthy();
  });
});
