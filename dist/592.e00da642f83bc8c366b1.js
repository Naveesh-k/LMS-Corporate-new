(self.webpackChunklms=self.webpackChunklms||[]).push([[592],{8277:(e,t,s)=>{"use strict";s.d(t,{o:()=>r});var i=s(7570);class n extends i.w{constructor(e,t){super()}schedule(e,t=0){return this}}class r extends n{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){if(this.closed)return this;this.state=e;const s=this.id,i=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(i,s,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(i,this.id,t),this}requestAsyncId(e,t,s=0){return setInterval(e.flush.bind(e,this),s)}recycleAsyncId(e,t,s=0){if(null!==s&&this.delay===s&&!1===this.pending)return t;clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(e,t);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let s,i=!1;try{this.work(e)}catch(n){i=!0,s=!!n&&n||new Error(n)}if(i)return this.unsubscribe(),s}_unsubscribe(){const e=this.id,t=this.scheduler,s=t.actions,i=s.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==i&&s.splice(i,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}},1098:(e,t,s)=>{"use strict";s.d(t,{v:()=>n});let i=(()=>{class e{constructor(t,s=e.now){this.SchedulerAction=t,this.now=s}schedule(e,t=0,s){return new this.SchedulerAction(this,e).schedule(s,t)}}return e.now=()=>Date.now(),e})();class n extends i{constructor(e,t=i.now){super(e,()=>n.delegate&&n.delegate!==this?n.delegate.now():t()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(e,t=0,s){return n.delegate&&n.delegate!==this?n.delegate.schedule(e,t,s):super.schedule(e,t,s)}flush(e){const{actions:t}=this;if(this.active)return void t.push(e);let s;this.active=!0;do{if(s=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,s){for(;e=t.shift();)e.unsubscribe();throw s}}}},3860:(e,t,s)=>{"use strict";s.r(t),s.d(t,{AuthRoutingModule:()=>l});var i=s(90),n=s(8619);let r=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=n.Xpm({type:e,selectors:[["app-login"]],decls:2,vars:0,template:function(e,t){1&e&&(n.TgZ(0,"p"),n._uU(1,"login works!"),n.qZA())},styles:[""]}),e})();const c=[{path:"",component:r},{path:"Login",component:r}];let l=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=n.oAB({type:e}),e.\u0275inj=n.cJS({imports:[[i.Bz.forChild(c)],i.Bz]}),e})()},2316:(e,t,s)=>{"use strict";s.d(t,{N:()=>r});var i=s(8512),n=s(8619);let r=(()=>{class e{constructor(){this.colorSource=new i.X(localStorage.getItem("mode")?localStorage.getItem("mode"):"light"),this.currentMode=this.colorSource.asObservable()}changeMode(e){this.colorSource.next(e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275prov=n.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);