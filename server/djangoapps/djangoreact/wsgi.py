from __future__ import absolute_import, unicode_literals
import os

from django.core.wsgi import get_wsgi_application


os.environ.setdefault(
    'DJANGO_SETTINGS_MODULE', 'djangoapps.djangoreact.settings.production')
application = get_wsgi_application()
