#paths
http_path = "/"
css_dir = "stylesheets"
sass_dir = "sass"
images_dir = "images"
javascripts_dir = "js"

# production environment settings
if environment == :production
    line_comments = false
    sass_options = {:debug_info => false}
    css_dir = "../build/css"
end
