import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './todolist/todolist.component';
import { LoginComponent} from './login/login.component';
import { ToolbarComponent} from './toolbar/toolbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import { AuthService } from './shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment';

firebase.initializeApp(environment.firebase);

const FirestoreStub = {
  collection: (name: string) => ({
    doc: (_id: string) => ({
      valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
      set: (_d: any) => new Promise((resolve, _reject) => resolve()),
    }),
  }),
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ToDoListComponent,
        LoginComponent,
        ToolbarComponent
      ],
      imports: [
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule
      ],
      providers: [{provide: AngularFireAuth, useValue: FirestoreStub}, AuthService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render a div with class container', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div #container').textContent).toBeTruthy();
  }));
});
