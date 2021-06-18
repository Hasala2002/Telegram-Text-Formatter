var TAGS = [
  ["**", "b"],
  ["__", "i"],
  ["`", "label"],
  ["~~", "del"],
];

var BUTTONS = ["#boldText", "#italicText", "#strikeText", "#monoText"];

function setTime() {
  var time = moment(new Date()).format("H:mm");
  $("#timeElem").text(time);
}

setInterval(setTime, 1000);

const textParser = (e) => {
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
  return e;
};

const updateTextMessage = () => {
  let message = $("#messageBox").val();
  message = message
    .replace(/&/g, "&")
    .replace(/>/g, ">")
    .replace(/</g, "&lt;")
    .replace(/\n/g, "<br />");
  $("#textMessage").html(
    message.length > 0
      ? textParser(message)
      : `<span class="silver">Type your message down below for it to appear here!</span>`
  );
  message.length > 0
    ? $("#copyContent").addClass("copy-btn--active")
    : $("#copyContent").removeClass("copy-btn--active");
};

const isTextSelected = () => {
  let textarea = document.getElementById("messageBox");
  let len = textarea.value.length;
  let start = textarea.selectionStart;
  let end = textarea.selectionEnd;
  let sel = textarea.value.substring(start, end);
  return sel.length > 0;
};

$("#copyContent").click(function () {
  $("#messageBox").select();
  document.execCommand("copy");
});

const updateButtons = () => {
  if (isTextSelected()) {
    BUTTONS &&
      BUTTONS.map((button) => {
        $(button).addClass("edit-btn--active");
      });
  } else {
    BUTTONS &&
      BUTTONS.map((button) => {
        $(button).removeClass("edit-btn--active");
      });
  }
};

setInterval(updateButtons, 500);

const editText = (marks) => {
  console.log(isTextSelected());
  let textarea = document.getElementById("messageBox");
  let len = textarea.value.length;
  let start = textarea.selectionStart;
  let end = textarea.selectionEnd;
  let sel = textarea.value.substring(start, end);
  let replace = `${marks}${sel}${marks}`;
  textarea.value =
    textarea.value.substring(0, start) +
    replace +
    textarea.value.substring(end, len);
  updateTextMessage();
};
