from __future__ import absolute_import, unicode_literals
import os
import sys
import environ
from django.core.exceptions import ImproperlyConfigured


ENV = environ.Env(
    NODE_ENV=(str, 'production'),
    npm_package_config_allowed_hosts=(list)
)


def die(msg):
    print(msg)
    sys.exit(-1)


# setup common directories
PATH = environ.Path(__file__)
BASE_DIR = PATH - 2
SERVER_DIR = PATH - 4
PROJECT_DIR = PATH - 5


# interpret config paths relative to PROJECT_DIR
def MAKE_ABS(path):
    return os.path.isabs(path) and path or PROJECT_DIR(path)


# parse env config from package.json
DEBUG = ENV('NODE_ENV') == 'development'

try:
    RENDER_URL = ENV('npm_package_config_render_url')
except ImproperlyConfigured as err:
    try:
        RENDER_PORT = ENV('npm_package_config_render_port')
        RENDER_URL = 'http://127.0.0.1:%d/' % int(RENDER_PORT)
    except ImproperlyConfigured as err:
        raise ImproperlyConfigured(
            'You need to set either $npm_package_config_render_url or ' +
            '$npm_package_config_render_port.')

API_BASE_PATH = ENV('npm_package_config_api_base_path')
API_PAGES_PATH = ENV('npm_package_config_api_pages_path')
ADMIN_BASE_PATH = ENV('npm_package_config_admin_base_path')

STATIC_ROOT = MAKE_ABS(ENV('npm_package_config_static_root'))
MEDIA_ROOT = MAKE_ABS(ENV('npm_package_config_media_root'))

SECRET_KEY = ENV('npm_package_config_secret_key')
ALLOWED_HOSTS = ENV('npm_package_config_allowed_hosts')

WEBPACK_STATS_FILE = MAKE_ABS(ENV('npm_package_config_webpack_stats_file'))

INSTALLED_APPS = [
    'djangoapps.pages',

    'wagtail.wagtailforms',
    'wagtail.wagtailredirects',
    'wagtail.wagtailembeds',
    'wagtail.wagtailsites',
    'wagtail.wagtailusers',
    'wagtail.wagtailsnippets',
    'wagtail.wagtaildocs',
    'wagtail.wagtailimages',
    'wagtail.wagtailsearch',
    'wagtail.wagtailadmin',
    'wagtail.wagtailcore',
    'wagtail.api.v2',

    'modelcluster',
    'taggit',

    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'webpack_loader',
]

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',

    'wagtail.wagtailcore.middleware.SiteMiddleware',
    'wagtail.wagtailredirects.middleware.RedirectMiddleware',
]

ROOT_URLCONF = 'djangoapps.reactail.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR('templates'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'djangoapps.reactail.wsgi.application'

DATABASES = {
    'default': ENV.db('npm_package_config_database_url'),
}

# sqllite db file is relative to project dir
if DATABASES['default']['ENGINE'] == 'django.db.backends.sqlite3':
    DATABASES['default']['NAME'] = MAKE_ABS(DATABASES['default']['NAME'])

# i18n
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

STATIC_URL = '/assets/'
MEDIA_URL = '/media/'

# Wagtail settings

WAGTAIL_SITE_NAME = 'wagtailreact'

WAGTAIL_RENDITIONS = {
    'default': 'fill-1110x450|jpegquality-85',
}

# react renderer

REACT_RENDER_URL = RENDER_URL
REACT_RENDER_TIMEOUT = 1

# webpack-loader

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/',  # must end with slash
        'STATS_FILE': WEBPACK_STATS_FILE,
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}
