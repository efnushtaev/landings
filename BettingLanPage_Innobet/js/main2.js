(function () {
  validate.extend(validate.validators.datetime, {
    parse: function (value, options) {
      return +moment.utc(value);
    },
    format: function (value, options) {
      var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
      return moment.utc(value).format(format);
    }
  });

  var constraints = {
    password: {
      presence: true,
      format: {
        pattern: /(^.*(?=.{6,20})(?!.*\s)(?=.*[a-zA-Z])(?=.*\d).*$)([\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]{0,})/,
        message: "Password length: 6-20. Password can contain only latin letters, numbers and punctuation marks.Password must contain at least 1 letter and 1 digit."
      }
    },
    username: {
      // You need to pick a username too
      presence: true,
      // And it must be between 3 and 20 characters long
      length: {
        minimum: 3,
        maximum: 20
      },
      format: {
        // We don't allow anything that a-z and 0-9
        pattern: "[0-9]+",
        // but we don't care if the username is uppercase or lowercase
        flags: "i",
        message: "can only contain 0-9"
      }
    },
    birthdate: {
      // The user needs to give a birthday
      presence: true,
      // and must be born at least 18 years ago
      date: {
        latest: moment().subtract(25, "years"),
        message: "^You must be at least 25 years old to use this service"
      }
    },
  };

  // Hook up the form so we can prevent it from being posted
  var form = document.querySelector("form#main");
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  // Hook up the inputs to validate on the fly
  var inputs = document.querySelectorAll("input, textarea, select")
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function (ev) {
      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {
    // validate the form against the constraints
    var errors = validate(form, constraints);
    // then we update the form to reflect the results
    showErrors(form, errors || {});
    if (!errors) {
  
      sendForm();

    }
  }

  // Updates the inputs with the validation errors
  function showErrors(form, errors) {
    // We loop through all the inputs and show the errors for that input
    _.each(form.querySelectorAll("input[name], select[name]"), function (input) {
      // Since the errors can be null if no errors were found we need to handle
      // that
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  // Shows the errors for a specific input
  function showErrorsForInput(input, errors) {
    // This is the root of the input
    var formGroup = closestParent(input.parentNode, "form-group")
      // Find where the error messages will be insert into
      ,
      messages = formGroup.querySelector(".messages");
    // First we remove any old messages and resets the classes
    resetFormGroup(formGroup);
    // If we have errors
    if (errors) {
      // we first mark the group has having errors
      formGroup.classList.add("has-error");
      // then we append all the errors
      _.each(errors, function (error) {
        addError(messages, error);
      });
    } else {
      // otherwise we simply mark it as success
      formGroup.classList.add("has-success");
    }
  }

  // Recusively finds the closest parent that has the specified class
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    // Remove the success and error classes
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    // and remove any old messages
    _.each(formGroup.querySelectorAll(".help-block.error"), function (el) {
      el.parentNode.removeChild(el);
    });
  }

  // Adds the specified error with the following markup
  // <p class="help-block error">[message]</p>
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  let showSmsForm = () => {
    $("#smsForm").css({'display':'block'});
    $("#main").css({'display':'none'});
  }

  let currentPhone;
  let myData;
  
  function sendForm() {
    currentPhone = document.getElementById('customer_phone').value
    myData = {
      password: document.getElementById('password').value,
      birthday: document.getElementById('birthdate').value,
      credential: currentPhone,
      language: 'EN',
      currency: 'UGX',
      affiliateCode: null
    }
    var data = new FormData();
    data.append("json", JSON.stringify(myData));
    let a = JSON.stringify(myData)
    fetch("https://www.innobet.ug/betting-api-gateway/user/rest/v2/security/registration/simple", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Origin': 'https://www.innobet.ug',
      },
      body: a
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.ok) {
        // showSmsForm();
        $(".errForm").css({'display':'block'}).html('Ops! Something wrong! Please, try again later.')
        return Promise.reject(new Error(
          'Response failed: ' + data.response.status + ' (' + data.response.statusText + ')'
          ));
          
        } else {
          showSmsForm();
        }
      
    })
  }

  $('#enter').click(function(ev) {
    ev.preventDefault();
    let codeData = {
      phone: currentPhone,
      code: document.getElementById('verificationCode').value,
    }
    var data = new FormData();
    data.append("json", JSON.stringify(codeData));
    let b = JSON.stringify(codeData)
    fetch("https://www.innobet.ug/betting-api-gateway/user/rest/v2/security/verify/phone", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Origin': 'https://www.innobet.ug',
      },
      body: b
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.ok) {
        // showSmsForm();
        $(".errForm").css({'display':'block'}).html('Ops! Something wrong! Please, try again later.')
        return Promise.reject(new Error(
          'Response failed: ' + data.response.status + ' (' + data.response.statusText + ')'
          ));
          
      } else  if (!data.response) {
          // showSmsForm();
          $(".errForm").css({'display':'block'}).html('Invalid verification code')
          return Promise.reject(new Error(
            'Response failed: ' + data.response.status + ' (' + data.response.statusText + ')'
            ));
            
      } else {
        alert('success')
      }
      
    })
  })

    $('#resend').click(function(ev) {
      ev.preventDefault();
      var data = new FormData();
    data.append("json", JSON.stringify(myData));
    let a = JSON.stringify(myData)
    fetch("https://www.innobet.ug/betting-api-gateway/user/rest/v2/security/registration/simple", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Origin': 'https://www.innobet.ug',
      },
      body: a
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (!data.ok) {
        // showSmsForm();
        $(".errForm").css({'display':'block'}).html('Ops! Something wrong! Please, try again later.')
        return Promise.reject(new Error(
          'Response failed: ' + data.response.status + ' (' + data.response.statusText + ')'
          ));
          
        } else {
          showSmsForm();
        }
      
    })
  })


})();

var maskList = $.masksSort($.masksLoad("https://cdn.rawgit.com/andr-04/inputmask-multi/master/data/phone-codes.json"), ['#'], /[0-9]|#/, "mask");
var maskOpts = {
  inputmask: {
    definitions: {
      '#': {
        validator: "[0-9]",
        cardinality: 1
      }
    },
    //clearIncomplete: true,
    showMaskOnHover: false,
    autoUnmask: true
  },
  match: /[0-9]/,
  replace: '#',
  list: maskList,
  listKey: "mask",
  onMaskChange: function (maskObj, completed) {
    if (completed) {
      var hint = maskObj.name_en;
      if (maskObj.desc_ru && maskObj.desc_ru != "") {
        hint += " (" + maskObj.desc_ru + ")";
      }
      $("#descr").html(hint);
    } else {
      $("#descr").html("");
    }
    $(this).attr("placeholder", $(this).inputmask("getemptymask"));
  }
};



$('#customer_phone').change(function () {
  $('#customer_phone').inputmasks(maskOpts);
  $('#customer_phone').inputmask("+#{*}", maskOpts.inputmask)
    .attr("placeholder", $('#customer_phone').inputmask("getemptymask"));
  $("#descr").html("");

});

$('#customer_phone').change();


var $page = $('html, body');
$('a[href*="#"]').click(function () {
  let offtop =  $($.attr(this, 'href')).offset().top - 100
    $page.animate({
        scrollTop: offtop
    }, 400);
    return false;
});