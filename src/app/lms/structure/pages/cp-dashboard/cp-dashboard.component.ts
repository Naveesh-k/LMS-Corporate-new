import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor } from 'ngx-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GobalService } from 'src/app/lms/global-services/gobal.service';
import { ColorModeService } from 'src/app/service/color-mode.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-cp-dashboard',
  templateUrl: './cp-dashboard.component.html',
  styleUrls: ['./cp-dashboard.component.scss']
})
export class CpDashboardComponent implements OnInit {
  quizForm:any = FormGroup;
    quizFormsubmitted = false;

  paginateData: any[] = [];
  myreportData: any =[];
  page = 1;
  pageSize = 10;
  collectionSize = 0;
  darkMode: boolean = false; // dark-light
  createCourseForm: any = FormGroup;
  editCourseForm: any = FormGroup;
  submitted: boolean = false;
  submittedEdit: boolean = false;
  showCourse: boolean = false;
  showCurru: boolean = false;
  showMain:boolean = false;
  showSelect:boolean = false;
  show: boolean = true;
  showId:any;
  profileName:any;
  lectureList:any;
  listOfCourse:any = [];
  uploadedImage: any;
  uploadedVideo: any;
  lecture: any = {
    addFile: '',
    addTextEditor: ''
  }
  imagePath: any;
  imageFile: any;
  videoPath: any;
  videoFile: any;
  isActiveTab: boolean =false;
  topics: any = [{
    'name': 'Course',
    'para': 'With a course, you can build a curriculum for your students that can be self-paced or guided directly by you, the instructor.',
    'image': `${environment.assetPath}/images/plant frame.png`,
    'active':false,
  },
  {
    'name': 'Coaching',
    'para': 'With coaching, you can collaborate with your students more, helping them reach milestones through scheduled video calls.',
    // 'image': '../../../../../assets/images/computer frame.png',
    'image': `${environment.assetPath}/images/computer frame.png`,
    'active':false,
  }];
  customizeTopic : boolean =true;
  editor:any = Editor;
  html: any ='';

  changeTab:any  = 'home'
  constructor(public mode: ColorModeService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    public _service: GobalService,private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.courseList()
    this.listOfLecture()
     // dark-light
     this.mode.currentMode.subscribe((res) => {
      if (res == 'light') {
        this.darkMode = false;
      } else {
        this.darkMode = true;
      }
    });
    //end dark-light

    // this.profileName = localStorage.getItem('loginUserFname')+' '+localStorage.getItem('loginUserLname')
    this.profileName = localStorage.getItem('firstName')+' '+localStorage.getItem('lastName')

    this.createCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      courseSubtitle: ['', Validators.required],
      selectAuthor: ['', Validators.required],
      selectUrl: ['', Validators.required],
  });

    this.editCourseForm = this.formBuilder.group({
      title: ['', Validators.required],
      courseSubtitle: ['', Validators.required],
      selectAuthor: ['', Validators.required],
      startDate: ['', Validators.required],
      status: ['', Validators.required],
  });
    this.quizForm = this.formBuilder.group({
      question: ['', Validators.required],
      optionFirst: ['', Validators.required],
      optionSec: ['', Validators.required],
      optionThird: ['', Validators.required],
      optionForth: ['', Validators.required],
  });



  // text- editor
  this.editor = new Editor();
  }

  tabChange(tabname:any){
    this.changeTab = tabname
    this.isActiveTab ? 'false' : 'true'
  }

  editSelectDetail(data:any){
    this.editCourseForm.patchValue({
      title: data.course_title,
      courseSubtitle: data.course_subtitle,
      selectAuthor: data.select_author,
      startDate: data.start_date,
      status: data.status,
    })
    this.isActiveTab = true;
    this.showId = data.id
    localStorage.setItem('courseId', this.showId)
    console.log(data)
  }

  withoutAction(){
    this.toastr.info('Message','Please select any course')
  }

  deleteDetail(data:any){
   this.showId = data.id
    console.log(data)
  }

// Single select
  selectedTopics(item:any){
    this.topics.forEach((element:any)=>{
      element.active =  item.name === element.name

      this.customizeTopic =false
    })

  }

  get f() { return this.createCourseForm.controls; }
  get f1() { return this.editCourseForm.controls; }
  get quizF() { return this.quizForm.controls; }
  onSubmit() {
    this.submittedEdit = true;

    // stop here if form is invalid
    if (this.editCourseForm.invalid) {
        return;
    }
}

showCourseList(){
        this.showCourse = false;
        this.show = true;
        this.showCurru= true;
}

// Creating course API
  courseCreate() {
  this.submitted = true;
  if (this.createCourseForm.invalid) {
    return;
  }
  try{
      let request = {
        course_title    : this.createCourseForm.value.title,
        course_subtitle : this.createCourseForm.value.courseSubtitle,
        select_author   : this.createCourseForm.value.selectAuthor,
        start_date      : '14/12/12',
        status          : '1',
        videoUrl        : this.uploadedVideo.location,
      }
      this._service.createCourse(request).subscribe(res => {
        let response = res;

        if(response.success === true){
          // this.toastr.success('Message', response.message)
        }else if(response.status === 400){
          this.toastr.error('Session expire', response.message)
        }
        this.showCourse = false;
        this.show = true;
        this.showCurru= true;
        this.courseList()
      })
  } catch (e:any){
        console.log(e)
    }
}

// List of course API
  courseList() {
    try{
      this._service.getCourse().subscribe(res => {
        this.listOfCourse  = res.data;
      })
    } catch(error){
      console.log(error)
    }
}

// Update course
  courseUpdate() {
      let request = {
        course_title:  this.editCourseForm.value.title,
        course_subtitle: this.editCourseForm.value.courseSubtitle,
        select_author: this.editCourseForm.value.selectAuthor,
        start_date: this.editCourseForm.value.startDate,
        status:  this.editCourseForm.value.status
      }
      this._service.updateCourse(request, this.showId).subscribe(res => {
        this.listOfCourse  = res.data;
        this.courseList()
      })
}
  courseDelete() {
      this._service.deleteCourse(this.showId).subscribe(res => {
        let response  = res;
        this.toastr.success('Message', response.message)
        this.courseList()
      })
}

// Add lecture
addLecture() {
  let text = this.lecture.addTextEditor
  let request = {
    url:  this.uploadedImage.location,
    key_point: text,
  }
  console.log(request,this.showId)
  this._service.addLecture(request, this.showId).subscribe(res => {
    let response  = res;
    if(response.success === true){
      this.toastr.success('Message', response.message)
    }
  })
}

// Add quiz
quizAdd() {
  this.addLecture()
  this.listOfLecture()
  this.quizFormsubmitted = true;
  if (this.quizForm.invalid) {
      return;
  }
  let request = [
    {
    question: this.quizForm.value.question,
    options: [
      {
        choice1: this.quizForm.value.optionFirst,
        choice2: this.quizForm.value.optionSec,
        choice3: this.quizForm.value.optionThird,
        choice4: this.quizForm.value.optionForth
      }
    ],
    answer: ''
    }
  ]
  console.log(request)
  this._service.addQuiz(request,this.showId).subscribe(res => {
    let response = res;
    if(response.success === true){
      this.toastr.success('Message', response.message)
    }
  })
}

// Quiz list
listOfQuiz() {
    this._service.quizList(this.showId).subscribe(res => {
      let response = res.data;
      console.log(response)
    })
}
// Lecture list
listOfLecture() {
    this._service.lectureList(this.showId).subscribe(res => {
      this.lectureList = res.data;
      console.log(this.lectureList)
    })
}

 imageUplaoad(event: any) {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    var formData = new FormData();
    formData.append('image', event.target.files[0]);
    console.log(event.target.files[0])
    if (
      event.target.files[0] &&
      allowedMimeTypes.includes(event.target.files[0].type)
    ) {
      this.imagePath = event.target.files;
      this.imageFile = this.imagePath[0];
    }
    console.log(formData)
    this._service.uploadImage(formData).subscribe(res => {
      this.uploadedImage = res.image
      localStorage.setItem('profileImg', this.uploadedImage)
    })
  }

 videoUplaoad(event: any) {
   console.log(event)
    const allowedMimeTypes = ['video/mp4'];

    var formData = new FormData();
    formData.append('image', event.target.files[0]);
    if (
      event.target.files[0] &&
      allowedMimeTypes.includes(event.target.files[0].type)
    ) {
      this.videoPath = event.target.files;
      this.videoFile = this.videoPath[0]
    }
    console.log(formData)
    this.spinner.show();
    this._service.uploadFile(formData).subscribe(res => {
      this.uploadedVideo = res.image
      if(res){
      this.spinner.hide();
      }
    })
  }

  check(event:any){
    console.log(event.target.value)
  }

// -------------------------------

  show_select(){
    this.showSelect = true
    this.showMain = true
  }

  show_createForm(){
    this.showSelect = false
    this.showMain = true
    this.showCourse = true
  }

  courseShow(){
    this.showCourse = true;
    this.show = false;
    this.showCurru = false;
  }
  circulumShow(){
    this.showCourse = false;
    this.show = false;
    this.showCurru= true;
  }
  getPaginationdData(){
    this.paginateData = this.myreportData.slice((this.page - 1)  *this.pageSize, (this.page - 1)  *this.pageSize + this.pageSize);
  }
}
