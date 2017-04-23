import requests
from django.conf import settings

from .exceptions import ReactRenderError


def get_markup(path):
    markup = ''
    state = {}

    # request markup from render server
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
        raise ReactRenderError(
            'Warning: Could not connect to render server at {}'.format(url))
    if res.status_code != 200:
        raise ReactRenderError(
            'Unexpected response from render server at {}'.format(url))
    else:
        # process response
        try:
            obj = res.json()
        except Exception as err:
            raise ReactRenderError(err)
        markup = obj.get('markup', None)
        state = obj.get('state', {})
        err = obj.get('error', None)

        if err:
            if 'message' in err and 'stack' in err:
                raise ReactRenderError(
                    'Message: %s\n\nStack trace: %s' % (err['message'], err['stack']))
            raise ReactRenderError(err)

        if markup is None:
            raise ReactRenderError(
                'Render server failed to return markup. Returned: {}'.format(obj))

    return markup, state
