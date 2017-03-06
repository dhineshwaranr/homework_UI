module.exports = {

  alert:function($div, msg){
      $div.find('.alert-msg').text(msg);
      if ($div.css('display') === 'none') {
          $div.fadeIn(100).delay(2000).fadeOut(2000);
      }
  }

}