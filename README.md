# Google Calendar Example
![Screenshot](http://i.imgur.com/rPyBJEh.png)

### Made with
[BackboneJS](https://github.com/jashkenas/backbone/) + [MarionetteJS](https://github.com/marionettejs/backbone.marionette)

### About me
```
function Jimmy(life){
 var passion;
 for (var dreams=0;dreams<life.length;dreams++){
  passion = $('.Jimmy-Rousseau[data-id="'+life[dreams].hopes+'"]');
  if(passion.length > 0){
   passion.append(life[dreams].content);
  }else{
   alert('FAIL');
   break;
  }
 }
 return dreams.length >= life.length ? 'success' : 'failure';
}
Jimmy(life);
```
