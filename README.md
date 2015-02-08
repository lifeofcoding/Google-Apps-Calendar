# Google Calendar Example
![Screenshot](http://i.imgur.com/rPyBJEh.png)

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
