var base_url=$("#base_url").val();
var admin=$("#admin").val();
var valid = {
	ajaxError:function(jqXHR,exception) {
		var msg = '';
		if (jqXHR.status === 0) {
			msg = 'Not connect.\n Verify Network.';
		} else if (jqXHR.status == 404) {
			msg = 'Requested page not found. [404]';
		} else if (jqXHR.status == 500) {
			msg = 'Internal Server Error [500].';
		} else if (exception === 'parsererror') {
			msg = 'Requested JSON parse failed.'; 
		} else if (exception === 'timeout') {
			msg = 'Time out error.';
		} else if (exception === 'abort') {
			msg = 'Ajax request aborted.';
		} else {
			msg = 'Uncaught Error.\n' + jqXHR.responseText;
		}
		return msg;
	},

	phonenumber:function(inputtxt) {
		var phoneno = /^\d{10}$/;  
		return phoneno.test(inputtxt);
	},
	validPhone:function(inputtxt) {
		var phoneno = /^[0-9]\d{2,4}-\d{6,8}$/;  
		return phoneno.test(inputtxt);
	},
	validURL:function(inputtxt) {
		var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
		return re.test(inputtxt);
	},
	validateEmail:function(email) {
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	},
	validFBurl:function(enteredURL) {
		var FBurl = /^(http|https)\:\/\/www.facebook.com\/.*/i;
		return FBurl.test(enteredURL);
	},
	validTwitterurl:function(enteredURL) {
		var twitterURL = /^(http|https)\:\/\/twitter.com\/.*/i;
		return twitterURL.test(enteredURL);
	},
	validYoutubeURL:function(enteredURL) {
		var youtubeURL = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
		return youtubeURL.test(enteredURL);
	},
	validGPlusURL:function(enteredURL) {
		var gPlusURL = /\+[^/]+|\d{21}/;
		return gPlusURL.test(enteredURL);
	},
	validInstagramURL:function(enteredURL) {
		var instagramURL = /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_\.]+)/im;
		return instagramURL.test(enteredURL);
	},
	validateExtension:function(val,type) {
		if(type==1)
			var re = /(\.jpeg|\.jpg|\.png)$/i;
		else if(type==2)
			var re = /(\.jpeg|\.jpg|\.png\.pdf|\.doc|\.xml|\.docx|\.PDF|\.DOC|\.XML|\.DOCX|\.xls|\.xlsx)$/i;
		else if(type==3)
			var re = /(\.pdf|\.docx|\.PDF|\.DOC|\.DOCX)$/i;
		return re.test(val)
	},
	snackbar:function(msg) {
		$("#snackbar").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	snackbar2:function(msg) {
		 $("#snackbar").html(msg).fadeIn('slow');
	},
	snackbar_error:function(msg) {
		$("#snackbar-error").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	snackbar_success:function(msg) {
		$("#snackbar-success").html(msg).fadeIn('slow').delay(3000).fadeOut('slow');
	},
	error:function(msg) {
		return "<p class='alert alert-warning'><strong>Error : </strong> "+msg+"</p>";
	},
	success:function(msg) {
		return "<p class='alert alert-success'>"+msg+"</p>";
	},
	info:function(msg) {
		return "<p class='alert alert-info'>"+msg+"</p>";
	}
};
	
jQuery(function($) {
	"use strict";
	
	var width = $(window).width();
	if (width <= 720) {
        $('.cont').addClass('s--signup');
    }
	
	$(document).on('keypress', '.mobile-valid', function(e){
		var $this = $(this);
		var regex = new RegExp("^[0-9\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		// for 10 digit number only
		if ($this.val().length > 9) {
			e.preventDefault();
			return false;
		}
		if (e.charCode < 54 && e.charCode > 47) {
			if ($this.val().length == 0) {
				e.preventDefault();
				return false;
			} else {
				return true;
			}
		}
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});
	
	
	$(document).on('keypress', '.name-valid', function(e){
		if (event.charCode!=0) {
			var regex = new RegExp("^[a-zA-Z ]*$");
			var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
			if (!regex.test(key)) {
				event.preventDefault();
				return false;
			}
		}
	});
	
	$(document).on('keypress', '.pin-code-valid', function(e){
		var $this = $(this);
		var regex = new RegExp("^[0-9\b]+$");
		var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
		if ($this.val().length > 5) {
			e.preventDefault();
			return false;
		}
		if (regex.test(str)) {
			return true;
		}
		e.preventDefault();
		return false;
	});

	$(".member_id_check").keydown(function(e) {
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
		  ((e.keyCode == 65 || e.keyCode == 86 || e.keyCode == 67) && (e.ctrlKey === true || e.metaKey === true)) ||
		  (e.keyCode >= 35 && e.keyCode <= 40)) {
		  return;
		}
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
		  e.preventDefault();
		}
	});
		
	$(document).on('click', '.openPopupDepartment', function(e){
		var dataURL = $(this).attr('data-href');
        $('.department_batch_body').load(dataURL,function(){
            $('#addDepartmentModel').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupTask', function(e){
		var dataURL = $(this).attr('data-href');
        $('.task_batch_body').load(dataURL,function(){
            $('#addTaskModel').modal({show:true});
        });
    });
	
	
	$(document).on('click', '.openPopupTaskTicket', function(e){
		var dataURL = $(this).attr('data-href');
        $('.ticket_content_body').load(dataURL,function(){
            $('#ticketDetails').modal({show:true});
        });
    });
	
	$(document).on('submit', '#ticketCloseFrm', function(e){
		$("#submitClsBtn").attr("disabled",true);	   
		var changeBtn = $("#submitClsBtn").html();
		$("#submitClsBtn").html("Closing..");
		$.ajax({
			type: "POST",
			url: base_url + "submit-emp-ticket-completion",
			data: new FormData( this ),
			processData: false,
			contentType: false,
			dataType: "json",
			success: function (data) {
				if (data.status == 'update'){
					$("#alertmsg").html(data.msg);
					$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
					dataTable.ajax.reload();
					window.setTimeout(function(){$('#ticketDetails').modal('hide')}, 1000);
				}else{
					$("#alertmsg").html(data.msg);
					$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
				}
				$("#submitClsBtn").attr("disabled",false);
				$("#submitClsBtn").html(changeBtn);
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#alertmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				$("#submitClsBtn").attr("disabled",false);
				$("#submitClsBtn").html(changeBtn);
			}
		});
		e.preventDefault();	
    });
	
	$(document).on('click', '.openPopupTaskClose', function(e){
		var task_id = $(this).attr('data-id');
		var close_type = $(this).attr('data-type');
		$("#task_token").val(task_id);
		$("#close_type").val(close_type);
		$('#closeTaskModal').modal({show:true});
	});
	

});
function togglePassword(type){
	if(type == 1){
		$(".toggle-login-password").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password").attr("toggle"));
	}else if(type == 2){
		$(".toggle-login-password2").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password2").attr("toggle"));
	}else if(type == 3){
		$(".toggle-login-password").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password3").attr("toggle"));
	}
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
}
function random_password_generate(max,min)
{
    var passwordChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#@!%&()/";
    var randPwLen = Math.floor(Math.random() * (max - min + 1)) + min;
    var randPassword = Array(randPwLen).fill(passwordChars).map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
}
function getPassword(type){
	random_password = random_password_generate(10,8);
	if(type == 1){
    	document.getElementById("password").value = random_password;
	}	
}

function addModules()
{
	var old_len = $('.add_more_module tr:last').attr('id');
	old_len = old_len.split("_");
	var new_len=parseInt(old_len[1])+1;
	
	if(new_len <= 10){
		
		var removeModule = "'module_"+new_len+"'";
		
		markup = '<tr class="size_chart_remove" id="module_'+new_len+'"><td>' + new_len + '</td><td><input type="text" name="module_name[]" id="module_name_'+new_len+'" class="form-control" placeholder="Please Enter Module Name"/></td><td><input type="text" name="module_percentage[]" id="module_percentage_'+new_len+'" class="form-control" placeholder="Please Enter Module Percentage"/></td><td class="w-72"><button type="button" class="effect-btn btn btn-danger squer-btn more-btn" onClick="removeProjectModule('+removeModule+');"><span class="fa fa-minus"></span></button></td></tr>';
		
		tableBody = $(".add_more_module tbody:last-child");
		
		tableBody.append(markup);
		
		$("html, body").animate({ scrollTop: $(document).height() } ,1000);
	}else{
		valid.snackbar_error('You can add only upto 10 level project module');
	}
}

function removeProjectModule(id)
{
	$("#"+id).remove();	 
}

function getProjectData(id) 
{
	$("#project_name").html('<option value="">Loading Project...</option>');
	$("#u_project_name").html('<option value="">Loading Project...</option>');
		$.ajax({
		url: base_url + 'get-project',
		type: 'POST',
		data: {id:id},
		dataType: "json",
		success: function (data)
		{
			$("#project_name").html('');
			$("#u_project_name").html('');
			if(data.getProject!='')
			{
				$("#project_name").append('<option value="">Select Project</option>');
				$("#u_project_name").append('<option value="">Select Project</option>');
				$.each(data.getProject, function (key, val) {
					$("#project_name").append('<option value="'+val.project_id+'">'+val.project_name+'</option>');
					$("#u_project_name").append('<option value="'+val.project_id+'">'+val.project_name+'</option>');
				});
			}
			else
			{
				$("#project_name").html('<option value="">Select Project</option>');
				$("#u_project_name").html('<option value="">Select Project</option>');
			}
		}
	});
}

function getModuleData(id) 
{
	$("#module_name").html('<option value="">Loading Project Module...</option>');
	$("#u_module_name").html('<option value="">Loading Module...</option>');
		$.ajax({
		url: base_url + 'get-project-module',
		type: 'POST',
		data: {id:id},
		dataType: "json",
		success: function (data)
		{
			$("#module_name").html('');
			$("#u_module_name").html('');
			if(data.getProjectModule!='')
			{
				$("#module_name").append('<option value="">Select Project Module</option>');
				$("#u_module_name").append('<option value="">Select Project Module</option>');
				$.each(data.getProjectModule, function (key, val) {
					$("#module_name").append('<option value="'+val.module_id+'">'+val.module_name+'</option>');
					$("#u_module_name").append('<option value="'+val.module_id+'">'+val.module_name+'</option>');
				});
			}
			else
			{
				$("#module_name").html('<option value="">Select Project Module</option>');
				$("#u_module_name").html('<option value="">Select Project Module</option>');
			}
		}
	});
}


function imageUpload(id,path,hidd_id,view_id,remove_id){
	var names = [];
	var length = $("#"+id).get(0).files.length;
	for (var i = 0; i < $("#"+id).get(0).files.length; ++i) {
		names.push($("#"+id).get(0).files[i].name);
	}
	if(length>2){
		var fileName = names.join(', ');
		$("#"+id).closest('.form-group').find('.form-control').attr("value",length+" files selected");
	}
	else{
		$("#"+id).closest('.form-group').find('.form-control').attr("value",names);
	}
	var formdata = new FormData();
	var files = $('#'+id)[0].files;
	if(files.length > 0 ){
		formdata.append('file',files[0]);
		formdata.append('path',path);
		$(".progress").css("display","block");
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
					
						var percentComplete = ((evt.loaded / evt.total) * 100);
						$(".progress-bar").width(percentComplete + '%');
						$(".progress-bar").html(percentComplete+'%');
					}
				}, false);
				return xhr;
			},
			method:"POST",
			url:base_url + "upload-attach-file",
			data: formdata,
			contentType: false,
 			cache: false,
			processData:false,
			dataType:"json",
			beforeSend: function(){
				$(".progress-bar").width('0%');
			},
			error:function(){
				$('#uploadStatus').html('<p style="color:#EA4335;">File upload failed, please try again.</p>');
			},
			success: function(data){
				if(data.response == 'upload'){
					$("#"+view_id).attr('src', base_url+path+data.filename);
					//readURL(this, imgControlName);
					$('.'+view_id).addClass('it');
					$('#'+remove_id).css("display","inline-block");
					$("#"+hidd_id).val(data.filename);
					window.setTimeout(function () {
						$(".progress").css("display","none");
					}, 1000);
					
				}else if(data.response ==  'error'){
					$(".progress").css("display","none");
					valid.snackbar_error("Only jpg,jpeg and png file type allowed");
					$("#"+id).closest('.form-group').find('.form-control').attr("value","");
				}
			}
		});
	}else{
		alert("Please select a file.");
	}
	e.preventDefault();
}
function removeImage(remove_id,img_id,view_id,img_name_id,path){
	var src = $("#"+view_id).attr('src');
	var img_name = $("#"+img_name_id).val();
	$.ajax({
		url: base_url + 'delete-image-folder',
		type: 'POST',
		data: {src:src,img_name:img_name,path:path},
		dataType: "json",
		success: function (data)
		{
			if(data.status == "success"){
				$("#"+img_id).val("");
				$("#"+img_name_id).val("");
				$("#"+view_id).attr('src',"");
				$('#'+remove_id).css("display","none");
				$("#"+img_id).closest('.form-group').find('.form-control').attr("value","");
			}
		}
	});
}

function rejectTicket()
{
	var ticket_token = $("#ticket_token").val();
	var remark = $("#discription2").val();
	$("#submitClsBtn").attr("disabled",true);	   
	$("#submitRejectBtn").attr("disabled",true);	   
	var changeBtn = $("#submitRejectBtn").html();
	$("#submitRejectBtn").html("Rejecting...");
	$.ajax({
		url: base_url + 'submit-emp-ticket-completion',
		type: 'POST',
		data: {ticket_token:ticket_token,close_type:3,discription:remark},
		dataType: "json",
		success: function (data)
		{
			if (data.status == 'update'){
				$("#alertmsg").html(data.msg);
				$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
				window.setTimeout(function(){$('#ticketDetails').modal('hide')}, 1000);
			}else{
				$("#alertmsg").html(data.msg);
				$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
			}
			$("#submitClsBtn").attr("disabled",false);
			$("#submitRejectBtn").attr("disabled",false);
			$("#submitRejectBtn").html(changeBtn);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#alertmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#submitClsBtn").attr("disabled",false);
			$("#submitRejectBtn").attr("disabled",false);
			$("#submitRejectBtn").html(changeBtn);
		}
	});
}

function close_task(id)
{
	var close_type = $('#close_type').val();
	var discription = $('#discription').val();
	$("#task_token").attr("disabled",true);
	$.ajax({
		url: base_url+'close-this-ticket',
		type: 'POST',
		data: {id:id,close_type:close_type,discription:discription},
		dataType: "json",
		success: function(data)
		{
			if(data.status == 'update'){
				$("#msg").html(data.msg);
                $("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
				window.setTimeout(function(){$('#closeTaskModal').modal('hide')}, 2000);
			}else {
				$("#msg").html(data.msg);
				$("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
			}
		}
	});
}