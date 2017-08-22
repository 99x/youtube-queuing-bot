var tag = document.createElement('script');

var count  = 0 ;

var videoIds = ["afvT1c1ii0c","7eRgtOIQ1OY","iITs75Izm2Y","F8C5orQdxb8"]

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: window.screen.availHeight,
    width: window.screen.availWidth,
    videoId: videoIds[count],
    playerVars: { 'autoplay': 1, 'controls': 0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }

  });

}

function onPlayerReady(event) {
  event.target.playVideo();
  count++;
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
  if(event.data ==YT.PlayerState.ENDED){

    player.loadVideoById(videoIds[count], 0, "large");
    player.playVideo();
    count++;

    if(videoIds.length  == count){
      count =0;
    }

  }
}
function stopVideo() {
  player.stopVideo();
}