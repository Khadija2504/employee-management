import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  standalone: false,
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees = JSON.parse(localStorage.getItem('employees') || '[]');

  constructor() {}

  ngOnInit(): void {}

  selectEmployee(index: number) {
    console.log('Selected employee index:', index);
  }
}
