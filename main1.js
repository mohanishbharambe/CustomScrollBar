
class ScrollBar {

  constructor (mainid) {

    this.mainid = mainid;
    this.scrollBarContainer = undefined;
    this.thumb = undefined;
    this.thumb1 = undefined;
    this.thumb2 = undefined;
    this.container = undefined;
    this.content = undefined;
    this.containerHeight = undefined;
    this.contentHeight = 0;
    this.flag_mouseDown = false;
    this.oldMousePosition = 0;
    this.oldthumbPosition = 0; 
    this.btnheight = 0;
   }

  scroll (){

    var content = document.getElementById(this.mainid);
    var div = document.createElement('div');
    div.id = 'scroll';
    div.innerHTML = '<span id=\'thumb\'></span> <span id=\'thumb-button1\'></span> <span id=\'thumb-button2\'></span>';
    content.parentNode.prepend(div);
    this.setDocuments();

  }

  setDocuments () {

    this.scrollBarContainer = document.getElementById('scroll');
    this.thumb = document.getElementById('thumb');
    this.container = document.getElementById(document.getElementById(this.mainid).parentNode.id);
    this.content = document.querySelectorAll('#' + this.mainid);
    this.thumb1 = document.getElementById('thumb-button1');
    this.thumb2 = document.getElementById('thumb-button2');

    this.scrollb();
  
  }

  scrollb(){
    this.btnheight = this.thumb.offsetTop;
    this.containerHeight = this.container.offsetHeight -17 ;

    for (var i = 0; i < this.content.length; i++) {
      this.contentHeight += this.content[i].scrollHeight;
    }
    this.contentHeight += (this.btnheight);
    this.thumb.style.height = Math.floor(this.containerHeight / this.contentHeight * this.containerHeight) - (2*this.btnheight) + 'px';
    
    this.scrollBarContainer.addEventListener('pointerdown', el => this.pointerdown(el));

    var self = this;
    this.thumb1.addEventListener('click',function() {
      if(self.thumb.offsetTop - self.btnheight < 1){
        self.thumb.style.top = self.oldMousePosition; 
      } else {
        
        self.thumb.style.top = self.oldthumbPosition - 1 + 'px';
        self.moveContent();
      }  
      
    });
    this.thumb2.addEventListener('click',function() {

      if(self.thumb.offsetTop > self.containerHeight - self.thumb.offsetHeight - 1){
        self.thumb.style.top = self.oldMousePosition; 
      } else {
        self.thumb.style.top = self.oldthumbPosition + 1 + 'px';
        self.moveContent();
      }  
    }); 
    this.scrollBarContainer.addEventListener('pointerup', el => this.pointerup(el));
    
    window.addEventListener('pointermove', el => this.pointermove(el));
  
  }

  pointerdown (el) {
  
    this.thumb.setPointerCapture(el.pointerId);
    if (el.target.nodeName === 'DIV') {
      var distance = el.clientY - this.container.offsetTop - this.thumb.offsetHeight / 2;
      if (distance < 0) {
        distance = 0;
      } else if (distance + this.thumb.offsetHeight > this.containerHeight ) {
        distance = this.containerHeight - this.thumb.offsetHeight - ( this.btnheight);
      }
      this.thumb.style.top = distance + 'px';
      this.moveContent();
    }
    
    this.flag_mouseDown = true;
    this.oldMousePosition = el.clientY;
    this.oldthumbPosition = this.thumb.offsetTop - this.btnheight;
    
    this.thumb.releasePointerCapture(el.pointerId);
  
  }

  pointerup (el) {

    this.flag_mouseDown = false;
    this.oldMousePosition = el.clientY;
    this.oldthumbPosition = this.thumb.offsetTop - this.btnheight;
    
  }

  pointermove(el){
    
    if (!this.flag_mouseDown) {
      return;
    }
    this.thumb.setPointerCapture(el.pointerId);
    el.preventDefault();
    var distance = el.clientY - this.oldMousePosition;
    var newPosition = this.oldthumbPosition + distance - this.btnheight;
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition + this.thumb.offsetHeight > this.containerHeight) {
      newPosition = this.containerHeight - this.thumb.offsetHeight - (this.btnheight) ;
    }
    this.thumb.style.top = newPosition + 'px';
    this.moveContent(); 

  }
  
  moveContent () {
    
    var postion = (this.thumb.offsetTop - this.btnheight) / (this.containerHeight - this.thumb.offsetHeight);
    var newPosition = (0 - postion * (this.contentHeight - this.containerHeight)) + 'px';
    document.querySelector('.imp1').textContent = " Scroll Position : " + (this.thumb.offsetTop - this.btnheight);
    document.querySelector('.imp2').textContent = "Scroll Height : " + this.contentHeight;
    document.querySelector('.imp3').textContent = "Page Height : " + this.containerHeight;
    for (var i = 0; i < this.content.length; i++) {
      this.content[i].style.marginTop = newPosition;

    }    
  
  }

}  
id = 'content';

var scrollBar = new ScrollBar(id);

scrollBar.scroll();
