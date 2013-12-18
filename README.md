metaframe
==========

Metaframe is an easy-to-use notation layer for conveying the meta-knowledge in wireframes, mockups, and design comps. Made and shared with love by the folks at Elliance.

The current version allows the collection of comments from clients, stakeholders, users, vandals, or bots via a form embedded in the Metaframe overlay. This feature is cool, really cool, but adds a little bit of complexity to the installation. Not much, but a little. Check it out:

##Installation

###Get The Code
In the /install directory, choose the zip file you want, and put the contents in the top level of your web directory. If you want to include the commenting functionality, make sure you match the version to your server environment. At the moment, .NET 2.0 and higher, and .PHP 5.x are supported. The zip files are named accordingly. If you don't need commenting functionality, use the one marked "nocomments".

Alternatively, if you want to pick and choose which parts to install, you can grab all needed files from the /build directory.

###Reference The Files
A basic installation simply requires you to reference metaframe.css and metaframe-1.2.0.min.js. The CSS contains a reset (compass reset) in addition to the note styles. Reference metaframe.css inside the document's head along with your other external style sheets. Reference metaframe-[version].min.js immediately before the close of the body.

###Add Commenting
You can add commenting by adding the two lines of code below for PHP installation:


    <meta name="metaframe-csv" content="php-example.csv"/>
    <meta name="metaframe-form" content="metaframe-form-submit.php"/>


or these two lines of code for .NET installation:


    <meta name="metaframe-csv" content="php-example.csv"/>
    <meta name="metaframe-form" content="metaframe-form-submit.aspx"/>


####IMPORTANT! Make sure either PHP or .NET has writable file permissions to the directory where you are sending the comments or none of this is going to work out.
NB: You can change the location and name file to which the comments will write by modifying the name in the tags above.
NB #2: You can disable commenting by removing the meta tag named "metaframe-form".
NB #3: You can also hide all comments that have been submitted by removing the meta tag named "metaframe-csv".

##Use
Get ready because this is stupid simple. For the element you want to notate, add the following attributes to the HTML tag:
class="notation" note="[your note here, but without the brackets]". You don't have to add numbers to the notes. Metaframe numbers notes automatically, so you only have to keep track of the notes themselves, and they're always located in the HTML element's tag.

Let's say you want to annotate a section on your page with the text, "By default, this section will contain the three most recent featured stories." And let's say the display styles for this section are in the CSS pseudoclass called "features". 
Here's what it would look like: 


    <section class="features notation" note="By default, this section will contain the three most recent featured stories.">


And here's what it looks like in a real, live web page: http://metaframe.elliance.com

###To Download Comments
To get the CSV containing the comments, go to the URL of your project and the path to your CSV, and your browser will downloada the file. The output is a little ugly at the moment because of the encoding we're doing. We're working on a better way to get this, so watch this repository for improvements to come.

####IMPORTANT! Back up your CSV file. You can use cron with wget and curl, or a similar method, to download the CSV file routinely.

##How it works
Metaframe crawls the DOM looking for instances of the class, "notation" and, when it finds one, it uses magic to add the subsequent contents of "notes" to the panel overlay.

##Requirements
Metaframe requires jQuery and Modernizr in order to work. We've included them in the install, but you can, of course, disregard ours if you're using fancier/newer/faster/cooler versions of your own.

##Known Issues
Mama mia! Metaframe's not a-workin so good in IE6 or earlier!

######©2013 Elliance, Inc. http://elliance.com - Creative Commons Attribution Sharealike 3.0 Unported http://creativecommons.org/licenses/by-sa/3.0/
