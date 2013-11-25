// Metaframe is an easy-to-use notation layer for conveying the meta-knowledge in wireframes, mockups, and design comps. Made and shared with love by the folks at Elliance. 
// Copyright 2013 Elliance, Inc. - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/

$(document).ready(function () {

    // Generate Notes Tab
    $('<a/>', {
        'class': 'notes-tab',
        href: '#'
    }).appendTo('body');

    // Generate Notes Panel 
    $('<div/>', {
        'class': 'notes Scrollable'
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

    // add HTML to classes marked with .notation
    var noteNum = 0;
    $('.notation').each(function() {
        noteNum++;
        $(this).prepend('<span class="notes-anchor"><figure>' + (noteNum) +'</figure></span>');
    });

    metaframe_embed_comments();

    // Function defined for right panelD
    // Start in closed position
    function OverlayControlright() {

      $(".notes-anchor, .notes-tab").click(function(e) {
        e.preventDefault();

        if(!$('.notes-tab').hasClass('open')) {
             $(".notes").animate({right:'0px'}, 300);
             $(".notes-tab").animate({right:'340px'}, 300);
             $('.notes-tab').addClass('open');
        } else {
             $(".notes").animate({right:'-330px'}, 300);
             $(".notes-tab").animate({right:'10px'}, 300);
             $('.notes-tab').removeClass('open');
            }
        });
    }

    // Function defined for bottom panel    
    // Start in closed position   
    function OverlayControldown() {

      $(".notes-anchor, .notes-tab").click(function(e) {
        e.preventDefault();
        if(!$('.notes-tab').hasClass('open')) {
             $(".notes").animate({bottom:'0px'}, 300);
             $(".notes-tab").animate({bottom:'340px'}, 300);
             $(".notes-tab").addClass('open');             
        } else {
            $(".notes").animate({bottom:'-330px'}, 300);
             $(".notes-tab").animate({bottom:'10px'}, 300);
             $('.notes-tab').removeClass('open');
            }
        });
    }

    // Resetting CSS on resize so things don't get janky
    // Invoking controls on page resize  
    $(window).on('resize', function () {
        
        $('.notes-tab').removeClass('open');
        $('.notes-anchor, .notes-tab').unbind('click');
      if ($(window).width() > 700) 
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
    if ($(window).width() > 700) {

          OverlayControlright(); 

        } else {
            $('.notes').addClass('bottom');
            OverlayControldown(); 
        }

        // hide note anchors on check
        $('#noteBox').click(function() {
        $('.notes-anchor').toggle();
    });

        // if no notes exist, show the message
        if ($('.note-body').size() === 0) {
            $('.notes').append('<p>' + 'There are no notes yet. I guess you can go home early today!' + '</p>');
        }


// Scrollable hack found at http://jsfiddle.net/TroyAlford/4wrxq/1/

        $('.Scrollable').on('DOMMouseScroll mousewheel', function(ev) {
        var $this = $(this),
            scrollTop = this.scrollTop,
            scrollHeight = this.scrollHeight,
            height = $this.height(),
            delta = ev.originalEvent.wheelDelta,
            up = delta > 0;

        var prevent = function() {
            ev.stopPropagation();
            ev.preventDefault();
            ev.returnValue = false;
            return false;
        };
        
        if (!up && -delta > scrollHeight - height - scrollTop) {
            // Scrolling down, but this will take us past the bottom.
            $this.scrollTop(scrollHeight);
            return prevent();
        } else if (up && delta > scrollTop) {
            // Scrolling up, but this will take us past the top.
            $this.scrollTop(0);
            return prevent();
        }
    });

});

function metaframe_embed_comments() {
    var structure = [
        '<h2>Viewer Comments</h2>',
        '<form method="post" class="mf-comment-form">',
        '<input type="text" />',
        '<textarea></textarea>',
        '<input type="submit" value="Comment" />',
        '</form>',
        '<div class="mf-comments"></div>'
    ];
    $('.notes').append(structure.join('\n'));
    var comments_reloader = metaframe_retrieve_comments();
    $('.mf-comment-form').on('submit', function(e) {
        comments_reloader();
        e.preventDefault();
    });

    comments_reloader();
    // reload every 10 minutes
    setInterval(comments_reloader, 10*60*1000);
}

/**
Returns a function that can be used to retrieve and update the comments
on the page. The comments are stored in a closure, so the best way to update is to call
this function once, store the result, and use that to do any updates.
**/
function metaframe_retrieve_comments() {
    var comments = [];
    function redraw_comments() {
        var comment_elements = create_comment_elements();
        // replacing with the new elements to keep the 
        // appearance of the redraw flash from not happening on the auto
        // refreshes.
        $('.mf-comments').html($(comment_elements).html());
    }
    function create_comment_elements(index) {
        index = index || 0;
        var element = document.createElement('div');
        var remove_quotes_pattern = /^"|"?/g;
        // the last div is empty so that all of the elements can be appended to
        // it.
        if (comments[index] === undefined) {
            return element;
        }
        var row = comments[index].split('","');
        if (row.length <= 1) {
            return element;
        }
        var element_contents = [];
        for (var i=0; i<row.length; i++) {
            element_contents.push('<span>');
            element_contents.push(row[i].replace(remove_quotes_pattern, ''));
            element_contents.push('</span>');
        }
        element.innerHTML = element_contents.join('\n');
        var parent_element = create_comment_elements(index+1);
        parent_element.appendChild(element);
        return parent_element;
    }
    return function update_comments() {
        console.log("(re)loading comments");
        $.ajax({
            'url': '/example.csv',
            'contentType': 'text/csv'
        }).done(function(data) {
            var csv_rows = data.split("\n");
            if (csv_rows !== comments) {
                comments = csv_rows;
                redraw_comments();
            }
        });
    };

}
