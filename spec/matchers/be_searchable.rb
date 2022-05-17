# frozen_string_literal: true

class SearchableMatcher
  def initialize(on: [], name: '')
    @fields = on
    @method_name = name
    @failed = []
  end

  def matches?(subject)
    @fields.collect do |field|
      res = subject.class.send(@method_name.to_s, subject.send(field))
      @failed.push field unless res.include? subject
    end
    @failed.empty?
  end

  def failure_message
    "Searching the field#{@failed.length > 1 ? 's' : ''} #{format_fields(@failed)} did not yield the subject."
  end

  def description
    "be searchable on #{format_fields(@fields)}"
  end

  private

  def format_fields(arr)
    if arr.length > 2
      arr.join(', ')
    else
      arr.join(' and ')
    end
  end
end

def be_searchable(**args)
  SearchableMatcher.new(args)
end
