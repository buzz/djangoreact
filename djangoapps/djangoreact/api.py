from django.http import JsonResponse
from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2.utils import get_full_url


class APIRouter(WagtailAPIRouter):
    def resolve_page_id(self, request):
        """Look-up an url path like '/specific/page/'."""
        path = request.GET.get('path', '/')
        if path == '':
            path = '/'
        path_components = [c for c in path.split('/') if c]
        page, args, kwargs = request.site.root_page.specific.route(
            request, path_components)

        url = self.get_object_detail_urlpath(type(page), page.id)
        return JsonResponse({
            'path': path,
            'detail_url': get_full_url(request, url),
        })


api_router = APIRouter('wagtailapi')
api_router.register_endpoint('pages', PagesAPIEndpoint)
