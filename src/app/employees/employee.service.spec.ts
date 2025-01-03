import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an employee', () => {
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', hireDate: '25/10/2004' };

    service.addEmployee(employee);
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0]).toEqual(employee);
    });
  });

  it('should get employees', () => {
    const employees: Employee[] = [
      { id: 1, name: 'Alice', email: 'alice@example.com', position: 'Manager', hireDate: '25/10/2004' },
      { id: 2, name: 'Bob', email: 'bob@example.com', position: 'Designer', hireDate: '25/10/2004' }
    ];
    
    localStorage.setItem('employees', JSON.stringify(employees));

    service.getEmployees().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(employees);
    });
  });

  it('should handle empty employee list', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(0);
    });
  });

  it('should update the employee list after adding an employee', () => {
    const employee: Employee = { id: 1, name: 'John Doe', email: 'john@example.com', position: 'Developer', hireDate: '25/10/2004' };

    service.addEmployee(employee);
    service.employees$.subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0]).toEqual(employee);
    });
  });
});
