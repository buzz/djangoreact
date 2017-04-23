from __future__ import absolute_import, unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.wagtailcore.urls import serve_pattern

from .api import api_router
from .views import ReactView

urlpatterns = [
    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^api/v2/', include(api_router.urls)),
    #url(r'^wagtail', include(wagtail_urls)),
    # mock wagtail
    url(serve_pattern, ReactView.as_view(), name='wagtail_serve')
]

if settings.DEBUG:
    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
