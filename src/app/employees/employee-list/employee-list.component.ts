import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  employeeIndex: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.employees = JSON.parse(localStorage.getItem('employees') || '[]');
  }

  selectEmployee(index: number) {
    console.log('selected index:' + index);
    
  }

  deleteEmployee(index: number) {
    console.log('selected index:' + index);
    this.employeeIndex = index;

    if (this.employeeIndex !== null) {
      console.log('selected employee:' + this.employees[this.employeeIndex]);

      this.employees.splice(this.employeeIndex, 1);
      localStorage.setItem('employees', JSON.stringify(this.employees));
      this.employeeIndex = null;

      console.log('ppdated employees:', this.employees);
    }
  }

}
