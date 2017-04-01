from django.http import JsonResponse
from rest_framework.views import APIView
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter

from djangoapps.djangoreact.serializers import ReactPageSerializer
from djangoapps.djangoreact.util import get_nav
from djangoapps.pages.models import HomePage


class WagtailNavAPIEndpoint(APIView):
    def get(self, request):
        nav = get_nav(request)
        return JsonResponse(nav)


class ReactPagesAPIEndpoint(PagesAPIEndpoint):
    base_serializer_class = ReactPageSerializer
    model = HomePage
    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'body',
    ]


api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('pages', ReactPagesAPIEndpoint)
