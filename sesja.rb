class SesjaLinuksowa < Sinatra::Application

  # before must be defined before R18n registration
  before '/:locale/?' do
    @locale = params[:locale] || 'pl'
    session[:locale] = @locale
  end

  register Sinatra::R18n
  set :root, __dir__
  R18n::I18n.default = 'pl'

  configure do
    enable :sessions

    # Nie zapomnij zmienić tego!
    set :edition => "14"

    set :haml, :format => :html5
    set :views, 'views'
  end

  if settings.edition.empty?
    abort("Edycja Sesji nie jest ustawiona, zajrzyj do pliku sesja.rb!")
  end

  configure :development do
    use BetterErrors::Middleware
    BetterErrors.application_root = File.expand_path('..', __FILE__)
  end

  get '/' do
    redirect "/pl"
  end

  get '/:locale/?' do
    haml :index, :locals => {:edition => settings.edition}
  end

  get '/:locale/agenda' do
    haml :agenda, :locals => {:edition => settings.edition}, :layout => false
  end

  not_found do
    haml :notfound
  end

  error do
    haml :error
  end

  # run! if app_file == $0
end
