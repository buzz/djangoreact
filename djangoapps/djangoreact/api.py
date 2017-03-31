from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter

from djangoapps.djangoreact.serializers import ReactPageSerializer
from djangoapps.pages.models import HomePage


class ReactPagesAPIEndpoint(PagesAPIEndpoint):
    base_serializer_class = ReactPageSerializer
    model = HomePage
    listing_default_fields = PagesAPIEndpoint.listing_default_fields + [
        'body',
    ]


class PageResolverAPIEndpoint(ReactPagesAPIEndpoint):
    known_query_parameters = ReactPagesAPIEndpoint.known_query_parameters.union(
        ['path']
    )

    def _get_page(self):
        request = self.request
        path = request.query_params.get('path', '/')
        if path == '':
            path = '/'
        path_components = [c for c in path.split('/') if c]
        page, args, kwargs = request.site.root_page.specific.route(
            request, path_components)
        return page

    def get_queryset(self):
        queryset = self.model.objects.filter(id=self._get_page().id)
        queryset = queryset.public().live()
        return queryset


api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('pages', ReactPagesAPIEndpoint)
api_router.register_endpoint('resolve', PageResolverAPIEndpoint)
