import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesKey = 'employees';
  private employeesSubject = new BehaviorSubject<Employee[]>(this.loadEmployees());
  employees$ = this.employeesSubject.asObservable();

  private loadEmployees(): Employee[] {
    const data = localStorage.getItem(this.employeesKey);
    return data ? JSON.parse(data) : [];
  }

  private saveEmployees(employees: Employee[]): void {
    localStorage.setItem(this.employeesKey, JSON.stringify(employees));
  }

  getEmployees(): Employee[] {
    return this.loadEmployees();
  }

  addEmployee(employee: Employee): void {
    const employees = this.loadEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
    this.employeesSubject.next(employees);
  }
}
