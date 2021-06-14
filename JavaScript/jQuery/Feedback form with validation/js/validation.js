
$(function() {
    $("form[name='form']").validate({
      rules: {
        name: {
            required: true,
            minlength: 2
        },
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: {
          required:"Please enter your firstname",
          minlength:jQuery.validator.format("Your name should be at least {0} chars")
        },
        email: "Please enter a valid email address"
      },
      submitHandler: function(form) {
        form.submit();
      }
    });
  });