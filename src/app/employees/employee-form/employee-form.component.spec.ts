import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [EmployeeFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.employeeForm.value).toEqual({
      name: '',
      email: '',
      position: '',
      hireDate: ''
    });
  });

  it('should set isEditMode to true if id is present in route', () => {
    expect(component.isEditMode).toBeTrue();
  });

  it('should validate form inputs correctly', () => {
    component.employeeForm.controls['name'].setValue('');
    component.employeeForm.controls['email'].setValue('invalid-email');
    component.employeeForm.controls['position'].setValue('');
    component.employeeForm.controls['hireDate'].setValue('');

    expect(component.employeeForm.valid).toBeFalse();

    component.employeeForm.controls['name'].setValue('John Doe');
    component.employeeForm.controls['email'].setValue('john@example.com');
    component.employeeForm.controls['position'].setValue('Developer');
    component.employeeForm.controls['hireDate'].setValue('2024-01-01');

    expect(component.employeeForm.valid).toBeTrue();
  });

  it('should store new employee data in localStorage', () => {
    spyOn(localStorage, 'setItem');
    component.employeeForm.setValue({
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Developer',
      hireDate: '2024-01-01'
    });
    
    component.onSubmit();

    expect(localStorage.setItem).toHaveBeenCalled();
  });
});
