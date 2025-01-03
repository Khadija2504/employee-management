import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees from localStorage on init', () => {
    const mockEmployees = [
      { name: 'Alice', email: 'alice@example.com', position: 'Manager', hireDate: '2024-01-01' },
      { name: 'Bob', email: 'bob@example.com', position: 'Developer', hireDate: '2023-12-15' }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockEmployees));
    component.ngOnInit();

    expect(component.employees.length).toBe(2);
    expect(component.employees).toEqual(mockEmployees);
  });

  it('should correctly select an employee by index', () => {
    spyOn(console, 'log');
    component.selectEmployee(1);
    
    expect(console.log).toHaveBeenCalledWith('selected index:1');
  });

  it('should delete an employee and update localStorage', () => {
    const mockEmployees = [
      { name: 'Alice', email: 'alice@example.com', position: 'Manager', hireDate: '2024-01-01' },
      { name: 'Bob', email: 'bob@example.com', position: 'Developer', hireDate: '2023-12-15' }
    ];

    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockEmployees));
    spyOn(localStorage, 'setItem');
    spyOn(console, 'log');

    component.ngOnInit();
    component.deleteEmployee(0);

    expect(component.employees.length).toBe(1);
    expect(component.employees[0].name).toBe('Bob');
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('ppdated employees:', component.employees);
  });
});
