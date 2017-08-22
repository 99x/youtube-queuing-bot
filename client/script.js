var tag = document.createElement('script');

var count  = 0 ;

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var playerElm = document.getElementById("player");
function onYouTubeIframeAPIReady() {
  var hash = window.location.hash;

  if (hash && hash.length > 0) {
    var videoIds = hash.substr(1).split(",");
    openPlayer(videoIds);
  } else {
    openPlayer([]);
  }
}

function openPlayer(videoIds) {
  player = new YT.Player('player', {
    height: playerElm.offsetHeight,
    width: playerElm.offsetWidth,
    videoId: videoIds[count],
    playerVars: { 'autoplay': 1, 'controls': 0},
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });

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
}
