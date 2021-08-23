// /00T/e?title=Call&who_id=003C0000013jp4q&followup=1&tsk5=Call&retURL=%2003C0000013jp4q
//https://lutron.my.salesforce.com/01Z3c000001b9nI / stupid dashboards
$(document).ready(function($) {
  var _highest = 0;

  //localStorage.clear();

  //figure out which div is highest so widget stays on top
  $("div").each(function() {
      var _current = parseInt($(this).css("zIndex"), 10);
      if(_current > _highest) {
          _highest = _current + 1;
      }
  });

  //check if widget has been dragged before
  if (localStorage.getItem("ls_left") === null ){
        var left = 0
      } else {
        var left = localStorage.getItem("ls_left")
  }
  if (localStorage.getItem("ls_top") === null ){
    var top = 0
  } else {
    var top = localStorage.getItem("ls_top")
  }

  var html =  '<div id="draggableDiv_links"'+ //class is stolen from SFDC
              'style="position:absolute;top:'+top+'px;left:'+left+'px;'+
              'z-index:'+_highest+';background:#FFF;border:1px solid #000000;'+
              'border-radius:10px;height:150px;width:190px;'+
              'margin-left:auto;margin-right:auto;margin-top:3px;'+
              'margin-bottom:3px;text-align: center;">'+
              'SFDC Sux<br></div>';
  var logacall ='<input value="New &#128222;&#127775;" id="logacall" type="button"><br><br>';
  var callselect ='<label for="subj">Call Subject:</label><select id="subj">'+
      '<option value="Personal Development">Personal Development</option>'+
      '<option value="Rep Engagement">Rep Engagement</option>'+
      '<option selected value="Specifier Engagement">Specifier Engagement</option>'+
      '<option value="In-Fixture Opportunities">In-Fixture Opportunities</option>'+
      '<option value="Specifier Virtual Training">Specifier Virtual Training</option></select>'+
      '<input value="Fill &#8649;&#128222;" id="fillcall" type="button"><br><br>';

  var cal_copypaste = '<input value="&#128197; -> &#10697;" id="copycal" type="button">'+
                      '<input value="&#128203; -> &#128222;" id="pastecal" type="button">';


  $("body").prepend(html);

  $(logacall).appendTo('#draggableDiv_links');
  $(callselect).appendTo('#draggableDiv_links');
  $(cal_copypaste).appendTo('#draggableDiv_links');



  $("#draggableDiv_links").draggable(); //make it draggable


  $('#draggableDiv_links').mouseup(function() {
      //alert('Set the x and y values using GM_getValue.');
      //localStorage.setItem("ls_divOffset", "DIVOFFSET_DID_NOT_SET"); // Initilize
      //localStorage.setItem("ls_left", "LEFT_DID_NOT_SET"); // Initilize
      //localStorage.setItem("ls_top", "TOP_DID_NOT_SET"); // Initilize

      var divOffset = $("#draggableDiv_links").offset();
      var left = divOffset.left;
      var top = divOffset.top;
      var bottom = divOffset.bottom;

      localStorage.setItem("ls_left", left); // Initilize
      localStorage.setItem("ls_top", top); // Initilize

      //alert("Set left to " + left + " and top to " + top);

  });

  $('#copycal').click(function(e) {
      localStorage.setItem("ls_href", "HREF_DID_NOT_SET"); // Store
      localStorage.setItem("ls_cal_Date", "CAL_COMMENTS_DID_NOT_SET"); // Store
      localStorage.setItem("ls_cal_Subject", "CAL_SUBJECT_DID_NOT_SET"); // Store
      localStorage.setItem("ls_cal_Comments", "CAL_COMMENTS_DID_NOT_SET"); // Store

      var cal_href = $(location).attr('href');
      var cal_Date = $('#StartDateTime_ileinner').text();
      var cal_Subject = $('#evt5_ileinner').text();
      var cal_Comments = $('#evt6_ileinner').text();

      localStorage.setItem("ls_href", cal_href); // Store
      localStorage.setItem("ls_cal_Date", cal_Date); // Store
      localStorage.setItem("ls_cal_Subject", cal_Subject); // Store
      localStorage.setItem("ls_cal_Comments", cal_Comments); // Store
      alert (cal_href+'\r\nCalendar Date_Time: '+cal_Date+'\r\nCalendar Subject: '+cal_Subject+'\r\nCalendar Comments: '+cal_Comments);

      e.preventDefault();
  });

  $('#pastecal').click(function(e) {
      var cal_href = localStorage.getItem("ls_href");
      var cal_Date = localStorage.getItem("ls_cal_Date")
      var cal_Subject = localStorage.getItem("ls_cal_Subject");
      var cal_Comments = localStorage.getItem("ls_cal_Comments");
      var orig_comments= $("textarea#tsk6").val()

      var subj = $('#subj').find(":selected").text(); //uri encoded object selected in dropdown
      $("#tsk5").val(subj)
      $("#tsk4").val(cal_Date.split(" ")[0]); //SFDC field has date and then time after a space, I only want the date
      $("textarea#tsk6").val(orig_comments +'\r\nSFDC Link: '+cal_href.split("?")[0]+
                                  '\r\nCalendar Date_Time: '+cal_Date.split(" ")[0]+
                                  '\r\nCalendar Subject: '+cal_Subject);
                                  //'\r\nCalendar Comments: '+cal_Comments); commenting for now since it breaks report

      e.preventDefault();

  });

  $('#fillcall').click(function(e) {
      var who_name = $( "span.chatter-avatar" ).attr("title")
      //console.log ("WHO: " + who);
      var subj = $('#subj').find(":selected").text(); //uri encoded object selected in dropdown
      var contact = $("#tsk2").val();
      if (contact.length === 0) { //if the contact is blank
        var contact = who_name; //relate it to me;
        $("#tsk2").val(who_name); //relate it to me;
      }
      $("#tsk5").val(subj)
      var type = $("#tsk3_mlktp").val();
      var proj = $("#tsk3").val();

      if (subj === 'Specifier Engagement') {
          if (proj.length > 0) {
              $("textarea#tsk6").val('Project Reviews – '+proj+': \r\n');
          } else {
              $("textarea#tsk6").val('CEU Presentations – (then text)\r\n'+
                                     'Virtual Lunch & Learns – (then text)\r\n'+
                                     'Samples – (then text)\r\n'+
                                     'Other – (then text)\r\n');
          }
      } else if (subj === 'In-Fixture Opportunities') {
          $("textarea#tsk6").val('Alternate Driver Strategy Opportunities – (then text)\r\n'+
                                 'In-Fixture Controls – (then text)\r\n'+
                                 'Other – (then text)\r\n');
      } else if (subj === 'Personal Development') {
          var contact = $("#tsk2").val();
          $("textarea#tsk6").val('Call with '+contact+ ' to discuss SUBJECT');
          $("#tsk3_mlktp").val('001');
          $("#tsk3").val('Lutron Electronics, Coopersburg, PA, USA');

      } else {
          $("textarea#tsk6").val('Call with '+contact+ ' to discuss SUBJECT');
     }
      e.preventDefault();
  });

  $('#logacall').click(function(e) {
      if ( $( ".btn[value|='Log a Call']" ).length ) { //button exists?
        $(".btn[value|='Log a Call']" ).click(); //click it
      } else { //try to navigate with sfid
        if ( $(location).attr('href').split("/").pop().length === 18 ) { //sfid exists?
          var sfid = $(location).attr('href').split("/").pop();
        } else { // just related it to Sam Myers
        var sfid = "003C0000026JenH"; //Sam Myers
        }
        var subj = encodeURI($('#subj').find(":selected").text()); //uri encoded object selected in dropdown
        var call = '00T/e?title='+subj+'&amp;what_id='+sfid+'&followup=1&amp;tsk5='+subj+'&amp;retURL=%2'+sfid;
        var callurl = 'https://lutron.my.salesforce.com/'+ call;
        window.location.href = callurl;
      }

      e.preventDefault();
  });
});
