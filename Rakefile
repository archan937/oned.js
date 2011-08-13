desc "Release a new oned.js version"
task :release, :version do |task, args|
  if (args[:version] || "").strip.empty?
    puts "usage: rake release[version]"
    exit
  end

  timestamp  = Time.now
  javascript = File.open("src/oned.js").readlines.collect do |line|
    line.gsub(/\{(version|year|date)\}/) do |matched|
      case matched
      when "{version}"
        args[:version]
      when "{year}"
        timestamp.year.to_s
      when "{date}"
        timestamp.strftime("%Y-%m-%d %H:%M:%S +0200 (%a, %d %B %Y)")
      end
    end
  end

  # Define variables
  releases_dir = "releases"
  release_dir  = "#{releases_dir}/#{args[:version]}"
  latest_dir   = "#{releases_dir}/latest"

  # Create directories
  FileUtils.rm_r(release_dir) if File.exists?(release_dir)
  FileUtils.rm_r(latest_dir)  if File.exists?(latest_dir)
  FileUtils.mkdir_p("#{release_dir}")

  # Create files
  FileUtils.cp("README.textile", "#{release_dir}/README.textile")
  File.open("#{release_dir}/oned.js", "w").puts(javascript)
  File.open("VERSION", "w").puts(args[:version])

  # Compress release using YUI compressor and update the latest release dir
  IO.popen <<-CONSOLE
    java -jar lib/yuicompressor-2.4.2.jar -v #{release_dir}/oned.js -o #{release_dir}/oned.min.js
    cp -R #{release_dir} #{latest_dir}
  CONSOLE
end