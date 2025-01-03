import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  getEmployees(): Observable<Employee[]> {
    return of(this.loadEmployees()).pipe(
      catchError(err => {
        console.error('Failed to fetch employees', err);
        return throwError(() => new Error('Failed to fetch employees'));
      })
    );
  }

  addEmployee(employee: Employee): void {
    const employees = this.loadEmployees();
    employees.push(employee);
    this.saveEmployees(employees);
    this.employeesSubject.next(employees);
  }
}
