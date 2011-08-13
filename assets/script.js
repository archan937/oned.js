//
// $(function() {
// $('textarea').each(function() {
//   $(this).bind("keypress input beforepaste", {currId: this.id}, resizeEventHandler);
//   resizeRefresh(this.id); // Initial refresh
// });
//
// $('input.teaser-button').bind("click", resizeRefreshAll); // Fire on a click on the teaser split/join button
//
// function resizeEventHandler(event) {
//   resizeRefresh(event.data.currId);
// }
//
// function resizeRefreshAll() { // Split/join teaser has been clicked, refresh textareas
//   $('textarea').each(function() {
//     resizeRefresh(this.id);
//   });
// }
//
// function resizeRefresh(currId) {
//   resizeTextarea($('textarea#' + currId));
// }
//
// function resizeTextarea(textarea) {
//   var lines = textarea.val().split("\n");
//   var count = lines.length;
//   $.each(lines, function() {
//     count += parseInt(this.length / 74);
//   });
//
//   textarea.css("height", count * 17);
// }
// });

var _=_?_:{}
_.ready=_.R=function(f){"\v"=="v"?setTimeout(f,0):_.E(_.d,'DOMContentLoaded',f)}
_.on=_.E=function(e,t,f,r){if(e.attachEvent?(r?e.detachEvent('on'+t,e[t+f]):1):(r?e.removeEventListener(t,f,0):e.addEventListener(t,f,0))){e['e'+t+f]=f;e[t+f]=function(){e['e'+t+f](window.event)};e.attachEvent('on'+t,e[t+f])}}
_.d=document

_.R(function(){
  // ready!
})