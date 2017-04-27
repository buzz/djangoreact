from django.conf import settings
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter

from djangoapps.reactail.serializers import ReactPageSerializer
from djangoapps.pages.models import HomePage


class ReactPagesAPIEndpoint(PagesAPIEndpoint):
    """Expose Pages as API endpoint."""
    base_serializer_class = ReactPageSerializer
    model = HomePage
    meta_fields = PagesAPIEndpoint.meta_fields + [
        'url_path',
        'show_in_menus',
    ]
    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'parent',
        'url_path',
        'show_in_menus',
    ]
    detail_only_fields = []

api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint(settings.API_PAGES_PATH, ReactPagesAPIEndpoint)
