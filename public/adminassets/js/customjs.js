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
	
	$('.tooltip-d.well').tooltip({
	  selector: "a[rel=tooltip]"
	})
	
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
	
	$(document).on('click', '.copyModalData', function(e){
		var copyText = $(this).data('text');
		var $temp = $("<input>");
		  $(".copy-modal-text-1").append($temp);
		  $temp.val(copyText).select();
		  document.execCommand("copy");
		  $temp.remove();
		  valid.snackbar('Copied to Clipboard');
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
	
	$(document).on('click', '.blockUnblock', function(e){
		var id = $(this).attr('id');
        var myArray = id.split('-');
		var table_id=myArray[3];
		var url;
		if(myArray[2] == 'admins'){
			url = admin+'/sub-admin-block-data-function'
		}

        $.ajax({
            type: "POST",
            url:  url,
            data: 'id='+ myArray[1]+"&change_status_name="+myArray[3],
            success: function(data) 
            {	
				if(myArray[0]=='danger'){
                    $("#"+id).html('<button class="btn btn-outline-success btn-xs m-l-5 btn_cls" type="button" title="Inactivate">Inactivate</button>');
					$("#status_show"+myArray[1]).html('<badge class="badge badge-success">Active</badge>');
                  	$("#"+id).attr('id','success-'+myArray[1]+'-'+myArray[2]+'-'+myArray[3]);
                }else{
					$("#"+id).html('<button class="btn btn-outline-danger btn-xs m-l-5 btn_cls" type="button" title="Activate">Activate</button>');
					$("#status_show"+myArray[1]).html('<badge class="badge badge-danger">Inactive</badge>');
					$("#"+id).attr('id','success-'+myArray[1]+'-'+myArray[2]+'-'+myArray[3]);
                }
                $("#msg").html(valid.success(data.msg));
                $("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
            },
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				
			}
        });
		e.preventDefault();	
    });
	
	$(document).on('click', '.marketOpnCls', function(e){
		var id = $(this).attr('id');
        var myArray = id.split('-');
		var table_id=myArray[3];
	
        $.ajax({
            type: "POST",
            url:  base_url + '/market-open-close',
            data: 'id=' + myArray[1]+"&table="+myArray[2]+"&table_id="+table_id+"&status_name="+myArray[4],
            success: function(data) 
            {	
				if(myArray[0]=='danger')
                {
                    $("#"+id).html('<button class="btn btn-outline-success btn-xs m-l-5 btn_cls" type="button" title="Close">Market Close</button>');
					$("#status_show"+myArray[1]).html('<badge class="badge badge-success">Market Open</badge>');
                   $("#"+id).attr('id','success-'+myArray[1]+'-'+myArray[2]+'-'+table_id+'-'+myArray[4]);
                }
                else
                {
					$("#"+id).html('<button class="btn btn-outline-danger btn-xs m-l-5 btn_cls" type="button" title="Open">Market Open</button>');
					$("#status_show"+myArray[1]).html('<badge class="badge badge-danger">Market Close</badge>');
					$("#"+id).attr('id','danger-'+myArray[1]+'-'+myArray[2]+'-'+table_id+'-'+myArray[4]);
                }
                $("#msg").html(data);
                $("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
            },
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				
			}
        });
		e.preventDefault();	
    });
	
	$(document).on('click', '.changeStatus', function(e){
		var id = $(this).attr('id');
        var myArray = id.split('-');
		var table_id=myArray[3];
	
        $.ajax({
            type: "POST",
            url:  admin+'/block-data-function',
            data: 'id=' + myArray[1]+"&table="+myArray[2]+"&table_id="+table_id+"&status_name="+myArray[4]+"&modal_name="+myArray[5]+"&change_status_name="+myArray[6],
			dataType:'json',
            success: function(data) 
            {	
				if(myArray[0]=='danger')
                {
                   $("#"+id).html('<span class="badge badge-success font-size-12">Yes</span>');
                   $("#"+id).attr('id','success-'+myArray[1]+'-'+myArray[2]+'-'+table_id+'-'+myArray[4]);
                }
                else
                {
					$("#"+id).html('<span class="badge badge-danger font-size-12">No</span>');
					$("#"+id).attr('id','danger-'+myArray[1]+'-'+myArray[2]+'-'+table_id+'-'+myArray[4]);
                }
                $("#msg").html(valid.success(data.msg));
                $("#msg").fadeIn('slow').delay(5000).fadeOut('slow');
            },
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#msg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				
			}
        });
		e.preventDefault();	
    }); 
	
	$(document).on('click', '.openPopupAddGames', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Add Game");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupEditGame', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Edit Game");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupMarketoffDayGame', function(e){
		var dataURL = $(this).attr('data-href');
        $('.market_off_day_model').load(dataURL,function(){
			$('#marketoffdayModal').modal({show:true});
        });
    });
	
	$(document).on('submit', '#marketoffdayFrm', function(e){
		$("#submitBtn").attr("disabled",true);
		$("#btn_spinner").css("display","inline-block");
		
		var formData = {};
		$('#marketoffdayFrm .array-control').each(function() {
			var fieldName = this.name.replace(/\[\]/g, '');
			if (!formData[fieldName])
				formData[fieldName] = []; 	
				if(fieldName == 'weekday'){
					var checked = $(this).val();
					if ($(this).is(':checked')) {
						formData[fieldName].push(this.value);
					}
				}else{
					
					formData[fieldName].push(this.value);	
				}
		}); 
		
		$.ajax({
			type: "POST",
			url: admin+"/submit-game-week-day-off-data",
			data: formData,
			dataType:"json",
			success: function (data) {
				if (data.status == 'update'){
					$("#alertmsg").html(valid.success(data.msg));
					$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
					dataTable.ajax.reload();
				}else{
					$("#alertmsg").html(valid.error(data.msg));
					$("#alertmsg").fadeIn('slow').delay(5000).fadeOut('slow');
				}
				$("#btn_spinner").css("display","none");
				$("#submitBtn").attr("disabled",false);
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#alertmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				$("#btn_spinner").css("display","none");
				$("#submitBtn").attr("disabled",false);
			}
		});
		e.preventDefault();	
    });
	
	/* Active Inactive Section */
		$(document).on('click', '.removeFlash', function(e){
			var dataID = $(this).attr('data-id');
			var myArray = dataID.split('-');
			$("#type").val(myArray[0]);
			$("#id").val(myArray[1]);
			$("#table").val(myArray[2]);
			$("#table_id").val(myArray[3]);
			$("#statu_name").val(myArray[4]); 
			$("#change_status_name").val(myArray[5]); 
			$("#statusmsg").html("");
			$(".msg_type").html("Are you sure you want to remove this game in highlight games list");
			$('#gameFlashStatusModal').modal({show:true});
		});
		$(document).on('click', '.addFlash', function(e){
			var dataID = $(this).attr('data-id');
			var myArray = dataID.split('-');
			$("#type").val(myArray[0]);
			$("#id").val(myArray[1]);
			$("#table").val(myArray[2]);
			$("#table_id").val(myArray[3]);
			$("#statu_name").val(myArray[4]); 
			$("#change_status_name").val(myArray[5]); 
			$("#statusmsg").html("");
			$(".msg_type").html("Are you sure you want to add this game in highlight games list.");
			$('#gameFlashStatusModal').modal({show:true});
		});

	/* Active Inactive Section End */
	
	$(document).on('change','.getGameResultDigitOpen',function(e){
		var panna_number=$(this).val();
		if(panna_number != null && panna_number != '')
		{
			$.ajax({
				type: "POST",
				url: base_url + "/get-game-open-close-data",
				data: {panna_number:panna_number},
				dataType: "json",
				success: function (data) {
						$("#open_result").val(data.game_result);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			});
		   e.preventDefault();	
		}
	});
	
	$(document).on('change','.getGameResultDigitClose',function(e){
		var panna_number=$(this).val();
		if(panna_number != null && panna_number != '')
		{
			$.ajax({
				type: "POST",
				url: base_url + "/get-game-open-close-data",
				data: {panna_number:panna_number},
				dataType: "json",
				success: function (data) {
					$("#close_result").val(data.game_result);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				}
			});
		   e.preventDefault();	
		}
	});
	
	$(document).on('click', '.openPopupAddGamesCategory', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Add Starline Game Type");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupEditGamesCategory', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Edit Starline Game Type");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupAddStarlineGames', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Add Starline Game");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupEditStarlineGames', function(e){
		var dataURL = $(this).attr('data-href');
        $('.games_body').load(dataURL,function(){
			$('.game_form_title').html("Edit Starline Game");
            $('#addGamesModal').modal({show:true});
        });
    });
	
	$(document).on('click', '.openPopupAddSubAdmin', function(e){
		var dataURL = $(this).attr('data-href');
        $('.admin_body').load(dataURL,function(){
			$('.subadmin_form_title').html("Add Sub Admin");
            $('#addSubAdminModal').modal({show:true});
        });
    });

	$(document).on('click', '.openPopupEditSubAdmin', function(e){
		var dataURL = $(this).attr('data-href');
        $('.admin_body').load(dataURL,function(){
			$('.subadmin_form_title').html("Edit Sub Admin");
            $('#addSubAdminModal').modal({show:true});
        });
    });

});

function gameFlashStatusChange(){
	var type = $("#type").val();
	var id = $("#id").val();
	var table = $("#table").val();
	var table_id = $("#table_id").val();
	var status_name = $("#statu_name").val();
	var change_status_name = $("#change_status_name").val();
	$("#statusBtn").attr("disabled",true);
	$("#btn_spinner1").css("display","inline-block");
	$.ajax({
		url: admin+'/game-flash-status-change',
		type: 'POST',
		data: {type:type,id:id,table:table,table_id:table_id,status_name:status_name,change_status_name:change_status_name},
		dataType: "json",
		success: function (data)
		{
			if(data.status == "success"){
				$("#statusmsg").html(valid.success(data.msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				dataTable.ajax.reload();
				window.setTimeout(function(){$('#gameFlashStatusModal').modal('hide')}, 1000);
			}
			$("#btn_spinner1").css("display","none");
			$("#statusBtn").attr("disabled",false);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#statusmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#btn_spinner1").css("display","none");
			$("#statusBtn").attr("disabled",false);
		}
	});
}

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
	}else if(type == 4){
		$(".toggle-login-password4").toggleClass("fa-eye fa-eye-slash");
		var input = $($(".toggle-login-password4").attr("toggle"));
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
function generatePassword(passwordLength) {
	var numberChars = "0123456789";
	var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var lowerChars = "abcdefghijklmnopqrstuvwxyz";
	var sp_chr = "@!%&()";
	var allChars = numberChars + upperChars + lowerChars+sp_chr;
	var randPasswordArray = Array(passwordLength);
	randPasswordArray[0] = numberChars;
	randPasswordArray[1] = upperChars;
	randPasswordArray[2] = lowerChars;
	randPasswordArray[3] = sp_chr;
	randPasswordArray = randPasswordArray.fill(allChars, 4);
	return shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }
  
  function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	  var j = Math.floor(Math.random() * (i + 1));
	  var temp = array[i];
	  array[i] = array[j];
	  array[j] = temp;
	}
	return array;
  }
function getPassword(type){
	random_password = generatePassword(8);
	if(type == 1){
		$("#password").trigger("focus");
		var e = jQuery.Event("keyup");
		$("#password").trigger(e);
    	document.getElementById("password").value = random_password;

	}	
}

function imageUpload(id,path,hidd_id,view_id,remove_id,type){
	$('#submitBtn').attr('disabled','disabled');
	$('#submtBtn').attr('disabled','disabled');

	$(".img_error").trigger("focus");
    var e = jQuery.Event("keyup");
    $(".img_error").trigger(e);
	var names = [];
	var length = $("#"+id).get(0).files.length;
	for (var i = 0; i < $("#"+id).get(0).files.length; ++i) {
		names.push($("#"+id).get(0).files[i].name);
	}
	
	if(type == 4 )
	{
        if(length>2){
		var fileName = names.join(', ');
		$("#"+id).closest('.form-group').find('.allfiletype').attr("value",length+" files selected");
		}
		else{
			$('.allfiletype').val(names);
			$("#"+id).closest('.form-group').find('.allfiletype').attr("value",names);

		}  
	}
	if(id == 'pro_pic')
	{ 
        
        if(length>2){
		var fileName = names.join(', ');
		$("#"+id).closest('.form-group').find('.empimage').attr("value",length+" files selected");
		}
		else{
			$('.empimage').val(names);
			$("#"+id).closest('.form-group').find('.empimage').attr("value",names);

		}  
	}
	else if(id == 'signat_pic')
	{ 
        
        if(length>2){
		var fileName = names.join(', ');
		$("#"+id).closest('.form-group').find('.signimage').attr("value",length+" files selected");
		}
		else{
			$('.signimage').val(names);
			$("#"+id).closest('.form-group').find('.signimage').attr("value",names);

		}  
	}	
	var formdata = new FormData();
	var files = $('#'+id)[0].files;
	if(files.length > 0 ){
		formdata.append('file',files[0]);
		formdata.append('path',path);
		formdata.append('type',type)
		if(id == "pro_pic")
		{

			$(".progress_pro").css("display","block");
		}
		else
		{
			$(".progress_sign").css("display","block");
		}
		$.ajax({
			xhr: function() {
				var xhr = new window.XMLHttpRequest();
				xhr.upload.addEventListener("progress", function(evt) {
					if (evt.lengthComputable) {
					
						var percentComplete = ((evt.loaded / evt.total) * 100).toFixed(2);
						$(".progress-bar").width(percentComplete + '%');
						$(".progress-bar").html(percentComplete+'%');
					}
				}, false);
				return xhr;
			},
			method:"POST",
			url:base_url + "/upload-attach-file",
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
					if(type == 1){
					/* $("#"+view_id).attr('src', base_url+'/'+path+data.filename); */
					$(".doc_append").html("<img id='"+view_id+"' class='"+view_id+"' src='"+base_url+'/'+path+data.filename+"' height='100px' width='100px'>");
					}else if(type == 2){
					
						if(data.ext == "jpg" || data.ext == "jpeg" || data.ext == "png"){
							$(".doc_append").html("");
							$("#"+view_id).attr('src', base_url+path+data.filename);
						}else{
							$("#"+view_id).attr('src',"");
							if(data.ext == "pdf")
							{
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/pdf.png' height='100px' width='100px'></a>");
							} else if(data.ext == "doc" || data.ext == "docx"){
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/doc.png' height='100px' width='100px'></a>");
							}
							else if(data.ext == "xls" || data.ext == "xlsx"){
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/xls.png' height='100px' width='100px'></a>");
							}
						}
					}
					else if(type == 4){
					
						if(data.ext == "jpg" || data.ext == "jpeg" || data.ext == "png"){
							$(".doc_append").html("");
							$("#"+view_id).attr('src', base_url+path+data.filename);
						}else{
							$("#"+view_id).attr('src',"");
							if(data.ext == "pdf")
							{
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/pdf.png' height='100px' width='100px'></a>");
							} else if(data.ext == "doc" || data.ext == "docx"){
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/doc.png' height='100px' width='100px'></a>");
							}
							else if(data.ext == "xls" || data.ext == "xlsx"){
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/xls.png' height='100px' width='100px'></a>");
							}
							else if(data.ext == "apk"){
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/apk.png' height='100px' width='100px'></a>");
							}
							else{
								$(".doc_append").html("<a href='" +base_url+path+data.filename+"' target='_blank'><img src='"+base_url+"adminassets/images/allfile.png' height='100px' width='100px'></a>");
							}

						}
					}

					//readURL(this, imgControlName);
					$('.'+view_id).addClass('it');
					$('#'+remove_id).css("display","inline-block");
					$("#"+hidd_id).val(data.filename);
					window.setTimeout(function () {
						$(".progress").css("display","none");
					}, 1000);
					
				}else if(data.response ==  'error'){
					$(".progress").css("display","none");
					if(type == 1){
						valid.snackbar_error("Only jpg,jpeg and png file type allowed");
					}else if(type == 2){
						valid.snackbar_error("Only jpg,jpeg, png, doc,xls and pdf file type allowed");
					}
					$("#"+id).closest('.form-group').find('.form-control').attr("value","");
				}
				$('#submitBtn').removeAttr('disabled','disabled');
				$('#submtBtn').removeAttr('disabled','disabled');
			}
		});
	}else{
		alert("Please select a file.");
	}
	e.preventDefault();
}
function removeImage(remove_id,img_id,view_id,img_name_id,path,type){
	$(".img_error").trigger("focus");
    var e = jQuery.Event("keyup");
    $(".img_error").trigger(e);
	var img_name = $("#"+img_name_id).val();
	$.ajax({
		url: base_url + '/delete-image-folder',
		type: 'POST',
		data: {img_name:img_name,path:path},
		dataType: "json",
		success: function (data)
		{
			if(data.status == "success"){
				$("#"+img_id).val("");
				$("#"+img_name_id).val("");
				if(type == 1){
					$("#"+view_id).attr('src',"");
					$(".doc_append").html("");
				}else if(type == 2){
					$("#"+view_id).attr('src',"");
					$(".doc_append").html("");
					
				}else if(type == 4){
					$("#"+view_id).attr('src',"");
					$(".doc_append").html("");
					$(".allfiletype").val("");
				}
				
				if(remove_id == 'pro_pic_remove')
				{
					$('.empimage').val('');
				}
				else if(remove_id == 'sign_pic_remove')
				{
                    $('.signimage').val('');
				}
				$('#'+remove_id).css("display","none");
				$("#"+img_id).closest('.form-group').find('.form-control').attr("value","");
			}
		}
	});
}

function OpenSaveData()
{
	var open_number=$("#open_number").val();
	var result_dec_date=$("#result_dec_date").val();
	var game_id=$("#game_id").val();
	var id=$("#id").val();

	if(open_number == ''){
		$("#error2").html(valid.error('Please select open number')).fadeIn('slow').delay(2500).fadeOut('slow');
	}
	/* else if(open_number.length!=3){
		$("#error2").html(valid.error('Please enter 3 digit number')).fadeIn('slow').delay(2500).fadeOut('slow');
	} */
	else
	{
		$("#openSaveBtn").attr("disabled",true);	   
		var changeBtn = $("#openSaveBtn").html();
		$("#openSaveBtn").html("Saving..");
		$.ajax({
			type: "POST",
			url: base_url + "/save-game-open-data",
			data: {open_number:open_number,game_id:game_id,id:id,result_dec_date:result_dec_date},
			dataType: "json",
			success: function (data) {
				if (data.status == 'success')
				{
					$("#open_result").val(data.open_result);
					$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					gameResultHistoryLoadData();
				}
				$("#openDecBtn").show();
				$("#openSaveBtn").attr("disabled",false);
				$("#openSaveBtn").html(changeBtn);
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				$("#openSaveBtn").attr("disabled",false);
				$("#openSaveBtn").html(changeBtn);
			}
		});
	}
}

function closeSaveData()
{
	var close_number=$("#close_number").val();
	var game_id=$("#game_id").val();
	var id=$("#id").val();
	var result_dec_date=$("#result_dec_date").val();

	if(close_number == ''){
		$("#error2").html(valid.error('Please select close number')).fadeIn('slow').delay(2500).fadeOut('slow');
	}
	/* else if(close_number.length!=3){
		$("#error2").html(valid.error('Please enter 3 digit number')).fadeIn('slow').delay(2500).fadeOut('slow');
	} */
	else
	{
		$("#closeSaveBtn").attr("disabled",true);	   
		var changeBtn = $("#closeSaveBtn").html();
		$("#closeSaveBtn").html("Saving..");
		$.ajax({
			type: "POST",
			url: base_url + "/save-game-close-data",
			data: {close_number:close_number,game_id:game_id,id:id,result_dec_date:result_dec_date},
			dataType: "json",
			success: function (data) {
				if (data.status == 'success'){
					$("#close_result").val(data.close_result);
					$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					gameResultHistoryLoadData();
					$("#closeDecBtn").show();
				}else{
					$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				}
				$("#closeSaveBtn").attr("disabled",false);
				$("#closeSaveBtn").html(changeBtn);
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				$("#closeSaveBtn").attr("disabled",false);
				$("#closeSaveBtn").html(changeBtn);
			}
		});
	}
}

function decleareOpenResult()
{
	var open_number=$("#open_number").val();
	var game_id=$("#game_id").val();
	var result_dec_date=$("#result_dec_date").val();
	var id=$("#id").val();

	$("#openDecBtn").attr("disabled",true);	   
	var changeBtn = $("#openDecBtn").html();
	$("#openDecBtn").html("Declaring..");
	$.ajax({
		type: "POST",
		url: base_url + "/decleare-game-open-data",
		data: {game_id:game_id,result_dec_date:result_dec_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				gameResultHistoryLoadData();
				$("#openSaveBtn").hide();
				$("#openDecBtn").hide();
			}else{
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#openDecBtn").attr("disabled",false);
			$("#openDecBtn").html(changeBtn);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#openDecBtn").attr("disabled",false);
			$("#openDecBtn").html(changeBtn);
		}
	});
}

function decleareCloseResult()
{
	var close_number=$("#close_number").val();
	var game_id=$("#game_id").val();
	var result_dec_date=$("#result_dec_date").val();
	var id=$("#id").val();

	$("#closeDecBtn").attr("disabled",true);	   
	var changeBtn = $("#closeDecBtn").html();
	$("#closeDecBtn").html("Declaring..");
	$.ajax({
		type: "POST",
		url: base_url + "/decleare-game-close-data",
		data: {game_id:game_id,result_dec_date:result_dec_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				gameResultHistoryLoadData();
				$("#closeSaveBtn").hide();
				$("#closeDecBtn").hide();
			}else{
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#closeDecBtn").attr("disabled",false);
			$("#closeDecBtn").html(changeBtn);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#closeDecBtn").attr("disabled",false);
			$("#closeDecBtn").html(changeBtn);
		}
	});
}

function OpenDeleteResultConfirmData(game_id,delete_date,delete_row)
{
	$("#delete_open_game_id").val(game_id);
	$("#delete_open_game_date").val(delete_date);
	$("#delete_open_row_id").val(delete_row);
	$("#deleteConfirmOpenResutlt").modal('show');
}

function closeDeleteResultConfirmData(game_id,delete_date,delete_row)
{
	$("#delete_close_game_id").val(game_id);
	$("#delete_close_game_date").val(delete_date);
	$("#delete_close_row_id").val(delete_row);
	$("#deleteConfirmCloseResutlt").modal('show');
}

function OpenDeleteResultData()
{
	var game_id=$("#delete_open_game_id").val();
	var result_date=$("#game_result_date").val();
	var id=$("#delete_open_row_id").val();
	
	$("#openDecBtn1").attr("disabled",true);	
	$("#btn_spinner2").css("display","inline-block");	
	$.ajax({
		type: "POST",
		url: base_url + "/delete-open-result-data",
		data: {id:id,game_id:game_id,result_date:result_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				$("#deleteConfirmOpenResutlt").modal('hide');
				$("#result_div").addClass('div_display');
				gameResultHistoryLoadData();
			}else{
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#btn_spinner2").css("display","none");
			$("#openDecBtn1").attr("disabled",false);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error_new").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#btn_spinner2").css("display","none");
			$("#openDecBtn1").attr("disabled",false);
		}
	});
}

function closeDeleteResultData()
{
	var game_id=$("#delete_close_game_id").val();
	var result_date=$("#game_result_date").val();
	var id=$("#delete_close_row_id").val();

	$("#closeDecBtn1").attr("disabled",true);	
	$("#btn_spinner_3").css("display","inline-block");	
	$.ajax({
		type: "POST",
		url: base_url + "/delete-close-result-data",
		data: {id:id,game_id:game_id,result_date:result_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				$("#deleteConfirmCloseResutlt").modal('hide');
				gameResultHistoryLoadData();
			}else{
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#btn_spinner_3").css("display","none");
			$("#closeDecBtn1").attr("disabled",false);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error_new").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#btn_spinner_3").css("display","none");
			$("#closeDecBtn1").attr("disabled",false);
		}
	});
}

function gameResultHistoryLoadData()
{
	var date = $("#game_result_date").val();
	var ob2 = '';
	$.ajax({
		type: "POST",
		url: base_url + "/get-game-result-history-data",
		data: {date:date},
		dataType: "json",
		success: function (data) {
			if(data != ''){
				$.each(data, function(key, val) {
					ob2+='<tr><td>'+val.sn+'</td><td>'+val.game_name+'</td><td>'+val.result_date+'</td><td>'+val.open_date+'</td><td>'+val.close_date+'</td><td>'+val.open_result+'</td><td>'+val.close_result+'</td></tr>'
				});
				$('#getGameResultHistoryData').html(ob2);
			}else{
				$('#getGameResultHistoryData').html('<tr><td class="text-center" colspan="7"> No Record Found</td></tr>');
			}
		}
	});
}

function getStarlineGameData(val)
{
	$("#game_id").html('<option value="">Loading Games...</option>');
	$.ajax({
		url: base_url + '/get-starline-games',
		type: 'POST',
		data: {id:val},
		dataType: "json",
		success: function (data)
		{
			$("#game_id").html('');
			if(data.getGamesData!='')
			{
				$("#game_id").append('<option value="">--Select Games--</option>');
				$.each(data.getGamesData, function (key, val) {
					$("#game_id").append('<option value="'+val.game_id+'">'+val.game_name+'</option>');
				});
			}
			else
			{
				$("#game_id").html('<option value="">--Select Games--</option>');
			}
		}
	});
}

function OpenSaveStarlineGameData()
{
	var open_number=$("#open_number").val();
	var result_dec_date=$("#result_dec_date").val();
	var game_id=$("#game_id").val();
	var id=$("#id").val();
			
	if(open_number == ''){
		$("#error2").html(valid.error('Please select open number')).fadeIn('slow').delay(2500).fadeOut('slow');
	}
	/* else if(open_number.length!=3){
		$("#error2").html(valid.error('Please enter 3 digit number')).fadeIn('slow').delay(2500).fadeOut('slow');
	} */
	else
	{
		$("#openSaveBtn").attr("disabled",true);	   
		var changeBtn = $("#openSaveBtn").html();
		$("#openSaveBtn").html("Saving..");
		$.ajax({
			type: "POST",
			url: base_url + "/save-open-starline-game-result",
			data: {open_number:open_number,game_id:game_id,id:id,result_dec_date:result_dec_date},
			dataType: "json",
			success: function (data) {
				if (data.status == 'success')
				{
					$("#open_result").val(data.open_result);
					starlineGameResultHistoryLoadData();
					$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				}
				$("#openDecBtn").show();
				$("#openSaveBtn").attr("disabled",false);
				$("#openSaveBtn").html(changeBtn);
			},
			error: function (jqXHR, exception) {
				var msg = valid.ajaxError(jqXHR,exception);
				$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
				$("#openSaveBtn").attr("disabled",false);
				$("#openSaveBtn").html(changeBtn);
			}
		});
	}
}

function decleareOpenStarlineResult()
{
	var open_number=$("#open_number").val();
	var game_id=$("#game_id").val();
	var result_dec_date=$("#result_dec_date").val();
	var id=$("#id").val();
		
	$("#openDecBtn").attr("disabled",true);	   
	var changeBtn = $("#openDecBtn").html();
	$("#openDecBtn").html("Declaring..");
	$.ajax({
		type: "POST",
		url: base_url + "/decleare-open-starline-result",
		data: {game_id:game_id,result_dec_date:result_dec_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				starlineGameResultHistoryLoadData();
				$("#openSaveBtn").hide();
				$("#openDecBtn").hide();
			}else{
				$("#error2").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#openDecBtn").attr("disabled",false);
			$("#openDecBtn").html(changeBtn);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error2").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#openDecBtn").attr("disabled",false);
			$("#openDecBtn").html(changeBtn);
		}
	});
}

function OpenDeleteStarlineResultConfirmData(game_id,delete_date,delete_row)
{
	$("#delete_open_game_id").val(game_id);
	$("#delete_open_game_date").val(delete_date);
	$("#delete_open_row_id").val(delete_row);
	$("#deleteConfirmOpenResutlt").modal('show');
}

function StarlineOpenDeleteResultData()
{
	var game_id=$("#delete_open_game_id").val();
	var result_date=$("#starline_game_result_date").val();
	var id=$("#delete_open_row_id").val();
	
	$("#openDecBtn1").attr("disabled",true);	
	$("#btn_spinner2").css("display","inline-block");	
	$.ajax({
		type: "POST",
		url: base_url + "/starline-delete-open-result-data",
		data: {id:id,game_id:game_id,result_date:result_date},
		dataType: "json",
		success: function (data) {
			if (data.status == 'success'){
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
				$("#deleteConfirmOpenResutlt").modal('hide');
				$("#result_div").addClass('div_display');
				starlineGameResultHistoryLoadData();
			}else{
				$("#error_new").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
			}
			$("#btn_spinner2").css("display","none");
			$("#openDecBtn1").attr("disabled",false);
		},
		error: function (jqXHR, exception) {
			var msg = valid.ajaxError(jqXHR,exception);
			$("#error_new").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
			$("#btn_spinner2").css("display","none");
			$("#openDecBtn1").attr("disabled",false);
		}
	});
}

function starlineGameResultHistoryLoadData()
{
	var date = $("#starline_game_result_date").val();
	var ob2 = '';
	$.ajax({
		type: "POST",
		url: base_url + "/starline-game-result-history-data",
		data: {date:date},
		dataType: "json",
		success: function (data) {
			if(data!=''){
				$.each(data, function(key, val) {
					ob2+='<tr><td>'+val.sn+'</td><td>'+val.game_cat_name+'</td><td>'+val.game_name+'</td><td>'+val.result_date+'</td><td>'+val.open_date+'</td><td>'+val.open_result+'</td></tr>'
				});
				$('#getGameResultHistoryData').html(ob2);
			}else{
				$('#getGameResultHistoryData').html('<tr><td class="text-center" colspan="6"> No Record Found</td></tr>');
			}
		}
	});
}