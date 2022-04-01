# frozen_string_literal: true

class HaveMultipleMatcher
  def initialize(name)
    @name = name.to_s
  end

  def matches?(subject)
    subject.send("#{@name}=", [])
    !subject.valid?
  end

  def description
    "should have multiple #{@name}"
  end

  def failure_message
    "Subject does not have multiple #{name}"
  end
end

def have_multiple(name)
  HaveMultipleMatcher.new(name)
end
