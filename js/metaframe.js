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

/**
Draws the metaframe comments functionality on the page. It expects two things.
#To show the form and notes
Include the data-metaframe-form on the body tag. It should point to the file that
accepts the form input.

##To change the notes file: 
Put the full name in data-metaframe-comments attribute on the <body> tag. If this is
left out, it will assume the value is comments.csv.

#To show only the notes
Include the data-metaframe-csv attribute on the <body> tag. Use comments.csv unless
you have a better name. This is handy if you have multiple pages that you are getting
comments about.

#Form Handlers
Several form handles are provided with this code. They are:
* metaframe-form-submit.aspx
* metaframe-form-submit.php
**/
function metaframe_embed_comments() {
    var csv_filename = $('meta[name="metaframe-csv"]').attr('content');
    var form_action = $('meta[name="metaframe-form"]').attr('content');
    if (form_action === undefined && csv_filename === undefined) {
        return;
        // we aren't doing anything because you're telling us not to!
    }
    // set the default csv filename if no filename is provided.
    if (csv_filename === undefined) {
        csv_filename = 'comments.csv';
    }
    console.log(csv_filename);
    console.log(form_action);
    var structure = [
        '<h2>Viewer Comments</h2>',
        '<form method="post" id="metaframe-form" class="mf-comment-form">',
        '<div id="metaframe-form-error"></div>',
        '<input id="metaframe-user" type="text" placeholder="Your name goes here." />',
        '<textarea id="metaframe-comment" placeholder="Your comment goes here."></textarea>',
        '<input type="submit" value="Comment" />',
        '</form>',
        '<div class="mf-comments"></div>'
    ];
    $('.notes').append(structure.join('\n'));
    var comments_reloader = metaframe_retrieve_comments({
        csv_filename: csv_filename, 
        form_action: form_action
    });
    $('.mf-comment-form').on('submit', metaframe_submit({
        comments_reloader: comments_reloader,
        form_action: form_action
    }));
    // initial load of the comments.
    comments_reloader();
    // then reload every 10 minutes.
    setInterval(comments_reloader, 10*60*1000);
}

function metaframe_submit(props) {
    var my = props;
    return function(e) {
        e.preventDefault();
        var data = {}, error = false,
            form = $('#metaframe-form'),
            form_user = $('#metaframe-user'),
            form_comment = $('#metaframe-comment');
        data.user = form_user.val();
        data.comment = form_comment.val();
        if (data.user === '' || data.comment === '') {
            error = "Please fill in all fields.";
            form.addClass('error');
        }
        else {
            form.removeClass('error');
        }
        if (error) {
            $('#metaframe-form-error').html(error);
            return;
        }
        $('#metaframe-comment').val('');
        data.timestamp = Date.now();
        $.ajax({
            url: my.form_action,
            type: 'POST',
            data: data
        })
        .done(function() {
            my.comments_reloader();
        });
    };
};

/**
Returns a function that can be used to retrieve and update the comments
on the page. The comments are stored in a closure, so the best way to update is to call
this function once, store the result, and use that to do any updates.
**/
function metaframe_retrieve_comments(props) {
    var comments = [],
        my = props;
    // handles the drawing of the comments after they are loaded.
    function redraw_comments() {
        var comment_elements = create_comment_elements();
        // replacing with the new elements to keep the 
        // appearance of the redraw flash from not happening on the auto
        // refreshes.
        $('.mf-comments').html($(comment_elements).html());
    }
    // creates the elements that will be drawn to the screen.
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
            'url': my.csv_filename,
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
