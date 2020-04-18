import { trigger } from '@angular/animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { WebapiService } from 'app/webapi.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'view-modal-content',
  templateUrl: './view_team.html',
  styleUrls: ['./view_team.scss']

})
export class viewModalContent implements OnInit {
  // @Input() para;
  // teamForm: FormGroup;
  constructor(public activeModal: NgbActiveModal) {

  }
  close() {
    this.activeModal.dismiss();
  }
  ngOnInit() {
    // console.log(this.para);
    // this.teamForm = new FormGroup({
    //   'email': new FormControl(null, [Validators.required, Validators.email]),
    //   'username': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
    //   'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
    //   'name': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(4)]),
    //   'phone': new FormControl(null, [Validators.required, Validators.email, Validators.minLength(9), Validators.minLength(10)]),
    // }, { updateOn: 'blur' });
    // this.teamForm.patchValue({username:'xxx'});
  }
  c(val) {
    console.log(val);
  }
}

@Component({
  selector: 'ngbd-modal-content',
  templateUrl: './add_team.html',
  styleUrls: ['./add_team.scss']
})
export class NgbdModalContent implements OnInit {
  @Input() para;
  teamForm: FormGroup;
  @ViewChild("file", { static: false }) file: ElementRef;
  constructor(public activeModal: NgbActiveModal,
    private fb: FormBuilder, private cd: ChangeDetectorRef,
    public toastr: ToastrService,
    public http: HttpClient, public api: WebapiService) {

  }
  file_change(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        this.para.picture = reader.result;
        let selectedFile = event.target.files[0];
        const uploadData = new FormData();
        uploadData.append('photo', selectedFile, selectedFile.name);
        this.http.post(this.api.base_url + 'team/fileupload', uploadData, {
          reportProgress: true,
          observe: 'events'
        })
          .subscribe((e) => {
            console.log(e);
          })
        //   this.formGroup.patchValue({
        //     file: reader.result
        //  });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }

  }
  change_picture() {
    console.log('changepic');
    this.file.nativeElement.click();
  }
  onReactiveFormSubmit() {
    // console.log(this.teamForm.value);
    let data = this.teamForm.value;
    data.t_id = this.para.t_id;
    this.api.postData('team/add_team', this.teamForm.value).then((res: any) => {
      console.log(res);
      if (res == '1') {
        this.toastr.success('บันทึกเรียบรอ้แล้ว');
        this.activeModal.close();
      } else {
        this.toastr.error('มีปัญหาในการบันทึกข้อมูล');
      }
    });
    console.log("summit");
  }
  close() {
    this.activeModal.dismiss();
  }
  ngOnInit() {
    console.log("xxxx");
    console.log(this.para);
    if (this.para.t_id == '0') {
      this.para = {
        t_id: "0", username: "", password: "", name: "", email: '', phone: "",
        gender: "m",
        picture: "https://image.flaticon.com/icons/svg/194/194938.svg",
        type: "1"
      }
      this.teamForm = new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^[a-zA-Z0-9._-]+$')]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(24)]),
        'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),

        'phone': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.minLength(10), Validators.pattern('[0-9]+')]),
        gender: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required])
      }, { updateOn: 'blur' });
    } else {
      this.teamForm = new FormGroup({
        'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(24), Validators.pattern('^[a-zA-Z0-9._-]+$')]),
        'password': new FormControl(null, [Validators.minLength(6), Validators.maxLength(24)]),
        'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),

        'phone': new FormControl(null, [Validators.required, Validators.minLength(9), Validators.minLength(10), Validators.pattern('[0-9]+')]),
        gender: new FormControl(null, [Validators.required]),
        type: new FormControl(null, [Validators.required])
      }, { updateOn: 'blur' });
    }


    this.teamForm.patchValue(this.para);
    this.teamForm.patchValue({ password: '' })
  }
  c(val) {
    console.log(val);
  }
}





@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  closeResult: string;
  public teams = [];
  teamForm: FormGroup;
  constructor(private modalService: NgbModal, public api: WebapiService) {
    this.teams = this.api.storage_get('teams') || [];
  }
  onReactiveFormSubmit() {
    let a = this.teamForm.value();
    console.log(a);
  }
  ngOnInit() {
    this.teamForm = new FormGroup({
      'inputEmail': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
      'textArea': new FormControl(null, [Validators.required]),
      'radioOption': new FormControl('Option one is this')
    }, { updateOn: 'blur' });
    this.api.getData('team/load_team').then((data: any) => {
      console.log(data);
      this.teams = data;
      this.api.storage_set('teams', data);
    })
  }
  view(t) {
    console.log(t);
    const modal: NgbModalRef = this.modalService.open(viewModalContent);
    // modal.componentInstance.para = t;
    modal.result.then((result) => {
      console.log(result);
    }, (reason) => {
    });
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  view_profile(t) {
    this.view(t);
  }
  open(t) {
    console.log(t);
    const modal: NgbModalRef = this.modalService.open(NgbdModalContent);
    modal.componentInstance.para = t;
    modal.result.then((result) => {
      this.api.getData('team/load_team').then((data: any) => {
        console.log(data);
        this.teams = data;
      })
    }, (reason) => {
      console.log(reason);
    });
    modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  delete_member() {
    swal.fire({
      title: 'คุณต้องการลบจริงหรือไม่',
      text: "รายการนี้จะไม่สามารถนำกลับมาได้อีก",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: 'ลบออก',
      cancelButtonText: 'ปิดออก',
      confirmButtonClass: 'btn btn-success btn-raised mr-2',
      cancelButtonClass: 'btn btn-default btn-raised',
      buttonsStyling: false
    }).then(function (result) {
      console.log(result);
      if (result.value) {
        swal.fire(
          'ลบเรียบร้อยแล้ว',
          '',
          'success'
        )
      }

    })
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
