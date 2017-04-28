from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore.urls import serve_pattern as wagtail_serve_pattern

from reactail.api import api_router
from reactail.views import ReactView


admin_serve_pattern = r'^%s' % settings.ADMIN_BASE_PATH
api_serve_pattern = r'^%s' % settings.API_BASE_PATH

urlpatterns = [
    # serve admin
    url(admin_serve_pattern, include(wagtailadmin_urls)),

    # serve api
    url(api_serve_pattern, include(api_router.urls)),

    # we replace wagtail template based views: include(wagtail_urls)
    # and provide 'wagtail_serve' so reverse url lookups still work.
    url(wagtail_serve_pattern, ReactView.as_view(), name='wagtail_serve')
]

if settings.DEBUG:
    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
