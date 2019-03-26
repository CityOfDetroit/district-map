$.ajax({
    method: 'GET',
    url: 'https://detroitmi.gov/rest/district-managers?_format=hal_json',
    dataType: 'json',
    contentType: 'application/json',
    processData: false,
    success: AjaxSucceeded,
    error: AjaxFailed
  }).done(function (result) {
    console.log(result);
});