import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../services/users.service';
import { Iusers } from '../users.models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  userslist:any;

  userdetails:any;

  submitted: boolean = false

  Formuser = new FormGroup({
    id: new FormControl(0),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
  });


  constructor(private userservice:UsersService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr: ToastrService,
    private cdr:ChangeDetectorRef) { }

  index: any;

  id:any

  ngOnInit(): void {


    if(this.route.snapshot.paramMap.get('id')){
      this.id=this.route.snapshot.paramMap.get('id');

      this.userservice.getuserid(this.id).subscribe(res=>{
       this.userdetails=res;

       this.Formuser.get("first_name")?.setValue(this.userdetails.first_name);
       this.Formuser.get("last_name")?.setValue(this.userdetails.last_name);
       this.Formuser.get("email")?.setValue(this.userdetails.email);
       this.Formuser.get("avatar")?.setValue(this.userdetails.avatar);
       console.log('update success user',this.userdetails);

      });
    }


  }


  setValue() {

    this.Formuser.get("first_name")?.setValue(this.userdetails.first_name);
    this.Formuser.get("last_name")?.setValue(this.userdetails.last_name);
    this.Formuser.get("email")?.setValue(this.userdetails.email);
    this.Formuser.get("avatar")?.setValue(this.userdetails.avatar);
  }




  onsubmit(){




    if (this.Formuser.valid) {

       if(this.id){
        const body:any={
          ...this.Formuser.value,
          id:this.route.snapshot.paramMap.get('id')
        }


        this.userservice.getupdate(body,this.route.snapshot.paramMap.get('id')).subscribe((req:any)=>{

          this.toastr.success('update success user');
          this.cdr.detectChanges();
          this.router.navigate(['users']);

        })

       }
       else{
        const body:any={
          ...this.Formuser.value,

        }
         this.userservice.create(body).subscribe(
        (res)=>{
          this.toastr.success('A new user has been added');
          this.cdr.detectChanges();
          console.log("Success",res);
        },
        (error:any)=>{
          this.toastr.error('operation failed');
        }

        );
        this.Formuser.reset();

       }


       this.submitted = false;

    //   this.router.navigate(['users']);

    }
    else {
      this.submitted = true;
      this.toastr.error('Enter The Fields Empty');
    }

  }

  BackToHome(){
   this.router.navigate(['users']);
   this.cdr.detectChanges();
  }



}
