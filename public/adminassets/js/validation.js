var admin = $("#admin").val();
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
$(document).ready(function(){
    $('.in_field').on('change', function(e) {
		var select2 = $(this).attr('id');
	    var val = $("#"+select2).val();
		if (val != '') 
		{
			$("#"+select2).removeClass("error");
			$("#"+select2+"-error").css("display","none");
		}
	 
	 });
    $.validator.addMethod("checklower", function(value) {
        return /[a-z]/.test(value);
      });
      $.validator.addMethod("checkupper", function(value) {
        return /[A-Z]/.test(value);
      });
      $.validator.addMethod("checkdigit", function(value) {
        return /[0-9]/.test(value);
      });$.validator.addMethod("checkspecial", function(value) {
        return /[!@#$%^&*()_+|*{}<>]/.test(value);
      });

	$('#open_game_result').hide();
		jQuery.validator.addMethod("dollarsscents", function(value, element) {
			return this.optional(element) || /^\d{0,4}(\.\d{0,2})?$/i.test(value);
		}, "You must include two decimal places");
	  
	  $.validator.addMethod("checkModuleName", function(value) {
		$.ajax({
			url: base_url+'check-module-name',
			type: 'POST',
			data : $('#projectFrm').serialize(),
			dataType: "json",
			success: function(data)
			{
			}
		});
      });
    //Login Form
    $("#loginform").validate({
        rules:{
            username:{
                required:true,
            },
            password:{
                required:true,
            },
        },
        messages:{
            username:{
          		required:"Please enter username",
            },
            password:{
                required:"Please enter password",
            },
        },
        submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			$.ajax({ 
                url: admin+'/admin-login-check',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success") {
						$("#loginmsg").html(valid.success(data.msg));
						var url = admin+"/dashboard";
						$(location).attr('href', url);
					}
					else{
						$("#loginmsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#loginmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
            });
            return false;
        }
    }); 
	
	//Change Password Form
	$("#changePassFrm").validate({
		rules:{
			old_password:{
				required:true,
				remote : {
					url : admin+"/check-old-password",
					type : "post"
				},
			},
			new_password:{
				required:true,
				minlength: 8,checklower:true,checkupper:true,checkdigit:true,checkspecial:true,
			},
			confirm_password:{
				required:true,
				equalTo:"#new_password",
			},
		},
		messages:{
			old_password:{
				required:"Please enter old password",
				remote : "Old password does not match",
			},
			new_password:{
				required:"Please enter new password",
				minlength : "Password must contain 8 characters",checklower:"Password must contain lower case character",
				checkupper:"Password must contain upper case character",
				checkdigit:"Password must contain number",
				checkspecial:"Password must contain at least one special character",
			},
			confirm_password:{
				required:"Please enter confirm password",
				equalTo: "Confirm password does not match",
			}
		},
		submitHandler: function(form){
			
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			$.ajax({ 
				url: admin+'/update-admin-password',
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data)
				{	
					if(data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#changePassFrm')[0].reset();
					}else{
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
			});
			return false;
		}
	}); 
	//Recover Form
	$("#recoverform").validate({
		rules:{
			email:{
				required:true,
				remote : {
					url : admin+"/check-email",
					type : "post"
				},
			},
		},
		messages:{
			email:{
				required:"Please enter email",
				remote:"Email is not found",
			},
		},
		submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			$.ajax({ 
				url: admin+'/forgot-password',
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data)
				{	
					if(data.status == "success") {
						$("#recovermsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#recoverform')[0].reset();
					}else{
						$("#recovermsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#recovermsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
			});
			return false;
		}
	});

	//Password Reset
	$("#resetFrm").validate({
		rules:{
			new_password:{
				required:true,
				minlength: 8,checklower:true,checkupper:true,checkdigit:true,checkspecial:true,
			},
			confirm_password:{
				required:true,
				equalTo:"#new_password",
			},
		},
		messages:{
			new_password:{
				required:"Please enter new password",
				minlength : "Password must contain 8 characters",checklower:"Password must contain lower case character",
				checkupper:"Password must contain upper case character",
				checkdigit:"Password mu	st contain number",
				checkspecial:"Password must contain at least one special character",
			},
			confirm_password:{
				required:"Please enter confirm password",
				equalTo: "Confirm password does not match",
			}
		},
		submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			$.ajax({ 
				url: admin+'/submit-reset-password',
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data)
				{	
					if(data.status == "success") {
						$("#resetmsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						var url =  admin;
						$(location).attr('href', url);
					}else{
						$("#resetmsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#resetmsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
			});
			return false;
		}
	});
	
	// Add Sub Admin
	$("#subAdminFrm").validate({
		rules:{
			admin_name:{
				required:true,
				minlength: 2
			},
			admin_email:{
				required:true
			},
			admin_username:{
				required:true,
				remote: {
					depends: function(){ if($("#old_user_name").val()!= $("#admin_username").val()){
						return true;
						} 
					},
					param :{
						url : admin+"/check-unique-username",
					type : "post"
					}
			 	},
			},
			password:{
				required:true,
				minlength: 8,checklower:true,checkupper:true,checkdigit:true,checkspecial:true,
			}
		},
		messages:{
			admin_name:{
				required:"Please enter sub admin name",
				minlength:"Name must contain at-least 2 character"
			},
			admin_email:{
				required:"Please enter sub admin email",
			},
			admin_username:{
				required:"Please enter sub admin username",
				remote : "Username Should be unique",
			},
			password:{
				required:"Please enter password",
				minlength : "Password must contain 8 characters",checklower:"Password must contain lower case character",
				checkupper:"Password must contain upper case character",
				checkdigit:"Password must contain number",
				checkspecial:"Password must contain at least one special character",
			}
		},
		submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			$.ajax({ 
				url: admin+'/submit-sub-admin',
				type: 'POST',
				data: new FormData(form),
				processData: false,
				contentType: false,
				dataType: "json",
				success: function (data)
				{	
					if(data.status == "success") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#subAdminFrm')[0].reset();
					}if(data.status == "update") {
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}else{
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
			});
			return false;
		}
	}); 

	/* Add Games section start */
	
	$("#addGameFrm").validate({
        rules:{
            game_name:{
                required:true,
				remote: {
					depends: function(){ if($("#old_game_name").val()!= $("#game_name").val()){
						return true;
						} 
					},
					param :{
						url: admin+"/check-duplicate-game-name",
						type: "post",
					}
			 	},
				minlength:2,
            },
			open_time:{
				required:true,
			},
			close_time:{
				required:true,
			}
        },
        messages:{
            game_name:{
				required:"Please enter game name",
				minlength : "Please enter name at least two characters",
				remote:"Game Name already exist",
            },
			open_time:{
				required:"Please select open time",
			},
			close_time:{
				required:"Please select close time",
			},
        },
        submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
            $.ajax({ 
                url: admin+'/submit-game-name',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success"){
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#addGameFrm')[0].reset();
						dataTable.ajax.reload();
					}else if(data.status == "update"){
						$("#errormsg").html(valid.success(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function(){$('#addGamesModal').modal('hide')}, 2000);
					}
					else{
						$("#errormsg").html(valid.error(data.msg)).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });

	/* Add Games section end */
	
	/* Setting section start */
	
	$("#settingFrm").validate({
		ignore: "",
        rules:{
            heading_2:{
				required:true,
			},
			email:{
				required:true,
				email:true
			},
			image_text:{
				required:true,
			},
			prof_pic:{
				required:true,
			},
			description_title:{
				required:true,
			},
			description:{
				required:true,
			}
        },
        messages:{
            heading_2:{
				required:"Please enter heading",
            },
			email:{
				required:"Please enter email id",
				email:"Please enter valid email"
            },
			image_text:{
				required:"Please enter image text",
            },
			prof_pic:{
				required:"Please select any image",
			},
			description:{
				required:"Please enter description title",
			},
			description:{
				required:"Please enter description",
			},
        },
        submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
            $.ajax({ 
                url: base_url + '/submit-settings',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}else if(data.status == "update"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}else{
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					setTimeout(function(){location.reload();},2000);
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });

	/* Setting section end */
	
	
	/* Game Result Search Section start */
	
	$("#declareResultGameSrchFrm").validate({
		rules:{
            result_dec_date:{
				required:true,
			},
			game_id:{
				required:true,
			},
			market_status:{
				required:true,
			},
        },
        messages:{
            result_dec_date:{
				required:"Please select result declare date",
            },
			game_id:{
				required:"Please select game",
			},
			market_status:{
				required:"Please market status",
            },
        },
        submitHandler: function(form){
			$("#srchBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			
			$("#open_result").val('');
			$("#close_result").val('');
			$("#result_div").addClass('div_display');
			$("#open_game_result").hide();
			$("#openSaveBtn").show();
			$("#closeSaveBtn").show();
			$("#openDecBtn").hide();
			$("#closeDecBtn").hide();
			
			$("#open_number").val('').trigger('change'); 
			$("#close_number").val('').trigger('change'); 
			
			var market_status = $("#market_status").val();
			
            $.ajax({ 
                url: base_url + '/get-decleare-game-result-data',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success"){
						if(market_status==1){
							$(".open_panna_div").show();
							$(".close_panna_div").hide();
						}else if(market_status==2){
							$(".open_panna_div").hide();
							$(".close_panna_div").show();
						}
						
						if(data.open_decleare_status==1){
							$("#openSaveBtn").hide();
							$("#openDecBtn").hide();
						}
						
						if(data.close_decleare_status==1){
							$("#closeSaveBtn").hide();
							$("#closeDecBtn").hide();
						}
						
						$("#result_div").removeClass('div_display');
						$("#id").val(data.id);
						if(data.open_number != "" && data.open_number != null){
							$("#open_number").val(data.open_number).trigger('change'); 
							$("#open_result").val(data.open_result);
						}	
						if(data.close_number != "" && data.close_number != null) {
							$("#close_number").val(data.close_number).trigger('change');
							$("#close_result").val(data.close_result);
						}	
						
						if(data.close_result == ""){ $("#close_result").val(''); }
						if(data.open_result == ""){ $("#open_result").val(''); }
						
						if(data.open_decleare_status!=1)
						{
							if(data.open_result !=""){
								$("#openDecBtn").show();
							}
						}
						if(data.close_decleare_status!=1)
						{
							if(data.close_result !=""){
								$("#closeDecBtn").show();
							}
						}
						
						if(data.open_decleare_status==1)
						{
							$("#open_game_result").show();
							$("#open_result_data").html(data.open_number);
						}
					}else{
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#srchBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#srchBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });
	
	/* Game Result Search Section end */
	
	$("#addStarlineGamesCatFrm").validate({
        rules:{
            game_cat_name:{
                required:true,
				remote: {
					depends: function(){ if($("#old_game_cat_name").val()!= $("#game_cat_name").val()){
						return true;
						} 
					},
					param :{
						url: base_url +'/'+ admin + "/check-duplicate-starline-game-cat",
						type: "post",
					}
			 	},
				minlength:2,
            },
        },
        messages:{
            game_cat_name:{
				required:"Please enter game type",
				minlength : "Please enter type at least two characters",
				remote:"Game type already exist",
            },
        },
        submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
            $.ajax({ 
                url: base_url + '/submit-starline-game-category-name',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
						$('#addStarlineGamesCatFrm')[0].reset();
						dataTable.ajax.reload();
					}else if(data.status == "update"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function(){$('#addGamesModal').modal('hide')}, 2000);
					}
					else{
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });
	
	$("#addStarlineGamesFrm").validate({
        rules:{
			games_category:{
                required:true,
			},
            game_name:{
                required:true,
				remote: {
					depends: function(){ if($("#old_game_name").val()!= $("#game_name").val()){
						return true;
						} 
					},
					param :{
						url: base_url +'/'+ admin + "/check-duplicate-starline-game",
						type: "post",
						data: {
							games_category: function() {
							  return $( "#games_category" ).val();
							},
							game_name: function() {
							  return $( "#game_name" ).val();
							}
						},
					}
			 	},
				minlength:2,
            },
			open_time:{
                required:true,
			},
        },
        messages:{
			games_category:{
				required:"Please select game type",
			},
            game_name:{
				required:"Please enter game name",
				minlength : "Please enter name at least two characters",
				remote:"Game Name already exist",
            },
			open_time:{
				required:"Please enter game time",
			}
        },
        submitHandler: function(form){
			$("#submitBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
            $.ajax({ 
                url: base_url + '/submit-starline-game-name',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if(data.status == "success"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
						/* $('#addStarlineGamesFrm')[0].reset(); */
						$("#game_name").val('');
						$("#open_time").val('');
						dataTable.ajax.reload();
					}else if(data.status == "update"){
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
						dataTable.ajax.reload();
						window.setTimeout(function(){$('#addGamesModal').modal('hide')}, 2000);
					}
					else{
						$("#errormsg").html(data.msg).fadeIn('slow').delay(2500).fadeOut('slow');
					}
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#submitBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });
	
	$("#starlineGameSrchFrm").validate({
        rules:{
			games_category:{
                required:true,
			},
            game_id:{
                required:true,
			},
        },
        messages:{
			games_category:{
				required:"Please select game type",
			},
            game_id:{
				required:"Please select game name",
            },
        },
        submitHandler: function(form){
			
			$("#result_div").addClass('div_display');
			$("#openDecBtn").hide();
			$("#openSaveBtn").show();
			$("#open_result").val('');
			
			$("#srchBtn").attr("disabled",true);
			$("#btn_spinner").css("display","inline-block");
			
			$("#open_number").val('').trigger('change'); 
			$("#close_number").val('').trigger('change'); 
			
            $.ajax({ 
                url: base_url + '/get-decleare-starline-game-data',
                type: 'POST',
                data: new FormData(form),
                processData: false,
                contentType: false,
                dataType: "json",
                success: function (data)
                {	
					if (data.status == 'success')
					{
						if(data.open_decleare_status==1){
							$("#openSaveBtn").hide();
							$("#openDecBtn").hide();
						}
						$("#result_div").removeClass('div_display');
						if(data.open_number != "" && data.open_number != null){
							$("#open_number").val(data.open_number).trigger('change'); 
							$("#open_result").val(data.open_result);
						}	
						if(data.open_result == ""){ $("#open_result").val(''); }
						$("#id").val(data.id);
						
						if(data.open_decleare_status!=1)
						{
							if(data.open_result!='')
							{
								$("#openDecBtn").show();
							}
						}
						
						if(data.open_decleare_status==1)
						{
							$("#open_game_result").show();
							$("#open_result_data").html(data.open_number);
						}
					}
					$("#btn_spinner").css("display","none");
					$("#srchBtn").attr("disabled",false);
				},
				error: function (jqXHR, exception) {
					var msg = valid.ajaxError(jqXHR,exception);
					$("#errormsg").html(valid.error(msg)).fadeIn('slow').delay(5000).fadeOut('slow');
					$("#btn_spinner").css("display","none");
					$("#srchBtn").attr("disabled",false);
				}
            });
            return false;
        }
    });
	
});

$("select").closest("form").on("reset",function(ev){
	var targetJQForm = $(ev.target);
	setTimeout((function(){
		this.find("select").trigger("change");
	}).bind(targetJQForm),0);
	});

function checkPassword(pass,type){
	if(type == 2){
		$(".progress_img_upload").css("display","block");
	}
	var count = 0;
	if(pass.length>=8){
			count = count+1;
			$("#pas_len").removeClass("fa-times error");
			$("#pas_len").addClass("fa-check success");
	}
	else{
		$("#pas_len").addClass("fa-times error");
		$("#pas_len").removeClass("fa-check success");
	}
	if(pass.match(/[a-z]/)){
			count = count+1;
			$("#low_lett").removeClass("fa-times error");
			$("#low_lett").addClass("fa-check success");	
	}else{
		$("#low_lett").addClass("fa-times error");
		$("#low_lett").removeClass("fa-check success");	
	}
	if(pass.match(/[A-Z]/)){
		count = count+1;
		$("#upp_lett").removeClass("fa-times error");
		$("#upp_lett").addClass("fa-check success");
	}
	else{
		$("#upp_lett").addClass("fa-times error");
		$("#upp_lett").removeClass("fa-check success");
	}
	if(pass.match(/\d/)){
		count = count+1;
		$("#pass_num").removeClass("fa-times error");
		$("#pass_num").addClass("fa-check success");
	}
	else{
		$("#pass_num").addClass("fa-times error");
		$("#pass_num").removeClass("fa-check success");
	}
	if(pass.match(/[!@#$%^&*()_+|*{}<>]/)){
		count = count+1;
		$("#spe_ch").removeClass("fa-times error");
		$("#spe_ch").addClass("fa-check success");
	}else{
		$("#spe_ch").addClass("fa-times error");
		$("#spe_ch").removeClass("fa-check success");
	}
	if(count == 0){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:0%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}
	if(count>=1){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:10%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}if(count>=2){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:0%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}if(count>=3){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:10%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}if(count>=4){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:30%"></div><div class="progress-bar bg-success green_bar" style="width:0%"></div></div>');
	}if(count>=5){
		$(".pass_bar").html('<div class="progress pro_cls"><div class="progress-bar bg-danger red_bar" style="width:30%"></div><div class="progress-bar bg-warning orange_bar" style="width:30%"></div><div class="progress-bar bg-success green_bar" style="width:40%"></div></div>');
	}
}