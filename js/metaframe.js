// Metaframe is an easy-to-use notation layer for conveying the meta-knowledge in wireframes, mockups, and design comps. Made and shared with love by the folks at Elliance. 
// ©2013 Elliance, Inc. - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/

$(document).ready(function () {

    // Generate Notes Tab
    $('<a/>', {
        class: 'notes-tab',
        href: '#'
    }).appendTo('body');

    // Generate Notes Panel 
    $('<div/>', {
        class: 'notes'
    }).appendTo('body');

    // Get Page Title
    var vTitle = $(this).attr('title');
   $('.notes').html('<h1>' + vTitle + '</h1>');
    
    // Generate Notes Panel static Content
    var structure = [
        
        '<form><input type="checkbox" id="noteBox" checked="checked" >show note markers</form>',
        '<h2>Page Notes</h2>'
    ];

    $(structure.join('')).appendTo('.notes');

    // Generate Note From Element
    var noteCount = 0;
    var tn_array = $(".notation").map(function() {
        noteCount++;
        return $(this).attr("note");
      
    });

    // Auto-numbering the notes    
    for (var i = 0; i < noteCount - 0; i++) {
        $('.notes').append('<div class="note-holder">' + '<span class="note-count">' + (i+1) + '</span>' +'<span class="note-body">' + tn_array[i] + '</span>' + '</div');
        }

    // Function defined for right panel
    // Start in closed position
    function OverlayControlright() {

      $(".notes-tab").click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('open')) {
             $(".notes").animate({right:'0px'}, 300);
             $(".notes-tab").animate({right:'340px'}, 300);
             $(this).addClass('open');
        } else {
             $(".notes").animate({right:'-330px'}, 300);
             $(".notes-tab").animate({right:'10px'}, 300);
             $(this).removeClass('open');
            }
        });
    }

    // Function defined for bottom panel    
    // Start in closed position   
    function OverlayControldown() {

      $(".notes-tab").click(function(e) {
        e.preventDefault();
        if(!$(this).hasClass('open')) {
             $(".notes").animate({bottom:'0px'}, 300);
             $(".notes-tab").animate({bottom:'340px'}, 300);
             $(this).addClass('open');             
        } else {
            $(".notes").animate({bottom:'-330px'}, 300);
             $(".notes-tab").animate({bottom:'10px'}, 300);
             $(this).removeClass('open');
            }
        });
    }

    // Resetting CSS on resize so things don't get janky
    // Invoking controls on page resize  
    $(window).on('resize', function () {
        
        $('.notes-tab').removeClass('open');
        $('.notes-tab').unbind('click');
      if ($(window).width() > 800) 
      {      
            $(".notes").css({right:'-330px'}); 
            $(".notes-tab").css({right:'10px'}); 
            $('.notes').removeClass('bottom');
            OverlayControlright(); 
    } else {
        $(".notes").css({bottom:'-330px'}); 
        $(".notes-tab").css({bottom:'10px'}); 
            $('.notes').addClass('bottom');
            OverlayControldown(); 

        }
    });

    // Invoking controls on load    
    if ($(window).width() > 800) {

          OverlayControlright(); 

        } else {
            $('.notes').addClass('bottom');
            OverlayControldown(); 
        }

        // add HTML to classes marked with .notation
        $('.notation').each(function() {
            $(this).prepend('<span class="notes-anchor"><figure></figure></span>');
        });

        // hide note anchors on check
        $('#noteBox').click(function() {
        $('.notes-anchor').toggle();
    });
});