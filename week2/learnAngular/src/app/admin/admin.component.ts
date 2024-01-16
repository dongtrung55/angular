import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpService } from '../shared/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  titleForm = 'Register Form';
  id: number = 0;
  userName: string = '';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  phone: string = '';
  address: string = '';
  errorMessages: {[key: string]: string} = {
    general: '',
    email: '',
    password: '',
    userName:'',
    firstName:'',
    lastName:'',
    phone:'',
    address:''
  }
  selectedRole: string = 'customer';
  textSuccess: string = '';
  textTitleAddEdit: string = '';
  textBtnAddEdit: string = '';
  created_at: string = '';
  roles: { [key: string]: string } = {
    'administrator': 'Administrator',
    'shop_manager': 'Shop Manager',
    'customer': 'Customer',
    'subscriber': 'Subscriber',
    'contributor': 'Contributor',
    'author': 'Author',
    'editor': 'Editor',
    'seo_manager': 'Seo Manager'
  }
  users: any[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  isEditMode: boolean = false;

  constructor(private authService: AuthService, private httpService: HttpService) {
    this.loadUsers();
  }

  ngOnInit(): void {}

  private loadUsers(): void {
    this.httpService.loadUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }

  private isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public validateEmail(): void {
    if (!this.email) {
      this.errorMessages['email'] = 'Please enter email.';
    } else if (!this.isEmailValid(this.email)) {
      this.errorMessages['email'] = 'Please enter a valid email address.';
    } else {
      this.httpService.checkFieldExists('email', this.email).subscribe(
        (existingEmail) => {
          if (existingEmail && !this.isEditMode) {
            this.errorMessages['email'] = 'Email is already taken.';
          } else {
            this.errorMessages['email'] = '';
          }
        },
        (error) => {
          console.error('Error checking email existence:', error);
        }
      );
    }
  }

  public validateUserName(): void {
    if (!this.userName) {
      this.errorMessages['userName'] = 'Please enter user name.';
    } else if (this.userName.length > 20) {
      this.errorMessages['userName'] = 'User name must not exceed 20 characters.';
    } else {
      this.httpService.checkFieldExists('username', this.userName).subscribe(
        (existingUser) => {
          if (existingUser && !this.isEditMode) {
            this.errorMessages['userName'] = 'Username is already taken.';
          } else {
            this.errorMessages['userName'] = '';
          }
        },
        (error) => {
          console.error('Error checking username existence:', error);
        }
      );
    }
  }

  public validatePassword(): void {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!this.password) {
      this.errorMessages['password'] = 'Please enter password.';
    } else if (this.password.length < 8) {
      this.errorMessages['password'] = 'Password must be at least 8 characters.';
    } else if (!passwordRegex.test(this.password)) {
      this.errorMessages['password'] =
        'Password must include at least one letter, one number, and one special character.';
    } else {
      this.errorMessages['password'] = '';
    }
  }

  public validateFirstName(): void {
    if (!this.firstName) {
      this.errorMessages['firstName'] = 'Please enter first name.';
    } else if (this.firstName.length > 25) {
      this.errorMessages['firstName'] = 'First name must not exceed 25 characters.';
    } else {
      this.errorMessages['firstName'] = '';
    }
  }

  public validateLastName(): void {
    if (!this.lastName) {
      this.errorMessages['lastName'] = 'Please enter last name.';
    } else if (this.lastName.length > 25) {
      this.errorMessages['lastName'] = 'Last name must not exceed 25 characters.';
    } else {
      this.errorMessages['lastName'] = '';
    }
  }

  public validatePhone(): void {
    const phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number format

    if (!this.phone) {
      this.errorMessages['phone'] = 'Please enter phone number.';
    } else if (!phoneRegex.test(this.phone)) {
      this.errorMessages['phone'] = 'Please enter a valid 10-digit phone number.';
    } else {
      this.errorMessages['phone'] = '';
    }
  }

  public validateAddress(): void {
    if (!this.address) {
      this.errorMessages['address'] = 'Please enter address.';
    } else if (this.address.length > 100) {
      this.errorMessages['address'] = 'Address must not exceed 100 characters.';
    } else {
      this.errorMessages['address'] = '';
    }
  }

  public onRegister(): void {
    this.validateUserName();
    this.validateEmail();
    this.validatePassword();
    this.validateFirstName();
    this.validateLastName();
    this.validatePhone();
    this.validateAddress();

    if (this.hasValidationErrors()) {
      return;
    }

    //insert user
    let user: any = {
      "username": this.userName,
      "email": this.email,
      "password": this.password,
      "first_name": this.firstName,
      "last_name": this.lastName,
      "phone": this.phone,
      "address": this.address,
      "last_ip": "",
      "role": "customer",
      "logins_count": 0,
      "created_at": this.isEditMode ? this.created_at : (new Date()).toISOString(),
      "updated_at": this.isEditMode ? (new Date()).toISOString() : '',
      "last_login": "",
      "email_verified": false
    };

    if (this.isEditMode) {
      user['role'] = this.selectedRole;
      user['id'] = this.id;
      
      this.httpService.updateUser(user).subscribe(
        () => {
          this.loadUsers();
          const closeButton = document.querySelector('.modal.fade.show .close') as HTMLElement | null;
          if (closeButton) {
            closeButton.click();
          }
          this.textSuccess = 'Update successfully';
          document.getElementById('showSuccess')?.click();
        },
        error => {
          console.error('Error updating users:', error);
        }
      );
    } else {
      this.httpService.addUser(user).subscribe(
        () => {
          console.log('Users Added successfully.');
        },
        error => {
          console.error('Error add users:', error);
        }
      );
    }
  }

  private hasValidationErrors(): boolean {
    return Object.values(this.errorMessages).some(value => value !== '');
  }

  public editUser(user: any): void {
    this.textTitleAddEdit = 'Edit User';
    this.textBtnAddEdit = 'Updated';
    this.isEditMode = true;

    //auto
    this.userName = user['username'];
    this.email = user['email'];
    this.password = user['password'];
    this.firstName = user['first_name'];
    this.lastName = user['last_name'];
    this.phone = user['phone'];
    this.address = user['address'];
    this.selectedRole = user['role'];
    this.created_at = user['created_at'];
    this.id = user['id'];

    this.resetMessError();
  }

  public editUserText(user: any): void {
    this.textTitleAddEdit = 'Add User';
    this.textBtnAddEdit = '<i class="fas fa-plus"></i> Add';
    this.userName = '';
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';
    this.phone = '';
    this.address = '';
    this.selectedRole = 'customer';
    this.resetMessError();
  }

  public removeUser(user: any): void {
    this.httpService.removeUser(user).subscribe(
      () => {
        this.loadUsers();
        document.querySelector('.modal-backdrop.fade.show')?.remove();
        this.textSuccess = 'Deleted successfully';
        document.getElementById('showSuccess')?.click();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  get totalPages(): number {
    return Math.ceil(this.users.length / this.itemsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  get paginatedUsers(): any[] {
    return this.users.slice(this.startIndex, this.endIndex);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
  }

  private resetMessError(): void{
    this.errorMessages['general'] = '';
    this.errorMessages['email'] = '';
    this.errorMessages['password'] = '';
    this.errorMessages['userName'] = '';
    this.errorMessages['firstName'] = '';
    this.errorMessages['lastName'] = '';
    this.errorMessages['phone'] = '';
    this.errorMessages['address'] = '';
  }

}

