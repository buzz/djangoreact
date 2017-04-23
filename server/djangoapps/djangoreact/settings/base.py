from __future__ import absolute_import, unicode_literals
import os
import sys


# TODO: feed db url from env

# setup common directories
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), os.pardir))
SERVER_DIR = os.path.abspath(os.path.join(os.path.dirname(BASE_DIR), os.pardir))
PROJECT_DIR = os.path.abspath(os.path.dirname(SERVER_DIR))

# DEBUG needs to be set explicitly
DEBUG = os.environ.get('DJANGO_DEBUG', 'False') == 'True'

def die(msg):
    print(msg)
    sys.exit(-1)

# parse env config
try:
    RENDER_URL = os.environ['npm_package_config_render_url']
except KeyError as err:
    try:
        RENDER_PORT = os.environ['npm_package_config_render_port']
        RENDER_URL = 'http://127.0.0.1:%d/' % int(RENDER_PORT)
    except KeyError as err:
        die('''Error! You need to configure the render server by either
            setting $npm_package_config_render_port or
            $npm_package_config_render_url.''')
try:
    API_BASE_PATH = os.environ['npm_package_config_api_base_path']
    API_PAGES_PATH = os.environ['npm_package_config_api_pages_path']
    ADMIN_BASE_PATH = os.environ['npm_package_config_admin_base_path']
    STATIC_ROOT = os.path.join(
        PROJECT_DIR, os.environ['npm_package_config_static_root'])
    MEDIA_ROOT = os.path.join(
        PROJECT_DIR, os.environ['npm_package_config_media_root'])
except KeyError as err:
    die('Error! You have to set the environment variable "%s"' % err)

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

ROOT_URLCONF = 'djangoapps.djangoreact.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
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

WSGI_APPLICATION = 'djangoapps.djangoreact.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(SERVER_DIR, 'db.sqlite3'),
    }
}

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

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

BASE_URL = 'http://example.com'

# react renderer

REACT_RENDER_URL = RENDER_URL
REACT_RENDER_TIMEOUT = 8

# webpack-loader

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'webpack_bundles/',  # must end with slash
        'STATS_FILE': os.path.join(PROJECT_DIR, 'webpack-stats.json'),
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG
    }
}
