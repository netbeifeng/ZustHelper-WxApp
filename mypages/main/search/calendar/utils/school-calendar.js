var schoolevents = new Array(
  "20180304 开学",
  "20180305 上课",
  "20180312 第二周",
  "20180319 第三周",
  "20180326 第四周",
  "20180402 第五周",
  "20180405 清明节",
  "20180406 清明放假",
  "20180407 清明放假",
  "20180409 第六周",
  "20180416 第七周",
  "20180423 第八周",
  "20180429 五一放假",
  "20180430 五一放假",
  "20180501 劳动节",
  "20180507 第十周",
  "20180513 母亲节",
  "20180514 第十一周",
  "20180521 第十二周",
  "20180528 第十三周",
  "20180604 第十四周",
  "20180611 第十五周",
  "20180616 端午放假/四六级",
  "20180617 端午放假/父亲节",
  "20180618 端午节",
  "20180620 毕业生典礼",
  "20180621 毕业生离校",
  "20180625 机动周",
  "20180626 机动周",
  "20180627 机动周",
  "20180628 期末开始",
  "20180706 期末结束",
  "20180709 暑假",
);
var schoolTime = new Array();
var schoolEvent = new Array();

for (var i = 0; i < schoolevents.length; i++) {
  schoolTime.push(schoolevents[i].split(" ")[0]);
  schoolEvent.push(schoolevents[i].split(" ")[1]);
}



function SchoolCalendar() {
  this.school = function (date) {

    var year = date.getFullYear(),
      month = date.getMonth() + 1,
      day = date.getDate();

    if (month < 10) {
      month = "0" + month
    }
    if (day < 10) {
      day = "0" + day
    }


    for (let i = 0; i < schoolTime.length; i++) {
      if (schoolTime[i] === year + month + day)
        return schoolEvent[i]
      else
        continue
    }
  }

}




module.exports = {
  SchoolCalendar: SchoolCalendar
}