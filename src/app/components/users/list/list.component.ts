import { Iusers } from './../users.models';

import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from '../services/users.service';
import { from, mergeMap, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  userslist:Iusers[];

  // subscribtion:Subscription

  page:number=1;
  Totalpage:number;
  pagesarray:any[];
  CheckedAllitem:boolean[]=[];


  constructor(private userservice:UsersService, private toastr: ToastrService,private cdr:ChangeDetectorRef,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {



this.getdata();
this.cdr.detectChanges();

  }

  getdata(pages?:any){
   this.userservice.Getusers(pages).subscribe(
      res=>{
        this.userslist=res.data;
        this.Totalpage=res.total_pages;
        this.pagesarray=Array.from(new Array(res.total_pages).keys(),(item)=>item+1);
        this.CheckedAllitem=Array.from(new Array(this.userslist.length).keys(),(item)=>false);
        this.spinner.hide();
        console.log("OK",this.pagesarray);
      },
      errors=>{
        this.spinner.show();
          console.log("Errors");
      }
    )
  }

  GetTopage(i:any){
    this.getdata(i);



  }


  getprevpage(){

    this.page=this.page - 1;

  this.getdata(this.page);
  console.log("prev",this.page);
  }

  getnextpage(){
    this.page=this.page+1 ;

    this.getdata(this.page);
    console.log("next",this.page);
  }

  removeUser(id:any){
    this.userservice.Remove(id).subscribe(
      res=>{
      this.toastr.success('Deleted successfully');
    },
    error=>{
      this.toastr.error('Delete failed');
    }
    )
  }


  ToggleCheckedAll(value:boolean):void{

    this.CheckedAllitem=Array.from(new Array(this.userslist.length).keys(),(item)=>value);
    console.log("Boolean ## ",value);

  }

  ToggleCheckeditem(value:boolean,index:number):void{
    this.CheckedAllitem[index]=value;
  }


  // ngOnDestroy(): void {
  //     this.subscribtion.unsubscribe();
  // }

  onDelete(){

    var CheckeduserId:any[]=[];

    this.CheckedAllitem.forEach((value,index)=>{
      if(value){
        CheckeduserId.push(this.userslist[index].id);
      }

    })
    console.log("List Checked",CheckeduserId);
    var obs=from(CheckeduserId);

    obs.pipe(
      mergeMap((value)=>{
        return this.userservice.Remove(value)
      })
    ).subscribe(
      res=>{
        this.toastr.success(`${CheckeduserId}`,'Deleted successfully items',);
        console.log("List Checked delete",res)
      }
    )




  }


}
