import json
from django.http import Http404
from django.views.generic import TemplateView

from .exceptions import ReactRenderError
from .react_proxy import get_markup


class ReactView(TemplateView):
    template_name = 'react.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        request = self.request
        path = request.path

        # wagtail.wagtailcore.middleware.SiteMiddleware should set this
        if not request.site:
            raise Http404

        try:
            context['markup'], state = get_markup(path)
            try:
                context['state'] = json.dumps(state)
                context['title'] = state['page']['title']
            except Exception as err:
                raise ReactRenderError('Error while parsing state: ', err)
        except ReactRenderError as err:
            context['markup'] = ''
            context['state'] = '{}'
            context['title'] = ''
            print('ReactRenderError', err)

        return context
