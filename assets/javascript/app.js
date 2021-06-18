// const bold = /\*{2}(.*.+.*)\*{2}/gi
// const italics = /_{2}([A-Za-z0-9*_(){}].+[A-Za-z0-9*_(){}])_{2}/gi
// const mono = /`{1}([A-Za-z0-9/*_(){}].+[A-Za-z0-9/*_(){}])`{1}/gi

var TAGS = [
    ["**", "b"],
    ["__", "i"],
    ["`", "p"],
    ["~~","del"]
  ];

function setTime(){
    var time = moment(new Date).format('H:mm')
    $('#timeElem').text(time)
}

setInterval(setTime,1000) 


const textParser = (e) =>{
    for (var n = 0; n < TAGS.length; n++) {
        var o = e.indexOf(TAGS[n][0]),
          a = e.indexOf(TAGS[n][0], o + 1);
        while (o > -1 && a > -1) {
          e =
            e.substring(0, o) +
            "<" +
            TAGS[n][1] +
            ">" +
            e.substring(o + TAGS[n][0].length, a) +
            "</" +
            TAGS[n][1] +
            ">" +
            e.substring(a + TAGS[n][0].length);
          o = e.indexOf(TAGS[n][0], a + 1);
          a = e.indexOf(TAGS[n][0], o + 1);
        }
      }
      return e
}  

const updateTextMessage = () => {
    let message = $('#messageBox').val()
    message = message.replace(/&/g, "&")
    .replace(/>/g, ">")
    .replace(/</g, "&lt;")
    .replace(/\n/g, "<br />");
    $('#textMessage').html(message.length > 0 ? textParser(message) : `<span class="silver">Type you message down below for it to appear here!</span>`)
}
