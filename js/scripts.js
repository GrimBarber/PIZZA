$(document).ready(function() {
	
	var numFormat = wNumb({
		thousand: ' '
	});
	
	$('.about-us-gallery-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$(".about-us-thumbs-slider .slick-slide").removeClass("slick-current");
		$(".about-us-thumbs-slider .slick-slide").eq(nextSlide).addClass("slick-current");
	});
	
	/*SLIDER*/
	$('.about-us-gallery-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		asNavFor: '.about-us-thumbs-slider',
		infinite: false,
		fade: true
	});
	
	$('.about-us-thumbs-slider').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		asNavFor: '.about-us-gallery-slider',
		focusOnSelect: true,
		infinite:false,
		arrows:false
	});
	/*SLIDER*/
	
	/*SELECTS*/
	$('select').styler({
		selectSmartPositioning: true,
	});
	
	/*SELECTS*/
	
	$(".sort-by-type").on("click",function() {
		$(this).toggleClass("active") 
		
		return false;
	});
	
	/*VALUE AND ITEM SELECTION*/
		$(".ingridient-container").on("click",function() {
			if ( !$(this).hasClass("active") ) {
				$(this).find("input[type=hidden]").val('1');
				$(this).addClass("active");
			} else  {
				$(this).find("input[type=hidden]").val('0');
				$(this).removeClass("active");
			}
		});
	/*VALUE AND ITEM SELECTION*/
	
	
	
	
	/*VALIDATION AND ITEM SELECTION*/
	function validateForms() {
		$("form").each(function() {
			$(this).validate({
				focusInvalid: false,
				sendForm : false,
				errorPlacement: function(error, element) {
					if (element[0].tagName == "SELECT") {
						element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
					}
					if (element.attr("type") == "checkbox") {
						element.parents(".icheckbox").addClass("icheckbox-error")
					} else {
						error.insertAfter(element);
					}
				},
				unhighlight: function(element, errorClass, validClass) {
					$(element).removeClass(errorClass);
					$(element).next(".error").remove();
					if ($(element)[0].tagName == "SELECT") {
						$(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
					}
					if ($(element).attr("type") == "checkbox") {
						$(element).parents(".icheckbox").removeClass("icheckbox-error")
					}
				},
				invalidHandler: function(form, validatorcalc) {
					var errors = validatorcalc.numberOfInvalids();
					if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
						validatorcalc.errorList[0].element.focus();
					}
				}
			});
			if ($(this).find(".form-date").length) {
				$(this).find(".form-date").rules('add', {
					messages: {
						required:  "Выберите дату"
					}
				});
			}
			if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
				$(this).find("input.password-repeat").rules('add', {
					equalTo: ".password"
				});
			}
		});  
	}
	/*VALIDATION AND ITEM SELECTION*/
	
	/*MASK*/
	jQuery(function($) {
		$("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
		$(".phone").mask("+ 7 (9 9 9) 9 9 9-9 9 9 9");
		$("#tin").mask("99-9999999");
		$("#ssn").mask("999-99-9999");
	});
	
//	$(".cart-sum-container").on("mouseover",function() {
//		$(".cart-hidden").fadeIn(250);
//	});
	
	// Формы
	
	$("input:text, input:password, textarea").each(function() {
    if ($(this).val()) {
      $(this).prev(".placeholder").hide();
    }
  });
	

	$(".placeholder, input, textarea").on("click keydown",function() {
		var item = $(this);
		
		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.hasClass("phone") && !item.hasClass("form-date")) {
				placeholder.hide();
			}
			
		}
		
	});
	
	$("body").on("blur","input, textarea",function() {
		var item = $(this);
		
		if (item.parent().find(".placeholder").length) {
			var placeholder = item.parent().find(".placeholder");

			if (!item.val() || (item.hasClass("masked") && ! /\d/.test(item.val()))) {
				placeholder.show();
			}
			
		}
		
	});
	
	$(".read-next").click(function() {
		$(".hidden-bottom-text-container").fadeToggle(400);
	})
	
	$("body").on("click",function(e) {
		if (!$(e.target).hasClass("services-option") && !$(e.target).hasClass("services-button") && !$(e.target).parents().hasClass("services-option") && !$(e.target).parents().hasClass("services-button")) {
			$(".services-option").fadeOut(250)
		}
	})
	
	$("body").on("click",".placeholder",function(e) {
		if ($(this).parent().find("input").length) {
			$(this).parent().find("input").trigger("focus");
		}
		if ($(this).parent().find("textarea").length) {
			$(this).parent().find("textarea").trigger("focus");
		}
	})

	validateForms();
	
	$("#size_selector_1").on("change",function() {
		$("#size_selector_2").val($("#size_selector_1").val()).trigger('refresh');
	})
	
	$("#size_selector_2").on("change",function() {
		$("#size_selector_1").val($("#size_selector_2").val()).trigger('refresh');
	})
	
	$("#amount_selector_1").on("change",function() {
		$("#amount_selector_2").val($("#amount_selector_1").val()).trigger('refresh');
	})
	
	$("#amount_selector_2").on("change",function() {
		$("#amount_selector_1").val($("#amount_selector_2").val()).trigger('refresh');
	})
	
	$(".item-container select.size, .catalog-item-descr select.size").on("change",function() {
		sizePrice = $(this).find("option:selected").data("price");
		amount = $(this).parents(".item-select-container").find("select.amount").val();
		
		totalPrice = sizePrice*amount;
		
		if ($(this).parents(".catalog-item-descr").length) {
			$(this).parents(".catalog-item-descr").find(".price-indicator .num").html(numFormat.to(totalPrice))
		} else if ($(this).parents(".item-container").length) {
			$(this).parents(".item-container").find(".price-indicator .num").html(numFormat.to(totalPrice))
		}
		
	});
	
	$(".item-container select.amount, .catalog-item-descr select.amount").on("change",function() {
		
		amount = $(this).val();
		
		if ($(this).parents(".item-select-container").find("select.size").length) {
			sizePrice = $(this).parents(".item-select-container").find("select.size option:selected").data("price");
			totalPrice = sizePrice*amount;
		} else {
			if ($(this).parents(".catalog-item-descr").length) {
				itemPrice = $(this).parents(".catalog-item-descr").data("price");
			} else if ($(this).parents(".item-container").length) {
				itemPrice = $(this).parents(".item-container").data("price");
			}
			totalPrice = itemPrice*amount;
		}
		
		
		if ($(this).parents(".catalog-item-descr").length) {
			$(this).parents(".catalog-item-descr").find(".price-indicator .num").html(numFormat.to(totalPrice))
		} else if ($(this).parents(".item-container").length) {
			$(this).parents(".item-container").find(".price-indicator .num").html(numFormat.to(totalPrice))
		}
		
	});
	
});

function validateForms() {
  
  $("form").each(function() {
    $(this).validate({
      focusInvalid: false,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.parents(".form-item").find(".param-selector").addClass("param-sel-error")
        }
				if (element.attr("type") == "checkbox") {
          element.parents(".icheckbox").addClass("icheckbox-error")
        } else {
					error.insertAfter(element);
				}
        
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
				
        $(element).next(".error").remove();
        if ($(element)[0].tagName == "SELECT") {
          $(element).parents(".form-item").find(".param-selector").removeClass("selector-error")
        }
				if ($(element).attr("type") == "checkbox") {
          $(element).parents(".icheckbox").removeClass("icheckbox-error")
        }
      },
      invalidHandler: function(form, validatorcalc) {
				var errors = validatorcalc.numberOfInvalids();
				if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {                    
						validatorcalc.errorList[0].element.focus();
				}
      }
    });
    
    if ($(this).find(".form-date").length) {
      $(this).find(".form-date").rules('add', {
        messages: {
          required:  "Выберите дату"
        }
      });
    }
		
		if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
			$(this).find("input.password-repeat").rules('add', {
        equalTo: ".password"
      });
		}
    
  });

}

jQuery.extend(jQuery.validator.messages, {
	required: "Пожалуйста, заполните это поле!",
	remote: "Please fix this field.",
	email: "Введите правильный e-mail",
	url: "Please enter a valid URL.",
	date: "Please enter a valid date.",
	dateISO: "Please enter a valid date (ISO).",
	number: "Please enter a valid number.",
	digits: "Please enter only digits.",
	creditcard: "Please enter a valid credit card number.",
	equalTo: "Please enter the same value again.",
	accept: "Please enter a value with a valid extension.",
	maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
	minlength: jQuery.validator.format("Please enter at least {0} characters."),
	rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
	range: jQuery.validator.format("Please enter a value between {0} and {1}."),
	max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
	min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

$(".submition").click(function(event) {
	event.preventDefault();
	$(this).parents(".modal-content").find(".order-form-wrapper").hide();
	$(".hidden-form-holder").fadeIn(250);
});

$("#orderModal .close-cross").on("click",function() {
	$(".hidden-form-holder").hide();
  $(this).parents(".modal-content").find(".order-form-wrapper").fadeIn(250);
});