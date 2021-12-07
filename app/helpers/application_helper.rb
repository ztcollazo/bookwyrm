module ApplicationHelper
  def gravatar_for(user, size = 32, **params)
    gravatar_id  = Digest::MD5.hexdigest(user.email.downcase)
    gravatar_url = "https://secure.gravatar.com/avatar/#{gravatar_id}?s=#{size}"
    image_tag(gravatar_url, alt: user.username, **params)
  end

  def full_title(title = '')
    return 'Bookwyrm' unless title != ''

    "#{title} | Bookwyrm"
  end

  def message_type(type)
    return 'danger' if %w[alert danger].include?(type)
    return 'success' if type == 'success'
    return 'warning' if type == 'warning'

    'info'
  end
end
