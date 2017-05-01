from django.conf import settings
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.wagtailcore.models import Page

from reactail.serializers import ReactPageSerializer


class ReactPagesAPIEndpoint(PagesAPIEndpoint):
    """Expose Pages as API endpoint."""
    base_serializer_class = ReactPageSerializer
    model = Page
    meta_fields = PagesAPIEndpoint.meta_fields + [
        'excerpt',
        'image',
        'published_at',
        'show_in_menus',
        'url_path',
    ]
    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'excerpt',
        'image',
        'parent',
        'published_at',
        'show_in_menus',
        'url_path',
    ]
    detail_only_fields = []  # hide parent field


api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint(settings.API_PAGES_PATH, ReactPagesAPIEndpoint)
