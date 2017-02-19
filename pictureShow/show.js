
//旋转效果
function imgRound(id,w,h,x,y,r,dv,rh,ah){
	if (ah==undefined) {
		ah=1;
	}
	if (rh==undefined){
		 rh=10;
	}
	var dv=dv*ah; //旋转速度
	var pi=3.14;
	var d=pi/2;
	var pd=Math.asin(w/2/r);
	var smove=true;
	var imgArr=new Array();
	var objectId=id;
	var o=document.getElementById(objectId);
	o.style.position="relative";
	var arrimg=o.getElementsByTagName("img");
	var pn=arrimg.length; //图片数量
	var ed=pi*2/pn;
	for (n=0;n<arrimg.length;n++){
		var lk=arrimg[n].getAttribute("link");
		if (lk!=null) arrimg[n].setAttribute("title",lk)
		arrimg[n].onclick=function(){
			if (this.getAttribute("link")!=null){
				if (this.getAttribute("target")!="_blank") window.location=(this.getAttribute("link"))
				else window.open(this.getAttribute("link"))
			}
		}
		arrimg[n].onmouseout=function(){smove=true;}
		arrimg[n].onmouseover=function(){smove=false;}
		arrimg[n].style.position="absolute";
		imgArr.push(arrimg[n]);
	}
	this.roundMove=function(){
		for (n=0;n<=pn-1;n++){
			var o=imgArr[n];
			var ta=Math.sin(d+ed*n),strFilter;
			if (ta<0){
				o.style.left=Math.cos(d+ed*n-pd)*r+x+"px";
			}else{
				o.style.left=Math.cos(d+ed*n+pd)*r+x+"px";
			}
			o.style.top=ta*rh+rh+y+"px";
			var zoom=Math.abs(Math.sin((d+ed*n)/2+pi/4))*0.5+0.5;
			o.style.width=Math.abs(Math.cos(d+ed*n+pd)-Math.cos(d+ed*n-pd))*zoom*r+"px";
			o.style.height=zoom*h+"px";
			if (ta<0) {
				ta=(ta+1)*80+20;o.style.zIndex=0;
			}else {
				ta=100;o.style.zIndex=1
			}
			if (o.style.zIndex<=0){
				strFilter="FlipH(enabled:true)"
			}else{
				strFilter="FlipH(enabled:false)";
			}
			strFilter=strFilter+" alpha(opacity="+ta+")";
			o.style.opacity=ta/100;
			o.style.filter=strFilter;
		}
		if (smove){
			d=d+dv;
		}
	}
}

//经典图片切换
function s(){
	var interv=2000; //切换间隔时间
	var interv2=10; //切换速速
	var opac1=80; //文字背景的透明度
	var source="fade_focus" //图片容器id
//获取对象
	function getTag(tag,obj){
		if(obj==null){
			return document.getElementsByTagName(tag)
		}else{
			return obj.getElementsByTagName(tag)
		}
	}
	function getid(id){
		return document.getElementById(id)
	};
	var opac=0,j=0,t=63,num,scton=0,timer,timer2,timer3;
	var id=getid(source);id.removeChild(getTag("div",id)[0]);
	var li=getTag("li",id);
	var div=document.createElement("div");
	var title=document.createElement("div");
	var span=document.createElement("span");
	var button=document.createElement("div");button.className="button";
	for(var i=0;i<li.length;i++){
		var a=document.createElement("a");
		a.innerHTML=i+1;
		a.onclick=function(){
			clearTimeout(timer);
			clearTimeout(timer2);
			clearTimeout(timer3);
			j=parseInt(this.innerHTML)-1;
			scton=0;
			t=63;
			opac=0;
			fadeon();
		};
		a.className="b1";
		a.onmouseover=function(){
			this.className="b2"
		};
		a.onmouseout=function(){
			this.className="b1";
			sc(j)
		};
		button.appendChild(a);
	}
	//控制透明度
	function alpha(obj,n){
		if(document.all){
			obj.style.filter="alpha(opacity="+n+")";
		}else{
			obj.style.opacity=(n/100);
		}
	}
	//控制焦点按钮
	function sc(n){
		for(var i=0;i<li.length;i++){
			button.childNodes[i].className="b1"
		};
		button.childNodes[n].className="b2";
	}
	title.className="num_list";
	title.appendChild(span);
	alpha(title,opac1);
	id.className="d1";
	div.className="d2";
	id.appendChild(div);
	id.appendChild(title);
	id.appendChild(button);
	//渐显
	var fadeon=function(){
		opac+=5;
		div.innerHTML=li[j].innerHTML;span.innerHTML=getTag("img",li[j])[0].alt;
		alpha(div,opac);
		if(scton==0){
			sc(j);
			num=-2;
			scrolltxt();
			scton=1
		};
		if(opac<100){
			timer=setTimeout(fadeon,interv2)
		}else{
			timer2=setTimeout(fadeout,interv);
		};
	}
	//渐隐
	var fadeout=function(){
		opac-=5;
		div.innerHTML=li[j].innerHTML;
		alpha(div,opac);
		if(scton==0){
			num=2;
			scrolltxt();
			scton=1
		};
		if(opac>0){
			timer=setTimeout(fadeout,interv2)
		}else{
			if(j<li.length-1){
				j++
			}else{
				j=0
			};
			fadeon()
		};
	}
	//滚动文字
	var scrolltxt=function(){
		t+=num;
		span.style.marginTop=t+"px";
		if(num<0&&t>3){
			timer3=setTimeout(scrolltxt,interv2)
		}else if(num>0&&t<62){
			timer3=setTimeout(scrolltxt,interv2)
		}else{
			scton=0
		}
	};
	fadeon();
}

window.onload=function(){
	var rt=new imgRound("imgContainer",120,90,300,80,230,0.01);
	setInterval(function(){rt.roundMove()},20);
	s();
}



