##
# Feedjira configuration file for parser and whitepsace.
Feedjira.configure do |config|
  ##
  #Setting up the parser
  config.parsers = [Feedjira::Parser::RSS]

  ##
  # whiltespace should be stripped
  config.strip_whitespace = true
end
