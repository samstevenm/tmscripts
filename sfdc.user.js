// ==UserScript==
// @name          SFDC Floater
// @namespace     http://SamStevenM.com/
// @version       0.002
// @description   SFDC Link Floater
// @match         https://lutron.my.salesforce.com/*
// @match         https://lutron.lightning.force.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require       http://code.jquery.com/ui/1.9.2/jquery-ui.js
// @updateURL     https://github.com/samstevenm/tmscripts/raw/master/sfdc.user.js

// @copyright  2020, Sam Myers
// ==/UserScript==

jQuery(function($){
    var _highest = 0;

    $("div").each(function() {
        var _current = parseInt($(this).css("zIndex"), 10);
        if(_current > _highest) {
            _highest = _current + 1;
        }
    });

    //var html = '<div id = "draggableDiv_links"></div>';
    var html = '<div id="draggableDiv_links" class="ui-widget-content" style="position:absolute;bottom:0px;z-index:'+_highest+';left:0px;background:#FFF;border:1px solid #000000;border-radius:10px;height:150px;width:190px;"><center>SFDC Sux<BR><BR></div>';
    var callselect ='<center><label for="subj">Call Subject:</label><select id="subj">'+
        '<option value="Personal Development">Personal Development</option>'+
        '<option value="Rep Engagement">Rep Engagement</option>'+
        '<option selected value="Specifier Engagement">Specifier Engagement</option>'+
        '<option value="In-Fixture Opportunities">In-Fixture Opportunities</option>'+
        '<option value="Specifier Virtual Training">Specifier Virtual Training</option></select>'+
        '<input value="Log Call" id="logcall" type="button"></center>';

    var copycal ='<center><input value="Copy Calendar" id="copycal" type="button"></center>';
    var pastecal ='<center><input value="Paste Calendar" id="pastecal" type="button"></center>';


    $("body").prepend(html);

    //$('<center><a href="#" class="send_email">Send email</a><BR>').appendTo('#draggableDiv_links');
    $(callselect).appendTo('#draggableDiv_links');
    $(copycal).appendTo('#draggableDiv_links');
    $(pastecal).appendTo('#draggableDiv_links');

    $("#draggableDiv_links").draggable(); //make it draggable

   localStorage.setItem("default_home", "Miami, FL"); // Store


    $('#draggableDiv_links').mouseup(function() {
        //alert('Set the x and y values using GM_getValue.');
        var divOffset = $("#draggableDiv_links").offset();
        var left = divOffset.left;
        var top = divOffset.top;
        GM_setValue("left", left);
        GM_setValue("top", top);
        //alert("Set left to " + left + " and top to " + top);

    });
// /00T/e?title=Call&who_id=003C0000013jp4q&followup=1&tsk5=Call&retURL=%2003C0000013jp4q
//https://lutron.my.salesforce.com/01Z3c000001b9nI / stupid dashboards

    $('#copycal').click(function(e) {
        localStorage.setItem("ls_href", "HREF_DID_NOT_SET"); // Store
        localStorage.setItem("ls_cal_Subject", "CAL_SUBJECT_DID_NOT_SET"); // Store
        localStorage.setItem("ls_cal_Comments", "CAL_COMMENTS_DID_NOT_SET"); // Store

        var cal_href = $(location).attr('href');
        var cal_Subject = $('#evt5_ileinner').text();
        var cal_Comments = $('#evt6_ileinner').text();

        localStorage.setItem("ls_href", cal_href); // Store
        localStorage.setItem("ls_cal_Subject", cal_Subject); // Store
        localStorage.setItem("ls_cal_Comments", cal_Comments); // Store
        alert (cal_href+'\r\nCalendar Subject: '+cal_Subject+'\r\nCalendar Comments: '+cal_Comments);
//         var sfid = $(location).attr('href').split("/").pop();
//         var subj = encodeURI($('#subj').find(":selected").text()); //uri encoded object selected in dropdown
//         var sfid = $(location).attr('href').split("/").pop();
//         var call = '/00T/e?title='+subj+'&amp;who_id='+sfid+'&followup=1&amp;tsk5='+subj+'&amp;retURL=%2'+sfid;
//         var callurl = 'https://lutron.my.salesforce.com/'+ call
//         window.open(callurl);
        e.preventDefault();
    });

    $('#pastecal').click(function(e) {
        var cal_href = localStorage.getItem("ls_href");
        var cal_Subject = localStorage.getItem("ls_cal_Subject");
        var cal_Comments = localStorage.getItem("ls_cal_Comments");
        var orig_comments= $("textarea#tsk6").val()

        var subj = $('#subj').find(":selected").text(); //uri encoded object selected in dropdown
        $("#tsk5").val(subj)
        $("textarea#tsk6").val(orig_comments +'\r\nSFDC Link: '+ cal_href+'\r\nCalendar Subject: '+cal_Subject+'\r\nCalendar Comments: '+cal_Comments);

        e.preventDefault();

    });

    $('#logcall').click(function(e) {
        var subj = $('#subj').find(":selected").text(); //uri encoded object selected in dropdown
        $("#tsk5").val(subj)
        var type = $("#tsk3_mlktp").val();
        var proj = $("#tsk3").val();

        if (subj == 'Specifier Engagement') {
            if (proj.length > 0) {
                $("textarea#tsk6").val('Project Reviews – '+proj+': \r\n');
            } else {
                $("textarea#tsk6").val('CEU Presentations – (then text)\r\n'+
                                       'Virtual Lunch & Learns – (then text)\r\n'+
                                       'Samples – (then text)\r\n'+
                                       'Other – (then text)\r\n');
            }
        } else if (subj == 'In-Fixture Opportunities') {
            $("textarea#tsk6").val('Alternate Driver Strategy Opportunities – (then text)\r\n'+
                                   'In-Fixture Controls – (then text)\r\n'+
                                   'Other – (then text)\r\n');
        } else if (subj == 'Personal Development') {
            $("textarea#tsk6").val('Call with PERSON to discuss SUBJECT');
            $("#tsk3_mlktp").val('001');
            $("#tsk3").val('Lutron Electronics, Coopersburg, PA, USA');
            $("#tsk2").val('Sam Myers');

        } else {
            $("textarea#tsk6").val('Call with PERSON to discuss SUBJECT');
       }
        e.preventDefault();
    });


});
