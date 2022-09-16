import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UsersService } from './../services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Iusers } from './../users.models';

@Component({
  selector: 'app-details-user',
  templateUrl: './details-user.component.html',
  styleUrls: ['./details-user.component.css']
})
export class DetailsUserComponent implements OnInit {

  user:Iusers;


  constructor(private UsersService:UsersService,private router:Router,private route:ActivatedRoute,private cdr:ChangeDetectorRef,) { }

  ngOnInit(): void {

    var id=this.route.snapshot.paramMap.get('id');

    console.log("ID",id);

    this.UsersService.getuserid(id).subscribe(
      res=>{
        this.user=res;
        console.log("IDss",this.user);
      }
      ,error=>{

      }
    )





  }

  BackToHome(){
    this.router.navigate(['users']);
    this.cdr.detectChanges();
   }


}
