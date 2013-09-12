/*
* Twitter web timeline filter bookmarklet v0.01
* by William Turrell, http://wturrell.co.uk https://github.com/wturrell/twitterfilter
* Bookmarklet must be hosted with SSL
*/
  
if (typeof jQuery === 'undefined') {
  alert("Sorry, the bookmarklet can't run because jQuery is not loaded (for some reason.)");
}



// Our code

(function(window, $) {
  "use strict";

  var count_removed = 0;  // Counter was inaccurate for some reason, so commented out

  function run() {

    console.error('run called');

    // Message to replace spinner at bottom of infinite scrolling timeline
    $('.stream-loading').find('.spinner').html('Scroll down to load earlier tweets — and keep scrolling — you might not see anything if all the tweets Twitter loads are filtered.').css('background','none').width('auto');
    
    // Initial delete 
    var unwanted = $('.stream').find('[data-you-follow="false"]');
    unwanted.hide();  // Don't use remove(), it causes sporadic errors in Twitter's own code. (Don't use 'empty' either, leaves blank rectangles)
    alertMsg('Filter loaded…');

    // Trigger check every time new tweet is added to timeline
    $('body').on('DOMNodeInserted', '.stream-item', function(e) {

      console.error('triggered');

      var $tweet = $(this).find('.tweet');
      var you_follow = $tweet.attr('data-you-follow');

      if (you_follow === "false") {
        console.error('removing');
        $tweet.hide();  
      }

    });

  }

  function alertMsgRemoved(counter)
  {
    // Display a counter of how many tweets removed
    switch (counter) {
      case 0:
        alertMsg('Nothing to filter');
        break;
      case 1:
        alertMsg('1 tweet filtered');
        break;
      default:
        alertMsg(counter + ' tweets filtered');
        break;
    }
  }

  function alertMsg(msg)
  {
    // Display any notification (temporarily)
    $('#twitterfilter_msg').remove();
    $('body').append('<div id="twitterfilter_msg" class="alert-messages"><div class="message"><div class="message-text">' + msg + '</div></div></div>');
    setTimeout(removeAlertMsg, 3000);
  }

  var removeAlertMsg = function()
  {
    // Fade + remove message
    $('#twitterfilter_msg').fadeOut(function() {
      this.remove();
    });
  }

  run();
})(window,jQuery);


