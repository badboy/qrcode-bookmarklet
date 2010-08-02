JSFILE = "qrcode.js"
DEMO = "index.html"
LAYOUT = "layout.html"

def bookmarklet
  js = IO.read(JSFILE)
  js = js.gsub(/"/, "'")
    .gsub(/(var|px|0) /, '\1!') # don't remove them later
    .gsub(/ (in|to) /, '!\1!')
    .gsub(/else if/, 'else!if')
    .gsub(/\s/, '') # remove whitespace
    .gsub(/(var|px|0)!/, '\1 ') # hack the hack
    .gsub(/!(in|to)!/, ' \1 ')
    .gsub(/else!if/, 'else if')
    .gsub(/\n/, '') # and squeeze newlines!

  "(#{js})();"
end

desc "Build demo.html"
task :build => DEMO

desc "Publish to GitHub Pages"
task :pages => DEMO do
  unless `git status`.include?("(working directory clean)")
    abort("working directory dirty!") 
  end

  Dir['index.html'].each do |f|
    cp f, File.basename(f).sub('.html', '.newhtml')
  end

  sh "git checkout gh-pages"

  Dir['*.newhtml'].each do |f|
    mv f, "index.html"
  end

  sh "git add ."
  sh "git commit -m 'updated demo page'"
  sh "git push origin gh-pages"
  sh "git checkout master"
  puts :done
end

file JSFILE
file LAYOUT
file DEMO => [JSFILE, LAYOUT] do
  print "Building boomarklet..."
  layout = IO.read(LAYOUT)
  File.open(DEMO, 'w') do |f|
    f.write layout.gsub(/{{code}}/, bookmarklet)
  end
  puts "done (wrote #{bookmarklet.size} bytes)"
end

task :default => :build
