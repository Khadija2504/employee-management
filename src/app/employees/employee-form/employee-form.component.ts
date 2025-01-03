import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: false,
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm!: FormGroup;
  isEditMode = false;
  employeeIndex: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.min(3)]],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required],
      hireDate: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.employeeIndex = +params['id'];
        const employees = JSON.parse(localStorage.getItem('employees') || '[]');
        const employee = employees[this.employeeIndex];
        if (employee) {
          this.employeeForm.patchValue(employee);
        } else {
          this.router.navigate(['/employee']);
        }
      }
    });
  }

  onSubmit() {
    const employees = JSON.parse(localStorage.getItem('employees') || '[]');
    if (this.isEditMode && this.employeeIndex !== null) {
      employees[this.employeeIndex] = this.employeeForm.value;
    } else {
      employees.push(this.employeeForm.value);
    }
    localStorage.setItem('employees', JSON.stringify(employees));
    this.router.navigate(['/employees']);
  }
}
