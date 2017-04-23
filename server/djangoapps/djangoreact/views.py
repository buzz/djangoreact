import requests
import json
from django.conf import settings
from django.http import Http404, HttpResponse
from django.views.generic import TemplateView
from wagtail.wagtailcore import hooks
#from react.render import render_component


class ReactView(TemplateView):
    template_name = 'react.html'

    def render_html(self):
        request = self.request
        path = request.path
        if not request.site:
            raise Http404

        # wagtail page handling
        path_components = [component for component in path.split('/') if component]
        page, args, kwargs = request.site.root_page.specific.route(request, path_components)
        for fn in hooks.get_hooks('before_serve_page'):
            result = fn(page, request, args, kwargs)
            if isinstance(result, HttpResponse):
                return result

        # request rendered markup
        url = settings.REACT_RENDER_URL
        request_headers = {'content-type': 'application/json'}
        timeout = (settings.REACT_RENDER_TIMEOUT, settings.REACT_RENDER_TIMEOUT)
        params = {'pathname': path}
        try:
            res = requests.get(
                url,
                headers=request_headers,
                params=params,
                timeout=timeout
            )
        except requests.ConnectionError:
            raise Exception('Could not connect to render server at {}'.format(url))
        if res.status_code != 200:
            raise Exception('Unexpected response from render server at {}'.format(url))

        # process response
        obj = res.json()

        markup = obj.get('markup', None)
        state = obj.get('state', {})
        err = obj.get('error', None)

        if err:
            if 'message' in err and 'stack' in err:
                raise Exception(
                    'Message: {}\n\nStack trace: {}'.format(err['message'], err['stack'])
                )
            raise Exception(err)

        if markup is None:
            raise Exception('Render server failed to return markup. Returned: {}'.format(obj))

        print(markup)
        return markup, state

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['markup'], state = self.render_html()
        context['state'] = json.dumps(state)
        context['title'] = 'foo'
        return context
