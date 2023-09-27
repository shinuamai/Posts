import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from '../../src/app/post-list/post-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [PostListComponent],
      imports: [HttpClientModule]
    }).compileComponents();
    
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  })

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
