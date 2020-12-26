var draggedEventIsAllDay;
var activeInactiveWeekends = true;

function getDisplayEventDate(event) {

  var displayEventDate;

  if (event.allDay == false) {
    var startTimeEventInfo = moment(event.start).format('HH:mm');
    var endTimeEventInfo = moment(event.end).format('HH:mm');
    displayEventDate = startTimeEventInfo + " - " + endTimeEventInfo;
  } else {
    displayEventDate = "하루종일";
  }

  return displayEventDate;
}

function filtering(event) {
  var show_username = true;
  var show_type = true;

  var username = $('input:checkbox.filter:checked').map(function () {
    return $(this).val();
  }).get();
  var types = $('#type_filter').val();

  show_username = username.indexOf(event.username) >= 0;

  if (types && types.length > 0) {
    if (types[0] == "all") {
      show_type = true;
    } else {
      show_type = types.indexOf(event.type) >= 0;
    }
  }

  return show_username && show_type;
}

function calDateWhenResize(event) {

  var newDates = {
    startDate: '',
    endDate: ''
  };

  if (event.allDay) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  } else {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}

function calDateWhenDragnDrop(event) {
  // 드랍시 수정된 날짜반영
  var newDates = {
    startDate: '',
    endDate: ''
  }

  //하루짜리 all day
  if (event.allDay && event.end === null) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = newDates.startDate;
  }

  //2일이상 all day
  else if (event.allDay && event.end !== null) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
  }

  //all day가 아님
  else if (!event.allDay) {
    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
  }

  return newDates;
}


var calendar = $('#calendar').fullCalendar({

  eventRender: function (event, element, view) {

    //일정에 hover시 요약
    element.popover({
      title: $('<div />', {
        class: 'popoverTitleCalendar',
        text: event.title
      }).css({
        'background': event.backgroundColor,
        'color': event.textColor
      }),
      content: $('<div />', {
          class: 'popoverInfoCalendar'
        }).append('<p><strong>등록자:</strong> ' + event.username + '</p>')
        .append('<p><strong>구분:</strong> ' + event.type + '</p>')
        .append('<p><strong>시간:</strong> ' + getDisplayEventDate(event) + '</p>')
        .append('<div class="popoverDescCalendar"><strong>설명:</strong> ' + event.description + '</div>'),
      delay: {
        show: "800",
        hide: "50"
      },
      trigger: 'hover',
      placement: 'top',
      html: true,
      container: 'body'
    });

    return filtering(event);

  },

  //주말 숨기기 & 보이기 버튼
  customButtons: {
    viewWeekends: {
      text: '주말',
      click: function () {
        activeInactiveWeekends ? activeInactiveWeekends = false : activeInactiveWeekends = true;
        $('#calendar').fullCalendar('option', {
          weekends: activeInactiveWeekends
        });
      }
    }
  },

  header: {
    left: 'today, prevYear, nextYear, viewWeekends',
    center: 'prev, title, next',
    right: 'month,agendaWeek,agendaDay,listWeek'
  },
  views: {
    month: {
      columnFormat: 'dddd'
    },
    agendaWeek: {
      columnFormat: 'M/D ddd',
      titleFormat: 'YYYY년 M월 D일',
      eventLimit: false
    },
    agendaDay: {
      columnFormat: 'dddd',
      eventLimit: false
    },
    listWeek: {
      columnFormat: ''
    }
  },

  /* ****************
   *  일정 받아옴 
   * ************** */
  events: function (start, end, timezone, callback) {
    $.ajax({
      type: "get",
      url: "http://10.125.253.31:4600/etc/a/work_register_system_v3/data.json",
      data: {
        // 실제 사용시, 날짜를 전달해 일정기간 데이터만 받아오기를 권장
      },
      success: function (response) {
        var test = [
          {
            "_id": 1,
            "title": "거래처 미팅",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-07T09:30",
            "end": "2019-05-07T15:00",
            "type": "카테고리1",
            "username": "다현",
            "backgroundColor": "#D25565",
            "textColor": "#ffffff",
            "allDay": false
          }, {
            "_id": 2,
            "title": "치과예약",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-01T12:30",
            "end": "2019-05-01T15:30",
            "type": "카테고리1",
            "username": "나연",
            "backgroundColor": "#9775fa",
            "textColor": "#ffffff",
            "allDay": false
          }, {
            "_id": 3,
            "title": "철수 생일",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-12",
            "end": "2019-05-12",
            "type": "카테고리2",
            "username": "다현",
            "backgroundColor": "#ffa94d",
            "textColor": "#ffffff",
            "allDay": true
          }, {
            "_id": 4,
            "title": "멜론 만기",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-06",
            "end": "2019-05-06",
            "type": "카테고리2",
            "username": "지효",
            "backgroundColor": "#74c0fc",
            "textColor": "#ffffff",
            "allDay": true
          }, {
            "_id": 5,
            "title": "청약 입금",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-08",
            "end": "2019-05-08",
            "type": "카테고리3",
            "username": "지효",
            "backgroundColor": "#f06595",
            "textColor": "#ffffff",
            "allDay": true
          }, {
            "_id": 6,
            "title": "카드값 납부",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-14",
            "end": "2019-05-14",
            "type": "카테고리2",
            "username": "사나",
            "backgroundColor": "#63e6be",
            "textColor": "#ffffff",
            "allDay": true
          }, {
            "_id": 7,
            "title": "휴가",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-18",
            "end": "2019-05-20",
            "type": "카테고리4",
            "username": "사나",
            "backgroundColor": "#a9e34b",
            "textColor": "#ffffff",
            "allDay": true
          },{
            "_id": 8,
            "title": "세차예약",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-24T09:00",
            "end": "2019-05-24T10:00",
            "type": "카테고리3",
            "username": "정연",
            "backgroundColor": "#4d638c",
            "textColor": "#ffffff",
            "allDay": false
          },{
            "_id": 9,
            "title": "출장",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-28",
            "end": "2019-05-31",
            "type": "카테고리3",
            "username": "정연",
            "backgroundColor": "#495057",
            "textColor": "#ffffff",
            "allDay": true
          },{
            "_id": 10,
            "title": "접수 기간",
            "description": "Lorem ipsum dolor sit incid idunt ut Lorem ipsum sit.",
            "start": "2019-05-15",
            "end": "2019-05-22",
            "type": "카테고리2",
            "username": "다현",
            "backgroundColor": "#9775fa",
            "textColor": "#ffffff",
            "allDay": true
          }
        ];
        // console.log(test.length)
        // console.log(response)
        // console.log(response.length)
       
        var fixedDate = test.map( items => {
          console.log(items);
          if (items.allDay && items.start !== items.end) {
            // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
            items.end = moment(items.end).add(1, 'days');
          }
          return items;
        });
        callback(fixedDate);
      },
	  error: function(response){
			console.log("실패");
		}
    });
  },

  eventAfterAllRender: function (view) {
    if (view.name == "month") {
      $(".fc-content").css('height', 'auto');
    }
  },

  //일정 리사이즈
  eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
    $('.popover.fade.top').remove();

    /** 리사이즈시 수정된 날짜반영
     * 하루를 빼야 정상적으로 반영됨. */
    var newDates = calDateWhenResize(event);

    //리사이즈한 일정 업데이트
    $.ajax({
      type: "get",
      url: "",
      data: {
        //id: event._id,
        //....
      },
      success: function (response) {
        alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
      }
    });

  },

  eventDragStart: function (event, jsEvent, ui, view) {
    draggedEventIsAllDay = event.allDay;
  },

  //일정 드래그앤드롭
  eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
    $('.popover.fade.top').remove();

    //주,일 view일때 종일 <-> 시간 변경불가
    if (view.type === 'agendaWeek' || view.type === 'agendaDay') {
      if (draggedEventIsAllDay !== event.allDay) {
        alert('드래그앤드롭으로 종일<->시간 변경은 불가합니다.');
        location.reload();
        return false;
      }
    }

    // 드랍시 수정된 날짜반영
    var newDates = calDateWhenDragnDrop(event);

    //드롭한 일정 업데이트
    $.ajax({
      type: "get",
      url: "",
      data: {
        //...
      },
      success: function (response) {
        alert('수정: ' + newDates.startDate + ' ~ ' + newDates.endDate);
      }
    });

  },

  select: function (startDate, endDate, jsEvent, view) {

    $(".fc-body").unbind('click');
    $(".fc-body").on('click', 'td', function (e) {

      $("#contextMenu")
        .addClass("contextOpened")
        .css({
          display: "block",
          left: e.pageX/2 -400,
          top: e.pageY/2
        });
      return false;
    });

    var today = moment();

    if (view.name == "month") {
      startDate.set({
        hours: today.hours(),
        minute: today.minutes()
      });
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).subtract(1, 'days');

      endDate.set({
        hours: today.hours() + 1,
        minute: today.minutes()
      });
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    } else {
      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
    }

    //날짜 클릭시 카테고리 선택메뉴
    var $contextMenu = $("#contextMenu");
    $contextMenu.on("click", "a", function (e) {
      e.preventDefault();

      //닫기 버튼이 아닐때
      if ($(this).data().role !== 'close') {
        newEvent(startDate, endDate, $(this).html());
      }

      $contextMenu.removeClass("contextOpened");
      $contextMenu.hide();
    });

    $('body').on('click', function () {
      $contextMenu.removeClass("contextOpened");
      $contextMenu.hide();
    });

  },

  //이벤트 클릭시 수정이벤트
  eventClick: function (event, jsEvent, view) {
    editEvent(event);
  },

  locale: 'ko',
  timezone: "local",
  nextDayThreshold: "09:00:00",
  allDaySlot: true,
  displayEventTime: true,
  displayEventEnd: true,
  firstDay: 0, //월요일이 먼저 오게 하려면 1
  weekNumbers: false,
  selectable: true,
  weekNumberCalculation: "ISO",
  eventLimit: true,
  views: {
    month: {
      eventLimit: 12
    }
  },
  eventLimitClick: 'week', //popover
  navLinks: true,
  defaultDate: moment('2019-05'), //실제 사용시 삭제
  timeFormat: 'HH:mm',
  defaultTimedEventDuration: '01:00:00',
  editable: true,
  minTime: '00:00:00',
  maxTime: '24:00:00',
  slotLabelFormat: 'HH:mm',
  weekends: true,
  nowIndicator: true,
  dayPopoverFormat: 'MM/DD dddd',
  longPressDelay: 0,
  eventLongPressDelay: 0,
  selectLongPressDelay: 0
});