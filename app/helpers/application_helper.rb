# frozen_string_literal: true

# Helper for main application
module ApplicationHelper
  def gravatar_for(user, size: 32, **params)
    gravatar_id  = Digest::MD5.hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.username, **params, class: "rounded-full #{params[:class]}")
  end

  def full_title(title = '')
    return 'Bookwyrm' unless title != ''

    "#{title} | Bookwyrm"
  end

  def message_type(type)
    return 'danger' if %w[alert danger error failure].include?(type)
    return 'success' if type == 'success'
    return 'warning' if type == 'warning'

    'info'
  end

  def markdown(text)
    md = Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, no_intra_emphasis: true, hard_wrap: true,
                                                          fenced_code_blocks: true, space_after_headers: true)
    md.render(text).gsub(/\n+/, '<br>')
  end
end
