from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.wagtailcore.models import Page


class ReactPagesAPIEndpoint(PagesAPIEndpoint):
    meta_fields = [
        'detail_url',
        'html_url',
        'slug',
        'parent',
    ]


class PageResolverAPIEndpoint(ReactPagesAPIEndpoint):
    filter_backends = []
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
        queryset = Page.objects.filter(id=self._get_page().id)
        queryset = queryset.public().live()
        return queryset


api_router = WagtailAPIRouter('wagtailapi')
api_router.register_endpoint('pages', ReactPagesAPIEndpoint)
api_router.register_endpoint('resolve', PageResolverAPIEndpoint)
