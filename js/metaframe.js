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
    var these_comments = [];
    if (form_action === undefined && csv_filename === undefined) {
        return;
        // we aren't doing showing comments because you're telling us not to!
    }
    // set the default csv filename if no filename is provided but a form is provided.
    if (csv_filename === undefined) {
        csv_filename = 'comments.csv';
    }
    $('.notes').append(get_structure_html());
    if (sessionStorage.getItem("metaframe_user")) {
        $('#metaframe-user').val(decodeURIComponent(sessionStorage.getItem("metaframe_user")));
    }
    // setting up the comment display and submit handlers.
    var comments_handler = metaframe_comments_handler({
        csv_filename: csv_filename, 
        form_action: form_action,
        external_comments: these_comments
    });
    $('.mf-comment-form').on('submit', metaframe_submit({
        comments_handler: comments_handler,
        csv_filename: csv_filename,
        form_action: form_action
    }));
    // have to call the comment handler once to load the first found of comments. 
    // after those are loaded, reloading them every 10 minutes. probably overkill, but
    // a good number if multiple people are working in a small period of time.
    comments_handler.load();
    setInterval(comments_handler.load, 10 * 60 * 1000);

    if (window.location.hash === '#downloadcomments') {
        generate_and_download_csv();
    }

    function get_structure_html() {
        var structure = '<h2 class="mf-comments-header">Comments</h2>';
        if (form_action) {
            structure +=
                '<form method="post" id="metaframe-form" class="mf-comment-form">' +
                '<div id="metaframe-form-error"></div>' +
                '<input id="metaframe-user" type="text" placeholder="Your name goes here." />' +
                '<textarea id="metaframe-comment" placeholder="Your comment goes here."></textarea>' +
                '<input type="submit" value="Comment" />' +
                '</form>';
        }
        structure += '<div class="mf-comments"></div>';
        return structure;
    }
    function generate_and_download_csv() {
        setTimeout(function () {
            var comments = comments_handler.get();
            for (var i = 0; i < comments.length; i++) {
                console.log(i);
                comments[i] = '"' + comments[i].join('","') + '"';
                comments[i].replace(/\<br\/\>/g, '\n');
            }
            var comments_string = comments.join('\n');
            // the below code doesn't work well. need to do more research into the 
            // filesave html5 api.
            window.location.href = "data:text/csv," + encodeURIComponent(comments_string);
        }, 1000);
    }
}

function metaframe_submit(props) {
    var my = props;
    return function (e) {
        e.preventDefault();
        var data = {}, error = false,
            form = $('#metaframe-form'),
            form_user = $('#metaframe-user'),
            form_comment = $('#metaframe-comment');
        data.user = encodeURIComponent(form_user.val());
        data.comment = encodeURIComponent(form_comment.val());
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
        else {
            $('#metaframe-form-error').html("");
        }
        $('#metaframe-comment').val('');
        var now = new Date();
        now_minutes = now.getMinutes();
        if (now_minutes < 10) {
            now_minutes = "0" + now_minutes;
        }
        data.timestamp = now.getMonth() + "/" + now.getDate() + "/" + now.getFullYear() + " " + now.getHours() + ":" + now_minutes + " GMT" + now.getTimezoneOffset() / 60 * -1;
        data.page = window.location.pathname;
        data.csv_filename = my.csv_filename;
        my.comments_handler.add(data);
        $.ajax({
            url: my.form_action,
            type: 'POST',
            data: data
        })
        .done(function () {
            //my.comments_handler.load();
            sessionStorage.setItem("metaframe_user", data.user);
        });
    };
};

/**
Returns a function that can be used to retrieve and update the comments
on the page. The comments are stored in a closure, so the best way to update is to call
this function once, store the result, and use that to do any updates.
**/
function metaframe_comments_handler(props) {
    var comments = [],
        my = props;
    my.column_key = { 'comment': 0, 'user': 1, 'timestamp': 2, 'page': 3, 'spacer': 4 };
    // does the work on the specific column.
    function format_col(cur_col, index) {
        var remove_quotes_pattern = /^"|"?/g;
        var line_break_pattern = /\n/g;
        var new_col = cur_col.replace(remove_quotes_pattern, '');
        new_col = decodeURIComponent(new_col);
        if (index === my.column_key['comment']) {
            new_col = new_col.replace(line_break_pattern, '<br/>');
        }
        return new_col;
    }
    // runs formatting on each column in the row and returns a new row.
    function format_row(cur_row, index) {
        index = index || 0;
        var new_row = [];
        if (index >= cur_row.length) {
            return new_row;
        }
        new_row.push(format_col(cur_row[index], index));
        return new_row.concat(format_row(cur_row, (index + 1)));
    }
    // looks through the comments array to see if this one exists already.
    function is_in_comments(cur_row) {
        var result = search_comments(cur_row);
        if (result.length > 0) {
            return true;
        }
        return false;
    }
    // search through each comment row to see if there is a match.
    // converts the arrays to strings and matches that way. not a great match,
    // but this is pretty simple data and should be effective enough.
    function search_comments(row, index) {
        index = index || 0;
        var matches = [];
        if (index >= comments.length) {
            return matches;
        }
        if (row.join(',') == comments[index].join(',')) {
            matches.push(row);
        }
        return matches.concat(search_comments(row, (index + 1)));
    }
    // does some work on each row to determine if it should be added to the page.
    function parse_csv_rows(csv_rows, index) {
        index = index || 0;
        var rows_to_return = [];
        if (index >= csv_rows.length) {
            return rows_to_return;
        }
        var cur_row = csv_rows[index];
        cur_row = cur_row.split('","');
        if (cur_row.length <= 1) {
            return rows_to_return;
        }
        cur_row = format_row(cur_row);
        if (!is_in_comments(cur_row) && cur_row[my.column_key['page']] == window.location.pathname) {
            rows_to_return.push(cur_row);
        }
        return rows_to_return.concat(parse_csv_rows(csv_rows, (index + 1)));
    }
    // builds the comment dom element.
    function build_comments_elements(comments_to_draw, index) {
        index = index || 0;
        var new_elements = [];
        if (index >= comments_to_draw.length) {
            return new_elements;
        }
        var new_element = document.createElement('div');
        new_element = $(new_element);
        new_element.addClass('metaframe_new_comment');
        new_element.html(
            '<span class="mf-comment">' + comments_to_draw[index][my.column_key['comment']] + '</span>' +
            '<span class="mf-comment-user">' + comments_to_draw[index][my.column_key['user']] + '</span>' +
            '<span class="mf-comment-timestamp">' + comments_to_draw[index][my.column_key['timestamp']] + '</span>'
        );
        new_elements.push(new_element);
        return new_elements.concat(
            build_comments_elements(comments_to_draw, (index + 1))
        );
    }
    // changes the class on the new elements to show them one at a time
    function show_comments_elements(comments_elements, index) {
        index = index || 0;
        console.log("showing comment " + index);
        if (index >= comments_elements.length) {
            return;
        }
        comments_elements[index].prependTo('.mf-comments');
        return show_comments_elements(comments_elements, index + 1);
    }
    // draws each comment in the row. animate the group to show them coming in.
    function draw_new_comments(comments_to_draw, index) {
        var comments_elements = build_comments_elements(comments_to_draw);
        show_comments_elements(comments_elements);
    }
    // driver for drawing the new comments. see above functions for most of the internal
    // work that is happening.
    function draw_comments_csv(csv) {
        console.log("drawing");
        // parse the csv first
        var csv_rows = csv.split("\n");
        var comments_to_draw = parse_csv_rows(csv_rows);
        draw_new_comments(comments_to_draw);
        comments = comments.concat(comments_to_draw);
    }
    // gets the comment csv, then sends it through the parse function to 
    // load the comments and write the new ones to the screen.
    return {
        load: function update_comments() {
            $.ajax({
                'url': my.csv_filename,
                'contentType': 'text/csv'
            }).done(draw_comments_csv);
        },
        get: function get_comments() {
            return comments;
        },
        add: function add_comment(data) {
            var new_comment = [
                data.comment,
                data.user,
                data.timestamp,
                data.page
            ];
            comments.push(new_comment);
            draw_new_comments([format_row(new_comment)]);
        }
    };

}
